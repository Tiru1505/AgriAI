from fastapi import FastAPI

from routes.crop_routes import router

app = FastAPI(
    title="AgriAI"
)

app.include_router(
    router,
    prefix="/crop",
    tags=["Crop Recommendation"]
)


@app.get("/")
def home():
    return {
        "message": "AgriAI Backend Running"
    }

@app.get("/dashboard")
def dashboard():

    return {
        "predictedYield": 6.8,
        "crop": "Rice",
        "soilHealth": "87%",
        "weatherRisk": "Low"
    }