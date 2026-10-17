"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import { imageUrl } from "@/lib/image";
import { useCart } from "@/context/CartContext";

export default function SweetCard({ sweet, index = 0 }) {
  const { items, addItem, updateQty } = useCart();

  // 1. Safe JSON parsing for sizes
  const parsedSizes = useMemo(() => {
    if (!sweet?.sizes) return [];
    if (Array.isArray(sweet.sizes)) return sweet.sizes;
    try {
      return JSON.parse(sweet.sizes);
    } catch {
      return [];
    }
  }, [sweet?.sizes]);

  const hasSizes = parsedSizes.length > 0;

  // 2. Default selected size is the first size in the array
  const [selectedSize, setSelectedSize] = useState(
    hasSizes ? parsedSizes[0] : null
  );

  // 3. Dynamic Price based on active size selection
  const currentPrice = useMemo(() => {
    if (hasSizes && selectedSize?.price != null) {
      return selectedSize.price;
    }
    return sweet.price;
  }, [hasSizes, selectedSize, sweet.price]);

  // 4. Unique ID per size variation in cart
  const cartItemId = hasSizes
    ? `${sweet.id}-${selectedSize.label}`
    : String(sweet.id);

  // 5. Quantity for currently active size option
  const cartItem = items.find((i) => String(i.id) === String(cartItemId));
  const qty = cartItem?.qty || 0;

  const href = `/sweets/${sweet.id}`;

  const handleAdd = () => {
    addItem({
      ...sweet,
      id: cartItemId,
      sweetId: sweet.id,
      name: hasSizes ? `${sweet.name} (${selectedSize.label})` : sweet.name,
      price: currentPrice,
      size: hasSizes ? selectedSize.label : undefined,
    });
  };

  const handleUpdateQty = (newQty) => {
    updateQty(cartItemId, newQty);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        minHeight: { xs: 420, sm: 440 },
        display: "flex",
        flexDirection: "column",
        color: "inherit",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#ffffff",
        border: "1px solid #eee7df",
        animation: "sweetCardEnter 0.55s ease both",
        animationDelay: `${index * 80}ms`,
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
          "& .sweet-name": {
            color: "#d97706",
          },
        },
        "@keyframes sweetCardEnter": {
          "0%": { opacity: 0, transform: "translateY(20px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      }}
    >
      {/* ================= IMAGE CONTAINER ================= */}
      <Link
        href={href}
        aria-label={`View ${sweet.name}`}
        style={{ display: "block", color: "inherit", textDecoration: "none" }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 200, sm: 210 },
            overflow: "hidden",
            bgcolor: sweet.tint || "#fff7ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {sweet.image ? (
            <Box
              component="img"
              className="sweet-image"
              src={imageUrl(sweet.image)}
              alt={sweet.name}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)",
              }}
            />
          ) : (
            <Typography
              component="span"
              className="sweet-image"
              sx={{
                fontSize: { xs: "4.5rem", sm: "5rem" },
                lineHeight: 1,
                transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              {sweet.emoji || "🍰"}
            </Typography>
          )}

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
              }}
            />
          )}
        </Box>
      </Link>

      {/* ================= CARD CONTENT ================= */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 2.2 },
          "&:last-child": { pb: { xs: 2, sm: 2.2 } },
        }}
      >
        {/* Name + Price (Dynamic based on selected size) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            minHeight: 45,
          }}
        >
          <Typography
            className="sweet-name"
            component="h3"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.02rem" },
              fontWeight: 900,
              lineHeight: 1.3,
              color: "#292524",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            <Link href={href} style={{ color: "inherit", textDecoration: "none" }}>
              {sweet.name}
            </Link>
          </Typography>

          {/* PRICE BADGE UPDATES HERE */}
          {currentPrice != null && (
            <Typography
              sx={{
                flexShrink: 0,
                px: 1.1,
                py: 0.55,
                borderRadius: 2,
                bgcolor: "#fff7ed",
                color: "#b45309",
                fontSize: "0.85rem",
                fontWeight: 900,
                lineHeight: 1,
                transition: "all 0.2s ease",
              }}
            >
              ₹{currentPrice}
            </Typography>
          )}
        </Box>

        {/* Size Selector Chips */}
        {hasSizes && (
          <Stack
            direction="row"
            spacing={0.8}
            sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.8 }}
          >
            {parsedSizes.map((s) => {
              const isSelected = selectedSize?.label === s.label;
              return (
                <Chip
                  key={s.label}
                  label={s.label}
                  size="small"
                  onClick={() => setSelectedSize(s)}
                  sx={{
                    height: 26,
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    bgcolor: isSelected ? "#d97706" : "#f5f5f4",
                    color: isSelected ? "#fff" : "#57534e",
                    border: isSelected
                      ? "1px solid #d97706"
                      : "1px solid #e7e5e4",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: isSelected ? "#b45309" : "#fed7aa",
                    },
                  }}
                />
              );
            })}
          </Stack>
        )}

        {/* Description */}
        <Typography
          sx={{
            mt: 1,
            color: "#78716c",
            fontSize: { xs: "0.78rem", sm: "0.82rem" },
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            minHeight: "2.4em",
          }}
        >
          {sweet.description || "Freshly prepared with care."}
        </Typography>

        {/* ================= ADD TO CART / QUANTITY CONTROLS ================= */}
        <Box sx={{ mt: "auto", pt: 2 }}>
          {qty === 0 ? (
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCartRoundedIcon />}
              onClick={handleAdd}
              sx={{
                minHeight: 44,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "#fff",
                background:
                  "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                boxShadow: "0 5px 12px rgba(180, 83, 9, 0.16)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #b45309 0%, #92400e 100%)",
                },
              }}
            >
              Add to cart
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                minHeight: 44,
                px: 0.75,
                py: 0.5,
                border: "1px solid #fed7aa",
                borderRadius: "14px",
                bgcolor: "#fff7ed",
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleUpdateQty(qty - 1)}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#fff",
                  color: "#b45309",
                  border: "1px solid #ffedd5",
                }}
              >
                <RemoveRoundedIcon fontSize="small" />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    color: "#92400e",
                  }}
                >
                  {qty}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#b45309",
                  }}
                >
                  {hasSizes ? selectedSize.label : "In cart"}
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={() => handleUpdateQty(qty + 1)}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#d97706",
                  color: "#fff",
                }}
              >
                <AddRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}