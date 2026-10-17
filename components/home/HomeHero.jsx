// "use client";

// import { Box, Button, Stack, Typography } from "@mui/material";

// import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
// import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

// export default function HomeHero() {
//   return (
//     <header
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         minHeight: "500px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         padding: "56px 16px",
//         backgroundColor: "#fffbf7",
//         background:
//           "radial-gradient(circle at top left, #fff7ed 0%, #fffbf7 45%, #fff 100%)",
//       }}
//     >
//       {/* ================= DECORATIVE BLOBS ================= */}

//       <Box
//         sx={{
//           position: "absolute",
//           width: { xs: 180, md: 300 },
//           height: { xs: 180, md: 300 },
//           borderRadius: "50%",
//           bgcolor: "#fed7aa",
//           opacity: 0.28,
//           filter: "blur(3px)",
//           top: { xs: -80, md: -120 },
//           left: { xs: -80, md: -100 },
//           pointerEvents: "none",
//         }}
//       />

//       <Box
//         sx={{
//           position: "absolute",
//           width: { xs: 160, md: 260 },
//           height: { xs: 160, md: 260 },
//           borderRadius: "50%",
//           bgcolor: "#fde68a",
//           opacity: 0.2,
//           filter: "blur(5px)",
//           bottom: { xs: -80, md: -100 },
//           right: { xs: -70, md: -90 },
//           pointerEvents: "none",
//         }}
//       />

//       {/* ================= FLOATING BAKERY ITEMS ================= */}

//       {/* Cake */}
//       <Box
//         component="span"
//         className="bakery-float bakery-float-delay-1"
//         aria-hidden="true"
//         sx={{
//           position: "absolute",
//           top: { xs: "5%", md: "10%" },
//           left: { xs: "6%", sm: "10%", md: "14%" },
//           fontSize: { xs: "1.7rem", sm: "2rem", md: "2.5rem" },
//           opacity: 0.9,
//         }}
//       >
//         🍰
//       </Box>

//       {/* Cookie */}
//       <Box
//         component="span"
//         className="bakery-float bakery-float-delay-2"
//         aria-hidden="true"
//         sx={{
//           position: "absolute",
//           top: "5%",
//           right: { xs: "8%", md: "15%" },
//           fontSize: { xs: "1.8rem", md: "2.5rem" },
//           opacity: 0.8,
//           pointerEvents: "none",
//           userSelect: "none",
//         }}
//       >
//         🍪
//       </Box>

//       {/* Chocolate */}
//       <Box
//         component="span"
//         className="bakery-float bakery-float-delay-3"
//         aria-hidden="true"
//         sx={{
//           position: "absolute",
//           bottom: "30%",
//           left: { xs: "10%", md: "18%" },
//           fontSize: { xs: "1.6rem", md: "2.2rem" },
//           opacity: 0.75,
//           pointerEvents: "none",
//           userSelect: "none",
//           zIndex: 2
//         }}
//       >
//         🍫
//       </Box>

//       {/* Cupcake */}
//       <Box
//         component="span"
//         className="bakery-float bakery-float-delay-4"
//         aria-hidden="true"
//         sx={{
//           position: "absolute",
//           bottom: "31%",
//           right: { xs: "10%", md: "18%" },
//           fontSize: { xs: "1.6rem", md: "2.2rem" },
//           opacity: 0.75,
//           pointerEvents: "none",
//           userSelect: "none",
//         }}
//       >
//         🧁
//       </Box>

//       {/* ================= HERO CONTENT ================= */}

//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 1,
//           width: "100%",
//           maxWidth: 760,
//           mx: "auto",
//         }}
//       >

//         {/* ================= FRESH BADGE ================= */}

//         <Box
//           sx={{
//             display: "inline-flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 0.8,

//             px: 1.5,
//             py: 0.65,

//             mb: 2,

//             borderRadius: 99,

//             bgcolor: "#fff7ed",
//             border: "1px solid #fed7aa",
//           }}
//         >
//           {/* Green status dot */}
//           <Box
//             sx={{
//               width: 7,
//               height: 7,
//               borderRadius: "50%",
//               bgcolor: "#22c55e",
//               flexShrink: 0,
//             }}
//           />

//           <Typography
//             sx={{
//               fontSize: "0.72rem",
//               fontWeight: 800,
//               color: "#92400e",
//               lineHeight: 1,
//             }}
//           >
//             Freshly prepared
//           </Typography>
//         </Box>

//         {/* ================= MAIN HEADING ================= */}

//         <Typography
//           component="h1"
//           sx={{
//             m: 0,

//             fontSize: {
//               xs: "2.5rem",
//               sm: "3.5rem",
//               md: "4.5rem",
//             },

//             lineHeight: {
//               xs: 1.08,
//               md: 1.02,
//             },

//             fontWeight: 900,

//             letterSpacing: {
//               xs: "-1.5px",
//               md: "-2.5px",
//             },

//             color: "#292524",

//             maxWidth: 720,
//             mx: "auto",
//           }}
//         >
//           Fresh sweets,
//           <Box
//             component="span"
//             sx={{
//               display: "block",
//               color: "#d97706",
//             }}
//           >
//             baked every morning.
//           </Box>
//         </Typography>

//         {/* ================= SUBTITLE ================= */}

//         <Typography
//           sx={{
//             mt: 2,

//             maxWidth: 540,
//             mx: "auto",

//             color: "#57534e",

//             fontSize: {
//               xs: "0.95rem",
//               sm: "1.05rem",
//             },

//             lineHeight: 1.7,
//           }}
//         >
//           Have a look at what&apos;s on the counter today. Fresh treats made
//           with care at HaYaan&apos;s Cafe And Bakery.
//         </Typography>

//         {/* ================= BUTTONS ================= */}
//         <Stack
//           direction={{
//             xs: "column",
//             sm: "row",
//           }}
//           spacing={1.2}
//           sx={{
//             mt: 3.5,
//             width: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* See Sweets */}
//           <Button
//             href="#menu"
//             variant="contained"
//             size="large"
//             endIcon={<ArrowDownwardRoundedIcon />}
//             className="hero-button hero-button-primary hero-ring-button"
//             sx={{
//               width: {
//                 xs: "100%",
//                 sm: "auto",
//               },
//               minWidth: 190,
//               minHeight: 48,
//               px: 3,
//               borderRadius: 2.5,
//               bgcolor: "#d97706",
//               color: "#fff",
//               fontWeight: 800,
//               textTransform: "none",
//               boxShadow: "0 8px 22px rgba(217,119,6,.2)",

//               "&:hover": {
//                 bgcolor: "#b45309",
//                 boxShadow: "0 12px 28px rgba(217,119,6,.28)",
//               },
//             }}
//           >
//             See our sweets
//           </Button>

//           {/* Visit Us */}
//           <Button
//             href="#contact"
//             variant="outlined"
//             size="large"
//             className="hero-button hero-button-secondary"
//             sx={{
//               width: {
//                 xs: "100%",
//                 sm: "auto",
//               },
//               minHeight: 48,
//               px: 3,
//               borderRadius: 2.5,
//               borderColor: "#e7e5e4",
//               color: "#57534e",
//               bgcolor: "#fff",
//               fontWeight: 800,
//               textTransform: "none",

//               "&:hover": {
//                 borderColor: "#fdba74",
//                 bgcolor: "#fff7ed",
//               },
//             }}
//           >
//             Visit us
//           </Button>
//         </Stack>
//       </Box>
//     </header>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

/* ================= ANIMATIONS ================= */
const fadeUp = keyframes`
  from { transform: translateY(18px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

/* Text stays fixed, each letter cycles through multiple festive colours */
const colorWave = keyframes`
  0%   { color: #f59e0b; text-shadow: 0 0 14px rgba(245,158,11,.45); }
  17%  { color: #ec4899; text-shadow: 0 0 14px rgba(236,72,153,.45); }
  34%  { color: #8b5cf6; text-shadow: 0 0 14px rgba(139,92,246,.45); }
  50%  { color: #14b8a6; text-shadow: 0 0 14px rgba(20,184,166,.45); }
  67%  { color: #22c55e; text-shadow: 0 0 14px rgba(34,197,94,.4); }
  84%  { color: #f97316; text-shadow: 0 0 14px rgba(249,115,22,.45); }
  100% { color: #f59e0b; text-shadow: 0 0 14px rgba(245,158,11,.45); }
`;

const swap = keyframes`
  0%   { transform: translateY(100%); opacity: 0; }
  14%  { transform: translateY(0);    opacity: 1; }
  86%  { transform: translateY(0);    opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
`;

const shimmer = keyframes`
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 1;    transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
`;

const fall = keyframes`
  0%   { transform: translate(0, -40px) rotate(0deg);      opacity: 0; }
  10%  { opacity: 0.95; }
  90%  { opacity: 0.95; }
  100% { transform: translate(40px, 640px) rotate(360deg); opacity: 0; }
`;

/* ----- Big centre firework ----- */
const bigRocket = keyframes`
  0%   { transform: translateY(340px); opacity: 0; }
  6%   { opacity: 1; }
  26%  { transform: translateY(0); opacity: 1; }
  30%, 100% { transform: translateY(0); opacity: 0; }
`;

const bigSpark = keyframes`
  0%, 27% { transform: rotate(var(--a)) translateY(0) scale(0); opacity: 0; }
  31%     { transform: rotate(var(--a)) translateY(-6px) scale(1.3); opacity: 1; }
  70%     { transform: rotate(var(--a)) translateY(calc(var(--d) * -1)) scale(0.9); opacity: 0.95; }
  100%    { transform: rotate(var(--a)) translateY(calc(var(--d) * -1)) scale(0); opacity: 0; }
`;

const bigFlash = keyframes`
  0%, 27% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  31%     { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
  60%, 100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
`;

/* ----- Small side fireworks ----- */
const rocket = keyframes`
  0%   { transform: translateY(70px); opacity: 0; }
  6%   { opacity: 1; }
  26%  { transform: translateY(0); opacity: 1; }
  30%, 100% { transform: translateY(0); opacity: 0; }
`;

const spark = keyframes`
  0%, 27% { transform: rotate(var(--a)) translateY(0) scale(0); opacity: 0; }
  31%     { transform: rotate(var(--a)) translateY(-3px) scale(1.2); opacity: 1; }
  68%     { transform: rotate(var(--a)) translateY(calc(var(--d) * -1)) scale(0.8); opacity: 1; }
  100%    { transform: rotate(var(--a)) translateY(calc(var(--d) * -1)) scale(0); opacity: 0; }
`;

const flash = keyframes`
  0%, 27% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  31%     { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
  50%, 100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
`;

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(245,158,11,.5); }
  70%  { box-shadow: 0 0 0 16px rgba(245,158,11,0); }
  100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
`;

const shine = keyframes`
  0%   { left: -60%; }
  60%, 100% { left: 130%; }
`;

const glowPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 4px #fcd34d); transform: scale(1); }
  50%      { filter: drop-shadow(0 0 12px #f59e0b); transform: scale(1.18); }
`;

const motionOK = "@media (prefers-reduced-motion: no-preference)";

/* ================= COLOUR-CHANGING TEXT (text stays, colours move) ================= */
function ColorText({ text }) {
  let index = 0; // continuous letter index so neighbouring letters have different colours

  return (
    <Box component="span" aria-label={text}>
      {text.split(" ").map((word, w) => (
        <Box
          key={w}
          component="span"
          aria-hidden="true"
          sx={{ display: "inline-block", whiteSpace: "nowrap", mr: "0.25em" }}
        >
          {word.split("").map((ch) => {
            const i = index++;
            return (
              <Box
                key={i}
                component="span"
                sx={{
                  display: "inline-block",
                  color: "#f59e0b", // fallback when animation is off
                  [motionOK]: {
                    animation: `${colorWave} 6s linear ${-i * 0.45}s infinite`,
                  },
                }}
              >
                {ch}
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

/* ================= ROTATING WORD ================= */
const WORDS = ["fresh cakes", "sweet mithai", "warm cookies", "festive cupcakes"];

// const WORDS = [
//   "fresh cakes",
//   "Honeycomb",
//   "Butter crunch",
//   "Florentine choco",
//   "Mini truffles",
//   "Almond rocher",
//   "Walnut fudge",
//   "Peanut butter",
//   "Coconut truffles",
// ];


function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <Box
      component="span"
      sx={{
        display: "block",
        overflow: "hidden",
        height: "1.2em",
        lineHeight: 1.2,
      }}
    >
      <Box
        key={i}
        component="span"
        sx={{
          display: "block",
          background: "linear-gradient(90deg, #f59e0b, #e11d6a, #f59e0b)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "#e11d6a",
          [motionOK]: {
            animation: `${swap} 2.4s ease-in-out both, ${shimmer} 3s linear infinite`,
          },
        }}
      >
        {WORDS[i]}
      </Box>
    </Box>
  );
}

/* ================= BIG CENTRE SKY SHOT ================= */
const SPARK_COLORS = ["#fbbf24", "#fb7185", "#f59e0b", "#f9a8d4", "#fb923c"];
const CYCLE = "5s";

// [count, distance on mobile, distance on desktop, spark size]
const RINGS = [
  [28, 175, 330, 7],
  [20, 125, 235, 6],
  [14, 80, 145, 5],
  [8, 40, 70, 4],
];

function BigBurst() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {/* rocket rising from the bottom */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: -1.5,
          width: 3,
          height: 30,
          borderRadius: 3,
          background: "linear-gradient(to top, transparent, #f59e0b)",
          opacity: 0,
          [motionOK]: { animation: `${bigRocket} ${CYCLE} ease-out infinite` },
        }}
      />

      {/* big soft glow */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,.5) 0%, rgba(251,113,133,.22) 45%, transparent 70%)",
          opacity: 0,
          [motionOK]: { animation: `${bigFlash} ${CYCLE} ease-out infinite` },
        }}
      />

      {/* sparks in 4 rings */}
      {RINGS.map(([count, dXs, dMd, size], r) =>
        Array.from({ length: count }).map((_, i) => {
          const color = SPARK_COLORS[(i + r) % SPARK_COLORS.length];
          return (
            <Box
              key={`${r}-${i}`}
              sx={{
                "--a": `${i * (360 / count) + (r % 2 ? 180 / count : 0)}deg`,
                "--d": { xs: `${dXs}px`, md: `${dMd}px` },
                position: "absolute",
                top: 0,
                left: 0,
                width: size,
                height: size,
                ml: `${-size / 2}px`,
                mt: `${-size / 2}px`,
                borderRadius: "50%",
                bgcolor: color,
                boxShadow: `0 0 10px 2px ${color}aa`,
                opacity: 0,
                [motionOK]: {
                  animation: `${bigSpark} ${CYCLE} ease-out ${r * 0.08}s infinite`,
                },
              }}
            />
          );
        })
      )}
    </Box>
  );
}

/* ================= SMALL SIDE SKY SHOTS ================= */
const SHOTS = [
  ["#f59e0b", "#fb7185"], // gold + rose
  ["#e11d6a", "#fbbf24"], // pink + gold
  ["#f97316", "#f9a8d4"], // orange + light pink
];

function Burst({ delay = 0, palette = 0, sx }) {
  const [c1, c2] = SHOTS[palette % SHOTS.length];

  const ring = (count, dist, color, size) =>
    Array.from({ length: count }).map((_, i) => (
      <Box
        key={`${color}${count}${i}`}
        sx={{
          "--a": `${i * (360 / count)}deg`,
          "--d": `${dist}px`,
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          ml: `${-size / 2}px`,
          mt: `${-size / 2}px`,
          borderRadius: "50%",
          bgcolor: color,
          boxShadow: `0 0 6px 1px ${color}aa`,
          opacity: 0,
          [motionOK]: {
            animation: `${spark} 3.6s ease-out ${delay}s infinite`,
          },
        }}
      />
    ));

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 2,
        ...sx,
      }}
    >
      {/* rocket trail going up */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: -1,
          width: 2,
          height: 16,
          borderRadius: 2,
          background: `linear-gradient(to top, transparent, ${c1})`,
          opacity: 0,
          [motionOK]: { animation: `${rocket} 3.6s ease-out ${delay}s infinite` },
        }}
      />

      {/* soft flash */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c1}88 0%, transparent 70%)`,
          opacity: 0,
          [motionOK]: { animation: `${flash} 3.6s ease-out ${delay}s infinite` },
        }}
      />

      {/* outer ring + inner ring */}
      {ring(12, 34, c1, 4)}
      {ring(8, 18, c2, 3)}
    </Box>
  );
}

/* ================= FALLING SPARKLES ================= */
const SPARKLES = [
  { l: "5%", d: 9, delay: 0, e: "✨", s: 1.2 },
  { l: "14%", d: 12, delay: 3, e: "💫", s: 1.0 },
  { l: "23%", d: 10, delay: 6, e: "✨", s: 1.0 },
  { l: "33%", d: 13, delay: 1.5, e: "💫", s: 1.1 },
  { l: "44%", d: 11, delay: 7, e: "✨", s: 1.3 },
  { l: "55%", d: 9.5, delay: 4, e: "💫", s: 1.0 },
  { l: "65%", d: 12, delay: 2, e: "✨", s: 1.2 },
  { l: "75%", d: 10.5, delay: 5.5, e: "💫", s: 1.1 },
  { l: "85%", d: 13, delay: 0.8, e: "✨", s: 1.0 },
  { l: "93%", d: 9, delay: 6.5, e: "💫", s: 1.2 },
];

const LIGHT_COLORS = ["#fbbf24", "#fb7185", "#f59e0b", "#f9a8d4"];

/* ================= HERO ================= */
export default function HomeHero() {
  return (
    <header
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "560px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "72px 16px 64px",
        background:
          "radial-gradient(circle at 50% 30%, #fff4cc 0%, #fff8ee 40%, #fff1f4 100%)",
      }}
    >
      {/* Glow blobs */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 220, md: 340 },
          height: { xs: 220, md: 340 },
          borderRadius: "50%",
          bgcolor: "#fde68a",
          opacity: 0.4,
          filter: "blur(50px)",
          top: -100,
          left: -90,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: { xs: 200, md: 320 },
          height: { xs: 200, md: 320 },
          borderRadius: "50%",
          bgcolor: "#fecdd3",
          opacity: 0.45,
          filter: "blur(50px)",
          bottom: -90,
          right: -80,
          pointerEvents: "none",
        }}
      />

      {/* Twinkling fairy lights */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: 14,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-evenly",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              display: { xs: i < 9 ? "block" : "none", md: "block" },
              width: 8,
              height: 8,
              mt: i % 2 ? 1.5 : 0,
              borderRadius: "50%",
              bgcolor: LIGHT_COLORS[i % 4],
              boxShadow: `0 0 10px 3px ${LIGHT_COLORS[i % 4]}88`,
              [motionOK]: {
                animation: `${twinkle} ${2 + (i % 3) * 0.6}s ease-in-out ${
                  (i % 5) * 0.3
                }s infinite`,
              },
            }}
          />
        ))}
      </Box>

      {/* Big sky shot in the middle */}
      <BigBurst />

      {/* Side sky shots */}
      <Burst delay={0} palette={0} sx={{ top: "24%", left: { xs: "10%", md: "12%" } }} />
      <Burst delay={1.8} palette={1} sx={{ top: "20%", right: { xs: "10%", md: "12%" } }} />
      <Burst
        delay={0.9}
        palette={2}
        sx={{ top: "70%", left: { xs: "12%", md: "8%" } }}
      />
      <Burst
        delay={2.7}
        palette={0}
        sx={{ top: "72%", right: { xs: "12%", md: "8%" } }}
      />

      {/* Falling sparkles */}
      {/* {SPARKLES.map((p, i) => (
        <Box
          key={i}
          component="span"
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: 0,
            left: p.l,
            fontSize: `${p.s * 1.4}rem`,
            opacity: 0,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 2,
            display: { xs: i % 2 ? "none" : "block", sm: "block" },
            [motionOK]: {
              animation: `${fall} ${p.d}s linear ${p.delay}s infinite`,
            },
          }}
        >
          {p.e}
        </Box>
      ))} */}

      {/* ===== Content ===== */}
      <Box
        sx={{
          position: "relative",
          zIndex: 4,
          width: "100%",
          maxWidth: 780,
          mx: "auto",
        }}
      >
        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.8,
            py: 0.8,
            mb: 2.5,
            borderRadius: 99,
            bgcolor: "#fff",
            border: "1px solid #fed7aa",
            boxShadow: "0 6px 18px rgba(245,158,11,.15)",
            [motionOK]: { animation: `${fadeUp} 0.7s ease-out both` },
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1,
              [motionOK]: { animation: `${glowPulse} 2s ease-in-out infinite` },
            }}
          >
            🪔
          </Box>
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 800,
              color: "#92400e",
              lineHeight: 1,
            }}
          >
            Happy Diwali from HaYaan&apos;s Cafe And Bakery
          </Typography>
        </Box>

        {/* Heading: text stays fixed, colours keep changing */}
        <Typography
          component="h1"
          sx={{
            m: 0,
            fontSize: { xs: "2.4rem", sm: "3.4rem", md: "4.4rem" },
            lineHeight: { xs: 1.1, md: 1.05 },
            fontWeight: 900,
            letterSpacing: { xs: "-1.5px", md: "-2.5px" },
            color: "#3b1f2b",
          }}
        >
          <ColorText text="Celebrate Diwali with" />
          <RotatingWord />
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            mt: 2.5,
            maxWidth: 540,
            mx: "auto",
            color: "#6b4a55",
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
            lineHeight: 1.7,
            [motionOK]: { animation: `${fadeUp} 0.8s ease-out 0.4s both` },
          }}
        >
          Celebrate the festival of lights with our delightful chocolate
          treats, perfect for gifting to friends &amp; family.
        </Typography>

        {/* Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.4}
          sx={{
            mt: 3.5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            [motionOK]: { animation: `${fadeUp} 0.8s ease-out 0.6s both` },
          }}
        >
          <Button
            href="#menu"
            variant="contained"
            size="large"
            endIcon={<ArrowDownwardRoundedIcon />}
            sx={{
              position: "relative",
              overflow: "hidden",
              width: { xs: "100%", sm: "auto" },
              minWidth: 200,
              minHeight: 52,
              px: 3.5,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f59e0b, #fb7185)",
              color: "#fff",
              fontWeight: 800,
              textTransform: "none",
              [motionOK]: { animation: `${pulse} 2.4s ease-out infinite` },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-60%",
                width: "35%",
                height: "100%",
                background:
                  "linear-gradient(120deg, transparent, rgba(255,255,255,.65), transparent)",
                transform: "skewX(-20deg)",
                [motionOK]: { animation: `${shine} 3.6s ease-in-out infinite` },
              },
              "&:hover": {
                background: "linear-gradient(135deg, #d97706, #f43f5e)",
              },
            }}
          >
            See our sweets
          </Button>

          <Button
            href="#contact"
            variant="outlined"
            size="large"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minHeight: 52,
              px: 3.5,
              borderRadius: 3,
              borderColor: "#fecdd3",
              color: "#9f1239",
              bgcolor: "#fff",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": { borderColor: "#fb7185", bgcolor: "#fff1f2" },
            }}
          >
            Visit us
          </Button>
        </Stack>
      </Box>
    </header>
  );
}
