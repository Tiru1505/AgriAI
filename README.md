# 🌾 AgriSense Pro – AI-Powered Smart Agriculture Platform

## Overview

AgriSense Pro is an AI-powered agriculture intelligence platform designed to help farmers make data-driven decisions. The platform leverages Machine Learning models to predict crop yield and recommend the most suitable crops based on environmental, soil, and weather conditions.

The system combines a modern React frontend with a FastAPI backend and trained ML models to provide real-time agricultural insights through an interactive dashboard.

---

## Features

### 🌱 Crop Recommendation System

Recommends the most suitable crops based on:

* State
* Season
* Land Area
* Rainfall
* Average Temperature
* Maximum Temperature
* Minimum Temperature
* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)

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
* Area
* Annual Rainfall
* Fertilizer Usage
* Pesticide Usage
* Temperature Data
* NPK Soil Values

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

## Dataset Features

### Yield Prediction Dataset

* Crop
* Crop Year
* Season
* State
* Area
* Annual Rainfall
* Fertilizer
* Pesticide
* Average Temperature
* Maximum Temperature
* Minimum Temperature
* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)

Dataset Size:

* 19,689 Records
* 15 Features

---

## Model Performance

### 🌾 Yield Prediction Model

Model: XGBoost Regressor

Performance:

* MAE: 0.0166
* R² Score: 0.9213

Interpretation:

* The model explains approximately **92.13% of the variance** in crop yield.
* Strong predictive performance for agricultural yield forecasting.

---

### 🌱 Crop Recommendation Model

Model: XGBoost Classifier

Performance:

* Top-1 Accuracy: 39.76%
* Top-5 Accuracy: 79.56%

Interpretation:

* Exact crop prediction is challenging because of 55 crop classes.
* The correct crop appears within the top 5 recommendations nearly **80% of the time**, making it practical for decision support.

---

### 🧪 Fertilizer Optimization Model

Model: Random Forest Regressor

Performance:

* MAE: 3,324,874
* R² Score: 0.9737

Interpretation:

* The model captures approximately **97.37% of fertilizer variance**.
* Currently trained and tested but not integrated into the frontend.

---

## Model Files

### Included in Repository

```text
crop_encoder.pkl
crop_scaler.pkl
fertilizer_encoders.pkl
fertilizer_scaler.pkl
label_encoders.pkl
scaler.pkl
Season_encoder.pkl
State_encoder.pkl
xgb_model.pkl
```

### Excluded from Repository

Due to GitHub file-size limitations, the following trained models are excluded:

```text
crop_recommendation_model.pkl
fertilizer_model.pkl
xgb_crop_model.pkl
```

These models can be regenerated using the training scripts or stored externally.

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
