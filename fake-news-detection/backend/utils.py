import re
import bcrypt  

def clean_text(text: str) -> str:
    """Clean text by removing URLs, special characters, and excessive spaces."""
    text = text.lower()
    text = re.sub(r"http\S+|www.\S+", "", text)
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"[^a-z0-9\s]", "", text)

    bias_words = ["reuters", "bbc", "cnn", "said", "report", "breaking", "government", "official", "nasa", "confirmed", "mars", "police", "arrest", "shoot"]
    for word in bias_words:
        text = re.sub(rf"\b{word}\b", "", text)

    return re.sub(r"\s+", " ", text).strip()

def hash_password(password: str) -> str:
    """Hash a plain password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")