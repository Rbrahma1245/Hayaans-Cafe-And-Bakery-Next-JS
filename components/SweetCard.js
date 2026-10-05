"use client";

import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { imageUrl } from "@/lib/image";

export default function SweetCard({ sweet, index = 0 }) {
  return (
    <Card
      component={Link}
      href={`/sweets/${sweet.id}`}
      aria-label={`View ${sweet.name}`}
      elevation={0}
      sx={{
        // ------------------------------------
        // CARD SIZE
        // ------------------------------------
        height: "100%",
        minHeight: {
          xs: 390,
          sm: 410,
        },

        display: "flex",
        flexDirection: "column",

        textDecoration: "none",
        color: "inherit",

        borderRadius: 4,
        overflow: "hidden",

        bgcolor: "#ffffff",
        border: "1px solid #eee7df",

        // ------------------------------------
        // ENTRANCE ANIMATION
        // ------------------------------------
        animation: "sweetCardEnter 0.55s ease both",
        animationDelay: `${index * 80}ms`,

        // ------------------------------------
        // HOVER
        // ------------------------------------
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",

        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: "#fed7aa",
          boxShadow: "0 18px 40px rgba(120, 53, 15, 0.12)",

          "& .sweet-image": {
            transform: "scale(1.08) rotate(1deg)",
          },

          "& .sweet-overlay": {
            opacity: 1,
          },

          "& .sweet-arrow": {
            transform: "translateX(4px)",
          },

          "& .sweet-name": {
            color: "#d97706",
          },
        },

        // ------------------------------------
        // KEYFRAMES
        // ------------------------------------
        "@keyframes sweetCardEnter": {
          "0%": {
            opacity: 0,
            transform: "translateY(20px) scale(0.98)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },

        // ------------------------------------
        // ACCESSIBILITY
        // ------------------------------------
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          transition: "none",

          "&:hover": {
            transform: "none",
          },

          "& .sweet-image": {
            transition: "none",
          },
        },
      }}
    >
      {/* =========================================
          IMAGE / ART
      ========================================== */}
      <Box
        sx={{
          position: "relative",
          width: "100%",

          height: {
            xs: 220,
            sm: 230,
          },

          minHeight: {
            xs: 220,
            sm: 230,
          },

          overflow: "hidden",

          bgcolor: sweet.tint || "#fff7ed",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Decorative background circle */}
        <Box
          sx={{
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.45)",
            filter: "blur(2px)",
          }}
        />

        {/* Image */}
        {sweet.image ? (
          <Box
            component="img"
            className="sweet-image"
            src={imageUrl(sweet.image)}
            alt={sweet.name}
            loading="lazy"
            sx={{
              position: "relative",
              zIndex: 1,

              width: "100%",
              height: "100%",

              objectFit: "cover",

              display: "block",

              transition:
                "transform 0.5s cubic-bezier(.2,.8,.2,1)",
            }}
          />
        ) : (
          <Typography
            component="span"
            role="img"
            aria-label={sweet.name}
            className="sweet-image"
            sx={{
              position: "relative",
              zIndex: 1,

              fontSize: {
                xs: "5rem",
                sm: "5.5rem",
              },

              lineHeight: 1,

              transition:
                "transform 0.5s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            {sweet.emoji || "🍰"}
          </Typography>
        )}

        {/* Hover overlay */}
        <Box
          className="sweet-overlay"
          sx={{
            position: "absolute",
            inset: 0,

            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",

            p: 1.5,

            background:
              "linear-gradient(to top, rgba(41,37,36,.35), transparent 45%)",

            opacity: 0,

            transition: "opacity 0.3s ease",

            zIndex: 2,

            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              bgcolor: "#ffffff",
              color: "#d97706",

              boxShadow: "0 6px 18px rgba(0,0,0,.15)",
            }}
          >
            <ArrowForwardRoundedIcon fontSize="small" />
          </Box>
        </Box>

        {/* Category */}
        {sweet.category && (
          <Chip
            label={sweet.category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,

              zIndex: 3,

              height: 28,

              bgcolor: "rgba(255,255,255,.92)",
              color: "#92400e",

              fontSize: "0.68rem",
              fontWeight: 800,

              border: "1px solid rgba(217,119,6,.12)",

              backdropFilter: "blur(6px)",

              "& .MuiChip-label": {
                px: 1.2,
              },
            }}
          />
        )}
      </Box>

      {/* =========================================
          CARD CONTENT
      ========================================== */}
      <CardContent
        sx={{
          flex: 1,

          display: "flex",
          flexDirection: "column",

          p: {
            xs: 2,
            sm: 2.2,
          },

          "&:last-child": {
            pb: {
              xs: 2,
              sm: 2.2,
            },
          },
        }}
      >
        {/* Name + Price */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",

            gap: 1,

            minHeight: 50,
          }}
        >
          <Typography
            className="sweet-name"
            component="h3"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.05rem",
              },

              fontWeight: 900,
              lineHeight: 1.3,

              color: "#292524",

              transition: "color 0.2s ease",

              // Maximum 2 lines
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {sweet.name}
          </Typography>

          {sweet.price != null && (
            <Typography
              sx={{
                flexShrink: 0,

                px: 1.1,
                py: 0.55,

                borderRadius: 2,

                bgcolor: "#fff7ed",
                color: "#b45309",

                fontSize: "0.82rem",
                fontWeight: 900,

                lineHeight: 1,
              }}
            >
              ₹{sweet.price}
            </Typography>
          )}
        </Box>

        {/* Description */}
        <Typography
          sx={{
            mt: 1,

            color: "#78716c",

            fontSize: {
              xs: "0.8rem",
              sm: "0.83rem",
            },

            lineHeight: 1.6,

            // EXACTLY maximum 2 lines
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",

            minHeight: "2.56em",
          }}
        >
          {sweet.description || "Freshly prepared with care."}
        </Typography>

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: "auto",
            pt: 2,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 800,
              color: "#b45309",
            }}
          >
            View details
          </Typography>

          <Box
            className="sweet-arrow"
            sx={{
              width: 30,
              height: 30,

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              bgcolor: "#fff7ed",
              color: "#d97706",

              transition:
                "transform 0.25s ease, background-color 0.25s ease",
            }}
          >
            <ArrowForwardRoundedIcon
              sx={{
                fontSize: 17,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
