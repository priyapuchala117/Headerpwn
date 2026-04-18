from fastapi import FastAPI
from backend.api.routes import router
from backend.logging_config import setup_logging
from fastapi.middleware.cors import CORSMiddleware
setup_logging()

app = FastAPI(
    title="Headerpwn X",
    description="HTTP Security Header Analyzer & Fuzzer",
    version="1.0"
)

app.include_router(router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
