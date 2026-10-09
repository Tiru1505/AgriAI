import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";


// Guest mode lasts for the browser tab only
const GUEST_KEY = "agrisense-guest";


function readGuest() {

  try {
    return sessionStorage.getItem(GUEST_KEY) === "1";
  }

  catch {
    return false;
  }

}


function writeGuest(value) {

  try {

    if (value) {
      sessionStorage.setItem(GUEST_KEY, "1");
    }

    else {
      sessionStorage.removeItem(GUEST_KEY);
    }

  }

  catch {
    // Storage can be blocked; guest mode then lasts until reload
  }

}


function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // Without Firebase there is no session to wait for
  const [loading, setLoading] = useState(Boolean(auth));

  const [guest, setGuest] = useState(readGuest);


  useEffect(() => {

    if (!auth) {
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

    });

  }, []);


  const continueAsGuest = () => {

    writeGuest(true);
    setGuest(true);

  };


  const logout = async () => {

    writeGuest(false);
    setGuest(false);

    if (auth) {
      await signOut(auth);
    }

  };


  return (

    <AuthContext.Provider
      value={{ user, loading, guest, continueAsGuest, logout }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export default AuthProvider;
