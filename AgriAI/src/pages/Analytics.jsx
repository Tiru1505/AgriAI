import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../api";

import {
  FaDatabase,
  FaSeedling,
  FaMapMarkedAlt,
  FaCalendarAlt
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


const GREEN = "#16a34a";
const BLUE = "#2563eb";

const AXIS_TICK = { fill: "#6b7280", fontSize: 12 };

const GRID = { stroke: "#e5e7eb", strokeDasharray: "3 3" };


function percent(value) {
  return `${(value * 100).toFixed(1)}%`;
}


function ScatterTooltip({ active, payload, unit }) {

  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload;

  return (
    <div className="chart-tooltip">
      <strong>{point.state}, {point.year}</strong>
      <span>Rainfall: {point.rainfall} mm</span>
      <span>Yield: {point.yield} {unit}</span>
    </div>
  );
}


function ImportanceChart({ data, color }) {

  return (
    <ResponsiveContainer width="100%" height={data.length * 34 + 30}>

      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 10, right: 30 }}
      >

        <CartesianGrid {...GRID} horizontal={false} />

        <XAxis
          type="number"
          tick={AXIS_TICK}
          unit="%"
        />

        <YAxis
          type="category"
          dataKey="feature"
          width={110}
          tick={AXIS_TICK}
        />

        <Tooltip
          cursor={{ fill: "#f3f4f6" }}
          formatter={(value) => [`${value}%`, "Importance"]}
        />

        <Bar
          dataKey="importance"
          fill={color}
          barSize={14}
          radius={[0, 4, 4, 0]}
        />

      </BarChart>

    </ResponsiveContainer>
  );
}


function Analytics() {

  const [overview, setOverview] = useState(null);
  const [crops, setCrops] = useState([]);
  const [crop, setCrop] = useState("Rice");
  const [cropData, setCropData] = useState(null);
  const [error, setError] = useState("");


  // Dataset summary, model metrics and the crop list

  useEffect(() => {

    Promise.all([
      axios.get(`${API_URL}/analytics/overview`),
      axios.get(`${API_URL}/yield-options`)
    ])

      .then(([overviewResponse, optionsResponse]) => {

        setOverview(overviewResponse.data);
        setCrops(optionsResponse.data.crops);

      })

      .catch((err) => {

        console.log(err);
        setError("Unable to load analytics from server");

      });

  }, []);


  // Charts for the selected crop

  useEffect(() => {

    axios
      .get(`${API_URL}/analytics/crop`, { params: { crop } })

      .then((response) => setCropData(response.data))

      .catch((err) => {

        console.log(err);
        setError("Unable to load analytics from server");

      });

  }, [crop]);


  // Coconut is recorded in nuts, every other crop in tonnes
  const unit = crop === "Coconut" ? "nuts/ha" : "t/ha";

  const yieldMetrics = overview?.yield_model.metrics;
  const cropMetrics = overview?.crop_model.metrics;


  return (

    <div className="dashboard-container">

      <h1 className="page-title">
        📊 Analytics
      </h1>

      <p className="page-subtitle">
        Trends from the crop yield dataset and how the two models perform.
      </p>


      {
        error &&

        <p className="error">
          {error}
        </p>
      }


      {/* Dataset summary */}

      {
        overview &&

        <div className="stats-grid">

          <div className="stat-card green-card">
            <FaDatabase className="stat-icon" />
            <h3>Records</h3>
            <h2>{overview.dataset.records.toLocaleString()}</h2>
          </div>

          <div className="stat-card yellow-card">
            <FaSeedling className="stat-icon" />
            <h3>Crops</h3>
            <h2>{overview.dataset.crops}</h2>
          </div>

          <div className="stat-card blue-card">
            <FaMapMarkedAlt className="stat-icon" />
            <h3>States</h3>
            <h2>{overview.dataset.states}</h2>
          </div>

          <div className="stat-card purple-card">
            <FaCalendarAlt className="stat-icon" />
            <h3>Years</h3>
            <h2>
              {overview.dataset.first_year}–{overview.dataset.last_year}
            </h2>
          </div>

        </div>
      }


      {/* Crop explorer */}

      <div className="section-header">

        <h2 className="section-title">
          Crop Explorer
        </h2>

        <label className="crop-filter">

          <span>Crop</span>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          >

            {
              crops.map((name) => (

                <option key={name} value={name}>
                  {name}
                </option>

              ))
            }

          </select>

        </label>

      </div>


      {
        cropData &&

        <div className="analytics-charts">

          <div className="chart-card wide-card">

            <h2>Average yield by year</h2>

            <p className="chart-note">
              {cropData.crop}, all states combined ({unit})
            </p>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart
                data={cropData.yield_by_year}
                margin={{ right: 20 }}
              >

                <CartesianGrid {...GRID} vertical={false} />

                <XAxis dataKey="year" tick={AXIS_TICK} />

                <YAxis
                  tick={AXIS_TICK}
                  domain={["auto", "auto"]}
                />

                <Tooltip
                  formatter={(value) => [`${value} ${unit}`, "Yield"]}
                />

                <Line
                  type="monotone"
                  dataKey="yield"
                  stroke={GREEN}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>


          <div className="chart-card">

            <h2>Top states by yield</h2>

            <p className="chart-note">
              {cropData.crop}, all years combined ({unit})
            </p>

            <ResponsiveContainer width="100%" height={340}>

              <BarChart
                data={cropData.top_states}
                layout="vertical"
                margin={{ left: 10, right: 30 }}
              >

                <CartesianGrid {...GRID} horizontal={false} />

                <XAxis type="number" tick={AXIS_TICK} />

                <YAxis
                  type="category"
                  dataKey="state"
                  width={120}
                  tick={AXIS_TICK}
                />

                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  formatter={(value) => [`${value} ${unit}`, "Yield"]}
                />

                <Bar
                  dataKey="yield"
                  fill={GREEN}
                  barSize={14}
                  radius={[0, 4, 4, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>


          <div className="chart-card">

            <h2>Rainfall and yield</h2>

            <p className="chart-note">
              {cropData.crop}, one dot per state and year
            </p>

            <ResponsiveContainer width="100%" height={340}>

              <ScatterChart margin={{ right: 20, bottom: 20 }}>

                <CartesianGrid {...GRID} />

                <XAxis
                  type="number"
                  dataKey="rainfall"
                  tick={AXIS_TICK}
                  label={{
                    value: "Annual rainfall (mm)",
                    position: "insideBottom",
                    offset: -12,
                    fill: "#6b7280",
                    fontSize: 12
                  }}
                />

                <YAxis
                  type="number"
                  dataKey="yield"
                  tick={AXIS_TICK}
                />

                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<ScatterTooltip unit={unit} />}
                />

                <Scatter
                  data={cropData.rainfall_vs_yield}
                  fill={GREEN}
                  fillOpacity={0.55}
                />

              </ScatterChart>

            </ResponsiveContainer>

          </div>

        </div>
      }


      {/* Model performance */}

      {
        overview &&

        <>

          <h2 className="section-title model-title">
            Model Performance
          </h2>

          <div className="metric-grid">

            <div className="metric-tile">
              <h3>Yield model R²</h3>
              <strong>{yieldMetrics.random_split.r2_log.toFixed(2)}</strong>
              <p>Log yield, random 20% test split</p>
            </div>

            <div className="metric-tile">
              <h3>Yield model R², unseen years</h3>
              <strong>{yieldMetrics.time_split.r2_log.toFixed(2)}</strong>
              <p>
                Trained before {yieldMetrics.time_split_test_from_year},
                tested from {yieldMetrics.time_split_test_from_year} onwards
              </p>
            </div>

            <div className="metric-tile">
              <h3>Crop model accuracy</h3>
              <strong>{percent(cropMetrics.cv_accuracy)}</strong>
              <p>5-fold cross-validation, {overview.crop_model.crops} crops</p>
            </div>

            <div className="metric-tile">
              <h3>Crop model top-3 accuracy</h3>
              <strong>{percent(cropMetrics.holdout_top3_accuracy)}</strong>
              <p>Hold-out set of {cropMetrics.test_rows} samples</p>
            </div>

          </div>


          <div className="analytics-charts">

            <div className="chart-card">

              <h2>What drives yield predictions</h2>

              <p className="chart-note">
                Feature importance, XGBoost yield model
              </p>

              <ImportanceChart
                data={overview.yield_model.feature_importance}
                color={BLUE}
              />

            </div>


            <div className="chart-card">

              <h2>What drives crop recommendations</h2>

              <p className="chart-note">
                Feature importance, Random Forest crop model
              </p>

              <ImportanceChart
                data={overview.crop_model.feature_importance}
                color={BLUE}
              />

            </div>

          </div>

        </>
      }

    </div>

  );

}

export default Analytics;
