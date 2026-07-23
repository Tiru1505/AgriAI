import pandas as pd
import joblib
import matplotlib.pyplot as plt


df = pd.read_csv("Data/crop_data.csv")


df = df.drop([
    "Production",
    "Yield",
    "Crop_Year"
], axis=1)


X = df.drop("Crop", axis=1)
y = df["Crop"]


encoders = joblib.load(
    "models/label_encoders.pkl"
)


for col in ["Season","State"]:
    X[col] = encoders[col].transform(X[col])


model = joblib.load(
    "models/xgb_crop_model.pkl"
)


importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})


importance = importance.sort_values(
    by="Importance",
    ascending=False
)


print(importance)


plt.figure(figsize=(10,5))
plt.bar(
    importance["Feature"],
    importance["Importance"]
)

plt.xticks(rotation=45)
plt.title("Feature Importance")
plt.show()