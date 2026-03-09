'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        zipCode: '',
        city: '',
        phone: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const validateShippingInfo = () => {
        if (deliveryMethod === 'pickup') return true;
        return (
            shippingInfo.fullName.trim() !== '' &&
            shippingInfo.address.trim() !== '' &&
            shippingInfo.zipCode.trim() !== '' &&
            shippingInfo.city.trim() !== '' &&
            shippingInfo.phone.trim() !== ''
        );
    };

    const handleCheckout = async (paymentMethod: 'multibanco' | 'mbway') => {
        if (cart.length === 0) return;

        if (!validateShippingInfo()) {
            alert('Por favor, preencha todos os campos dos dados de envio.');
            return;
        }

        try {
            const currentSubtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
            const IVA_RATE = 0.23;
            const ivaAmount = currentSubtotal * IVA_RATE;
            const subtotalWithIva = currentSubtotal + ivaAmount;
            const shippingCharge = (deliveryMethod === 'pickup' || currentSubtotal >= 100) ? 0 : 10;
            const finalTotal = subtotalWithIva + shippingCharge;

            const orderData = {
                customer_name: shippingInfo.fullName,
                customer_address: deliveryMethod === 'pickup' ? 'Levantamento em Loja' : shippingInfo.address,
                customer_zipcode: deliveryMethod === 'pickup' ? '-' : shippingInfo.zipCode,
                customer_city: deliveryMethod === 'pickup' ? '-' : shippingInfo.city,
                customer_phone: shippingInfo.phone,
                delivery_method: deliveryMethod,
                shipping_cost: shippingCharge,
                items: cart,
                subtotal: currentSubtotal,
                iva: ivaAmount,
                total: finalTotal,
                status: 'por enviar',
                payment_method: paymentMethod
            };

            const { error } = await supabase
                .from('orders')
                .insert([orderData]);

            if (error) throw error;

            alert(`Encomenda registada com sucesso! (Método: ${paymentMethod.toUpperCase()})\n\nSeria agora redirecionado para a plataforma de pagamento.`);
            clearCart();
            window.location.href = '/';

        } catch (error) {
            console.error('Erro ao guardar encomenda:', error);
            alert('Erro ao processar a encomenda. Por favor tente novamente.');
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    // Constantes de negócio
    const IVA_RATE = 0.23;
    const SHIPPING_COST = 20;
    const FREE_SHIPPING_THRESHOLD = 100;

    // Cálculos dinâmicos baseados no estado actual do carrinho
    const currentSubtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    const ivaAmount = currentSubtotal * IVA_RATE;
    const subtotalWithIva = currentSubtotal + ivaAmount;

    const shippingCharge = (deliveryMethod === 'pickup' || currentSubtotal >= FREE_SHIPPING_THRESHOLD)
        ? 0
        : SHIPPING_COST;

    const finalTotal = subtotalWithIva + shippingCharge;

    const displayItems = cart.map(item => ({
        ...item,
        quantity: item.quantity || 1
    }));

    if (!mounted) return null;

    const styles = {
        pageContainer: {
            padding: '8rem 1rem 4rem',
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: '60vh',
        },
        title: {
            fontSize: 'var(--text-4xl)',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '2rem',
            textAlign: 'center' as const,
        },
        emptyCart: {
            textAlign: 'center' as const,
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-light)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem',
            alignItems: 'start',
        },
        itemsList: {
            backgroundColor: 'var(--color-light)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
        },
        item: {
            display: 'flex',
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-gray-200)',
            gap: '1.5rem',
            alignItems: 'center',
        },
        itemImage: {
            position: 'relative' as const,
            width: '100px',
            height: '100px',
            backgroundColor: '#f9fafb',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            flexShrink: 0,
        },
        itemInfo: {
            flex: 1,
        },
        summary: {
            backgroundColor: 'var(--color-light)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky' as const,
            top: '100px',
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            fontSize: 'var(--text-base)',
            color: 'var(--color-gray-700)',
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '2px solid var(--color-gray-200)',
            fontWeight: 800,
            fontSize: 'var(--text-xl)',
            color: 'var(--color-dark)',
        },
        btnPrimary: {
            display: 'block',
            width: '100%',
            padding: '1rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'center' as const,
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            marginTop: '1rem',
            transition: 'opacity 0.2s',
        },
        methodSelector: {
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            backgroundColor: '#f3f4f6',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
        },
        methodBtn: (active: boolean) => ({
            flex: 1,
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            backgroundColor: active ? 'white' : 'transparent',
            boxShadow: active ? 'var(--shadow-sm)' : 'none',
            color: active ? 'var(--color-primary)' : 'var(--color-gray-600)',
            transition: 'all 0.2s',
        }),
        removeBtn: {
            color: '#ef4444',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '0.875rem',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: '0.5rem',
            display: 'block',
            padding: 0,
        },
        paymentLabel: {
            display: 'block',
            marginTop: '2rem',
            fontSize: '0.8rem',
            color: 'var(--color-gray-500)',
            textAlign: 'center' as const,
            textTransform: 'uppercase' as const,
            letterSpacing: '1px',
        },
        paymentGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            marginTop: '0.5rem',
        },
        shippingForm: {
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-gray-200)',
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1rem',
        },
        formField: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '0.4rem',
        },
        input: {
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-gray-300)',
            fontSize: '1rem',
            width: '100%',
        }
    };

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>O Seu Carrinho</h1>

            {cart.length === 0 ? (
                <div style={styles.emptyCart}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-gray-500)', marginBottom: '2rem' }}>
                        O seu carrinho está vazio.
                    </p>
                    <Link href="/loja" style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        textDecoration: 'none'
                    }}>
                        Descobrir Vinhos
                    </Link>
                </div>
            ) : (
                <div className="cart-grid" style={styles.grid}>
                    {/* Items List */}
                    <div>
                        <div style={styles.methodSelector}>
                            <button
                                style={styles.methodBtn(deliveryMethod === 'delivery')}
                                onClick={() => setDeliveryMethod('delivery')}
                            >
                                Entrega ao Domicílio
                            </button>
                            <button
                                style={styles.methodBtn(deliveryMethod === 'pickup')}
                                onClick={() => setDeliveryMethod('pickup')}
                            >
                                Levantamento em Loja
                            </button>
                        </div>

                        {deliveryMethod === 'delivery' && (
                            <div style={styles.shippingForm}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dados de Envio</h3>
                                <div style={styles.formField}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Nome Completo</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Seu nome..."
                                        style={styles.input}
                                        value={shippingInfo.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div style={styles.formField}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Morada</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Rua, número, andar..."
                                        style={styles.input}
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                                    <div style={styles.formField}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Cód. Postal</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            placeholder="0000-000"
                                            style={styles.input}
                                            value={shippingInfo.zipCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div style={styles.formField}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Localidade</label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Cidade..."
                                            style={styles.input}
                                            value={shippingInfo.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div style={styles.formField}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Telemóvel</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="9xx xxx xxx"
                                        style={styles.input}
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', ...styles.itemsList }}>
                            {displayItems.map((item) => (
                                <div key={item.id} style={styles.item}>
                                    <div style={styles.itemImage}>
                                        <Image
                                            src={item.image || '/images/products/douro-2018.png'}
                                            alt={item.name}
                                            fill
                                            style={{ objectFit: 'contain', padding: '0.5rem' }}
                                        />
                                    </div>
                                    <div style={styles.itemInfo}>
                                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                        <p style={{ color: 'var(--color-secondary)', fontSize: '0.9rem' }}>{item.type} | {item.year}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={styles.removeBtn}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>€{item.price.toFixed(2)}</div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            gap: '0.75rem',
                                            backgroundColor: '#f3f4f6',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: 'var(--radius-sm)'
                                        }}>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.2rem',
                                                    color: 'var(--color-gray-600)',
                                                    padding: '0 5px'
                                                }}
                                            >
                                                -
                                            </button>
                                            <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.2rem',
                                                    color: 'var(--color-gray-600)',
                                                    padding: '0 5px'
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div style={styles.summary}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-dark)' }}>Resumo do Pedido</h2>

                        <div style={styles.summaryRow}>
                            <span>Produtos (Base)</span>
                            <span>€{currentSubtotal.toFixed(2)}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>IVA (23%)</span>
                            <span>€{ivaAmount.toFixed(2)}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Subtotal c/ IVA</span>
                            <span>€{subtotalWithIva.toFixed(2)}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Portes de Envio</span>
                            <span style={{ color: shippingCharge === 0 ? '#16a34a' : 'inherit' }}>
                                {shippingCharge === 0 ? 'Grátis' : `€${shippingCharge.toFixed(2)}`}
                            </span>
                        </div>

                        {deliveryMethod === 'delivery' && currentSubtotal < FREE_SHIPPING_THRESHOLD && (
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                                Adicione mais €{(FREE_SHIPPING_THRESHOLD - currentSubtotal).toFixed(2)} para ter portes grátis!
                            </p>
                        )}

                        <div style={styles.totalRow}>
                            <span>Total</span>
                            <span>€{finalTotal.toFixed(2)}</span>
                        </div>

                        <span style={styles.paymentLabel}>Pagar via IFTHENPAY</span>
                        <div style={styles.paymentGrid}>
                            <button
                                style={{ ...styles.btnPrimary, marginTop: 0, fontSize: '0.8rem', backgroundColor: '#004fe5' }}
                                onClick={() => alert('Referência Multibanco: Preparando integração...')}
                            >
                                Multibanco
                            </button>
                            <button
                                style={{ ...styles.btnPrimary, marginTop: 0, fontSize: '0.8rem', backgroundColor: '#e20613' }}
                                onClick={() => alert('MB WAY: Preparando integração...')}
                            >
                                MB WAY
                            </button>
                        </div>

                        <Link
                            href="/loja"
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '1.0rem',
                                border: '1px solid var(--color-gray-300)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-gray-700)',
                                textAlign: 'center',
                                fontWeight: 600,
                                marginTop: '1.5rem',
                                textDecoration: 'none',
                                fontSize: '0.9rem'
                            }}
                        >
                            Continuar a Comprar
                        </Link>

                        <button
                            onClick={clearCart}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'var(--color-gray-500)',
                                width: '100%',
                                marginTop: '1rem',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Esvaziar Carrinho
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
