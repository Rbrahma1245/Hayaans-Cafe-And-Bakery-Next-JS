"use client";

import Link from "next/link";
import {
    AppBar,
    Badge,
    Box,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/context/CartContext";

/* ================= BRAND ================= */
function Brand() {
    return (
        <Stack
            component={Link}
            href="/"
            aria-label="HaYaan's Cafe And Bakery, home"
            direction="row"
            spacing={{ xs: 0.8, sm: 1 }}
            sx={{
                alignItems: "center",
                minWidth: 0,
                flex: "1 1 auto",
                textDecoration: "none",
                color: "inherit",
            }}
        >
            {/* Brand Icon */}
            <Box
                sx={{
                    width: { xs: 32, sm: 38 },
                    height: { xs: 32, sm: 38 },
                    minWidth: { xs: 32, sm: 38 },
                    borderRadius: 2,
                    bgcolor: "#fff7ed",
                    border: "1px solid #fed7aa",
                    color: "#d97706",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                }}
            >
                <Box
                    component="img"
                    src="/logo.png"
                    alt=""
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
                component="span"
                sx={{
                    m: 0,
                    p: 0,
                    fontWeight: 800,
                    color: "#451a03",
                    fontSize: {
                        xs: "0.72rem",
                        sm: "0.9rem",
                        md: "1rem",
                    },
                    lineHeight: 1.25,
                    whiteSpace: {
                        xs: "normal",
                        sm: "nowrap",
                    },
                    overflowWrap: "normal",
                    wordBreak: "normal",
                    minWidth: 0,
                    maxWidth: {
                        xs: 150,
                        sm: "none",
                    },
                }}
            >
                HaYaan&apos;s Cafe And Bakery
            </Typography>
        </Stack>
    );
}

/* ================= FRESH BADGE ================= */
function FreshBadge() {
    return (
        <Box
            sx={{
                display: { xs: "none", md: "inline-flex" },
                alignItems: "center",
                justifyContent: "center",
                gap: 0.8,
                px: 1.5,
                py: 0.65,
                borderRadius: 99,
                bgcolor: "#fff7ed",
                border: "1px solid #fed7aa",
                flexShrink: 0,
            }}
        >
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
    );
}

/* ================= CART BUTTON ================= */
export function CartButton() {
    const { totalItems, totalPrice, hydrated } = useCart();

    const count = hydrated ? totalItems : 0;
    const total = hydrated ? totalPrice : 0;

    return (
        <Box
            component={Link}
            href="/cart"
            aria-label={`Cart, ${count} items, total ₹${total}`}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.6, sm: 1.2 },
                px: { xs: 1, sm: 1.6 },
                py: { xs: 0.6, sm: 0.8 },
                borderRadius: 99,
                textDecoration: "none",
                bgcolor: "#fff7ed",
                color: "#92400e",
                border: "1px solid #fed7aa",
                flexShrink: 0,
                transition: "all 0.2s ease",
                "&:hover": {
                    bgcolor: "#ffedd5",
                    borderColor: "#fdba74",
                },
            }}
        >
            <Badge
                badgeContent={count}
                showZero={false}
                sx={{
                    "& .MuiBadge-badge": {
                        bgcolor: "#d97706",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: { xs: "0.6rem", sm: "0.7rem" },
                        minWidth: { xs: 16, sm: 20 },
                        height: { xs: 16, sm: 20 },
                    },
                }}
            >
                <ShoppingBagOutlinedIcon
                    sx={{
                        fontSize: { xs: 19, sm: 24 },
                    }}
                />
            </Badge>

            <Typography
                component="span"
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: "0.72rem", sm: "0.85rem" },
                    whiteSpace: "nowrap",
                }}
            >
                ₹{total}
            </Typography>
        </Box>
    );
}

/* ================= TOP BAR ================= */
export default function TopBar() {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "rgba(255,255,255,.9)",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid #eee7df",
                color: "#292524",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    gap: { xs: 1, sm: 1.5 },
                    px: { xs: 1.5, sm: 2, md: 3 },
                    minHeight: { xs: 60, sm: 68 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flex: "1 1 auto",
                        minWidth: 0,
                    }}
                >
                    <Brand />
                    {/* <FreshBadge /> */}
                </Box>

                <CartButton />
            </Toolbar>
        </AppBar>
    );
}