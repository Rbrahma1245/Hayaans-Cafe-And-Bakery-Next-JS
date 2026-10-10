"use client";

import { Box, Skeleton, Stack } from "@mui/material";
import SweetCardSkeleton from "./SweetCardSkeleton";

export default function MenuSkeleton({ count = 8 }) {
  return (
    <Box aria-busy="true" aria-label="Loading sweets">
      {/* Category pills */}
      <Box sx={{ width: "100%", overflow: "hidden", pb: 1, mb: { xs: 3, sm: 4 } }}>
        <Stack
          direction="row"
          sx={{
            gap: 1,
            minWidth: "max-content",
            justifyContent: { xs: "flex-start", sm: "center" },
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={90}
              height={40}
              animation="wave"
              sx={{ borderRadius: 99 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Cards grid (same columns as Menu) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <SweetCardSkeleton key={i} />
        ))}
      </Box>
    </Box>
  );
}