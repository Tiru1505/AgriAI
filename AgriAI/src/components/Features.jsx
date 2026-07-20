import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section
      style={{
        padding: "120px 8%",
        background: "#f4f8f5",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "60px",
        }}
      >
        AI Powered Features
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "30px",
        }}
      >
        <FeatureCard
          icon="🌾"
          title="Yield Prediction"
          description="Predict crop production using machine learning models based on weather, soil and fertilizer inputs."
        />

        <FeatureCard
          icon="🧠"
          title="Crop Recommendation"
          description="Get intelligent crop suggestions based on soil nutrients, rainfall and temperature conditions."
        />

        <FeatureCard
          icon="🧪"
          title="Fertilizer Advisor"
          description="Receive optimized fertilizer recommendations to improve productivity and reduce costs."
        />

        <FeatureCard
          icon="📊"
          title="Smart Analytics"
          description="Interactive charts and insights for understanding farm performance and future trends."
        />
      </div>
    </section>
  );
}

export default Features;