"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";

import { useCart } from "@/context/CartContext";

const ORANGE = "#d97706";
const ORANGE_DARK = "#b45309";
const TEXT = "#292524";
const MUTED = "#78716c";
const BORDER = "#eee7df";
const CREAM = "#fffbf5";

export default function AddToCart({ sweet, sizes = [] }) {
  const { items, totalItems, totalPrice, addItem, updateQty } = useCart();
  const [selected, setSelected] = useState(0);

  const hasSizes = sizes.length > 0;

  const options = hasSizes
    ? sizes.map((s) => ({
        key: `${sweet.id}::${s.label}`,
        label: s.label,
        price: Number(s.price) || 0,
      }))
    : [
        {
          key: sweet.id,
          label: null,
          price: Number(sweet.price) || 0,
        },
      ];

  const current = options[selected] ?? options[0];
  const qty = items.find((item) => item.id === current.key)?.qty || 0;
  const canBuy = hasSizes || sweet.price != null;

  const handleAdd = () => {
    addItem({
      id: current.key,
      name: current.label
        ? `${sweet.name} (${current.label})`
        : sweet.name,
      price: current.price,
      image: sweet.image,
      emoji: sweet.emoji,
    });
  };

  return (
    <Box
      sx={{
        color: TEXT,
        width: "100%",
        "@keyframes pop": {
          "0%": {
            opacity: 0,
            transform: "translateY(5px) scale(.98)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
        "@keyframes slideUp": {
          "0%": {
            opacity: 0,
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& *": {
            animation: "none !important",
            transition: "none !important",
          },
        },
      }}
    >
      {/* PRICE PANEL */}
      <Box
        sx={{
          mt: 2,
          p: { xs: 2, sm: 2.5 },
          borderRadius: { xs: 3, sm: 4 },
          background:
            "linear-gradient(135deg, #fffaf2 0%, #fff0dc 100%)",
          border: "1px solid #f3dfc5",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          "&::after": {
            content: '""',
            position: "absolute",
            width: 110,
            height: 110,
            right: -40,
            bottom: -65,
            borderRadius: "50%",
            bgcolor: "rgba(217,119,6,0.07)",
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ minWidth: 0, position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,
              mb: 1,
            }}
          >
            <LocalCafeRoundedIcon
              sx={{ fontSize: 17, color: ORANGE }}
            />

            <Typography
              sx={{
                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                fontWeight: 800,
                letterSpacing: "1.1px",
                textTransform: "uppercase",
                color: "#92400e",
              }}
            >
              {hasSizes
                ? `Price · ${current.label}`
                : "Fresh from our bakery"}
            </Typography>
          </Box>

          {canBuy ? (
            <Typography
              sx={{
                fontSize: { xs: "2rem", sm: "2.4rem" },
                fontWeight: 900,
                letterSpacing: "-1.2px",
                lineHeight: 1.05,
                color: ORANGE_DARK,
              }}
            >
              ₹{current.price}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: MUTED,
                lineHeight: 1.5,
              }}
            >
              Ask us for today's price.
            </Typography>
          )}

          <Typography
            sx={{
              mt: 0.8,
              fontSize: "0.75rem",
              color: "#8c6b4b",
            }}
          >
            {hasSizes
              ? "Choose your favourite size"
              : "Made with love, served fresh"}
          </Typography>
        </Box>

        {qty > 0 && (
          <Box
            sx={{
              flexShrink: 0,
              textAlign: "right",
              p: { xs: 1, sm: 1.5 },
              borderRadius: 2.5,
              bgcolor: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(217,119,6,0.12)",
              animation: "pop .25s ease both",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: MUTED,
              }}
            >
              Subtotal
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: 900,
                color: TEXT,
              }}
            >
              ₹{qty * current.price}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.68rem",
                color: MUTED,
              }}
            >
              {qty} × ₹{current.price}
            </Typography>
          </Box>
        )}
      </Box>

      {/* SIZE SELECTION */}
      {hasSizes && (
        <Box sx={{ mt: { xs: 3, sm: 3.5 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mb: 1.5,
            }}
          >
            <Box>
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: 900,
                  color: TEXT,
                }}
              >
                Choose your size
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: "0.78rem",
                  color: MUTED,
                }}
              >
                Select an option to see its price
              </Typography>
            </Box>

            <Box
              sx={{
                px: 1.2,
                py: 0.6,
                borderRadius: 99,
                bgcolor: "#f5f5f4",
                color: "#57534e",
                fontSize: "0.7rem",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {options.length} options
            </Box>
          </Box>

          <Box
            role="radiogroup"
            aria-label="Choose your size"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(auto-fit, minmax(130px, 1fr))",
              },
              gap: { xs: 1, sm: 1.25 },
            }}
          >
            {options.map((opt, index) => {
              const active = index === selected;
              const inCart =
                items.find((item) => item.id === opt.key)?.qty || 0;

              return (
                <Box
                  key={opt.key}
                  role="radio"
                  aria-checked={active}
                  tabIndex={0}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      setSelected(index);
                    }

                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      setSelected((index + 1) % options.length);
                    }

                    if (event.key === "ArrowLeft") {
                      event.preventDefault();
                      setSelected(
                        (index - 1 + options.length) % options.length
                      );
                    }
                  }}
                  sx={{
                    position: "relative",
                    p: { xs: 1.5, sm: 1.8 },
                    minWidth: 0,
                    minHeight: 112,
                    borderRadius: 3,
                    cursor: "pointer",
                    userSelect: "none",
                    bgcolor: active ? "#fff7ed" : "#ffffff",
                    border: "1.5px solid",
                    borderColor: active ? ORANGE : BORDER,
                    boxShadow: active
                      ? "0 5px 18px rgba(217,119,6,.09)"
                      : "0 2px 6px rgba(41,37,36,.025)",
                    transition:
                      "border-color .2s ease, background-color .2s ease, box-shadow .2s ease",
                    "&:hover": {
                      borderColor: active ? ORANGE : "#fdba74",
                      boxShadow: "0 5px 14px rgba(120,53,15,.07)",
                    },
                    "&:focus-visible": {
                      outline: "3px solid rgba(217,119,6,.25)",
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: active ? ORANGE : "#ffffff",
                      border: "1.5px solid",
                      borderColor: active ? ORANGE : "#d6d3d1",
                      color: "#ffffff",
                    }}
                  >
                    {active && (
                      <CheckRoundedIcon sx={{ fontSize: 15 }} />
                    )}
                  </Box>

                  <Typography
                    sx={{
                      pr: 2.5,
                      fontSize: { xs: "0.82rem", sm: "0.88rem" },
                      fontWeight: 800,
                      lineHeight: 1.4,
                      color: active ? "#78350f" : TEXT,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {opt.label}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1.1,
                      fontSize: { xs: "1.15rem", sm: "1.3rem" },
                      fontWeight: 900,
                      lineHeight: 1.1,
                      color: active ? ORANGE_DARK : "#44403c",
                    }}
                  >
                    ₹{opt.price}
                  </Typography>

                  {inCart > 0 && (
                    <Box
                      sx={{
                        mt: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1,
                        py: 0.5,
                        borderRadius: 99,
                        bgcolor: "#dcfce7",
                        color: "#166534",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                      }}
                    >
                      <ShoppingBagOutlinedIcon
                        sx={{ fontSize: 13 }}
                      />
                      {inCart} in cart
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* ADD TO CART / QUANTITY */}
      {canBuy && (
        <Box sx={{ mt: { xs: 2.5, sm: 3 } }}>
          {qty === 0 ? (
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCartRoundedIcon />}
              onClick={handleAdd}
              sx={{
                minHeight: { xs: 54, sm: 58 },
                borderRadius: 3,
                textTransform: "none",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 900,
                color: "#ffffff",
                background:
                  "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                boxShadow: "0 7px 18px rgba(217,119,6,.2)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  boxShadow: "0 9px 22px rgba(217,119,6,.28)",
                },
                "&:active": {
                  transform: "scale(.99)",
                },
              }}
            >
              Add to cart · ₹{current.price}
            </Button>
          ) : (
            <Stack
              spacing={1.5}
              sx={{ animation: "pop .25s ease both" }}
            >
              <Box
                sx={{
                  p: 1,
                  border: "1px solid #f3dfc5",
                  borderRadius: 3.5,
                  bgcolor: CREAM,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1,
                    px: 0.5,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.88rem",
                      }}
                    >
                      Quantity
                    </Typography>
                    <Typography
                      sx={{
                        color: MUTED,
                        fontSize: "0.72rem",
                      }}
                    >
                      Adjust your order
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 900,
                      color: ORANGE_DARK,
                    }}
                  >
                    ₹{qty * current.price}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    bgcolor: "#ffffff",
                    border: `1px solid ${BORDER}`,
                    borderRadius: 2.5,
                    p: 0.5,
                  }}
                >
                  <IconButton
                    aria-label={
                      qty === 1
                        ? "Remove from cart"
                        : "Decrease quantity"
                    }
                    onClick={() =>
                      updateQty(current.key, qty - 1)
                    }
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2,
                      bgcolor: "#fff7ed",
                      color: ORANGE_DARK,
                      "&:hover": { bgcolor: "#ffedd5" },
                    }}
                  >
                    {qty === 1 ? (
                      <DeleteOutlineRoundedIcon />
                    ) : (
                      <RemoveRoundedIcon />
                    )}
                  </IconButton>

                  <Box sx={{ textAlign: "center", minWidth: 50 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "1.25rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {qty}
                    </Typography>
                    <Typography
                      sx={{
                        color: MUTED,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                      }}
                    >
                      {qty === 1 ? "item" : "items"}
                    </Typography>
                  </Box>

                  <IconButton
                    aria-label="Increase quantity"
                    onClick={() =>
                      updateQty(current.key, qty + 1)
                    }
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2,
                      bgcolor: ORANGE,
                      color: "#ffffff",
                      "&:hover": { bgcolor: ORANGE_DARK },
                    }}
                  >
                    <AddRoundedIcon />
                  </IconButton>
                </Box>
              </Box>

              <Button
                component={Link}
                href="/cart"
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  minHeight: 52,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  color: "#ffffff",
                  bgcolor: TEXT,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#44403c",
                    boxShadow: "0 5px 14px rgba(41,37,36,.12)",
                  },
                }}
              >
                View my cart
              </Button>
            </Stack>
          )}
        </Box>
      )}

      {/* PRICE NOT AVAILABLE */}
      {!canBuy && (
        <Box
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: 3,
            bgcolor: "#fafaf9",
            border: `1px solid ${BORDER}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: MUTED,
              lineHeight: 1.6,
            }}
          >
            Contact us to confirm the price and availability of this
            bakery favourite.
          </Typography>
        </Box>
      )}

      {/* MOBILE STICKY CART BAR */}
      {totalItems > 0 && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            position: "fixed",
            left: 12,
            right: 12,
            bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
            zIndex: 1200,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            px: { xs: 1.5, sm: 2 },
            py: 1.2,
            borderRadius: 4,
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #292524 0%, #44403c 100%)",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 10px 35px rgba(41,37,36,.28)",
            animation: "slideUp .3s ease both",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                flexShrink: 0,
                borderRadius: 2.5,
                bgcolor: ORANGE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 23 }} />

              <Box
                sx={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  minWidth: 19,
                  height: 19,
                  px: 0.4,
                  borderRadius: 99,
                  bgcolor: "#ffffff",
                  color: ORANGE_DARK,
                  border: "1px solid #f3dfc5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  fontWeight: 900,
                }}
              >
                {totalItems}
              </Box>
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,.7)",
                  lineHeight: 1.4,
                }}
              >
                {totalItems === 1
                  ? "1 delicious item"
                  : `${totalItems} delicious items`}
              </Typography>

              <Typography
                sx={{
                  mt: 0.1,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: 900,
                  lineHeight: 1.25,
                  whiteSpace: "nowrap",
                }}
              >
                ₹{totalPrice}
              </Typography>
            </Box>
          </Box>

          <Button
            component={Link}
            href="/cart"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              minHeight: 44,
              flexShrink: 0,
              px: { xs: 1.7, sm: 2.2 },
              borderRadius: 3,
              bgcolor: ORANGE,
              color: "#ffffff",
              fontSize: "0.84rem",
              fontWeight: 900,
              textTransform: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: ORANGE_DARK,
              },
            }}
          >
            View cart
          </Button>
        </Box>
      )}

      {/* Keep separation from the sticky mobile bar */}
      {totalItems > 0 && (
        <Divider
          sx={{
            display: { xs: "block", md: "none" },
            mt: 3,
            borderColor: "transparent",
          }}
        />
      )}
    </Box>
  );
}