from google import genai

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

def generate_reply(prompt: str) -> str:
    response = client.models.generate_content(
        model = "gemini-3-flash-preview",
        contents = prompt
    )
    return response.text