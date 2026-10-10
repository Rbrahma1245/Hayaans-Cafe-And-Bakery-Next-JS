"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function ClearCartOnMount() {
    const { clearCart, hydrated } = useCart();

    useEffect(() => {
        // Wait until the saved cart has loaded, otherwise the
        // hydration step would restore the items right after we clear.
        if (hydrated) clearCart();
    }, [hydrated, clearCart]);

    return null;
}