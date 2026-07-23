from utils.predictor import predict_yield


sample_data = {

    "crop": "Rice",
    "crop_year": 2024,

    "season": "Kharif",

    "state": "Andhra Pradesh",

    "area": 1000,

    "rainfall": 1200,

    "fertilizer": 500,

    "pesticide": 50,

    "avg_temperature": 28,

    "max_temperature": 34,

    "min_temperature": 22,

    "nitrogen": 90,

    "phosphorus": 40,

    "potassium": 40
}


result = predict_yield(sample_data)

print("Predicted Yield:")
print(result)