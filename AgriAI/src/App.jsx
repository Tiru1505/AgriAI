import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import YieldPrediction from "./pages/YieldPrediction";
import CropRecommendation from "./pages/CropRecommendation";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import History from "./pages/History";

import AuthProvider from "./auth/AuthProvider";


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>

      <Navbar />

      <Routes>

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
          element={<CropRecommendation/>}
          />

        <Route 
          path="/analytics" 
          element={<Analytics />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route 
          path="/history" 
          element={<History />} 
        />

      </Routes>

    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;