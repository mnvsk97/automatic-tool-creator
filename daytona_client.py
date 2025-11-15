from daytona import Daytona, DaytonaConfig
import os
from dotenv import load_dotenv
load_dotenv()

# Define the configuration

config = DaytonaConfig(api_key=os.getenv("DAYTONA_API_KEY"))

# Initialize the Daytona client

daytona = Daytona(config)
