import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import YieldPrediction from "./pages/YieldPrediction";
import CropRecommendation from "./pages/CropRecommendation";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";


function App() {
  return (
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

      </Routes>

    </BrowserRouter>
  );
}

export default App;