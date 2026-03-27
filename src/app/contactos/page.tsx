'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './page.css';

export default function ContactosPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Connect to API
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Header />

            <main className="contactos-page">
                {/* Hero Section */}
                <section className="contactos-hero">
                    <div className="container">
                        <h1 className="contactos-title">Entre em Contacto</h1>
                        <div className="divider-gold"></div>
                        <p className="contactos-subtitle">
                            Peça já o seu orçamento ou tire as suas dúvidas
                        </p>
                    </div>
                </section>

                {/* Contact Grid */}
                <section className="contact-section">
                    <div className="container">
                        <div className="contact-container-centered">
                            {/* Contact Form */}
                            <div className="contact-form-wrapper">
                                <h2 className="form-title">Envie-me uma Mensagem</h2>
                                <p className="form-description">
                                    Preencha o formulário abaixo e entrarei em contacto consigo brevemente.
                                </p>

                                {submitted && (
                                    <div className="success-message">
                                        <span className="success-icon">✓</span>
                                        Mensagem enviada com sucesso! Entrarei em contacto em breve.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Nome *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone" className="form-label">Telefone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">Mensagem *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="input textarea"
                                            rows={6}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-submit">
                                        Enviar Mensagem
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
