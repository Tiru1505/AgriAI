import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)


model = joblib.load(
    os.path.join(MODEL_DIR, "xgb_model.pkl")
)

scaler = joblib.load(
    os.path.join(MODEL_DIR, "scaler.pkl")
)


crop_encoder = joblib.load(
    os.path.join(MODEL_DIR, "crop_encoder.pkl")
)

season_encoder = joblib.load(
    os.path.join(MODEL_DIR, "Season_encoder.pkl")
)

state_encoder = joblib.load(
    os.path.join(MODEL_DIR, "State_encoder.pkl")
)


def predict_yield(data):

    crop = crop_encoder.transform(
        [data["crop"]]
    )[0]

    season = season_encoder.transform(
        [data["season"]]
    )[0]

    state = state_encoder.transform(
        [data["state"]]
    )[0]


    features = pd.DataFrame([{

        "Crop": crop,

        "Crop_Year": data["crop_year"],

        "Season": season,

        "State": state,

        "Area": data["area"],

        "Annual_Rainfall": data["rainfall"],

        "Fertilizer": data["fertilizer"],

        "Pesticide": data["pesticide"],

        "Avg_Temperature": data["avg_temperature"],

        "Max_Temperature": data["max_temperature"],

        "Min_Temperature": data["min_temperature"],

        "Nitrogen_N": data["nitrogen"],

        "Phosphorus_P": data["phosphorus"],

        "Potassium_K": data["potassium"]

    }])


    features = scaler.transform(
        features
    )


    prediction = model.predict(
        features
    )


    return prediction[0]