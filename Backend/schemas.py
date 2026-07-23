from pydantic import BaseModel, Field


class YieldPredictionRequest(BaseModel):

    crop: str
    crop_year: int
    season: str
    state: str

    area: float = Field(gt=0)
    rainfall: float = Field(gt=0)

    fertilizer: float
    pesticide: float

    avg_temperature: float
    max_temperature: float
    min_temperature: float

    nitrogen: float
    phosphorus: float
    potassium: float