import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FieldScene from "../components/FieldScene";

import { API_URL } from "../api";

import { motion } from "framer-motion";

import {
  FaSeedling,
  FaChartLine,
  FaCloudSun,
  FaFlask,
  FaLeaf,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


const data = [
  { month: "Jan", yield: 4.2 },
  { month: "Feb", yield: 5.1 },
  { month: "Mar", yield: 5.8 },
  { month: "Apr", yield: 6.4 },
  { month: "May", yield: 7.0 },
  { month: "Jun", yield: 8.2 },
];


function Dashboard() {

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);


  useEffect(() => {

    axios
      .get(`${API_URL}/dashboard`)
      .then((response) => {

        setDashboardData(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);



  return (

    <div className="dashboard-container">


      {/* Hero Banner */}

      <motion.div
        className="hero-banner"

        initial={{
          opacity:0,
          y:-40
        }}

        animate={{
          opacity:1,
          y:0
        }}

        transition={{
          duration:0.8
        }}

      >


        <div>

          <h1>
            🌾 Welcome Back, Farmer!
          </h1>


          <p>
            Here's what's happening in your farm today.
          </p>



          <div className="hero-buttons">


            <button
              onClick={() =>
                navigate("/yield-prediction")
              }
            >
              Predict Yield
            </button>



            <button
              onClick={() =>
                navigate("/crop-recommendation")
              }
            >
              Recommend Crop
            </button>


          </div>


        </div>



        <FieldScene variant="tractor" />


      </motion.div>





      <h2 className="section-title">

        Agriculture Intelligence Dashboard

      </h2>





      {/* Stats */}


      <div className="stats-grid">



        <motion.div
          className="stat-card green-card"

          whileHover={{
            scale:1.05
          }}

        >

          <FaChartLine className="stat-icon"/>


          <h3>
            Predicted Yield
          </h3>


          <h2>

            {
              dashboardData
              ?
              `${dashboardData.predictedYield} tons`
              :
              "Loading..."
            }

          </h2>


          <p>
            ↑ 12% vs last season
          </p>


        </motion.div>






        <motion.div
          className="stat-card yellow-card"

          whileHover={{
            scale:1.05
          }}

        >


          <FaSeedling className="stat-icon"/>


          <h3>
            Recommended Crop
          </h3>



          <h2>

          {
            dashboardData
            ?
            dashboardData.recommendedCrop
            :
            "Loading..."
          }

          </h2>



          <p>
            Best Match
          </p>


        </motion.div>







        <motion.div
          className="stat-card blue-card"

          whileHover={{
            scale:1.05
          }}

        >


          <FaFlask className="stat-icon"/>


          <h3>
            Soil Health
          </h3>


          <h2>

          {
            dashboardData
            ?
            dashboardData.soilHealth
            :
            "Loading..."
          }

          </h2>


          <p>
            Healthy
          </p>


        </motion.div>








        <motion.div
          className="stat-card purple-card"

          whileHover={{
            scale:1.05
          }}

        >


          <FaCloudSun className="stat-icon"/>


          <h3>
            Weather Risk
          </h3>


          <h2>

          {
            dashboardData
            ?
            dashboardData.weatherRisk
            :
            "Loading..."
          }

          </h2>


          <p>
            Conditions Stable
          </p>


        </motion.div>



      </div>







      {/* Analytics */}



      <div className="analytics-grid">



        <motion.div

          className="chart-card"

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

        >


          <h2>
            📈 Yield Trend Analysis
          </h2>



          <ResponsiveContainer
            width="100%"
            height={350}
          >


            <LineChart data={data}>


              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                dataKey="month"
              />


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



        </motion.div>







        <motion.div

          className="insight-card"

          whileHover={{
            scale:1.02
          }}

        >


          <FaLeaf className="big-icon"/>


          <h2>
            AI Insights
          </h2>



          <ul>

            <li>
              ✓ Soil nutrients are balanced
            </li>


            <li>
              ✓ Yield expected to increase by 12%
            </li>


            <li>
              ✓ Weather conditions favorable
            </li>


            <li>
              ✓ Rice is optimal crop
            </li>


            <li>
              ✓ Reduce fertilizer usage by 8%
            </li>


          </ul>


        </motion.div>



      </div>



    </div>

  );

}


export default Dashboard;