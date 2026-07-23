import pandas as pd

df = pd.read_csv("Data/crop_data.csv")

print("Shape:")
print(df.shape)

print("\nColumns:")
print(df.columns)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nCrop Classes:")
print(df["Crop"].nunique())

print(df["Crop"].value_counts())