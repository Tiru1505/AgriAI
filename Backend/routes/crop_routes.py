from fastapi import APIRouter
from pydantic import BaseModel

from utils.crop_predictor import recommend_crops
from dashboard_state import latest_dashboard


router = APIRouter()



class CropRequest(BaseModel):

    state: str
    season: str

    area: float
    rainfall: float

    avg_temperature: float
    max_temperature: float
    min_temperature: float

    nitrogen: float
    phosphorus: float
    potassium: float





@router.post("/recommend")
def crop_recommendation(
    request: CropRequest
):


    result = recommend_crops(
        request.dict()
    )


    # Update dashboard with recommended crop

    latest_dashboard["recommendedCrop"] = (
        result["recommended_crop"]
    )


    # Return complete recommendation response

    return {

        "recommended_crop": result["recommended_crop"],

        "top_predictions": result["top_predictions"]

    }