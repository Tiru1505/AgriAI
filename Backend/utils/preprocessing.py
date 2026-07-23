import os
import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder, StandardScaler


# Paths
BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "Data",
    "crop_data.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)


# Load dataset
df = pd.read_csv(DATA_PATH)

print("Original shape:", df.shape)


# Clean column names
df.columns = df.columns.str.strip()


# Clean string values
df = df.apply(
    lambda x: x.str.strip() if x.dtype == "object" else x
)


print("\nColumns:")
print(df.columns.tolist())


# Remove data leakage column
# Production is directly related to Yield
if "Production" in df.columns:
    df = df.drop(
        "Production",
        axis=1
    )


TARGET = "Yield"


# Separate categorical columns
categorical_cols = df.select_dtypes(
    include=["object"]
).columns


# Encode categorical columns
for col in categorical_cols:

    encoder = LabelEncoder()

    df[col] = encoder.fit_transform(
        df[col]
    )

    joblib.dump(
        encoder,
        os.path.join(
            MODEL_DIR,
            f"{col}_encoder.pkl"
        )
    )


# Separate numerical columns
numerical_cols = df.drop(
    TARGET,
    axis=1
).select_dtypes(
    include=["int64", "float64"]
).columns


print("\nFeatures used for scaling:")
print(numerical_cols.tolist())


# Scale only input features
scaler = StandardScaler()

df[numerical_cols] = scaler.fit_transform(
    df[numerical_cols]
)


joblib.dump(
    scaler,
    os.path.join(
        MODEL_DIR,
        "scaler.pkl"
    )
)


# Save processed dataset
processed_path = os.path.join(
    BASE_DIR,
    "Data",
    "processed_crop_data.csv"
)


df.to_csv(
    processed_path,
    index=False
)


print("\nPreprocessing completed successfully ✅")

print("Processed dataset:")
print(processed_path)

print("\nSaved models:")
print(MODEL_DIR)