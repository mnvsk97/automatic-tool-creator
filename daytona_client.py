from daytona import Daytona, DaytonaConfig
import os
from dotenv import load_dotenv
load_dotenv()

# Define the configuration

config = DaytonaConfig(
    api_key=os.getenv("DAYTONA_API_KEY"),
    api_url="https://app.daytona.io/api",
    target="us"
)

# Initialize the Daytona client

daytona = Daytona(config)
