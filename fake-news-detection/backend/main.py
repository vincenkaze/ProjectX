from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend.models import predict_fake_news
from backend.database import get_news
from backend.rss_scraper import fetch_rss_news
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Fake News Detection API",
    description="An API to detect fake news using machine learning.",
    version="1.0.0",
)

# Define request body model
class NewsText(BaseModel):
    text: str

# Health check endpoint
@app.get("/")
def home():
    """Health check endpoint."""
    return {"message": "Fake News Detection API is Running!"}

# Fetch stored news endpoint
@app.get("/news")
def fetch_news():
    """Fetch stored news from the database."""
    try:
        news = get_news()
        return {"news": news}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Manually trigger RSS fetching endpoint
@app.post("/fetch_rss")
def fetch_rss():
    """Manually trigger RSS fetching."""
    try:
        fetch_rss_news()
        return {"message": "RSS fetching triggered!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Predict Fake vs Real news endpoint
@app.post("/predict")
def predict(data: NewsText):
    """Predict whether a given news article is FAKE or REAL.

    - **text**: The news article text to analyze.
    """
    try:
        logger.info(f"Received prediction request for text: {data.text}")
        result = predict_fake_news(data.text)
        logger.info(f"Prediction result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=400, detail=str(e))