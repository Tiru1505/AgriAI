# 🌾 AgriSense Pro – AI-Powered Smart Agriculture Platform

## Overview

AgriSense Pro is an AI-powered agriculture intelligence platform designed to help farmers make data-driven decisions. The platform leverages Machine Learning models to predict crop yield and recommend the most suitable crops based on environmental, soil, and weather conditions.

The system combines a modern React frontend with a FastAPI backend and trained ML models to provide real-time agricultural insights through an interactive dashboard.

---

## Features

### 🌱 Crop Recommendation System

Recommends the most suitable crops based on:

* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)
* Soil pH
* Temperature
* Humidity
* Rainfall

Features:

* Top 5 Crop Recommendations
* Confidence-Based Pie Chart
* AI Recommendation Dashboard
* Interactive Visualization

---

### 🌾 Yield Prediction System

Predicts expected crop yield using:

* Crop Type
* State
* Season
* Crop Year
* Area
* Annual Rainfall
* Fertilizer Usage
* Pesticide Usage

Features:

* Real-time Yield Prediction
* Trend Visualization
* Interactive Charts
* AI Analytics Dashboard

---

### 📊 Agriculture Dashboard

Provides a centralized dashboard displaying:

* Predicted Yield
* Recommended Crop
* Soil Health Status
* Weather Risk Analysis
* Yield Trend Graphs
* AI Insights

---

## Tech Stack

### Frontend

* React.js
* Vite
* Framer Motion
* Recharts
* Axios
* React Icons

### Backend

* FastAPI
* Uvicorn
* Pydantic

### Machine Learning

* Scikit-Learn
* XGBoost
* Pandas
* NumPy
* Joblib

---

## Project Architecture

```text
Frontend (React + Vite)
        │
        ▼
FastAPI REST API
        │
        ▼
Machine Learning Models
        │
        ├── Yield Prediction Model
        └── Crop Recommendation Model
```

---

## Datasets

### Yield Prediction Dataset

Source: [Crop Yield in Indian States](https://www.kaggle.com/datasets/akshatgupta7/crop-yield-in-indian-states-dataset) (Kaggle)

File: `Backend/Data/crop_yield.csv`

* 19,689 Records
* 55 Crops, 30 States, 1997 to 2020
* Columns: Crop, Crop Year, Season, State, Area, Production, Annual Rainfall, Fertilizer, Pesticide, Yield

`Production` is dropped before training because yield is production divided by area.

### Crop Recommendation Dataset

Source: [Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset) (Kaggle)

File: `Backend/Data/Crop_recommendation.csv`

* 2,200 Records
* 22 Crops, 100 records each
* Columns: N, P, K, temperature, humidity, ph, rainfall, label

---

## Model Performance

### 🌾 Yield Prediction Model

Model: XGBoost Regressor trained on log(1 + yield)

Training script: `Backend/train_xgb.py`

| Test | R² (log yield) | R² (raw yield) | R² (raw, without coconut) | Median absolute error |
| --- | --- | --- | --- | --- |
| Random 80/20 split | 0.952 | 0.915 | 0.878 | 0.18 |
| Train 1997–2016, test 2017–2020 | 0.942 | 0.945 | 0.606 | 0.24 |

Interpretation:

* Yield ranges from 0 to 21,105 because coconut is counted in nuts, so the model learns log-yield. This keeps a few coconut rows from dominating training.
* R² on log-yield is the fairest single number: about **95% of the variance** explained across all crops.
* The time split is the realistic test, since it predicts years the model has never seen.

---

### 🌱 Crop Recommendation Model

Model: Random Forest Classifier (200 trees)

Training script: `Backend/train_model.py`

Performance:

* 5-Fold Cross-Validation Accuracy: 99.59%
* Hold-out Accuracy: 99.55%
* Hold-out Top-3 Accuracy: 100%

Interpretation:

* The 22 crops in this dataset are well separated by soil and weather conditions, so high accuracy is expected.
* The dataset is partly constructed rather than field-measured, so real-world accuracy will be lower.

---

### 🧪 Fertilizer Optimization Model

Model: Random Forest Regressor

* Trained and tested (`Backend/train_fertilizer.py`) but not integrated into the application.

---

## Model Files

```text
yield_model.pkl                 Yield pipeline: encoder + XGBoost + log transform
crop_recommendation_model.pkl   Random Forest crop classifier
```

Both can be regenerated from the `Backend` folder:

```bash
python train_xgb.py
python train_model.py
```

---

## API Endpoints

### Home

```http
GET /
```

Returns backend status.

---

### Yield Prediction

```http
POST /predict-yield
```

Returns predicted crop yield.

---

### Crop Recommendation

```http
POST /crop/recommend
```

Returns:

* Recommended Crop
* Top 5 Crop Predictions
* Confidence Scores

---

### Dropdown Options

```http
GET /yield-options
```

Returns:

* Available Crops
* Seasons
* States

---

### Dashboard

```http
GET /dashboard
```

Returns:

* Predicted Yield
* Recommended Crop
* Soil Health
* Weather Risk

---

## Future Improvements

* Fertilizer Optimization Module Integration
* Live Weather API Integration
* Satellite Data Support
* Soil Image Analysis
* Farmer Chatbot Assistant
* Disease Detection Using Computer Vision
* Multi-language Support
* Cloud Deployment

---

## Author

**Tirupati Agrawal**

B.Tech Computer Science & Engineering (CSE)

VIT-AP University

Aspiring AI Engineer

---

## License

This project is developed for educational, research, and portfolio purposes.
