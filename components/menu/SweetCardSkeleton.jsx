"use client";

import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function SweetCardSkeleton() {
    return (
        <Card
            elevation={0}
            aria-hidden="true"
            sx={{
                height: "100%",
                minHeight: { xs: 390, sm: 410 },
                display: "flex",
                flexDirection: "column",
                borderRadius: 4,
                overflow: "hidden",
                bgcolor: "#ffffff",
                border: "1px solid #eee7df",
            }}
        >
            {/* Image area (same height as SweetCard) */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 220, sm: 230 },
                    minHeight: { xs: 220, sm: 230 },
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                    sx={{ bgcolor: "#fff1e0" }}
                />

                {/* Category chip placeholder */}
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={72}
                    height={28}
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        borderRadius: 99,
                        bgcolor: "rgba(255,255,255,.7)",
                    }}
                />
            </Box>

            {/* Content area */}
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, sm: 2.2 },
                    "&:last-child": { pb: { xs: 2, sm: 2.2 } },
                }}
            >
                {/* Name + price */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 1,
                        minHeight: 50,
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="75%" height={24} animation="wave" />
                        <Skeleton variant="text" width="45%" height={24} animation="wave" />
                    </Box>
                    <Skeleton
                        variant="rounded"
                        width={48}
                        height={26}
                        animation="wave"
                        sx={{ borderRadius: 2, flexShrink: 0 }}
                    />
                </Box>

                {/* Description (2 lines) */}
                <Box sx={{ mt: 1, minHeight: "2.56em" }}>
                    <Skeleton variant="text" width="100%" animation="wave" />
                    <Skeleton variant="text" width="80%" animation="wave" />
                </Box>

                {/* Bottom button placeholder (matches the new Add to cart button) */}
                <Box sx={{ mt: "auto", pt: 2 }}>
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height={36}
                        animation="wave"
                        sx={{ borderRadius: 99 }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}