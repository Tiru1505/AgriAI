import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";


function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // Without Firebase there is no session to wait for
  const [loading, setLoading] = useState(Boolean(auth));


  useEffect(() => {

    if (!auth) {
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

    });

  }, []);


  return (

    <AuthContext.Provider value={{ user, loading }}>

      {children}

    </AuthContext.Provider>

  );

}

export default AuthProvider;
