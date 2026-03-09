import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './page.css';

export default function VinhoVirtualPage() {
    return (
        <>
            <Header />
            <div className="virtual-page">
                <div className="container">
                    <main className="virtual-hero">
                        {/* Imagem do Vinho */}
                        <div className="virtual-image-container">
                            <Image
                                src="/images/vinho virtual.jpg"
                                alt="Vinho Virtual Tinto 2020"
                                fill
                                priority
                            />
                        </div>

                        {/* Conteúdo Técnico e Narrativa */}
                        <div className="virtual-content">
                            <div className="rating-badge">
                                <span>★ 92 PONTOS</span>
                                <small>(PORTUGAL PROVA)</small>
                            </div>

                            <h1 className="virtual-title">Virtual<br />Tinto 2020</h1>

                            <p className="virtual-story">
                                "É um vinho com fruta fresca e cintilante, de bom volume, sem arestas e muito saboroso.
                                Maduro mas sem ser musculado e concentrado, tem matéria e complexidade e, acima de tudo,
                                um frescor delicioso, diferente de acidez pura e que só se consegue em altitude."
                                <br />
                                <em style={{ fontSize: '0.9rem', color: 'var(--color-gray-500)', marginTop: '1rem', display: 'block' }}>
                                    — Por Pedro Garcias
                                </em>
                            </p>

                            <div className="tech-sheet">
                                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                                    Ficha Técnica
                                </h3>
                                <div className="tech-grid">
                                    <div className="tech-item">
                                        <span className="tech-label">Produtor</span>
                                        <span className="tech-value">3GWine, Favaios</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="tech-label">Região</span>
                                        <span className="tech-value">Douro DOC</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="tech-label">Castas</span>
                                        <span className="tech-value">Várias (Field Blend)</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="tech-label">Teor Alcoólico</span>
                                        <span className="tech-value">13,5% vol.</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="tech-label">Cura</span>
                                        <span className="tech-value">Frescor de Altitude</span>
                                    </div>
                                    <div className="tech-item">
                                        <span className="tech-label">Ano</span>
                                        <span className="tech-value">2020</span>
                                    </div>
                                </div>

                                <div className="price-tag">€22,50</div>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>IVA incluído</p>
                            </div>
                        </div>
                    </main>

                    <section style={{ marginTop: '6rem', borderTop: '1px solid #eee', paddingTop: '4rem', maxWidth: '800px', margin: '6rem auto 0' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem' }}>A História</h2>
                        <p style={{ lineHeight: '1.8', color: '#444' }}>
                            O Virtual Tinto 2020 nasceu da vontade da 3GWine em expressar o Douro de forma mais leve e elegante.
                            Proveniente de vinhas situadas em Favaios, a altitude elevada confere a este vinho uma frescura
                            invulgar na região, permitindo que a fruta brilhe sem o peso excessivo da madeira ou de extrações profundas.
                            É uma interpretação moderna de um terroir clássico.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
