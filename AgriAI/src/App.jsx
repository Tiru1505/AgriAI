import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import CropBackground from "./components/CropBackground";

import Dashboard from "./pages/Dashboard";
import YieldPrediction from "./pages/YieldPrediction";
import CropRecommendation from "./pages/CropRecommendation";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import History from "./pages/History";

import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";


// Every page except login sits behind the navbar and the login check

function AppLayout() {
  return (
    <RequireAuth>

      <Navbar />

      <Outlet />

    </RequireAuth>
  );
}


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>

      <CropBackground />

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route element={<AppLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/yield-prediction"
            element={<YieldPrediction />}
          />

          <Route
            path="/crop-recommendation"
            element={<CropRecommendation />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/history"
            element={<History />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
