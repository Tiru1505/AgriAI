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


# Full pipeline from train_xgb.py: encoding, XGBoost and the
# log-yield transform are all inside this one object.

model = joblib.load(
    os.path.join(MODEL_DIR, "yield_model.pkl")
)


_encoder = (
    model.regressor_
    .named_steps["encoder"]
    .named_transformers_["categorical"]
)

CROPS, SEASONS, STATES = [
    categories.tolist()
    for categories in _encoder.categories_
]


def predict_yield(data):

    for field, known in [
        ("crop", CROPS),
        ("season", SEASONS),
        ("state", STATES)
    ]:

        if data[field] not in known:
            raise ValueError(
                f"Unknown {field}: {data[field]}"
            )


    features = pd.DataFrame([{

        "Crop": data["crop"],

        "Season": data["season"],

        "State": data["state"],

        "Crop_Year": data["crop_year"],

        "Area": data["area"],

        "Annual_Rainfall": data["rainfall"],

        "Fertilizer": data["fertilizer"],

        "Pesticide": data["pesticide"]

    }])


    prediction = model.predict(
        features
    )


    return max(float(prediction[0]), 0.0)
