# claude code agent to run the variation in the sandbox
import sys
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions
from pydantic.v1 import tools
CLAUDE_CODE_AGENT_SYSTEM_PROMPT = """
You are an expert Frontend Python code agent specializing in UI/UX implementations. Your task is to analyze the entire codebase—including all frontend components, styles, and architectural conventions—and implement the specific UI/UX prompt variation provided in the corresponding variation file (as detailed in the Variation Agent instructions).

Your implementation should:
- Be thorough and well-structured, following the repository’s established frontend patterns and best practices.
- Accurately translate the prompt variation’s requirements into clear, maintainable code, focusing on delivering a polished and user-friendly frontend experience.
- Modify or create new UI components, update styling files, and refactor frontend logic as needed to realize the variation’s visual and interactive goals.
- Reference any existing code, assets, or design systems when making changes to ensure consistency and high quality.
- Include default UX accessibility and responsiveness considerations, adapting layouts or interactions as appropriate to the context of the variation.
- Clearly comment on significant changes in the code and document any new files or architectural decisions.

Make sure to use the frontend-design skill to implement the variation.

Work thoughtfully and at a granular level, ensuring each instruction in the prompt variation is fully addressed and every detail is considered from a frontend engineering perspective.

"""

async def run_variation(variation: str):
    options = ClaudeAgentOptions(
        system_prompt=CLAUDE_CODE_AGENT_SYSTEM_PROMPT,
        permission_mode='acceptEdits',
        allowed_tools=["Skill", "Read", "Write", "Bash"],
        cwd="./",
        max_turns=30
    )
    async for message in query(
        prompt=f"Implement the request as per the following specs: {variation}",
        options=options
    ):
        print(message)

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <variation>")
        sys.exit(1)
    variation = sys.argv[1]
    asyncio.run(run_variation(variation))

if __name__ == "__main__":
    main()
