// Animated farmer with his tools, shown on the login page.
// All motion is CSS (see the GRAPHICS section of App.css).

function FarmerScene() {

  return (

    <svg
      className="farmer-scene"
      viewBox="0 0 420 420"
      role="img"
      aria-label="A farmer waving, with a pitchfork, a shovel and a watering can"
    >

      {/* Sun */}

      <g className="fs-rays">
        <path
          d="M340 20v16M340 124v16M280 80h16M384 80h16M298 38l11 11M371 111l11 11M382 38l-11 11M309 111l-11 11"
          stroke="#fde047" strokeWidth="5" strokeLinecap="round"
        />
      </g>

      <circle cx="340" cy="80" r="32" fill="#fde047" />


      {/* Clouds */}

      <g className="fs-cloud">
        <ellipse cx="80" cy="70" rx="40" ry="16" fill="white" opacity=".9" />
        <ellipse cx="108" cy="58" rx="24" ry="16" fill="white" opacity=".9" />
      </g>

      <g className="fs-cloud fs-cloud-slow">
        <ellipse cx="210" cy="36" rx="28" ry="11" fill="white" opacity=".7" />
        <ellipse cx="230" cy="28" rx="17" ry="11" fill="white" opacity=".7" />
      </g>


      {/* Hills and field */}

      <ellipse cx="210" cy="396" rx="204" ry="96" fill="#15803d" opacity=".55" />

      <ellipse cx="210" cy="392" rx="206" ry="28" fill="#166534" />

      <path
        d="M40 392 q60 -16 120 0 M250 396 q60 -16 130 0"
        stroke="#14532d" strokeWidth="5" strokeLinecap="round" fill="none"
        opacity=".6"
      />


      {/* Shovel stuck in the ground */}

      <g>
        <rect x="64" y="268" width="7" height="92" rx="3" fill="#b45309" />
        <rect x="56" y="258" width="23" height="12" rx="6" fill="none" stroke="#b45309" strokeWidth="6" />
        <path d="M52 352 h31 v20 q-15.5 20 -31 0z" fill="#9ca3af" />
      </g>


      {/* Sprouts being watered */}

      {
        [322, 346, 370].map((x, index) => (

          <g
            key={x}
            className="fs-wheat"
            style={{ animationDelay: `${index * 0.4}s` }}
          >

            <path d={`M${x} 378 V352`} stroke="#bbf7d0" strokeWidth="4" strokeLinecap="round" />
            <path d={`M${x} 362 q-14 -3 -15 -15 q14 1 15 15z`} fill="#86efac" />
            <path d={`M${x} 356 q14 -3 15 -15 q-14 1 -15 15z`} fill="#4ade80" />

          </g>

        ))
      }


      {/* Watering can */}

      <g className="farmer-can">

        <rect x="276" y="286" width="44" height="34" rx="6" fill="#38bdf8" />

        <path d="M276 300 q-22 -4 -18 16" fill="none" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />

        <path d="M320 304 l26 -16" stroke="#0ea5e9" strokeWidth="7" strokeLinecap="round" />

        <ellipse cx="349" cy="286" rx="5" ry="8" fill="#0ea5e9" transform="rotate(32 349 286)" />

      </g>

      {
        [0, 1, 2].map((index) => (

          <ellipse
            key={index}
            className="farmer-drop"
            style={{ animationDelay: `${index * 0.35}s` }}
            cx={346 + index * 7}
            cy="296"
            rx="2.5"
            ry="5"
            fill="#bae6fd"
          />

        ))
      }


      {/* Farmer */}

      <g className="farmer-body">

        {/* Pitchfork held in the left hand */}

        <rect x="141" y="150" width="7" height="230" rx="3" fill="#b45309" />

        <path
          d="M128 150 v-34 M144.5 150 v-40 M161 150 v-34 M128 150 h33"
          stroke="#6b7280" strokeWidth="5" strokeLinecap="round" fill="none"
        />


        {/* Legs and boots */}

        <rect x="180" y="296" width="24" height="72" rx="8" fill="#1d4ed8" />
        <rect x="212" y="296" width="24" height="72" rx="8" fill="#1d4ed8" />

        <path d="M172 362 h34 v18 h-40 q-2 -14 6 -18z" fill="#78350f" />
        <path d="M210 362 h34 q8 4 6 18 h-40z" fill="#78350f" />


        {/* Left arm reaching to the pitchfork */}

        <path d="M180 226 L150 262" stroke="#dc2626" strokeWidth="18" strokeLinecap="round" />
        <circle cx="146" cy="266" r="10" fill="#f2c29b" />


        {/* Shirt and overalls */}

        <rect x="172" y="208" width="72" height="100" rx="18" fill="#dc2626" />

        <path d="M184 208 v34 M232 208 v34" stroke="#2563eb" strokeWidth="9" />

        <rect x="180" y="238" width="56" height="72" rx="8" fill="#2563eb" />

        <rect x="196" y="254" width="24" height="18" rx="4" fill="#1d4ed8" />

        <circle cx="185" cy="243" r="3.5" fill="#fde047" />
        <circle cx="231" cy="243" r="3.5" fill="#fde047" />


        {/* Right arm, waving */}

        <g className="farmer-wave">
          <path d="M238 224 L274 180" stroke="#dc2626" strokeWidth="18" strokeLinecap="round" />
          <circle cx="278" cy="174" r="11" fill="#f2c29b" />
        </g>


        {/* Head */}

        <rect x="200" y="192" width="16" height="20" fill="#e5a97c" />

        <circle cx="208" cy="168" r="32" fill="#f2c29b" />

        <g className="farmer-eyes">
          <circle cx="197" cy="166" r="3.5" fill="#1f2937" />
          <circle cx="219" cy="166" r="3.5" fill="#1f2937" />
        </g>

        <circle cx="188" cy="178" r="5" fill="#f9a8a8" opacity=".7" />
        <circle cx="228" cy="178" r="5" fill="#f9a8a8" opacity=".7" />

        <path d="M196 180 q12 12 24 0" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" fill="none" />

        <path d="M192 176 q16 -9 32 0 q-16 5 -32 0z" fill="#78350f" />


        {/* Straw hat */}

        <path d="M180 148 q4 -38 28 -38 q24 0 28 38z" fill="#facc15" />

        <path d="M181 142 h54 v8 h-54z" fill="#b91c1c" />

        <ellipse cx="208" cy="150" rx="56" ry="10" fill="#eab308" />

      </g>

    </svg>

  );

}

export default FarmerScene;
