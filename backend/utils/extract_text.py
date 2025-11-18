import io
import docx
import pdfplumber
import chardet

def extract_text(content: bytes, filename: str) -> str:
    """
    Extracts raw text from file content (bytes) based on its extension.
    """
    if filename.endswith(".docx"):
        try:
            document = docx.Document(io.BytesIO(content))
            return "\n".join([para.text for para in document.paragraphs])
        except Exception as e:
            raise ValueError(f"Error processing .docx file: {e}")

    elif filename.endswith(".pdf"):
        try:
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                all_text = ""
                for page in pdf.pages:
                    all_text += page.extract_text() + "\n"
                return all_text
        except Exception as e:
            raise ValueError(f"Error processing .pdf file: {e}")

    elif filename.endswith(".txt"):
        try:
            # Detect encoding
            result = chardet.detect(content)
            encoding = result['encoding'] if result['encoding'] else 'utf-8'
            return content.decode(encoding)
        except Exception as e:
            raise ValueError(f"Error processing .txt file: {e}")
    
    else:
        raise ValueError("Unsupported file type. Please use .txt, .docx, or .pdf")