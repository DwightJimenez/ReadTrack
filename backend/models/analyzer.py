import re
import textstat
import spacy

nlp = spacy.load("en_core_web_sm")

def analyze_text(text):
    doc = nlp(text)

    # Word count method A: simple whitespace-based
    ws_tokens = [tok for tok in re.findall(r'\S+', text)]
    word_count_ws = len(ws_tokens)

    # Word count method B: spaCy alphabetic tokens (current behaviour you had)
    spacy_tokens = [token.text for token in doc if token.is_alpha]
    word_count_spacy = len(spacy_tokens)

    # Word count method C: include words with apostrophes and numbers
    # (common regex that counts words like "can't" and "3rd")
    regex_word_tokens = re.findall(r"[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)?", text)
    word_count_regex = len(regex_word_tokens)

    sentences = len(list(doc.sents))
    avg_sentence_length = word_count_ws / sentences if sentences else 0

    readability_scores = {
        "flesch_reading_ease": textstat.flesch_reading_ease(text),
        "flesch_kincaid_grade": textstat.flesch_kincaid_grade(text),
        "smog_index": textstat.smog_index(text),
        "automated_readability_index": textstat.automated_readability_index(text),
    }

    # include token diffs to help debug why counts differ
    set_ws = set(ws_tokens)
    set_spacy = set(spacy_tokens)
    difference_sample = list((set_ws - set_spacy))[:30]  # tokens found by ws but not spaCy

    return {
        "word_count_whitespace": word_count_ws,
        "word_count_spacy_alpha": word_count_spacy,
        "word_count_regex": word_count_regex,
        "sentence_count": sentences,
        "avg_sentence_length": avg_sentence_length,
        "readability": readability_scores,
        "debug_sample_tokens_missing_in_spacy": difference_sample,
    }
