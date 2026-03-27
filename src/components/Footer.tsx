'use client';

import Link from 'next/link';
import { useState } from 'react';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showLegalModal, setShowLegalModal] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        // Simulação de newsletter local ou integrável no futuro
        try {
            // Em vez de Supabase, podemos gravar num ficheiro ou apenas simular por agora
            console.log('Newsletter subscription for:', email);
            
            setTimeout(() => {
                setStatus('success');
                setMessage('Obrigado por subscrever! ✨');
                setEmail('');
            }, 1000);
        } catch (error: any) {
            console.error('Newsletter error:', error);
            setStatus('error');
            setMessage('Erro ao subscrever. Tente novamente.');
        }
    };

    const quickLinks = [
        { href: '/', label: 'Início' },
        { href: '/loja', label: 'Loja' },
        { href: '/sobre', label: 'Sobre Mim' },
        { href: '/contactos', label: 'Contactos' },
        { href: '/admin', label: 'Administração' },
    ];

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://instagram.com/omundodelizzie',
            icon: (
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            )
        },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo">
                            <span className="logo-text">O Mundo de Lizzie</span>
                        </Link>
                        <p className="footer-description">
                            Trabalhos manuais feitos com amor e dedicação.
                            Personalizamos cada peça para tornar os seus momentos ainda mais especiais. ✨
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Explorar</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="footer-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Contacto</h4>
                        <ul className="footer-info">
                            <li>
                                <span className="info-icon">📍</span>
                                Portugal (Envios para todo o país)
                            </li>
                            <li>
                                <span className="info-icon">📧</span>
                                omundodelizzie@gmail.com
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Newsletter</h4>
                        <p className="footer-newsletter-text">
                            Subscreva para receber novidades e mimos exclusivos!
                        </p>
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="O seu email"
                                className="newsletter-input"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading' || status === 'success'}
                            />
                            <button
                                type="submit"
                                className="newsletter-button"
                                disabled={status === 'loading' || status === 'success'}
                            >
                                {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Ok'}
                            </button>
                        </form>
                        {message && (
                            <p style={{
                                marginTop: '0.5rem',
                                fontSize: '0.875rem',
                                color: status === 'error' ? 'var(--color-secondary)' : '#4ade80'
                            }}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="footer-social">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <p className="copyright">
                        © {currentYear} O Mundo de Lizzie. Feito à mão com amor.
                    </p>

                    <button 
                        onClick={() => setShowLegalModal(true)} 
                        className="legal-modal-trigger"
                    >
                        Privacidade e Termos
                    </button>
                </div>
            </div>

            {showLegalModal && (
                <div className="legal-modal-overlay" onClick={() => setShowLegalModal(false)}>
                    <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowLegalModal(false)}>✕</button>
                        
                        <div className="modal-body">
                            <h2 className="text-primary font-serif">Privacidade e Termos</h2>
                            
                            <section>
                                <h3>1. Personalização</h3>
                                <p>Todas as peças são feitas à mão e personalizadas. O prazo de entrega pode variar consoante a complexidade do trabalho.</p>
                            </section>

                            <section>
                                <h3>2. Proteção de Dados</h3>
                                <p>Os seus dados são utilizados exclusivamente para o processamento de encomendas e comunicação direta connosco.</p>
                            </section>

                            <section>
                                <h3>3. Encomendas</h3>
                                <p>Ao realizar uma encomenda, está a apoiar o artesanato local. Agradecemos a sua confiança!</p>
                            </section>
                            
                            <p className="modal-footer-text">Para qualquer questão, contacte-nos por email ou Instagram.</p>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
