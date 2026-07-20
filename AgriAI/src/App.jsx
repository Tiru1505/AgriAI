import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import YieldPrediction from "./pages/YieldPrediction";
import CropRecommendation from "./pages/CropRecommendation";
import Analytics from "./pages/Analytics";


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

      </Routes>

    </BrowserRouter>
  );
}

export default App;