import os
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



def recommend_crops(data):


    features=pd.DataFrame([{

        "N":data["nitrogen"],

        "P":data["phosphorus"],

        "K":data["potassium"],

        "temperature":data["temperature"],

        "humidity":data["humidity"],

        "ph":data["ph"],

        "rainfall":data["rainfall"]

    }])


# Get probability for all crops

    probabilities = model.predict_proba(features)[0]


# Get top 5 indexes

    top5_indexes = probabilities.argsort()[-5:][::-1]


    top_predictions = []


    for index in top5_indexes:

        top_predictions.append({

            "crop":
            model.classes_[index].title(),

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
