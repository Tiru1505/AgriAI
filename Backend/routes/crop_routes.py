from fastapi import APIRouter
from pydantic import BaseModel, Field

from utils.crop_predictor import recommend_crops
from dashboard_state import latest_dashboard


router = APIRouter()



class CropRequest(BaseModel):

    nitrogen: float = Field(ge=0)
    phosphorus: float = Field(ge=0)
    potassium: float = Field(ge=0)

    temperature: float
    humidity: float = Field(ge=0, le=100)
    ph: float = Field(ge=0, le=14)

    rainfall: float = Field(ge=0)





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