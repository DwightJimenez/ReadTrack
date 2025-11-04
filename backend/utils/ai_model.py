# utils/ai_model.py
from transformers import pipeline
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

def predict_difficulty(text):
    result = classifier(text[:512])[0]  # analyze first 512 chars
    if result["label"] == "POSITIVE":
        return "Easy"
    else:
        return "Difficult"
