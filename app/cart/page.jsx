"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { useCart } from "@/context/CartContext";
import { imageUrl } from "@/lib/image";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import CheckoutDialog from "@/components/cart/CheckoutDialog";

const ORANGE = "#d97706";
const DARK_ORANGE = "#b45309";
const TEXT = "#292524";
const MUTED = "#78716c";
const BORDER = "#eee7df";

export default function CartPage() {
  const {
    items,
    hydrated,
    totalItems,
    totalPrice,
    updateQty,
    removeItem,
    clearCart,
  } = useCart();

  // Hooks must stay above the early returns below
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = (customer) => {
    // 1. Open WhatsApp first, directly inside the click, so browsers allow it
    const url = whatsappOrderUrl({ items, totalPrice, customer });
    window.open(url, "_blank", "noopener,noreferrer");

    // 2. Clear the cart and close the dialog
    // clearCart();
    setCheckoutOpen(false);
    setOrderPlaced(true);
  };

  /* ================= LOADING (keeps the footer at the bottom) ================= */
  if (!hydrated) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          bgcolor: "#fffcf8",
        }}
      >
        <CircularProgress sx={{ color: ORANGE }} aria-label="Loading cart" />
      </Box>
    );
  }

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 7,
          bgcolor: "#fffcf8",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              p: { xs: 3, sm: 5 },
              borderRadius: 5,
              border: `1px solid ${BORDER}`,
              bgcolor: "#ffffff",
            }}
          >
            {orderPlaced && (
              <Alert
                severity="success"
                sx={{ mb: 2.5, textAlign: "left", borderRadius: 3 }}
              >
                Your order is ready in WhatsApp. Tap <b>Send</b> there to
                confirm it with us.
              </Alert>
            )}

            <Box
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2.5,
                borderRadius: "50%",
                bgcolor: "#fff3e4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: ORANGE }} />
            </Box>

            <Typography
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.8rem" },
                fontWeight: 900,
                color: TEXT,
              }}
            >
              {orderPlaced ? "Thank you!" : "Your cart is waiting!"}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: MUTED,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                maxWidth: 340,
                mx: "auto",
              }}
            >
              {orderPlaced
                ? "We'll confirm availability and delivery details with you on WhatsApp."
                : "Something delicious is missing. Explore our freshly prepared sweets and find your next favourite."}
            </Typography>

            <Button
              component={Link}
              href="/#menu"
              variant="contained"
              startIcon={<StorefrontRoundedIcon />}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 3,
                minHeight: 50,
                px: 3,
                borderRadius: 3,
                bgcolor: ORANGE,
                fontWeight: 800,
                textTransform: "none",
                "&:hover": { bgcolor: DARK_ORANGE },
              }}
            >
              Explore our menu
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  /* ================= CART WITH ITEMS ================= */
  return (
    <Box
      sx={{
        minHeight: "70vh",
        bgcolor: "#fffcf8",
        pb: { xs: 5, md: 8 },
      }}
    >
      {/* PAGE HEADER */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #fff2df 0%, #fffaf3 65%, #fff5e8 100%)",
          borderBottom: "1px solid #f3e7d7",
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            href="/#menu"
            startIcon={<ArrowBackRoundedIcon />}
            sx={{
              mb: 2,
              color: "#92400e",
              fontWeight: 800,
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(217,119,6,.08)" },
            }}
          >
            Continue shopping
          </Button>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  letterSpacing: 2,
                  fontWeight: 900,
                  color: DARK_ORANGE,
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                A little sweetness goes a long way
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.7rem" },
                  fontWeight: 900,
                  letterSpacing: "-1.2px",
                  lineHeight: 1.15,
                  color: TEXT,
                }}
              >
                Your shopping bag
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  color: MUTED,
                }}
              >
                Review your treats before placing your order.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1.2,
                borderRadius: 3,
                bgcolor: "#ffffff",
                border: "1px solid #f3dfc5",
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ color: ORANGE, fontSize: 22 }} />

              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "0.9rem",
                  color: TEXT,
                }}
              >
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CART CONTENT */}
      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "minmax(0, 1.65fr) minmax(290px, 0.85fr)",
            },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}
        >
          {/* CART ITEMS */}
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: TEXT,
                }}
              >
                Your treats
              </Typography>

              <Button
                onClick={clearCart}
                startIcon={<DeleteOutlineRoundedIcon />}
                sx={{
                  color: "#a16207",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    bgcolor: "#fff1e7",
                    color: "#b91c1c",
                  },
                }}
              >
                Clear cart
              </Button>
            </Box>

            <Box sx={{ display: "grid", gap: 1.5 }}>
              {items.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1.5, sm: 2 },
                    p: { xs: 1.25, sm: 2 },
                    border: `1px solid ${BORDER}`,
                    borderRadius: { xs: 3, sm: 4 },
                    bgcolor: "#ffffff",
                    transition: "border-color .2s ease, box-shadow .2s ease",
                    "&:hover": {
                      borderColor: "#f2cfaa",
                      boxShadow: "0 5px 18px rgba(120,53,15,.045)",
                    },
                  }}
                >
                  {/* PRODUCT IMAGE */}
                  <Box
                    sx={{
                      width: { xs: 84, sm: 112 },
                      height: { xs: 94, sm: 116 },
                      flexShrink: 0,
                      borderRadius: 3,
                      overflow: "hidden",
                      bgcolor: "#fff3e4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.4rem",
                    }}
                  >
                    {item.image ? (
                      <Box
                        component="img"
                        src={imageUrl(item.image)}
                        alt={item.name}
                        loading="lazy"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      item.emoji || "🍰"
                    )}
                  </Box>

                  {/* PRODUCT DETAILS */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.88rem", sm: "1rem" },
                        fontWeight: 900,
                        lineHeight: 1.4,
                        color: TEXT,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        color: MUTED,
                        fontSize: { xs: "0.76rem", sm: "0.85rem" },
                      }}
                    >
                      ₹{item.price} each
                    </Typography>

                    {/* QUANTITY CONTROLS */}
                    <Box
                      sx={{
                        mt: 1.5,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        p: 0.4,
                        borderRadius: 2.5,
                        border: "1px solid #f0e6dc",
                        bgcolor: "#fffcf8",
                      }}
                    >
                      <IconButton
                        size="small"
                        aria-label={
                          item.qty === 1 ? "Remove item" : "Decrease quantity"
                        }
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 2,
                          color: DARK_ORANGE,
                          "&:hover": { bgcolor: "#ffedd5" },
                        }}
                      >
                        {item.qty === 1 ? (
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        ) : (
                          <RemoveRoundedIcon fontSize="small" />
                        )}
                      </IconButton>

                      <Typography
                        sx={{
                          minWidth: 24,
                          textAlign: "center",
                          fontSize: "0.9rem",
                          fontWeight: 900,
                          color: TEXT,
                        }}
                      >
                        {item.qty}
                      </Typography>

                      <IconButton
                        size="small"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 2,
                          bgcolor: ORANGE,
                          color: "#ffffff",
                          "&:hover": { bgcolor: DARK_ORANGE },
                        }}
                      >
                        <AddRoundedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* LINE TOTAL */}
                  <Box
                    sx={{
                      alignSelf: "stretch",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      flexShrink: 0,
                    }}
                  >
                    <IconButton
                      size="small"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                      sx={{
                        color: "#a8a29e",
                        "&:hover": {
                          bgcolor: "#fef2f2",
                          color: "#dc2626",
                        },
                      }}
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      sx={{
                        fontSize: { xs: "0.88rem", sm: "1.05rem" },
                        fontWeight: 900,
                        color: DARK_ORANGE,
                        whiteSpace: "nowrap",
                        pb: 0.5,
                      }}
                    >
                      ₹{item.qty * item.price}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* CONTINUE SHOPPING */}
            <Button
              component={Link}
              href="/#menu"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                mt: 2,
                color: DARK_ORANGE,
                fontWeight: 800,
                textTransform: "none",
                "&:hover": { bgcolor: "#fff3e4" },
              }}
            >
              Add more treats
            </Button>
          </Box>

          {/* ORDER SUMMARY */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 4,
              border: "1px solid #f0dfcd",
              bgcolor: "#ffffff",
              position: { md: "sticky" },
              top: { md: 24 },
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 900,
                color: TEXT,
              }}
            >
              Order summary
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: MUTED,
                fontSize: "0.83rem",
              }}
            >
              A quick look at your selection
            </Typography>

            <Divider sx={{ my: 2.5, borderColor: "#f0e7dd" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mb: 1.5,
              }}
            >
              <Typography sx={{ color: MUTED, fontSize: "0.9rem" }}>
                Items subtotal
              </Typography>

              <Typography
                sx={{
                  fontWeight: 800,
                  color: TEXT,
                  fontSize: "0.9rem",
                }}
              >
                ₹{totalPrice}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mb: 1.5,
              }}
            >
              <Typography sx={{ color: MUTED, fontSize: "0.9rem" }}>
                Delivery
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  color: "#15803d",
                }}
              >
                Confirm on WhatsApp
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: "#f0e7dd" }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 900,
                    color: TEXT,
                  }}
                >
                  Estimated total
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: "0.72rem",
                    color: MUTED,
                  }}
                >
                  Delivery charges may apply
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: "1.45rem", sm: "1.7rem" },
                  fontWeight: 900,
                  letterSpacing: "-0.6px",
                  color: DARK_ORANGE,
                  whiteSpace: "nowrap",
                }}
              >
                ₹{totalPrice}
              </Typography>
            </Box>

            {/* WHATSAPP CHECKOUT */}
            <Button
              fullWidth
              variant="contained"
              startIcon={<WhatsAppIcon />}
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => setCheckoutOpen(true)}
              sx={{
                mt: 3,
                minHeight: 54,
                borderRadius: 3,
                bgcolor: "#25D366",
                color: "#ffffff",
                fontSize: "0.95rem",
                fontWeight: 900,
                textTransform: "none",
                boxShadow: "0 6px 18px rgba(37,211,102,.2)",
                "&:hover": {
                  bgcolor: "#1eae53",
                  boxShadow: "0 8px 22px rgba(37,211,102,.25)",
                },
              }}
            >
              Order on WhatsApp
            </Button>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                p: 1.5,
                borderRadius: 2.5,
                bgcolor: "#f7f7f4",
              }}
            >
              <LocalCafeRoundedIcon
                sx={{
                  fontSize: 19,
                  color: ORANGE,
                  mt: 0.1,
                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.76rem",
                  lineHeight: 1.7,
                  color: MUTED,
                }}
              >
                Your order will be sent directly to our bakery on WhatsApp.
                We&apos;ll confirm availability and delivery details with you.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* CUSTOMER DETAILS DIALOG */}
      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleOrder}
        totalPrice={totalPrice}
      />
    </Box>
  );
}