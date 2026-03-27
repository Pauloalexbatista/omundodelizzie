import type { Metadata } from "next";
import { CartProvider } from '@/context/CartContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "O Mundo de Lizzie | Trabalhos Manuais Personalizados",
  description: "Personalização de fraldas, babetes, conjuntos de batismo e muito mais. Feito à mão com amor.",
  keywords: "artesanato, personalizado, bebé, batismo, ponto cruz, feito à mão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
