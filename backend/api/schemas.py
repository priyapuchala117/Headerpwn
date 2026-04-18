from pydantic import BaseModel

class ScanRequest(BaseModel):
    url: str
    timeout: int = 10
    enable_fuzzing: bool = True
