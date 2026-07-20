import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        width: "100%",
        padding: "25px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.03)",
        zIndex: 100
      }}
    >

      <Link 
        to="/" 
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h2>🌾 AgriSense Pro</h2>
      </Link>


      <div
        style={{
          display: "flex",
          gap: "40px"
        }}
      >

        <Link 
          to="/" 
          style={{ textDecoration:"none", color:"inherit" }}
        >
          Dashboard
        </Link>


        <Link 
          to="/yield-prediction"
          style={{ textDecoration:"none", color:"inherit" }}
        >
          Yield
        </Link>

        <Link 
          to="/crop-recommendation"
          style={{ textDecoration:"none", color:"inherit" }}
        >
          Crop Recommendation
        </Link>


        <Link 
          to="/analytics"
          style={{ textDecoration:"none", color:"inherit" }}
        >
          Analytics
        </Link>


        <Link 
          to="/contact"
          style={{ textDecoration:"none", color:"inherit" }}
        >
          Contact
        </Link>

      </div>

    </motion.nav>
  );
}

export default Navbar;