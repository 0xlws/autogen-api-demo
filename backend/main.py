from autogen import AssistantAgent, UserProxyAPIAgent, ServerManager, config_list_from_json
from dotenv import load_dotenv, find_dotenv
import openai
import os

load_dotenv(find_dotenv())  # read local .env file
# openai.log='debug'
config_list = config_list_from_json(env_or_file="OAI_CONFIG_LIST")
api_key = config_list[0]['api_key']
openai.api_key = api_key

config_list = [{"model": "gpt-3.5-turbo", "api_key": api_key}]

llm_config_assistant = {
    "model": "gpt-3.5-turbo",
    "temperature": 0,
    "config_list": config_list,
}

llm_config_proxy = {
    "model": "gpt-3.5-turbo",
    "temperature": 0,
    "config_list": config_list,
}


# Create assistant agent
assistant = AssistantAgent(name="assistant", llm_config={"config_list": config_list})

# Create user proxy agent
user_proxy = UserProxyAPIAgent(
    name="user_proxy",
    human_input_mode="ALWAYS",
    max_consecutive_auto_reply=10,
    is_termination_msg=lambda x: x.get("content", "") and x.get("content", "").rstrip().endswith("TERMINATE"),
    code_execution_config=False,
)


if __name__ == "__main__":
    manager = ServerManager(assistant=assistant, user_proxy=user_proxy )
    manager.start_server()
