import os

import joblib

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import YieldPredictionRequest
from utils.predictor import predict_yield
from routes import crop_routes
from dashboard_state import latest_dashboard


app = FastAPI(
    title="AgriAI API"
)


# Model files live next to this file, not in the process working
# directory -- resolve them absolutely so the app boots from anywhere.

MODEL_DIR = os.path.join(

    os.path.dirname(os.path.abspath(__file__)),

    "models"

)




# Crop Recommendation Router

app.include_router(

    crop_routes.router,

    prefix="/crop"

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


    prediction = predict_yield(
        request.dict()
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


    crop_encoder = joblib.load(
        os.path.join(MODEL_DIR, "crop_encoder.pkl")
    )


    season_encoder = joblib.load(
        os.path.join(MODEL_DIR, "Season_encoder.pkl")
    )


    state_encoder = joblib.load(
        os.path.join(MODEL_DIR, "State_encoder.pkl")
    )



    return {

        "crops":
            crop_encoder.classes_.tolist(),


        "seasons":
            season_encoder.classes_.tolist(),


        "states":
            state_encoder.classes_.tolist()

    }





# Dashboard API

@app.get("/dashboard")
def dashboard():


    return latest_dashboard