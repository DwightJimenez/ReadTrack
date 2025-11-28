import spacy
import nltk
import pandas as pd
import joblib
import os
import re
from nltk.corpus import cmudict

# --- Setup: Load NLP Resources ---
try:
    nlp = spacy.load("en_core_web_sm")
except IOError:
    print("spaCy model not found. Run: python -m spacy download en_core_web_sm")

try:
    d = cmudict.dict()
except LookupError:
    nltk.download('cmudict')
    d = cmudict.dict()

# --- Load the Trained Thesis Model ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'readtrack_model.pkl')
ENCODER_PATH = os.path.join(BASE_DIR, 'readtrack_label_encoder.pkl')
COLUMNS_PATH = os.path.join(BASE_DIR, 'readtrack_model_columns.pkl')

model = None
label_encoder = None
feature_columns = None

try:
    model = joblib.load(MODEL_PATH)
    label_encoder = joblib.load(ENCODER_PATH)
    feature_columns = joblib.load(COLUMNS_PATH)
    print("ReadTrack AI Model Loaded Successfully.")
except FileNotFoundError:
    print("WARNING: Model files not found. System will run in PROTOTYPE mode until you run 'python train_model.py'.")

def _count_syllables(word):
    """
    Estimates syllables for 'Simulated Fixation'.
    Uses CMU Dictionary, falls back to regex for unknown words.
    """
    try:
        return [len(list(y for y in x if y[-1].isdigit())) for x in d[word.lower()]][0]
    except (KeyError, TypeError, IndexError):
        word = word.lower()
        if len(word) <= 3: return 1
        word = re.sub(r'(es|ed|e)$', '', word)
        vowels = re.findall(r'[aeiouy]+', word)
        return len(vowels) if len(vowels) > 0 else 1

def _extract_features(text: str):
    """
    Core Logic for Thesis: Extracts linguistic features.
    Returns: (features_dict, list_of_difficult_words)
    """
    doc = nlp(text)
    
    total_words = 0
    total_sentences = len(list(doc.sents))
    total_syllables = 0
    difficult_words_count = 0
    
    difficult_words_list = []

    # 1. Analyze Words (For Fixation & Difficulty)
    for token in doc:
        if token.is_alpha:
            total_words += 1
            syllables = _count_syllables(token.text)
            total_syllables += syllables
            
            # Thesis Logic: Words with 3+ syllables or rare roots simulate high fixation
            if syllables >= 3:
                difficult_words_count += 1
                difficult_words_list.append(token.text)

    # Safety for empty inputs
    if total_words == 0 or total_sentences == 0:
        return None, []

    # 2. Calculate Thesis Metrics
    avg_sentence_length = total_words / total_sentences
    avg_word_length_syllables = total_syllables / total_words
    difficult_word_ratio = difficult_words_count / total_words
    
    features = {
        "avg_sentence_length": avg_sentence_length,
        "avg_word_length_syllables": avg_word_length_syllables,
        "difficult_word_ratio": difficult_word_ratio,
        "total_words": total_words
    }
    
    return features, difficult_words_list

def analyze_text(text: str) -> dict:
    """
    API Endpoint Logic.
    Generates the 'Expected Output' for the frontend/Add-in.
    """
    features, diff_words = _extract_features(text)
    
    if not features:
        return {"error": "No usable text found to analyze."}

    # --- A. CLASSIFICATION (The AI Decision) ---
    classification = "Unknown"
    confidence = 0.0
    
    if model and feature_columns:
        # Create DataFrame for prediction, ensuring correct column order
        input_data = pd.DataFrame([features])
        # Only keep columns the model was trained on
        input_data = input_data[[c for c in feature_columns if c in input_data.columns]]
        
        if not input_data.empty:
            prediction_idx = model.predict(input_data)[0]
            classification = label_encoder.inverse_transform([prediction_idx])[0]
            
            # Get confidence (probability)
            prediction_proba = model.predict_proba(input_data)[0]
            confidence = round(max(prediction_proba) * 100, 1)
    else:
        # Fallback Rule-Based Prototype (if model isn't trained yet)
        if features["difficult_word_ratio"] > 0.2 or features["avg_sentence_length"] > 20:
            classification = "Difficult"
            confidence = 75.0
        elif features["difficult_word_ratio"] > 0.1:
            classification = "Moderate"
            confidence = 80.0
        else:
            classification = "Easy"
            confidence = 90.0

    # --- B. SIMULATED METRICS (For Thesis Chapter 3) ---
    # We normalize raw math into 0-1 scores for the UI progress bars
    
    # 1. Simulated Fixation (Vocabulary Load)
    # Logic: More difficult words = Eyes stay fixed longer
    fixation_index = min(features["difficult_word_ratio"] * 4, 1.0)
    
    # 2. Simulated Regression (Sentence Complexity)
    # Logic: Longer sentences = Eyes look back (regress) more often
    regression_index = min(features["avg_sentence_length"] / 35, 1.0)

    # 3. Estimated Reading Time (Standard Grade 7 speed: ~150 wpm)
    reading_time_min = round(features["total_words"] / 150, 1)

    # --- C. CONSTRUCT FINAL JSON ---
    result = {
        "classification": classification, 
        "confidence_score": confidence,
        "simulated_metrics": {
            "fixation_index": round(fixation_index, 2),
            "regression_index": round(regression_index, 2),
            "est_reading_time_min": reading_time_min
        },
        "highlights": {
            "difficult_words": list(set(diff_words)) # Unique list for Word Add-in to underline
        },
        "raw_stats": {
            "word_count": features["total_words"],
            "avg_len": round(features["avg_sentence_length"], 1),
            "complexity_ratio": round(features["difficult_word_ratio"], 2)
        }
    }
    
    return result