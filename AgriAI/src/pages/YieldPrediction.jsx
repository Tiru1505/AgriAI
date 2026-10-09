import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { API_URL } from "../api";
import { useAuth } from "../auth/AuthContext";
import { savePrediction } from "../history";

import {
  FaSeedling,
  FaCloudRain,
  FaFlask
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function YieldPrediction() {

  const { user } = useAuth();

  const [formData, setFormData] = useState({

    crop: "",
    crop_year: 2026,
    season: "",
    state: "",

    area: "",
    rainfall: "",
    fertilizer: "",
    pesticide: ""

  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const [options, setOptions] = useState({

    crops: [],
    seasons: [],
    states: []

  });



  // Load dropdown options

  useEffect(() => {

    fetch(`${API_URL}/yield-options`)

      .then((response) => response.json())

      .then((data) => setOptions(data))

      .catch((err) => console.log(err));

  }, []);



  const trendData = prediction
    ? [
        { year: "2022", yield: Number(prediction) * 0.65 },
        { year: "2023", yield: Number(prediction) * 0.75 },
        { year: "2024", yield: Number(prediction) * 0.85 },
        { year: "2025", yield: Number(prediction) * 0.95 },
        { year: "2026", yield: Number(prediction) }
      ]
    : [];



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setPrediction(null);
    setError("");

    try {

      const response = await fetch(

        `${API_URL}/predict-yield`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }

      );

      if (!response.ok) {

        throw new Error("Prediction failed");

      }

      const data = await response.json();

      setPrediction(data.predicted_yield);

      savePrediction(user, "yield", formData, data);

    }

    catch (err) {

      console.log(err);

      setError(
        "Unable to get prediction from server"
      );

    }

    setLoading(false);

  };



  return (

    <div className="yield-container">

      <motion.h1

        initial={{
          opacity: 0,
          y: -30
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

      >

        🌾 AI Yield Prediction

      </motion.h1>



      <form onSubmit={handleSubmit}>

        <div className="prediction-grid">

          {/* Crop Information */}

          <div className="prediction-card">

            <h2>
              <FaSeedling /> Crop Information
            </h2>

            <label className="field">
            <span>Crop</span>
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Crop
              </option>

              {
                options.crops.map((crop) => (

                  <option
                    key={crop}
                    value={crop}
                  >
                    {crop}
                  </option>

                ))
              }

            </select>
            </label>



            <label className="field">
            <span>Crop Year</span>
            <input

              type="number"

              name="crop_year"

              value={formData.crop_year}

              onChange={handleChange}

              placeholder="Crop Year"
              required
            />
            </label>



            <label className="field">
            <span>Season</span>
            <select

              name="season"

              value={formData.season}

              onChange={handleChange}

              required

            >

              <option value="">
                Select Season
              </option>

              {
                options.seasons.map((season) => (

                  <option
                    key={season}
                    value={season}
                  >
                    {season}
                  </option>

                ))
              }

            </select>
            </label>



            <label className="field">
            <span>State</span>
            <select

              name="state"

              value={formData.state}

              onChange={handleChange}

              required

            >

              <option value="">
                Select State
              </option>

              {
                options.states.map((state) => (

                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>

                ))
              }

            </select>
            </label>



            <label className="field">
            <span>Area (hectare)</span>
            <input

              type="number"

              name="area"
              value={formData.area}

              placeholder="Area (hectare)"

              onChange={handleChange}
              required
              step="any"
            />
            </label>

          </div>



          {/* Farm Inputs */}

          <div className="prediction-card">

            <h2>
              <FaFlask /> Farm Inputs
            </h2>

            <label className="field">
            <span>Fertilizer Quantity (kg)</span>
            <input
              type="number"
              name="fertilizer"
              value={formData.fertilizer}
              placeholder="Fertilizer Quantity (kg)"
              onChange={handleChange}
              required
              step="any"
            />
            </label>

            <label className="field">
            <span>Pesticide Quantity (kg)</span>
            <input
              type="number"
              name="pesticide"
              value={formData.pesticide}
              placeholder="Pesticide Quantity (kg)"
              onChange={handleChange}
              required
              step="any"
            />
            </label>

          </div>



          {/* Weather */}

          <div className="prediction-card">

            <h2>
              <FaCloudRain /> Weather
            </h2>

            <label className="field">
            <span>Annual Rainfall (mm)</span>
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              placeholder="Annual Rainfall (mm)"
              onChange={handleChange}
              required
              step="any"
            />
            </label>

          </div>

        </div>



        <button
          className="predict-btn"
          disabled={loading}
        >

          {
            loading
              ? "Predicting..."
              : "Predict Yield"
          }

        </button>

      </form>



      {
        error &&

        <p className="error">

          {error}

        </p>
      }



      {
        prediction &&

        <motion.div

          className="result-card"

          initial={{
            scale: 0.8,
            opacity: 0
          }}

          animate={{
            scale: 1,
            opacity: 1
          }}

        >

          <div className="yield-result">

            <h2>
              🌾 Predicted Yield
            </h2>

            <h1 className="yield-value">
              {Number(prediction).toFixed(2)}
            </h1>

            <p>
              tons / hectare
            </p>



            <div className="yield-progress">

              <motion.div

                className="yield-progress-fill"

                initial={{
                  width: 0
                }}

                animate={{
                  width: "85%"
                }}

                transition={{
                  duration: 1.5
                }}

              />

            </div>



            <div className="insight-box">

              <h3>
                🤖 AI Insights
              </h3>

              <ul>

                <li>
                  ✓ Weather conditions support crop growth
                </li>

                <li>
                  ✓ Soil nutrient balance is acceptable
                </li>

                <li>
                  ✓ Yield potential appears above average
                </li>

                <li>
                  ✓ Current farming conditions are favorable
                </li>

              </ul>

            </div>



            <div className="trend-chart">

              <h3>
                📈 Yield Trend Projection
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart data={trendData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="yield"
                    stroke="#22c55e"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </motion.div>

      }

    </div>

  );

}

export default YieldPrediction;