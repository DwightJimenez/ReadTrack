from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from models.analyzer import analyze_text
from utils.extract_text import extract_text

app = FastAPI()

# allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_material(file: UploadFile = File(None), text: str = Form(None)):
    try:
        if file:
            content = await file.read()
            text_content = extract_text(content, file.filename)
        elif text:
            text_content = text
        else:
            return {"error": "No text or file provided"}

        result = analyze_text(text_content)
        return {"status": "success", "result": result}
    except Exception as e:
        return {"error": str(e)}
