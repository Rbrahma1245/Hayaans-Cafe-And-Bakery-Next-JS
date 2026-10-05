"use client";

import { Box, Button, Stack, Typography } from "@mui/material";

import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

export default function HomeHero() {
  return (
    <header
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "56px 16px",
        backgroundColor: "#fffbf7",
        background:
          "radial-gradient(circle at top left, #fff7ed 0%, #fffbf7 45%, #fff 100%)",
      }}
    >
      {/* ================= DECORATIVE BLOBS ================= */}

      <Box
        sx={{
          position: "absolute",
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          borderRadius: "50%",
          bgcolor: "#fed7aa",
          opacity: 0.28,
          filter: "blur(3px)",
          top: { xs: -80, md: -120 },
          left: { xs: -80, md: -100 },
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: 160, md: 260 },
          height: { xs: 160, md: 260 },
          borderRadius: "50%",
          bgcolor: "#fde68a",
          opacity: 0.2,
          filter: "blur(5px)",
          bottom: { xs: -80, md: -100 },
          right: { xs: -70, md: -90 },
          pointerEvents: "none",
        }}
      />

      {/* ================= FLOATING BAKERY ITEMS ================= */}

      {/* Croissant */}
      <Box
        component="span"
        className="bakery-float bakery-float-delay-1"
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: { xs: "15%", md: "18%" },
          left: { xs: "6%", sm: "10%", md: "14%" },
          fontSize: { xs: "1.7rem", sm: "2rem", md: "2.5rem" },
          opacity: 0.9,
        }}
      >
        🥐
      </Box>

      {/* Donut */}
      <Box
        component="span"
        className="bakery-float bakery-float-delay-2"
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "25%",
          right: { xs: "8%", md: "15%" },
          fontSize: { xs: "1.8rem", md: "2.5rem" },
          opacity: 0.8,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        🍩
      </Box>

      {/* Cookie */}
      <Box
        component="span"
        className="bakery-float bakery-float-delay-3"
        aria-hidden="true"
        sx={{
          position: "absolute",
          bottom: "20%",
          left: { xs: "10%", md: "18%" },
          fontSize: { xs: "1.6rem", md: "2.2rem" },
          opacity: 0.75,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        🍪
      </Box>

      {/* Cupcake */}
      <Box
        component="span"
        className="bakery-float bakery-float-delay-4"
        aria-hidden="true"
        sx={{
          position: "absolute",
          bottom: "18%",
          right: { xs: "10%", md: "18%" },
          fontSize: { xs: "1.6rem", md: "2.2rem" },
          opacity: 0.75,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        🧁
      </Box>

      {/* ================= HERO CONTENT ================= */}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 760,
          mx: "auto",
        }}
      >
        {/* ================= BRAND ================= */}

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 2.5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Brand Icon */}
          <Box
            sx={{
              width: 38,
              height: 38,
              minWidth: 38,
              borderRadius: 2,
              bgcolor: "#fff7ed",
              border: "1px solid #fed7aa",
              color: "#d97706",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="HaYaan's Cafe And Bakery"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>

          {/* Brand Name */}
          <Typography
            sx={{
              m: 0,
              p: 0,
              fontWeight: 800,
              color: "#451a03",

              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },

              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            HaYaan&apos;s Cafe And Bakery
          </Typography>
        </Stack>

        {/* ================= FRESH BADGE ================= */}

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,

            px: 1.5,
            py: 0.65,

            mb: 2,

            borderRadius: 99,

            bgcolor: "#fff7ed",
            border: "1px solid #fed7aa",
          }}
        >
          {/* Green status dot */}
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#22c55e",
              flexShrink: 0,
            }}
          />

          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 800,
              color: "#92400e",
              lineHeight: 1,
            }}
          >
            Freshly prepared
          </Typography>
        </Box>

        {/* ================= MAIN HEADING ================= */}

        <Typography
          component="h1"
          sx={{
            m: 0,

            fontSize: {
              xs: "2.5rem",
              sm: "3.5rem",
              md: "4.5rem",
            },

            lineHeight: {
              xs: 1.08,
              md: 1.02,
            },

            fontWeight: 900,

            letterSpacing: {
              xs: "-1.5px",
              md: "-2.5px",
            },

            color: "#292524",

            maxWidth: 720,
            mx: "auto",
          }}
        >
          Fresh sweets,
          <Box
            component="span"
            sx={{
              display: "block",
              color: "#d97706",
            }}
          >
            baked every morning.
          </Box>
        </Typography>

        {/* ================= SUBTITLE ================= */}

        <Typography
          sx={{
            mt: 2,

            maxWidth: 540,
            mx: "auto",

            color: "#57534e",

            fontSize: {
              xs: "0.95rem",
              sm: "1.05rem",
            },

            lineHeight: 1.7,
          }}
        >
          Have a look at what&apos;s on the counter today. Fresh treats made
          with care at HaYaan&apos;s Cafe And Bakery.
        </Typography>

        {/* ================= BUTTONS ================= */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1.2}
          sx={{
            mt: 3.5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* See Sweets */}
          <Button
            href="#menu"
            variant="contained"
            size="large"
            endIcon={<ArrowDownwardRoundedIcon />}
            className="hero-button hero-button-primary hero-ring-button"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              minWidth: 190,
              minHeight: 48,
              px: 3,
              borderRadius: 2.5,
              bgcolor: "#d97706",
              color: "#fff",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: "0 8px 22px rgba(217,119,6,.2)",

              "&:hover": {
                bgcolor: "#b45309",
                boxShadow: "0 12px 28px rgba(217,119,6,.28)",
              },
            }}
          >
            See our sweets
          </Button>

          {/* Visit Us */}
          <Button
            href="#contact"
            variant="outlined"
            size="large"
            className="hero-button hero-button-secondary"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              minHeight: 48,
              px: 3,
              borderRadius: 2.5,
              borderColor: "#e7e5e4",
              color: "#57534e",
              bgcolor: "#fff",
              fontWeight: 800,
              textTransform: "none",

              "&:hover": {
                borderColor: "#fdba74",
                bgcolor: "#fff7ed",
              },
            }}
          >
            Visit us
          </Button>
        </Stack>
      </Box>
    </header>
  );
}
