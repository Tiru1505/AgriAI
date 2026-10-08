import os
import json

import pandas as pd

from fastapi import APIRouter, HTTPException

from utils.predictor import model as yield_model, CROPS
from utils.crop_predictor import model as crop_model


router = APIRouter()


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_DIR = os.path.join(BASE_DIR, "models")


df = pd.read_csv(
    os.path.join(BASE_DIR, "Data", "crop_yield.csv")
)

df.columns = df.columns.str.strip()

df = df.apply(
    lambda x: x.str.strip() if x.dtype == "object" else x
)

# The final year has only a handful of rows, so its averages are not
# comparable with the full years before it.
LAST_FULL_YEAR = 2019

# A state needs this many records for a crop before it is ranked
MIN_STATE_RECORDS = 5

MAX_SCATTER_POINTS = 300


def load_metrics(filename):

    with open(os.path.join(MODEL_DIR, filename)) as file:
        return json.load(file)


def importance_list(names, values):

    pairs = sorted(
        zip(names, values),
        key=lambda pair: pair[1],
        reverse=True
    )

    return [
        {
            "feature": name.replace("_", " "),
            "importance": round(float(value) * 100, 1)
        }
        for name, value in pairs
    ]


def area_weighted_yield(group):

    # Total production over total area, so large states are not
    # outweighed by a few tiny plots with extreme yields.
    return group["Production"].sum() / group["Area"].sum()


@router.get("/overview")
def overview():

    yield_pipeline = yield_model.regressor_

    yield_features = [
        name.split("__")[-1]
        for name in yield_pipeline.named_steps["encoder"].get_feature_names_out()
    ]

    return {

        "dataset": {
            "records": int(len(df)),
            "crops": int(df["Crop"].nunique()),
            "states": int(df["State"].nunique()),
            "first_year": int(df["Crop_Year"].min()),
            "last_year": int(df["Crop_Year"].max())
        },

        "yield_model": {
            "metrics": load_metrics("yield_metrics.json"),
            "feature_importance": importance_list(
                yield_features,
                yield_pipeline.named_steps["regressor"].feature_importances_
            )
        },

        "crop_model": {
            "metrics": load_metrics("crop_metrics.json"),
            "crops": int(len(crop_model.classes_)),
            "feature_importance": importance_list(
                crop_model.feature_names_in_,
                crop_model.feature_importances_
            )
        }

    }


@router.get("/crop")
def crop_analytics(crop: str):

    if crop not in CROPS:
        raise HTTPException(
            status_code=404,
            detail=f"Unknown crop: {crop}"
        )

    rows = df[df["Crop"] == crop]


    by_year = (
        rows[rows["Crop_Year"] <= LAST_FULL_YEAR]
        .groupby("Crop_Year")
        .apply(area_weighted_yield, include_groups=False)
    )

    by_state = rows.groupby("State").filter(
        lambda group: len(group) >= MIN_STATE_RECORDS
    )

    top_states = (
        by_state
        .groupby("State")
        .apply(area_weighted_yield, include_groups=False)
        .sort_values(ascending=False)
        .head(10)
    )

    points = rows[["Annual_Rainfall", "Yield", "State", "Crop_Year"]]

    if len(points) > MAX_SCATTER_POINTS:
        points = points.sample(MAX_SCATTER_POINTS, random_state=42)


    return {

        "crop": crop,

        "records": int(len(rows)),

        "yield_by_year": [
            {"year": int(year), "yield": round(float(value), 3)}
            for year, value in by_year.items()
        ],

        "top_states": [
            {"state": state, "yield": round(float(value), 3)}
            for state, value in top_states.items()
        ],

        "rainfall_vs_yield": [
            {
                "rainfall": round(float(row.Annual_Rainfall), 1),
                "yield": round(float(row.Yield), 3),
                "state": row.State,
                "year": int(row.Crop_Year)
            }
            for row in points.itertuples()
        ]

    }
