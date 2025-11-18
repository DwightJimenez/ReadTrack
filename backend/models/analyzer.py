import spacy
import nltk
from nltk.corpus import cmudict

# --- One-time setup: Run these commands in your terminal ---
# python -m spacy download en_core_web_sm
# python -m nltk.downloader cmudict
# --------------------------------------------------------

# Load the spaCy model
# This handles the core NLP pipeline (tokenization, sentence splitting)
try:
    nlp = spacy.load("en_core_web_sm")
except IOError:
    print("spaCy model 'en_core_web_sm' not found.")
    print("Please run: python -m spacy download en_core_web_sm")
    # In a real app, you'd handle this more gracefully

# Load the CMU Pronouncing Dictionary for syllable counting
try:
    d = cmudict.dict()
except LookupError:
    print("NLTK 'cmudict' not found.")
    print("Please run: python -m nltk.downloader cmudict")

def _count_syllables(word):
    """ 
    A simple heuristic to count syllables using NLTK's CMUDict.
    Falls back to a regex-based heuristic if word is not found.
    """
    try:
        # Use the first pronunciation variant
        return [len(list(y for y in x if y[-1].isdigit())) for x in d[word.lower()]][0]
    except (KeyError, TypeError, IndexError):
        # Fallback heuristic for unknown words
        import re
        word = word.lower()
        if len(word) <= 3: return 1
        word = re.sub(r'(es|ed|e)$', '', word)
        vowels = re.findall(r'[aeiouy]+', word)
        return len(vowels) if len(vowels) > 0 else 1

def _extract_features(text: str):
    """
    Extracts the core linguistic features required by the classifier.
    This is the "Simulated Reading Metrics" part of your thesis.
    """
    # Process the text with spaCy
    doc = nlp(text)
    
    total_words = 0
    total_sentences = 0
    total_syllables = 0
    difficult_words = 0
    
    sentences = list(doc.sents)
    total_sentences = len(sentences)
    
    # Iterate through words
    for token in doc:
        if token.is_alpha:  # Is a word (not punctuation)
            total_words += 1
            syllables = _count_syllables(token.text)
            total_syllables += syllables
            
            # "Difficult word" heuristic: 3 or more syllables
            if syllables >= 3:
                difficult_words += 1
                
    # --- Calculate Features ---
    # Handle division by zero if text is empty
    if total_words == 0 or total_sentences == 0:
        return {
            "avg_sentence_length": 0,
            "avg_word_length_syllables": 0,
            "difficult_word_ratio": 0,
            "total_words": 0
        }

    avg_sentence_length = total_words / total_sentences
    avg_word_length_syllables = total_syllables / total_words
    difficult_word_ratio = difficult_words / total_words
    
    return {
        "avg_sentence_length": avg_sentence_length,
        "avg_word_length_syllables": avg_word_length_syllables,
        "difficult_word_ratio": difficult_word_ratio,
        "total_words": total_words
    }

def _prototype_classifier(features: dict) -> str:
    """
    This is the PROTOTYPE model.
    A rule-based (heuristic) classifier that uses the extracted features.
    
    This will be REPLACED by your trained ML model (e.g., model.predict())
    which you will evaluate with the F1-score.
    """
    
    # Heuristic rules based on common readability formulas
    # These are placeholders for your thesis.
    
    if features["avg_sentence_length"] > 20 or features["difficult_word_ratio"] > 0.20:
        classification = "Difficult"
    elif features["avg_sentence_length"] > 15 or features["difficult_word_ratio"] > 0.10:
        classification = "Moderate"
    else:
        classification = "Easy"
        
    return classification

def analyze_text(text: str) -> dict:
    """
    Main analysis function called by the FastAPI endpoint.
    It orchestrates the feature extraction and classification.
    """
    
    # 1. Extract linguistic features
    features = _extract_features(text)
    
    # 2. Classify based on features (using the prototype model)
    classification = _prototype_classifier(features)
    
    # 3. Format the result to send back to the user
    result = {
        "classification": classification,
        "metrics": {
            "total_words": features["total_words"],
            "avg_sentence_length": round(features["avg_sentence_length"], 2),
            "difficult_word_ratio": round(features["difficult_word_ratio"], 2)
        }
    }
    
    return result