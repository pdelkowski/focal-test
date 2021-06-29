from pydantic import BaseSettings


# This will automagically load variables from envionment (eg. exported in bash etc)
class Settings(BaseSettings):
    version: str = "1.0.0"
    stage: str = "testing"
    jwt_secret_key: str = "CHANGE_ME#@(@*(@*#(@#*"
