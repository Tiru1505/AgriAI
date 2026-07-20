import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      style={{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        padding:"0 40px",
        background:
          "linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.6)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000') center/cover"
      }}
    >
      <motion.div
        initial={{ opacity:0, y:100 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1 }}
      >
        <h1
          style={{
            fontSize:"3.5rem",
            fontWeight:"700",
            marginBottom:"20px"
          }}
        >
          <br />
          <br />
          Smart Farming
          <br />
          <br />
          Powered by AI
        </h1>

        <p
          style={{
            maxWidth:"700px",
            margin:"auto",
            fontSize:"1.2rem",
            opacity:.8
          }}
        >
        <br />
          Predict crop yield, recommend crops,
          optimize fertilizer usage and improve
          agricultural productivity.
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;