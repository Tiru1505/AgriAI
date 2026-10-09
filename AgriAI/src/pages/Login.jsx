import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { FaChartLine, FaSeedling, FaHistory } from "react-icons/fa";

import FarmerScene from "../components/FarmerScene";

import { auth, googleProvider, firebaseReady } from "../firebase";
import { useAuth } from "../auth/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { user, continueAsGuest } = useAuth();

  const [notice, setNotice] = useState(
    firebaseReady
      ? ""
      : "Google sign-in is not set up yet. Add the Firebase keys to enable it."
  );

  const [loading, setLoading] = useState(false);


  // Already signed in: the dashboard is the home page

  if (user) {
    return <Navigate to="/" replace />;
  }


  const handleGoogleLogin = async () => {

    setLoading(true);
    setNotice("");

    try {

      await signInWithPopup(auth, googleProvider);

      navigate("/", { replace: true });

    }

    catch (err) {

      console.log(err);

      if (err.code === "auth/popup-blocked") {
        setNotice(
          "Your browser blocked the sign-in popup. Allow popups for this site and try again."
        );
      }

      // Closing the popup is not an error worth reporting
      else if (
        err.code !== "auth/popup-closed-by-user" &&
        err.code !== "auth/cancelled-popup-request"
      ) {
        setNotice("Sign-in failed. Please try again.");
      }

    }

    setLoading(false);

  };


  const handleGuest = () => {

    continueAsGuest();

    navigate("/", { replace: true });

  };


  return (

    <div className="login-page">

      {/* Illustration side */}

      <div className="login-scene">

        <motion.h2

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

        >
          🌾 AgriSense Pro
        </motion.h2>

        <p>
          Smarter farming decisions, powered by AI.
        </p>

        <FarmerScene />

      </div>


      {/* Sign-in side */}

      <div className="login-panel">

        <motion.div

          className="login-card"

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

        >

          <h1>
            Welcome, Farmer!
          </h1>

          <p className="login-subtitle">
            Sign in to open your dashboard.
          </p>


          <ul className="login-features">

            <li>
              <FaChartLine /> Predict crop yield
            </li>

            <li>
              <FaSeedling /> Get crop recommendations
            </li>

            <li>
              <FaHistory /> Keep your prediction history
            </li>

          </ul>


          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={!firebaseReady || loading}
          >

            <FcGoogle />

            {loading ? "Signing in..." : "Continue with Google"}

          </button>


          {
            notice &&

            <p className="login-notice" role="status">
              {notice}
            </p>
          }


          <button
            type="button"
            className="login-skip"
            onClick={handleGuest}
          >
            Continue as guest
          </button>

        </motion.div>

      </div>

    </div>

  );

}

export default Login;
