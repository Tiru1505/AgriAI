import pandas as pd
from fastapi import APIRouter

router = APIRouter()

df = pd.read_csv("Data/crop_data.csv")

@router.get("/yield-options")
def get_yield_options():
    return {
        "crops": sorted(df["Crop"].unique().tolist()),
        "states": sorted(df["State"].unique().tolist()),
        "seasons": sorted(df["Season"].unique().tolist())
    }