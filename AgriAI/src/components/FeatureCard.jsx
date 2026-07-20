import { motion } from "framer-motion";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: "linear-gradient(135deg, #22c55e, #3b82f6)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(111, 24, 199, 0.1)",
        borderRadius: "20px",
        padding: "30px",
        minHeight: "250px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "3rem",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: "1.5rem",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          opacity: 0.8,
          lineHeight: "1.7",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;