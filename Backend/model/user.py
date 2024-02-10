from pydantic import BaseModel

class SalesData(BaseModel):
    time: int
    Section1: int
    Section2: int
    Section3: int
    Section4: int
    Section5: int
    Section6: int
    SectionNames: dict
