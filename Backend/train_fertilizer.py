import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score



df = pd.read_csv(
    "Data/crop_data.csv"
)


# Clean

df.columns=df.columns.str.strip()

df=df.apply(
    lambda x:x.str.strip() if x.dtype=="object" else x
)



# Remove unnecessary

df=df.drop(
[
"Production",
"Yield",
"Pesticide",
"Crop_Year"
],
axis=1
)



# Encode categorical values

encoders={}


for col in ["Crop","Season","State"]:

    encoder=LabelEncoder()

    df[col]=encoder.fit_transform(
        df[col]
    )

    encoders[col]=encoder



joblib.dump(
    encoders,
    "models/fertilizer_encoders.pkl"
)



# Features and target

X=df.drop(
"Fertilizer",
axis=1
)


y=df["Fertilizer"]



# Scale

scaler=StandardScaler()

X=scaler.fit_transform(
X
)


joblib.dump(
    scaler,
    "models/fertilizer_scaler.pkl"
)



# Split

X_train,X_test,y_train,y_test=train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)



# Model

model=RandomForestRegressor(
    n_estimators=200,
    random_state=42
)



print("Training...")


model.fit(
    X_train,
    y_train
)



pred=model.predict(
    X_test
)


print(
"MAE:",
mean_absolute_error(y_test,pred)
)


print(
"R2:",
r2_score(y_test,pred)
)



joblib.dump(
    model,
    "models/fertilizer_model.pkl"
)


print("Saved successfully")