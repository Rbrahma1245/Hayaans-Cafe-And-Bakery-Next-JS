import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";

import { getSweets, getSweet } from "@/lib/api";
import { imageUrl } from "@/lib/image";
import { parseSizes } from "@/utils/const-function";

const PHONE_DISPLAY = "083102 21057";
const PHONE_LINK = "tel:+918310221057";

const WHATSAPP_LINK =
  "https://wa.me/918310221057?text=" +
  encodeURIComponent(
    "Hi HaYaan's Cafe And Bakery, I would like to order a sweet.",
  );

const ADDRESS =
  "Victorian Comfort, 18/1, Victoria Rd, Victoria Layout, Bengaluru, Karnataka 560047";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("HaYaan's Cafe And Bakery, " + ADDRESS);

export async function generateStaticParams() {
  const sweets = await getSweets();

  return sweets.map((sweet) => ({
    id: String(sweet.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const sweet = await getSweet(id);

  return {
    title: sweet
      ? `${sweet.name} | HaYaan's Cafe And Bakery`
      : "HaYaan's Cafe And Bakery",
    description:
      sweet?.description || "Fresh sweets from HaYaan's Cafe And Bakery",
  };
}

export default async function SweetPage({ params }) {
  const { id } = await params;

  const sweet = await getSweet(id);

  if (!sweet) {
    notFound();
  }

  const sizes = parseSizes(sweet.sizes);
  const hasSizes = sizes.length > 0;


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fffbf7",
        color: "#292524",
        overflowX: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #eee7df",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            mx: "auto",
            px: { xs: 1.5, sm: 2 },
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 1.5,
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

              <Typography
                component="span"
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: "0.82rem",
                    sm: "0.95rem",
                  },
                  color: "#451a03",
                  lineHeight: 1,
                  whiteSpace: {
                    xs: "nowrap",
                    sm: "normal",
                  },
                }}
              >
                HaYaan&apos;s Cafe And Bakery
              </Typography>
            </Box>
          </Link>

          <Button
            component="a"
            href={PHONE_LINK}
            startIcon={<PhoneRoundedIcon />}
            size="small"
            sx={{
              display: {
                xs: "none",
                sm: "inline-flex",
              },
              color: "#b45309",
              fontWeight: 700,
              textTransform: "none",
              minWidth: 0,
              px: 1,
            }}
          >
            {PHONE_DISPLAY}
          </Button>
        </Box>
      </Box>

      {/* ================= MAIN ================= */}
      <Box
        component="main"
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          px: {
            xs: 1.25,
            sm: 2,
          },
          py: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },
        }}
      >
        {/* BACK */}
        <Link
          href="/#menu"
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon sx={{ fontSize: 18 }} />}
            sx={{
              mb: {
                xs: 1.5,
                sm: 2,
              },
              px: 0.5,
              color: "#57534e",
              fontWeight: 700,
              fontSize: {
                xs: "0.8rem",
                sm: "0.85rem",
              },
              textTransform: "none",
              minWidth: 0,
            }}
          >
            Back to all sweets
          </Button>
        </Link>

        {/* ================= PRODUCT ================= */}
        <Card
          elevation={0}
          sx={{
            border: "1px solid #e7e5e4",
            borderRadius: {
              xs: 2,
              sm: 2.5,
            },
            overflow: "hidden",
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "0.95fr 1.05fr",
              },
            }}
          >
            {/* IMAGE */}
            <Box
              sx={{
                height: {
                  xs: 240,
                  sm: 300,
                  md: 390,
                },
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff7ed",
                background:
                  sweet.tint || "linear-gradient(135deg, #fff7ed, #fef3c7)",
              }}
            >
              {sweet.image ? (
                <Box
                  component="img"
                  src={imageUrl(sweet.image)}
                  alt={sweet.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: {
                      xs: "5rem",
                      sm: "6rem",
                      md: "7rem",
                    },
                  }}
                >
                  {sweet.emoji || "🍰"}
                </Typography>
              )}

              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.15), transparent 35%)",
                }}
              />

              {/* Category */}
              {sweet.category && (
                <Chip
                  label={sweet.category}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    height: 28,
                    bgcolor: "rgba(255,255,255,.94)",
                    color: "#92400e",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    borderRadius: 1.5,
                  }}
                />
              )}
            </Box>

            {/* DETAILS */}
            <Box
              sx={{
                p: {
                  xs: 1.75,
                  sm: 2.5,
                  md: 3,
                },
                minWidth: 0,
              }}
            >
              {/* CATEGORY */}
              {sweet.category && (
                <Typography
                  sx={{
                    color: "#d97706",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {sweet.category}
                </Typography>
              )}

              {/* TITLE */}
              <Typography
                component="h1"
                sx={{
                  mt: 0.4,
                  fontSize: {
                    xs: "1.55rem",
                    sm: "1.9rem",
                    md: "2.2rem",
                  },
                  lineHeight: 1.12,
                  fontWeight: 900,
                  color: "#292524",
                  letterSpacing: "-0.5px",
                  overflowWrap: "break-word",
                }}
              >
                {sweet.name}
              </Typography>

              {/* DESCRIPTION */}
              {sweet.description && (
                <Typography
                  sx={{
                    mt: 1,
                    color: "#57534e",
                    fontSize: {
                      xs: "0.84rem",
                      sm: "0.9rem",
                    },
                    lineHeight: 1.6,
                  }}
                >
                  {sweet.description}
                </Typography>
              )}

              {/* FRESH */}
              <Box
                sx={{
                  mt: 1.25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 0.75,
                  width: "fit-content",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    minWidth: 8,
                    borderRadius: "50%",
                    bgcolor: "#22c55e",
                    display: "block",
                  }}
                />

                <Typography
                  component="span"
                  sx={{
                    color: "#166534",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    lineHeight: "8px",
                    display: "block",
                  }}
                >
                  Freshly prepared
                </Typography>
              </Box>

              <Divider sx={{ my: 1.75 }} />

              {/* ABOUT */}
              {sweet.details && (
                <Box>
                  <Typography
                    fontWeight={800}
                    sx={{
                      mb: 0.5,
                      fontSize: {
                        xs: "0.9rem",
                        sm: "0.95rem",
                      },
                    }}
                  >
                    About this treat
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.84rem",
                      },
                      lineHeight: 1.6,
                    }}
                  >
                    {sweet.details}
                  </Typography>
                </Box>
              )}

              {/* SIZES */}
              {/* SIZES */}
              {hasSizes ? (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    fontWeight={800}
                    sx={{
                      mb: 0.8,
                      fontSize: {
                        xs: "0.9rem",
                        sm: "0.95rem",
                      },
                    }}
                  >
                    Choose your size
                  </Typography>

                  <Stack spacing={0.7}>
                    {sizes.map((size, index) => (
                      <Paper
                        key={`${size.label}-${index}`}
                        elevation={0}
                        sx={{
                          px: 1.25,
                          py: 1,
                          borderRadius: 1.8,
                          border: "1px solid #e7e5e4",
                          bgcolor: "#fafaf9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                          "&:hover": {
                            borderColor: "#fdba74",
                            bgcolor: "#fff7ed",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={0.7}
                          sx={{
                            minWidth: 0,
                            alignItems: "center",
                          }}
                        >
                          <ShoppingBagOutlinedIcon
                            sx={{
                              fontSize: 17,
                              color: "#d97706",
                            }}
                          />

                          <Typography
                            fontWeight={700}
                            sx={{
                              fontSize: {
                                xs: "0.78rem",
                                sm: "0.84rem",
                              },
                            }}
                          >
                            {size.label}
                          </Typography>
                        </Stack>

                        <Typography
                          fontWeight={900}
                          sx={{
                            color: "#b45309",
                            fontSize: {
                              xs: "0.85rem",
                              sm: "0.9rem",
                            },
                            whiteSpace: "nowrap",
                          }}
                        >
                          ₹{size.price}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              ) : (
                /* PRICE */
                <Box
                  sx={{
                    mt: 2,
                    px: 1.5,
                    py: 1.25,
                    borderRadius: 2,
                    bgcolor: "#fff7ed",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#92400e",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                    }}
                  >
                    Today&apos;s price
                  </Typography>

                  {sweet.price != null ? (
                    <Typography
                      sx={{
                        mt: 0.1,
                        color: "#b45309",
                        fontWeight: 900,
                        fontSize: {
                          xs: "1.45rem",
                          sm: "1.7rem",
                        },
                      }}
                    >
                      ₹{sweet.price}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        mt: 0.2,
                        color: "#92400e",
                        fontSize: "0.78rem",
                      }}
                    >
                      Ask at the counter for today&apos;s price.
                    </Typography>
                  )}
                </Box>
              )}

              {/* ORDER */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.8rem",
                    },
                    lineHeight: 1.5,
                  }}
                >
                  Contact us to place your order.
                </Typography>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={1}
                >
                  <Button
                    fullWidth
                    component="a"
                    href={PHONE_LINK}
                    variant="contained"
                    startIcon={<PhoneRoundedIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      minHeight: 42,
                      borderRadius: 2,
                      bgcolor: "#d97706",
                      textTransform: "none",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      boxShadow: "0 4px 12px rgba(217,119,6,.18)",
                      "&:hover": {
                        bgcolor: "#b45309",
                      },
                    }}
                  >
                    Call to Order
                  </Button>

                  <Button
                    fullWidth
                    component="a"
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<WhatsAppIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      minHeight: 42,
                      borderRadius: 2,
                      borderColor: "#86efac",
                      color: "#15803d",
                      bgcolor: "#f0fdf4",
                      textTransform: "none",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      "&:hover": {
                        bgcolor: "#dcfce7",
                        borderColor: "#4ade80",
                      },
                    }}
                  >
                    WhatsApp
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* ================= STORE INFO ================= */}
        <Box
          sx={{
            mt: {
              xs: 1.5,
              sm: 2,
            },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 1.25,
          }}
        >
          {/* ADDRESS */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 1.5,
                sm: 2,
              },
              borderRadius: 2,
              border: "1px solid #e7e5e4",
              bgcolor: "#fff",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 1.5,
                  bgcolor: "#fff7ed",
                  color: "#d97706",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <LocationOnOutlinedIcon sx={{ fontSize: 19 }} />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={800} sx={{ fontSize: "0.85rem" }}>
                  Visit our bakery
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.3,
                    fontSize: "0.74rem",
                    lineHeight: 1.5,
                  }}
                >
                  {ADDRESS}
                </Typography>

                <Button
                  component="a"
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    mt: 0.3,
                    p: 0,
                    color: "#b45309",
                    fontWeight: 800,
                    textTransform: "none",
                    fontSize: "0.75rem",
                  }}
                >
                  Get directions →
                </Button>
              </Box>
            </Stack>
          </Paper>

          {/* PHONE */}
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 1.5,
                sm: 2,
              },
              borderRadius: 2,
              border: "1px solid #e7e5e4",
              bgcolor: "#fff",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 1.5,
                  bgcolor: "#f0fdf4",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <PhoneRoundedIcon sx={{ fontSize: 19 }} />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={800} sx={{ fontSize: "0.85rem" }}>
                  Need help ordering?
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.3,
                    fontSize: "0.74rem",
                    lineHeight: 1.5,
                  }}
                >
                  Give us a call and we&apos;ll be happy to help.
                </Typography>

                <Button
                  component="a"
                  href={PHONE_LINK}
                  size="small"
                  sx={{
                    mt: 0.3,
                    p: 0,
                    color: "#15803d",
                    fontWeight: 800,
                    textTransform: "none",
                    fontSize: "0.75rem",
                  }}
                >
                  {PHONE_DISPLAY} →
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* ================= FOOTER ================= */}
        <Box
          sx={{
            textAlign: "center",
            py: {
              xs: 2.5,
              sm: 3,
            },
          }}
        >
          <Typography
            color="text.secondary"
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.75rem",
              },
            }}
          >
            Fresh sweets, baked with love at HaYaan&apos;s Cafe And Bakery.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
