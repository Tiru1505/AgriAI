import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PageBanner from "../components/PageBanner";

import { useAuth } from "../auth/AuthContext";
import { loadHistory } from "../history";


function formatDate(timestamp) {

  if (!timestamp) {
    return "Just now";
  }

  return timestamp.toDate().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

}


function describe(entry) {

  const { inputs, result } = entry;

  if (entry.type === "yield") {

    return {

      label: "Yield prediction",

      headline: `${Number(result.predicted_yield).toFixed(2)} per hectare`,

      details: [
        inputs.crop,
        inputs.state,
        inputs.season,
        inputs.crop_year,
        `${inputs.area} ha`,
        `${inputs.rainfall} mm rain`
      ]

    };

  }

  return {

    label: "Crop recommendation",

    headline: result.recommended_crop,

    details: [
      `N ${inputs.nitrogen}`,
      `P ${inputs.phosphorus}`,
      `K ${inputs.potassium}`,
      `pH ${inputs.ph}`,
      `${inputs.temperature} °C`,
      `${inputs.humidity}% humidity`,
      `${inputs.rainfall} mm rain`
    ]

  };

}


function History() {

  const { user, loading } = useAuth();

  const [entries, setEntries] = useState(null);
  const [error, setError] = useState("");


  useEffect(() => {

    if (!user) {
      return;
    }

    loadHistory(user)

      .then(setEntries)

      .catch((err) => {

        console.log(err);
        setError("Unable to load your history");

      });

  }, [user]);


  return (

    <div className="yield-container">

      <PageBanner
        title="Prediction History"
        subtitle="Every prediction you make while signed in is saved here."
        variant="windmill"
      />


      {
        !loading && !user &&

        <div className="result-card">

          <p className="history-empty">
            Sign in to see your saved predictions.
          </p>

          <Link to="/login" className="history-link">
            Go to login
          </Link>

        </div>
      }


      {
        error &&

        <p className="error">
          {error}
        </p>
      }


      {
        user && !error && entries === null &&

        <p className="page-note">
          Loading...
        </p>
      }


      {
        user && entries?.length === 0 &&

        <div className="result-card">

          <p className="history-empty">
            Nothing saved yet. Predictions you make while signed in
            appear here.
          </p>

          <Link to="/yield-prediction" className="history-link">
            Predict a yield
          </Link>

        </div>
      }


      {
        user && entries?.length > 0 &&

        <ul className="history-list">

          {
            entries.map((entry) => {

              const item = describe(entry);

              return (

                <li key={entry.id} className="history-item">

                  <div className="history-top">

                    <span className={`history-tag ${entry.type}`}>
                      {item.label}
                    </span>

                    <time>
                      {formatDate(entry.createdAt)}
                    </time>

                  </div>

                  <strong>
                    {item.headline}
                  </strong>

                  <p>
                    {item.details.join(" · ")}
                  </p>

                </li>

              );

            })
          }

        </ul>
      }

    </div>

  );

}

export default History;
