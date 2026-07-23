import os
from pyexpat import features
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


MODEL_DIR=os.path.join(
    BASE_DIR,
    "models"
)



model = joblib.load(
    os.path.join(
        MODEL_DIR,
        "crop_recommendation_model.pkl"
    )
)


scaler = joblib.load(
    os.path.join(
        MODEL_DIR,
        "crop_scaler.pkl"
    )
)


label_encoders = joblib.load(
    os.path.join(
        MODEL_DIR,
        "label_encoders.pkl"
    )
)



crop_encoder = joblib.load(
    os.path.join(
        MODEL_DIR,
        "crop_encoder.pkl"
    )
)



def recommend_crops(data):


    season = label_encoders["Season"].transform(
        [data["season"]]
    )[0]


    state = label_encoders["State"].transform(
        [data["state"]]
    )[0]



    features=pd.DataFrame([{

        "Season":season,

        "State":state,

        "Area":data["area"],

        "Annual_Rainfall":data["rainfall"],

        "Avg_Temperature":data["avg_temperature"],

        "Max_Temperature":data["max_temperature"],

        "Min_Temperature":data["min_temperature"],

        "Nitrogen_N":data["nitrogen"],

        "Phosphorus_P":data["phosphorus"],

        "Potassium_K":data["potassium"]

    }])


    features=scaler.transform(
        features
    )


# Get probability for all crops

    probabilities = model.predict_proba(features)[0]


# Get top 5 indexes

    top5_indexes = probabilities.argsort()[-5:][::-1]


    top_predictions = []


    for index in top5_indexes:

        top_predictions.append({

            "crop":
            crop_encoder.inverse_transform(
                [index]
            )[0],

            "confidence":
            round(
                float(probabilities[index] * 100),
                2
            )

        })



    return {

        "recommended_crop":
        top_predictions[0]["crop"],

        "top_predictions":
        top_predictions

    }