import io
import pdfplumber
import re

def extract_text(content, filename):
    if filename.lower().endswith(".pdf"):
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            pages = []
            for page in pdf.pages:
                page_text = page.extract_text() or ""
                pages.append(page_text)
            text = "\n".join(pages)
    else:
        text = content.decode("utf-8", errors="ignore")

    # common cleanups:
    # 1) remove hyphenation across line breaks: "exam-\nple" -> "example"
    text = re.sub(r'-\s*\n\s*', '', text)
    # 2) replace non-breaking spaces and other weird whitespace with normal spaces
    text = text.replace('\xa0', ' ').replace('\u200b', '')
    # 3) normalize repeated newlines
    text = re.sub(r'\n{2,}', '\n\n', text)

    return text
