import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithPopup, signOut } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

import { auth, googleProvider, firebaseReady } from "../firebase";
import { useAuth } from "../auth/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [notice, setNotice] = useState(
    firebaseReady
      ? ""
      : "Google sign-in is not set up yet. Add the Firebase keys to enable it."
  );

  const [loading, setLoading] = useState(false);


  const handleGoogleLogin = async () => {

    setLoading(true);
    setNotice("");

    try {

      await signInWithPopup(auth, googleProvider);

      navigate("/history");

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


  return (

    <div className="login-container">

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

        <div className="login-logo">
          🌾
        </div>


        {
          user

          ?

          <>

            <h1>
              You're signed in
            </h1>

            <p className="login-subtitle">
              {user.displayName || user.email}
            </p>

            <Link to="/history" className="google-btn">
              View prediction history
            </Link>

            <button
              type="button"
              className="login-skip"
              onClick={() => signOut(auth)}
            >
              Sign out
            </button>

          </>

          :

          <>

            <h1>
              Welcome to AgriSense Pro
            </h1>

            <p className="login-subtitle">
              Sign in to save your predictions and recommendations.
            </p>


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


            <Link to="/" className="login-skip">
              Continue without signing in
            </Link>

          </>
        }

      </motion.div>

    </div>

  );

}

export default Login;
