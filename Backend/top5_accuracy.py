
import pandas as pd
import joblib
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.metrics import top_k_accuracy_score

df = pd.read_csv("Data/crop_data.csv")

df = df.drop([
    "Production",
    "Yield",
    "Crop_Year"
], axis=1)

X = df.drop("Crop", axis=1)
y = df["Crop"]

encoders = joblib.load("models/label_encoders.pkl")
crop_encoder = joblib.load("models/crop_encoder.pkl")

for col in ["Season", "State"]:
    X[col] = encoders[col].transform(X[col])

y = crop_encoder.transform(y)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = joblib.load("models/xgb_crop_model.pkl")

probs = model.predict_proba(X_test)

top5 = top_k_accuracy_score(
    y_test,
    probs,
    k=5
)

print("Top-5 Accuracy:", top5)