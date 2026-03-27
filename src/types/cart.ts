export interface Product {
    id: string;
    name: string;
    type: string;
    price: number;
    description?: string | null;
    is_weekly_highlight?: boolean;
    weekly_highlight_image?: string;
    image: string | null;
    quantity?: number;
}

export interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}
