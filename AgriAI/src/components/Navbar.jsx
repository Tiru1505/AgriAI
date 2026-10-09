import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import { useAuth } from "../auth/AuthContext";

function Navbar() {

  const { user } = useAuth();

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


        {
          user &&

          <NavLink to="/history">
            History
          </NavLink>
        }

      </div>


      {
        user

        ?

        <button
          type="button"
          className="nav-login"
          onClick={() => signOut(auth)}
          title={user.displayName || user.email}
        >
          Logout
        </button>

        :

        <NavLink to="/login" className="nav-login">
          Login
        </NavLink>
      }

    </motion.nav>
  );
}

export default Navbar;
