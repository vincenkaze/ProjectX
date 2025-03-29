import re

def clean_text(text: str) -> str:
    """Clean text by removing URLs, special characters, and excessive spaces."""
    # Normalize case
    text = text.lower()

    # Remove URLs
    text = re.sub(r"http\S+|www.\S+", "", text)

    # Remove HTML tags (if any)
    text = re.sub(r"<.*?>", "", text)

    # Remove special characters (keep only letters and numbers)
    text = re.sub(r"[^a-z0-9\s]", "", text)

    # Remove bias words
    bias_words = ["reuters", "bbc", "cnn", "said", "report", "breaking", "government", "official", "nasa", "confirmed", "mars", "police", "arrest", "shoot"]
    for word in bias_words:
        text = re.sub(rf"\b{word}\b", "", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    return text