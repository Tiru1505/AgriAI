from pydantic import BaseModel, Field


class YieldPredictionRequest(BaseModel):

    crop: str
    crop_year: int
    season: str
    state: str

    area: float = Field(gt=0)
    rainfall: float = Field(gt=0)

    fertilizer: float = Field(ge=0)
    pesticide: float = Field(ge=0)
