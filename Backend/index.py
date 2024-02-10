import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from dotenv import load_dotenv
import os
from routes.user import user

app = FastAPI()
load_dotenv()
url = os.getenv("REACT_URL")
origins = [url]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user)

if __name__ == "__main__":
    uvicorn.run(app, port=8000)
