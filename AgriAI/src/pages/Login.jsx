import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FcGoogle } from "react-icons/fc";


function Login() {

  const [notice, setNotice] = useState("");


  // Google authentication is not connected yet. When it is, start the
  // sign-in flow here and redirect to the dashboard on success.

  const handleGoogleLogin = () => {

    setNotice(
      "Google sign-in is not connected yet. It will be available soon."
    );

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
        >

          <FcGoogle />

          Continue with Google

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

      </motion.div>

    </div>

  );

}

export default Login;
