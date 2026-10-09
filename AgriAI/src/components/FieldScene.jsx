// Animated farm scene used in page banners. All motion is CSS
// (see the GRAPHICS section of App.css). The variant picks the actor
// in the foreground: "tractor", "sprout", "chart" or "windmill".

const WHEAT_POSITIONS = [14, 34, 54, 306, 326, 346];


function Wheat({ x, delay }) {

  return (

    <g
      className="fs-wheat"
      style={{ animationDelay: `${delay}s` }}
    >

      <line
        x1={x} y1="158" x2={x} y2="122"
        stroke="#fde68a" strokeWidth="2" strokeLinecap="round"
      />

      <ellipse cx={x} cy="116" rx="4" ry="9" fill="#fbbf24" />
      <ellipse cx={x - 5} cy="126" rx="3" ry="6" fill="#fbbf24" transform={`rotate(-25 ${x - 5} 126)`} />
      <ellipse cx={x + 5} cy="126" rx="3" ry="6" fill="#fbbf24" transform={`rotate(25 ${x + 5} 126)`} />

    </g>

  );

}


function Tractor() {

  return (

    <g className="fs-tractor">

      <g className="fs-puff">
        <circle cx="50" cy="104" r="4" fill="white" opacity=".7" />
      </g>

      <rect x="48" y="108" width="4" height="14" rx="1" fill="#374151" />

      <rect x="18" y="120" width="42" height="20" rx="4" fill="#ef4444" />

      <rect x="6" y="102" width="26" height="38" rx="4" fill="#dc2626" />

      <rect x="11" y="107" width="16" height="13" rx="2" fill="#bae6fd" />

      <g className="fs-wheel">
        <circle cx="18" cy="144" r="14" fill="#1f2937" />
        <circle cx="18" cy="144" r="6" fill="#9ca3af" />
        <path d="M18 131v26M5 144h26" stroke="#9ca3af" strokeWidth="2" />
      </g>

      <g className="fs-wheel">
        <circle cx="54" cy="149" r="9" fill="#1f2937" />
        <circle cx="54" cy="149" r="4" fill="#9ca3af" />
        <path d="M54 141v16M46 149h16" stroke="#9ca3af" strokeWidth="2" />
      </g>

    </g>

  );

}


function Sprouts() {

  return [120, 180, 240].map((x, index) => (

    <g
      key={x}
      className="fs-sprout"
      style={{ animationDelay: `${index * 0.6}s` }}
    >

      <path
        d={`M${x} 158 V112`}
        stroke="#bbf7d0" strokeWidth="4" strokeLinecap="round"
      />

      <path d={`M${x} 132 q-22 -4 -24 -24 q22 2 24 24z`} fill="#86efac" />
      <path d={`M${x} 120 q22 -4 24 -24 q-22 2 -24 24z`} fill="#4ade80" />

    </g>

  ));

}


function Chart() {

  const bars = [
    { x: 112, height: 34 },
    { x: 144, height: 52 },
    { x: 176, height: 44 },
    { x: 208, height: 70 },
    { x: 240, height: 88 }
  ];

  return (

    <g>

      {
        bars.map((bar, index) => (

          <rect
            key={bar.x}
            className="fs-bar"
            style={{ animationDelay: `${index * 0.25}s` }}
            x={bar.x}
            y={158 - bar.height}
            width="20"
            height={bar.height}
            rx="4"
            fill="white"
            opacity=".85"
          />

        ))
      }

      <polyline
        className="fs-trend"
        points="122,112 154,96 186,102 218,78 250,58"
        fill="none"
        stroke="#fde047"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
      />

    </g>

  );

}


function Windmill() {

  return (

    <g>

      <path d="M168 158 L176 84 H184 L192 158 Z" fill="#f8fafc" />

      <rect x="174" y="132" width="12" height="26" rx="2" fill="#92400e" />

      <g className="fs-blades">

        <path d="M180 84 L172 30 H188 Z" fill="#fde68a" />
        <path d="M180 84 L234 76 V92 Z" fill="#fde68a" />
        <path d="M180 84 L188 138 H172 Z" fill="#fde68a" />
        <path d="M180 84 L126 92 V76 Z" fill="#fde68a" />

      </g>

      <circle cx="180" cy="84" r="5" fill="#92400e" />

    </g>

  );

}


const ACTORS = {
  tractor: Tractor,
  sprout: Sprouts,
  chart: Chart,
  windmill: Windmill
};


function FieldScene({ variant = "tractor" }) {

  const Actor = ACTORS[variant];

  return (

    <svg
      className="field-scene"
      viewBox="0 0 360 180"
      aria-hidden="true"
    >

      {/* Sun */}

      <g className="fs-rays">
        <path
          d="M300 12v10M300 68v10M267 45h10M323 45h10M277 22l7 7M316 61l7 7M323 22l-7 7M284 61l-7 7"
          stroke="#fde047" strokeWidth="3" strokeLinecap="round"
        />
      </g>

      <circle cx="300" cy="45" r="17" fill="#fde047" />


      {/* Clouds */}

      <g className="fs-cloud">
        <ellipse cx="80" cy="38" rx="26" ry="11" fill="white" opacity=".9" />
        <ellipse cx="98" cy="30" rx="16" ry="11" fill="white" opacity=".9" />
      </g>

      <g className="fs-cloud fs-cloud-slow">
        <ellipse cx="200" cy="58" rx="20" ry="8" fill="white" opacity=".7" />
        <ellipse cx="214" cy="52" rx="12" ry="8" fill="white" opacity=".7" />
      </g>


      {/* Hills and ground */}

      <path
        d="M0 150 Q90 96 180 140 T360 124 V180 H0Z"
        fill="#14532d" opacity=".35"
      />

      <rect x="0" y="156" width="360" height="24" fill="#14532d" opacity=".55" />


      {
        WHEAT_POSITIONS.map((x, index) => (

          <Wheat
            key={x}
            x={x}
            delay={index * 0.3}
          />

        ))
      }


      <Actor />

    </svg>

  );

}

export default FieldScene;
