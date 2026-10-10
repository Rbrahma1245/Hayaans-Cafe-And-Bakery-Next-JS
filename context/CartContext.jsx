"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "sweets-cart";

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [hydrated, setHydrated] = useState(false);

    // Load once on the client
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setItems(JSON.parse(raw));
        } catch { }
        setHydrated(true);
    }, []);

    // Save on change (only after the initial load, so we don't wipe saved data)
    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch { }
    }, [items, hydrated]);

    const addItem = useCallback((sweet) => {
        setItems((prev) => {
            const found = prev.find((i) => i.id === sweet.id);
            if (found) {
                return prev.map((i) =>
                    i.id === sweet.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [
                ...prev,
                {
                    id: sweet.id,
                    name: sweet.name,
                    price: Number(sweet.price) || 0,
                    image: sweet.image || null,
                    emoji: sweet.emoji || "🍰",
                    qty: 1,
                },
            ];
        });
    }, []);

    const updateQty = useCallback((id, qty) => {
        setItems((prev) =>
            qty <= 0
                ? prev.filter((i) => i.id !== id)
                : prev.map((i) => (i.id === id ? { ...i, qty } : i))
        );
    }, []);

    const removeItem = useCallback(
        (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
        []
    );

    const clearCart = useCallback(() => setItems([]), []);

    const { totalItems, totalPrice } = useMemo(
        () => ({
            totalItems: items.reduce((n, i) => n + i.qty, 0),
            totalPrice: items.reduce((n, i) => n + i.qty * i.price, 0),
        }),
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            hydrated,
            totalItems,
            totalPrice,
            addItem,
            updateQty,
            removeItem,
            clearCart,
        }),
        [items, hydrated, totalItems, totalPrice, addItem, updateQty, removeItem, clearCart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}