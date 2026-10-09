import { Navigate } from "react-router-dom";

import { firebaseReady } from "../firebase";
import { useAuth } from "./AuthContext";


// Sends visitors to the login page until they sign in or continue as
// a guest. If Firebase is not configured there is nothing to sign in
// to, so the app stays open.

function RequireAuth({ children }) {

  const { user, loading, guest } = useAuth();


  if (!firebaseReady || user || guest) {
    return children;
  }

  if (loading) {

    return (
      <p className="page-loading">
        Loading...
      </p>
    );

  }

  return <Navigate to="/login" replace />;

}

export default RequireAuth;
