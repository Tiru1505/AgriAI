import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler



# Load dataset

df = pd.read_csv(
    "Data/crop_data.csv"
)

# Clean column names
df.columns = df.columns.str.strip()


# Remove extra spaces from text columns

df = df.apply(
    lambda x: x.str.strip() if x.dtype == "object" else x
)



# Remove unnecessary columns

df = df.drop(
[
    "Production",
    "Yield",
    "Fertilizer",
    "Pesticide",
    "Crop_Year"
],
axis=1
)



# Separate input and target

X = df.drop(
    "Crop",
    axis=1
)

y = df["Crop"]



# Load encoders

label_encoders = joblib.load(
    "models/label_encoders.pkl"
)


crop_encoder = joblib.load(
    "models/crop_encoder.pkl"
)



# Encode categorical columns

for column in ["Season","State"]:

    X[column] = label_encoders[column].transform(
        X[column]
    )



# Save feature names for checking

print("Crop Features:")
print(X.columns.tolist())



# Create crop scaler

crop_scaler = StandardScaler()


X = crop_scaler.fit_transform(
    X
)



joblib.dump(
    crop_scaler,
    "models/crop_scaler.pkl"
)



# Encode target

y = crop_encoder.transform(
    y
)



# Split dataset

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.2,

    random_state=42,

    stratify=y

)



print(
"Training data:",
X_train.shape
)


print(
"Testing data:",
X_test.shape
)



# Model

# Depth and leaf size are capped so the forest stays small enough to
# load inside a 512MB free-tier dyno. With 55 crop classes an unbounded
# forest stored a 55-float array per leaf and ballooned to 1.2GB, while
# also overfitting -- these limits score better on both top-1 and top-5.

model = RandomForestClassifier(

    n_estimators=120,

    max_depth=16,

    min_samples_leaf=5,

    random_state=42,

    n_jobs=-1

)



print(
"Training started..."
)



model.fit(
    X_train,
    y_train
)



print(
"Training completed!"
)



# Evaluation

predictions = model.predict(
    X_test
)



accuracy = accuracy_score(
    y_test,
    predictions
)


print(
"\nAccuracy:",
accuracy
)



print(
"\nClassification Report:"
)


print(
classification_report(
    y_test,
    predictions
)
)



# Save model

joblib.dump(

    model,

    "models/crop_recommendation_model.pkl",

    compress=3

)



print(
"\nModel saved successfully!"
)