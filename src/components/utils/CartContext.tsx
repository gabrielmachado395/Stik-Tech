import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    variant?: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return ctx;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
    
    const saved = localStorage.getItem("cart-items");
    return saved ? JSON.parse(saved) : [];
    });

    // Sempre que items mudar, salva no localStorage
    useEffect(() => {
        localStorage.setItem("cart-items", JSON.stringify(items));
    }, [items]);

    const addItem = (item: CartItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.variant === item.variant);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id && i.variant === item.variant
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        })
    }

    const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

    const updateQuantity = (id: string, quantity: number) => 
        setItems((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, quantity } : i
            )
        );

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        
        <CartContext.Provider value={{items, addItem, removeItem, updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    );
};
