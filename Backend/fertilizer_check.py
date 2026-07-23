import pandas as pd


df = pd.read_csv(
    "Data/crop_data.csv"
)


# Clean columns
df.columns = df.columns.str.strip()


# Remove spaces from text values
df = df.apply(
    lambda x: x.str.strip() if x.dtype == "object" else x
)


print("Fertilizer Classes:")

print(
    df["Fertilizer"].unique()
)


print("\nFrequency:")

print(
    df["Fertilizer"].value_counts()
)