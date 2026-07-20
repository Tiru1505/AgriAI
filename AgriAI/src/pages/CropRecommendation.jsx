import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FaSeedling,
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


const [formData,setFormData] = useState({

state:"",
season:"",

area:100,

rainfall:1000,

avg_temperature:25,

max_temperature:35,

min_temperature:20,

nitrogen:50,

phosphorus:30,

potassium:40

});



const [options,setOptions] = useState({

states:[],
seasons:[]

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




// Load dropdown options

useEffect(()=>{


axios
.get(
"http://127.0.0.1:8000/yield-options"
)

.then((response)=>{


setOptions({

states:response.data.states,

seasons:response.data.seasons

});


})

.catch((error)=>{

console.log(error);

});


},[]);





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

"http://127.0.0.1:8000/crop/recommend",

formData

);



console.log(
"API RESPONSE:",
response.data
);



setResult(

response.data.recommended_crop

);



setCropData(

response.data.top_predictions.map(

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





{/* LOCATION */}


<div className="prediction-card">


<h2>

<FaSeedling/>

Location

</h2>



<select

name="state"

value={formData.state}

onChange={handleChange}

required

>


<option value="">

Select State

</option>


{

options.states.map(

(state,index)=>(

<option

key={index}

value={state}

>

{state}

</option>

)

)

}


</select>





<select

name="season"

value={formData.season}

onChange={handleChange}

required

>


<option value="">

Select Season

</option>



{

options.seasons.map(

(season,index)=>(

<option

key={index}

value={season}

>

{season}

</option>

)

)

}


</select>





<input

type="number"

name="area"

value={formData.area}

onChange={handleChange}

placeholder="Area"

/>



</div>







{/* SOIL */}


<div className="prediction-card">


<h2>

<FaFlask/>

Soil Parameters

</h2>





<input

type="number"

name="nitrogen"

value={formData.nitrogen}

onChange={handleChange}

placeholder="Nitrogen"

/>





<input

type="number"

name="phosphorus"

value={formData.phosphorus}

onChange={handleChange}

placeholder="Phosphorus"

/>





<input

type="number"

name="potassium"

value={formData.potassium}

onChange={handleChange}

placeholder="Potassium"

/>



</div>








{/* WEATHER */}



<div className="prediction-card">


<h2>

<FaCloudRain/>

Weather

</h2>





<input

type="number"

name="rainfall"

value={formData.rainfall}

onChange={handleChange}

placeholder="Rainfall"

/>





<input

type="number"

name="avg_temperature"

value={formData.avg_temperature}

onChange={handleChange}

placeholder="Average Temperature"

/>





<input

type="number"

name="max_temperature"

value={formData.max_temperature}

onChange={handleChange}

placeholder="Maximum Temperature"

/>





<input

type="number"

name="min_temperature"

value={formData.min_temperature}

onChange={handleChange}

placeholder="Minimum Temperature"

/>



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

weather and location analysis.

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