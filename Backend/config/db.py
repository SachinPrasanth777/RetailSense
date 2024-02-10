from dotenv import load_dotenv
import os
from pymongo import MongoClient

try:
    load_dotenv()
    database_url = os.getenv("DATABASE_URL")
    conn = MongoClient(database_url)
    print("Connected to Database")
except Exception as e:
    print(f"Error connecting to the database: {e}")
