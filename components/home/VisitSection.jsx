"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const ADDRESS =
  "Victorian Comfort, 18/1, Victoria Rd, Victoria Layout, Bengaluru, Karnataka 560047";

const PHONE_DISPLAY = "083102 21057";
const PHONE_LINK = "tel:+918310221057";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("HaYaan's Cafe And Bakery, " + ADDRESS);

export default function VisitSection() {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        scrollMarginTop: 20,
        py: {
          xs: 5,
          sm: 7,
          md: 8,
        },
        bgcolor: "#fffbf7",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        {/* Heading */}
        <Box
          sx={{
            textAlign: "center",
            mb: 3.5,
          }}
        >
          <Typography
            sx={{
              color: "#d97706",
              fontWeight: 800,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            We&apos;d love to see you
          </Typography>

          <Typography
            component="h2"
            sx={{
              mt: 0.6,
              fontSize: {
                xs: "1.8rem",
                sm: "2.3rem",
              },
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            Come and visit us
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#78716c",
              fontSize: "0.9rem",
            }}
          >
            Drop by for something sweet or give us a call.
          </Typography>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          {/* Address */}
          <Card
            elevation={0}
            sx={{
              p: {
                xs: 2,
                sm: 2.5,
              },
              borderRadius: 3,
              border: "1px solid #e7e5e4",
              bgcolor: "#fff",
              transition: "all .2s ease",
              "&:hover": {
                borderColor: "#fdba74",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 25px rgba(0,0,0,.05)",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: "#fff7ed",
                  color: "#d97706",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <LocationOnOutlinedIcon />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                  }}
                >
                  Address
                </Typography>

                <Typography
                  sx={{
                    mt: 0.6,
                    color: "#78716c",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                  }}
                >
                  {ADDRESS}
                </Typography>

                <Button
                  component="a"
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />}
                  sx={{
                    mt: 1,
                    p: 0,
                    minWidth: 0,
                    color: "#b45309",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    textTransform: "none",
                  }}
                >
                  Get directions
                </Button>
              </Box>
            </Stack>
          </Card>

          {/* Phone */}
          <Card
            elevation={0}
            sx={{
              p: {
                xs: 2,
                sm: 2.5,
              },
              borderRadius: 3,
              border: "1px solid #e7e5e4",
              bgcolor: "#fff",
              transition: "all .2s ease",
              "&:hover": {
                borderColor: "#86efac",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 25px rgba(0,0,0,.05)",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: "#f0fdf4",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <PhoneRoundedIcon />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                  }}
                >
                  Phone
                </Typography>

                <Typography
                  sx={{
                    mt: 0.6,
                    color: "#78716c",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                  }}
                >
                  {PHONE_DISPLAY}
                </Typography>

                <Button
                  component="a"
                  href={PHONE_LINK}
                  endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />}
                  sx={{
                    mt: 1,
                    p: 0,
                    minWidth: 0,
                    color: "#15803d",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    textTransform: "none",
                  }}
                >
                  Call us
                </Button>
              </Box>
            </Stack>
          </Card>
        </Box>

        {/* Info */}
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            px: 2,
            py: 1.5,
            borderRadius: 2.5,
            bgcolor: "#fff7ed",
            border: "1px solid #fed7aa",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{alignItems:"center", justifyContent:"center"}}
          >
            <AccessTimeRoundedIcon
              sx={{
                fontSize: 18,
                color: "#d97706",
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                color: "#92400e",
                fontSize: {
                  xs: "0.72rem",
                  sm: "0.8rem",
                },
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Fresh sweets prepared with care at HaYaan&apos;s Cafe And Bakery.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
