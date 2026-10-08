import os
import json
import pandas as pd
import joblib

from sklearn.model_selection import (
    train_test_split,
    cross_val_score,
    StratifiedKFold
)
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    top_k_accuracy_score,
    classification_report
)


# Paths
BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "Data",
    "Crop_recommendation.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)


FEATURES = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall"
]

TARGET = "label"


# Load dataset

df = pd.read_csv(DATA_PATH)

df.columns = df.columns.str.strip()

print("Dataset shape:", df.shape)
print("Crops:", df[TARGET].nunique())


X = df[FEATURES]

y = df[TARGET]


def build_model():

    # Trees do not need scaled inputs, so there is no scaler to keep in sync
    return RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        n_jobs=-1
    )


# Evaluation 1: 5-fold cross validation

scores = cross_val_score(
    build_model(),
    X,
    y,
    cv=StratifiedKFold(
        n_splits=5,
        shuffle=True,
        random_state=42
    )
)

print("\n5-fold accuracy:", scores.round(4))
print("Mean:", round(scores.mean(), 4))


# Evaluation 2: held-out 20%

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = build_model()

model.fit(
    X_train,
    y_train
)

predictions = model.predict(X_test)

metrics = {

    "cv_accuracy": round(float(scores.mean()), 4),

    "holdout_accuracy": round(
        float(accuracy_score(y_test, predictions)), 4
    ),

    "holdout_top3_accuracy": round(
        float(
            top_k_accuracy_score(
                y_test,
                model.predict_proba(X_test),
                k=3,
                labels=model.classes_
            )
        ),
        4
    ),

    "test_rows": len(y_test)

}

print("\nHold-out accuracy:", metrics["holdout_accuracy"])
print("Hold-out top-3 accuracy:", metrics["holdout_top3_accuracy"])

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        predictions
    )
)


# Final model is trained on every row

model = build_model()

model.fit(X, y)


joblib.dump(
    model,
    os.path.join(
        MODEL_DIR,
        "crop_recommendation_model.pkl"
    ),
    compress=3
)

print("Model saved successfully!")


# Metrics are read by the /analytics/overview endpoint

with open(
    os.path.join(MODEL_DIR, "crop_metrics.json"),
    "w"
) as file:

    json.dump(metrics, file, indent=2)
