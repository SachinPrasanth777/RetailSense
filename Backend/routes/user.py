from typing import Union
from fastapi import APIRouter,HTTPException
from model.user import SalesData
from config.db import conn
from schemas.user import salesData
import json

user = APIRouter()

@user.get('/')
async def get_all_data():
    return salesData(conn.Zircon.items.find())


@user.post('/item')
async def add_data(items: SalesData):
    conn.Zircon.items.insert_one(dict(items))
    return salesData(conn.Zircon.items.find())


@user.get("/dashboard/{url}")
def read_item(url: str):
    full_url = f"https://d2kzg5cjizpi8q.cloudfront.net/processed_vid/{url}"
    document=conn.Zircon.footfall.find({"URL":full_url})
    data = []
    for current in document:
        data.append(current)
    
    return json.loads(json.dumps(data, default=str))
