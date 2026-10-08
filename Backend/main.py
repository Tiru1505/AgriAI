import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import YieldPredictionRequest
from utils.predictor import predict_yield, CROPS, SEASONS, STATES
from routes import crop_routes, analytics
from dashboard_state import latest_dashboard


app = FastAPI(
    title="AgriAI API"
)


# Crop Recommendation Router

app.include_router(

    crop_routes.router,

    prefix="/crop"

)


# Analytics Router

app.include_router(

    analytics.router,

    prefix="/analytics"

)



# CORS
#
# Set ALLOWED_ORIGINS in the hosting environment to a comma-separated
# list of frontend URLs. Defaults to the local Vite dev server.

ALLOWED_ORIGINS = [

    origin.strip()

    for origin in os.environ.get(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")

    if origin.strip()

]


app.add_middleware(

    CORSMiddleware,

    allow_origins=ALLOWED_ORIGINS,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)



@app.get("/")
def home():

    return {

        "message": "AgriAI API Running"

    }





# Yield Prediction API

@app.post("/predict-yield")
def predict(request: YieldPredictionRequest):


    try:

        prediction = predict_yield(
            request.dict()
        )

    except ValueError as error:

        raise HTTPException(
            status_code=422,
            detail=str(error)
        )


    # Update dashboard data

    latest_dashboard["predictedYield"] = round(
        float(prediction),
        2
    )


    latest_dashboard["crop"] = request.crop


    latest_dashboard["recommendedCrop"] = "Not recommended"


    latest_dashboard["soilHealth"] = "Healthy"


    latest_dashboard["weatherRisk"] = "Low"



    return {

        "predicted_yield": float(prediction)

    }





# Dropdown options

@app.get("/yield-options")
def get_yield_options():


    return {

        "crops": CROPS,

        "seasons": SEASONS,

        "states": STATES

    }





# Dashboard API

@app.get("/dashboard")
def dashboard():


    return latest_dashboard