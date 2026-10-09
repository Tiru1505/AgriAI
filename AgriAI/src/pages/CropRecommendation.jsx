import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import { API_URL } from "../api";
import { useAuth } from "../auth/AuthContext";
import { savePrediction } from "../history";

import {
  FaCloudRain,
  FaFlask
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";


function CropRecommendation(){


const {user} = useAuth();


const [formData,setFormData] = useState({

nitrogen:90,

phosphorus:42,

potassium:43,

ph:6.5,

temperature:21,

humidity:82,

rainfall:200

});



const [result,setResult] = useState("");

const [cropData,setCropData] = useState([]);

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");



const COLORS=[
"#22c55e",
"#3b82f6",
"#facc15",
"#ef4444",
"#a855f7"
];




const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};






const handleSubmit = async(e)=>{


e.preventDefault();


setLoading(true);

setResult("");

setCropData([]);

setError("");



try{


const response = await axios.post(

`${API_URL}/crop/recommend`,

formData

);



console.log(
"API RESPONSE:",
response.data
);



setResult(

response.data.recommended_crop

);



savePrediction(

user,

"crop",

formData,

response.data

);



setCropData(

response.data.top_predictions

// Crops with 0% confidence only clutter the chart

.filter(

(item)=>item.confidence>0

)

.map(

(item)=>({

name:item.crop,

value:item.confidence

})

)

);



}

catch(error){


console.log(error);


setError(
"Unable to get recommendation"
);


}



setLoading(false);


};







return(

<div className="yield-container">



<motion.h1

initial={{
opacity:0,
y:-30
}}

animate={{
opacity:1,
y:0
}}

>

🌱 AI Crop Recommendation

</motion.h1>





<form onSubmit={handleSubmit}>


<div className="prediction-grid">





{/* SOIL */}


<div className="prediction-card">


<h2>

<FaFlask/>

Soil Parameters

</h2>





<label className="field">
<span>Nitrogen (N)</span>
<input

type="number"

name="nitrogen"

value={formData.nitrogen}

onChange={handleChange}

placeholder="Nitrogen (N)"

required
  step="any"
/>
</label>




<label className="field">
<span>Phosphorus (P)</span>
<input

type="number"

name="phosphorus"

value={formData.phosphorus}

onChange={handleChange}

placeholder="Phosphorus (P)"

required
  step="any"
/>
</label>




<label className="field">
<span>Potassium (K)</span>
<input

type="number"

name="potassium"

value={formData.potassium}

onChange={handleChange}

placeholder="Potassium (K)"

required
  step="any"
/>
</label>




<label className="field">
<span>Soil pH</span>
<input

type="number"

name="ph"

value={formData.ph}

onChange={handleChange}

placeholder="Soil pH"

step="any"

required

/>
</label>



</div>








{/* WEATHER */}



<div className="prediction-card">


<h2>

<FaCloudRain/>

Weather

</h2>





<label className="field">
<span>Temperature (°C)</span>
<input

type="number"

name="temperature"

value={formData.temperature}

onChange={handleChange}

placeholder="Temperature (°C)"

step="any"

required

/>
</label>




<label className="field">
<span>Humidity (%)</span>
<input

type="number"

name="humidity"

value={formData.humidity}

onChange={handleChange}

placeholder="Humidity (%)"

step="any"

required

/>
</label>




<label className="field">
<span>Rainfall (mm)</span>
<input

type="number"

name="rainfall"

value={formData.rainfall}

onChange={handleChange}

placeholder="Rainfall (mm)"

step="any"

required

/>
</label>



</div>




</div>





<button

className="predict-btn"

disabled={loading}

>


{

loading

?

"Analyzing..."

:

"Recommend Crop"

}


</button>



</form>








{

error &&

<motion.div

className="result-card"

>

<h2>

⚠️ {error}

</h2>

</motion.div>

}









{

result &&


<motion.div

className="recommendation-result"

initial={{

opacity:0,

scale:0.8

}}

animate={{

opacity:1,

scale:1

}}

>



<h2>

🌾 AI Recommended Crop

</h2>




<h1 className="crop-name">

{result}

</h1>




<p>

Based on soil nutrients,

pH and weather analysis.

</p>








<div className="chart-container">


<h2>

🌱 Top 5 Suitable Crops

</h2>





<ResponsiveContainer

width="100%"

height={350}

>


<PieChart>


<Pie

data={cropData}

dataKey="value"

nameKey="name"

outerRadius={120}

label

animationDuration={1200}

>


{

cropData.map(

(entry,index)=>(


<Cell

key={index}

fill={COLORS[index]}

/>


)

)

}


</Pie>



<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>



</div>





</motion.div>


}






</div>

);


}



export default CropRecommendation;