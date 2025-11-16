from daytona import SessionExecuteRequest
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from langchain_openai import ChatOpenAI

from daytona_client import daytona
from prompts import PROMPT_VARIATION_AGENT_SYSTEM_PROMPT
import os
llm = ChatOpenAI(model="gpt-4o-mini")

class WorkRequest(BaseModel):
    repo_url: str
    skill_name: str
    user_prompt: str
    
class WorkResponse(BaseModel):
    variations: list[str]

app = FastAPI()

import sentry_sdk

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    traces_sample_rate=1.0,
    environment=os.getenv("ENVIRONMENT", "development"),
)

from contextlib import contextmanager

@contextmanager
def sentry_context():
    with sentry_sdk.push_scope() as scope:
        try:
            yield
        except Exception as exc:
            sentry_sdk.capture_exception(exc)
            raise



@app.post("/work")
async def work(request: WorkRequest):
    # Generate variations using gpt-4o
    response: WorkResponse = await llm.with_structured_output(WorkResponse).ainvoke(
        PROMPT_VARIATION_AGENT_SYSTEM_PROMPT.format(
            repo_url=request.repo_url, skill_name=request.skill_name, user_prompt=request.user_prompt),
    )
    
    # Start a daytona sandbox with the variations
    for index, variation in enumerate(response.variations):
        # For each variation, create a sandbox
        sandbox = daytona.create()
        # For each sandbox, clone the repository
        ssh_access = sandbox.create_ssh_access(expires_in_minutes=60)
        print(f"SSH Token: {ssh_access.token}")
        # For each sandbox, clone the repository
        sandbox.git.clone(
            url=request.repo_url,
            path="."
        )
        # For each sandbox, checkout the variation
        sandbox.git.create_branch(".", f"feature/feature-variation-{index+1}")
        # Install libraries
        sandbox.process.exec("npm install")
        # copy work.py
        with open("work.py", "rb") as f:
            content = f.read()
        sandbox.fs.upload_file(content, "work.py")
        # Install dependencies
        sandbox.process.exec("pip install claude-agent-sdk pydantic daytona dotenv")
        sandbox.process.exec("npm install -g @anthropic-ai/claude-code")
        # Set env
        sandbox.process.exec(f"export ANTHROPIC_API_KEY={os.getenv('ANTHROPIC_API_KEY')}")
        # Run the claude code snippet in the work.py file
        response = sandbox.process.code_run(f"import os; os.environ['ANTHROPIC_API_KEY'] = '{os.getenv('ANTHROPIC_API_KEY')}' ;from work import run_variation; import asyncio; asyncio.run(run_variation('{variation}'))")
        
        sandbox.process.create_session(f"random-session-{index}")
        sandbox.process.execute_session_command(f"random-session-{index}", SessionExecuteRequest(
            command="npm run dev",
            var_async=True
        ))
        # Generate a preview link for the sandbox
        preview_link = sandbox.get_preview_link(3000)
        print(f"Variation {index+1} preview link: {preview_link}")
        # Expose the port to the public

    return JSONResponse(content={"message": "Sandboxes created successfully"})
    