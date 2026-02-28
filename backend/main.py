from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

from gemini_client import generate_reply

app = FastAPI()

# Allow Next.js to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    character: str

@app.get("/")
def read_root():
    return {"message": "Krono backend is running"}

@app.post("/chat")
def chat(req: ChatRequest):
    # Basic personality prompt
    prompt = f"You are {req.character}. Speak as {req.character} and answer the following question: {req.message}"
    
    reply = generate_reply(prompt)
    
    return {"reply": reply}