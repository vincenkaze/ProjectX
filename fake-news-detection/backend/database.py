import os
import logging
from dotenv import load_dotenv
from supabase import create_client, Client
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get Supabase URL and Key from .env file
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validate environment variables
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase URL and Key must be set in the .env file.")

# Create Supabase client
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    raise RuntimeError(f"Failed to create Supabase client: {e}")

class NewsItem(BaseModel):
    title: str
    link: str
    description: str

def create_table():
    """Create the 'news' table in Supabase if it doesn't exist."""
    try:
        table_exists = supabase.table("news").select("*").execute()
        if table_exists.status_code == 404:
            supabase.table("news").create({
                "title": "text",
                "link": "text",
                "description": "text"
            }).execute()
            logger.info("Created 'news' table in Supabase.")
    except Exception as e:
        logger.error(f"Failed to create table: {e}")

def store_news(news: NewsItem):
    """Store a news item in the Supabase database."""
    try:
        data = {
            "title": news.title,
            "link": news.link,
            "description": news.description
        }
        response = supabase.table("news").insert(data).execute()
        if response.status_code == 201:
            logger.info(f"Stored news: {news.title}")
            return {"message": "News stored successfully!"}
        elif response.status_code == 409:  # Conflict (duplicate entry)
            logger.warning(f"Duplicate news: {news.title}")
            return {"message": "News already exists."}
        else:
            logger.error(f"Failed to store news: {response}")
            return {"error": "Failed to store news"}
    except Exception as e:
        logger.error(f"Failed to store news: {e}")
        return {"error": f"Failed to store news: {e}"}

def get_news(limit: int = 10, offset: int = 0):
    """Fetch stored news from Supabase database with pagination."""
    try:
        response = supabase.table("news").select("*").range(offset, offset + limit - 1).execute()
        if response.status_code == 200:
            logger.info(f"Fetched {len(response.data)} news items from Supabase.")
            return response.data
        else:
            logger.error(f"Failed to fetch news: {response}")
            return {"error": "Failed to fetch news"}
    except Exception as e:
        logger.error(f"Failed to fetch news: {e}")
        return {"error": f"Failed to fetch news: {e}"}