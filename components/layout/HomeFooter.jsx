"use client";

import { Box, Container, Divider, Stack, Typography } from "@mui/material";

export default function HomeFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "#292524",
        color: "#fff",
        py: 3,
        px: 2,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        {/* TOP ROW */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <Typography
            component="p"
            sx={{
              m: 0,
              p: 0,
              fontWeight: 800,
              fontSize: {
                xs: "0.72rem",
                sm: "0.85rem",
              },
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              color: "#ffffff",
            }}
          >
            HaYaan&apos;s Cafe And Bakery
          </Typography>

          {/* RIGHT */}
          <Typography
            component="p"
            sx={{
              m: 0,
              p: 0,
              color: "#a8a29e",
              fontSize: {
                xs: "0.65rem",
                sm: "0.72rem",
              },
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              textAlign: "right",
            }}
          >
            Victoria Road, Bengaluru
          </Typography>
        </Stack>

        {/* DIVIDER */}
        <Divider
          sx={{
            my: 2,
            borderColor: "rgba(255,255,255,0.1)",
          }}
        />

        {/* BOTTOM */}
        <Typography
          component="p"
          sx={{
            m: 0,
            p: 0,
            textAlign: "center",
            color: "#78716c",
            fontSize: {
              xs: "0.65rem",
              sm: "0.7rem",
            },
            lineHeight: 1.5,
          }}
        >
          Fresh sweets, baked with love.
        </Typography>
      </Container>
    </Box>
  );
}
