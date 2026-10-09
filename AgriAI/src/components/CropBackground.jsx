// Translucent animated crops behind every page: a swaying row along
// the bottom of the screen and a few leaves drifting upward.
// Styles and motion are in the GRAPHICS section of App.css.

function Wheat() {

  return (

    <svg viewBox="0 0 40 160">

      <path d="M20 160 V44" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />

      <path d="M20 120 q-16 -6 -18 -26 q16 4 18 26z" fill="#22c55e" />
      <path d="M20 96 q16 -6 18 -26 q-16 4 -18 26z" fill="#22c55e" />

      {
        [0, 1, 2, 3].map((row) => (

          <g key={row}>
            <ellipse cx="13" cy={40 - row * 9} rx="4" ry="7" fill="#eab308" transform={`rotate(-28 13 ${40 - row * 9})`} />
            <ellipse cx="27" cy={40 - row * 9} rx="4" ry="7" fill="#eab308" transform={`rotate(28 27 ${40 - row * 9})`} />
          </g>

        ))
      }

      <ellipse cx="20" cy="6" rx="4" ry="7" fill="#eab308" />

    </svg>

  );

}


function Corn() {

  return (

    <svg viewBox="0 0 70 180">

      <path d="M35 180 V20" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />

      <path d="M35 150 q-30 -10 -33 -44 q26 8 33 44z" fill="#16a34a" />
      <path d="M35 120 q30 -10 33 -44 q-26 8 -33 44z" fill="#22c55e" />
      <path d="M35 84 q-26 -8 -28 -38 q22 6 28 38z" fill="#22c55e" />
      <path d="M35 56 q22 -8 24 -34 q-20 6 -24 34z" fill="#16a34a" />

      <ellipse cx="46" cy="98" rx="8" ry="18" fill="#facc15" transform="rotate(18 46 98)" />

    </svg>

  );

}


function Sprout() {

  return (

    <svg viewBox="0 0 60 110">

      <path d="M30 110 V40" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />

      <path d="M30 78 q-26 -4 -28 -28 q26 2 28 28z" fill="#22c55e" />
      <path d="M30 60 q26 -4 28 -28 q-26 2 -28 28z" fill="#4ade80" />
      <path d="M30 42 q-14 -10 -10 -30 q16 10 10 30z" fill="#16a34a" />

    </svg>

  );

}


function Leaf() {

  return (

    <svg viewBox="0 0 30 30">
      <path d="M4 26 q-2 -22 22 -22 q0 22 -22 22z" fill="#22c55e" />
      <path d="M6 24 L20 10" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>

  );

}


// Order and size of the plants along the bottom edge
const ROW = [
  [Wheat, 150], [Corn, 210], [Sprout, 90], [Wheat, 180],
  [Corn, 170], [Wheat, 140], [Sprout, 110], [Corn, 220],
  [Wheat, 170], [Sprout, 85], [Corn, 190], [Wheat, 155],
  [Corn, 200], [Wheat, 175]
];

// Horizontal position (%), size (px), duration (s) and delay (s)
const LEAVES = [
  [6, 22, 26, 0], [18, 16, 32, -9], [31, 26, 22, -15], [44, 18, 30, -4],
  [57, 24, 27, -20], [69, 16, 34, -12], [81, 22, 24, -7], [93, 18, 29, -17]
];


function CropBackground() {

  return (

    <div className="crop-bg" aria-hidden="true">

      {
        LEAVES.map(([left, size, duration, delay]) => (

          <span
            key={left}
            className="crop-bg-leaf"
            style={{
              left: `${left}%`,
              width: size,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`
            }}
          >
            <Leaf />
          </span>

        ))
      }


      <div className="crop-bg-row">

        {
          ROW.map(([Plant, height], index) => (

            <span
              key={index}
              className="crop-bg-plant"
              style={{
                height,
                animationDelay: `${index * -0.45}s`
              }}
            >
              <Plant />
            </span>

          ))
        }

      </div>

    </div>

  );

}

export default CropBackground;
