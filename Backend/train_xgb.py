import os
import json
import numpy as np
import pandas as pd
import joblib

from xgboost import XGBRegressor

from sklearn.compose import ColumnTransformer, TransformedTargetRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score


# Paths
BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "Data",
    "crop_yield.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)


TARGET = "Yield"

CATEGORICAL = ["Crop", "Season", "State"]

NUMERICAL = [
    "Crop_Year",
    "Area",
    "Annual_Rainfall",
    "Fertilizer",
    "Pesticide"
]

FEATURES = CATEGORICAL + NUMERICAL

# Last years of the dataset are held out to test on unseen seasons
TEST_FROM_YEAR = 2017


# Load dataset
df = pd.read_csv(DATA_PATH)

df.columns = df.columns.str.strip()

df = df.apply(
    lambda x: x.str.strip() if x.dtype == "object" else x
)

print("Dataset shape:", df.shape)


X = df[FEATURES]
y = df[TARGET]


def build_model():

    encoder = ColumnTransformer(
        [(
            "categorical",
            OrdinalEncoder(
                handle_unknown="use_encoded_value",
                unknown_value=-1
            ),
            CATEGORICAL
        )],
        remainder="passthrough"
    )

    regressor = XGBRegressor(
        n_estimators=800,
        learning_rate=0.06,
        max_depth=7,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42
    )

    pipeline = Pipeline([
        ("encoder", encoder),
        ("regressor", regressor)
    ])

    # Yield spans 0 to 21,000 (coconut is counted in nuts), so the model
    # learns log(1 + yield). On the raw scale a handful of coconut rows
    # dominate the loss and every other crop is predicted badly.
    return TransformedTargetRegressor(
        regressor=pipeline,
        func=np.log1p,
        inverse_func=np.expm1
    )


def evaluate(name, train_index, test_index):

    model = build_model()

    model.fit(
        X.loc[train_index],
        y.loc[train_index]
    )

    actual = y.loc[test_index]

    predictions = model.predict(
        X.loc[test_index]
    )

    not_coconut = (df.loc[test_index, "Crop"] != "Coconut").values

    metrics = {

        "test_rows": len(test_index),

        "r2_log": round(
            r2_score(np.log1p(actual), np.log1p(predictions)), 4
        ),

        "r2_raw": round(
            r2_score(actual, predictions), 4
        ),

        "r2_raw_without_coconut": round(
            r2_score(actual[not_coconut], predictions[not_coconut]), 4
        ),

        "mae": round(
            mean_absolute_error(actual, predictions), 3
        ),

        "median_absolute_error": round(
            float(np.median(np.abs(actual - predictions))), 3
        )

    }

    print(f"\n{name}")

    for key, value in metrics.items():
        print(f"{key}: {value}")

    return metrics


# Evaluation 1: random 80/20 split

train_index, test_index = train_test_split(
    df.index,
    test_size=0.2,
    random_state=42
)

random_metrics = evaluate("Random split", train_index, test_index)


# Evaluation 2: train on the past, test on the most recent years

time_metrics = evaluate(
    f"Time split (test = {TEST_FROM_YEAR} onwards)",
    df.index[df["Crop_Year"] < TEST_FROM_YEAR],
    df.index[df["Crop_Year"] >= TEST_FROM_YEAR]
)


# Final model is trained on every row

print("\nTraining final model on all data...")

model = build_model()

model.fit(X, y)


model_path = os.path.join(
    MODEL_DIR,
    "yield_model.pkl"
)

joblib.dump(
    model,
    model_path
)

print("Model saved:")
print(model_path)


# Metrics are read by the /analytics/overview endpoint

with open(
    os.path.join(MODEL_DIR, "yield_metrics.json"),
    "w"
) as file:

    json.dump(
        {
            "random_split": random_metrics,
            "time_split": time_metrics,
            "time_split_test_from_year": TEST_FROM_YEAR
        },
        file,
        indent=2
    )
