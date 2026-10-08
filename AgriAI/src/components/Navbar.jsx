import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >

      <Link to="/" className="nav-brand">
        🌾 AgriSense Pro
      </Link>


      <div className="nav-links">

        <NavLink to="/" end>
          Dashboard
        </NavLink>


        <NavLink to="/yield-prediction">
          Yield
        </NavLink>

        <NavLink to="/crop-recommendation">
          Crop Recommendation
        </NavLink>


        <NavLink to="/analytics">
          Analytics
        </NavLink>

      </div>


      <NavLink to="/login" className="nav-login">
        Login
      </NavLink>

    </motion.nav>
  );
}

export default Navbar;
