import os
import pandas as pd
import joblib

from xgboost import XGBRegressor

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score


# Paths
BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "Data",
    "processed_crop_data.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)


# Load processed data
df = pd.read_csv(DATA_PATH)


print("Dataset shape:", df.shape)


# Target column
# Change this if your dataset has different target name
TARGET = "Yield"


if TARGET not in df.columns:
    print("Available columns:")
    print(df.columns)
    raise Exception(
        f"{TARGET} column not found"
    )


# Split features and target

X = df.drop(
    TARGET,
    axis=1
)
print("Training features:")
print(X.columns.tolist())

y = df[TARGET]


# Train test split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# XGBoost model

model = XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)


print("Training model...")


model.fit(
    X_train,
    y_train
)


# Prediction

predictions = model.predict(
    X_test
)


# Evaluation

mae = mean_absolute_error(
    y_test,
    predictions
)

r2 = r2_score(
    y_test,
    predictions
)


print("\nTraining completed")
print("MAE:", mae)
print("R2 Score:", r2)


# Save model

model_path = os.path.join(
    MODEL_DIR,
    "xgb_model.pkl"
)


joblib.dump(
    model,
    model_path
)


print("\nModel saved:")
print(model_path)