export interface Product {
    id: number;
    name: string;
    type: string;
    years?: number; // Optional because legacy data might not have it, but clearly used in app as 'year'. Wait, admin page uses 'year'.
    year?: number; // Admin page uses 'year', so I should probably stick to that.
    region?: string;
    price: number;
    description?: string;
    featured?: boolean;
    image: string;
    quantity?: number;
}

export interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}
