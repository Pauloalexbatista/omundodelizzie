import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import './page.css';

export default function SobrePage() {
    return (
        <>
            <Header />

            <main className="sobre-page">
                <section className="sobre-hero">
                    <div className="sobre-hero-image">
                        <Image
                            src="/images/lizzie-bg.png"
                            alt="O Mundo de Lizzie Ateliê"
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                        <div className="sobre-hero-overlay"></div>
                    </div>
                    <div className="container">
                        <div className="sobre-hero-content">
                            <div className="sobre-badge">A Minha História</div>
                            <h1 className="sobre-title">
                                O Mundo de Lizzie
                            </h1>
                            <div className="divider-gold"></div>
                            <p className="sobre-tagline">Personalização com amor em cada detalhe</p>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="story-section">
                    <div className="container">
                        <div className="story-grid">
                            <div className="story-content">
                                <h2 className="section-title">A Minha Paixão pelo Artesanato</h2>
                                <div className="divider-gold" style={{ margin: 'var(--spacing-md) 0' }}></div>

                                <p className="story-text">
                                    <strong>O Mundo de Lizzie</strong> nasceu de um sonho e de uma paixão antiga por criar com as mãos. 
                                    O que começou como um passatempo para presentear família e amigos, transformou-se num projeto dedicado a 
                                    eternizar momentos especiais através de peças únicas e totalmente personalizadas.
                                </p>

                                <p className="story-text">
                                    Especializada em enxovais de bebé, bordados personalizados e artigos de decoração, 
                                    cada peça que sai do meu ateliê é feita com a máxima dedicação. Acredito que os artigos feitos à mão 
                                    carregam uma energia especial e uma exclusividade que não se encontra em produção industrial.
                                </p>

                                <p className="story-text">
                                    Desde a escolha dos tecidos até ao último ponto do bordado, acompanho todo o processo 
                                    para garantir que o resultado final é exatamente o que idealizou. Porque cada cliente é único, 
                                    cada projeto merece ser tratado como uma obra de arte.
                                </p>
                            </div>

                            <div className="story-image">
                                <Image
                                    src="/images/lizzie-bg.png"
                                    alt="Artesanato com Amor"
                                    fill
                                    style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="values-section">
                    <div className="container">
                        <h2 className="section-title text-center">Os Meus Valores</h2>
                        <div className="divider-gold"></div>

                        <div className="values-grid">
                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Carinho</h3>
                                <p className="value-description">
                                    Cada ponto é dado com amor, pensando na alegria de quem vai receber a peça.
                                </p>
                            </div>

                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Qualidade</h3>
                                <p className="value-description">
                                    Utilização de materiais premium que garantem durabilidade e conforto para os mais pequenos.
                                </p>
                            </div>

                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 3h12l4 6-10 13L2 9z" />
                                        <path d="M11 3l-4 6 7 13" />
                                        <path d="M13 3l4 6-7 13" />
                                        <path d="M2 9h20" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Exclusividade</h3>
                                <p className="value-description">
                                    Desenhos personalizados que tornam cada artigo único no mundo.
                                </p>
                            </div>

                            <div className="value-card">
                                <div className="value-icon gold-icon">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <h3 className="value-title">Dedicação</h3>
                                <p className="value-description">
                                    Compromisso com os prazos e atenção total a todos os seus pedidos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Atelier Section */}
                <section className="cellar-section">
                    <div className="cellar-grid">
                        <div className="cellar-content">
                            <h2 className="section-title">O Meu Ateliê</h2>
                            <div className="divider-gold" style={{ margin: 'var(--spacing-md) 0' }}></div>

                            <p className="cellar-text">
                                O meu ateliê é o espaço onde a imaginação ganha forma. É aqui que as linhas se cruzam 
                                para criar histórias e onde os tecidos se transformam em memórias. Equipado com 
                                tudo o que é necessário para garantir a perfeição técnica dos bordados e costuras.
                            </p>

                            <p className="cellar-text">
                                Convido-vos a explorar a minha coleção e a descobrir como podemos tornar 
                                o vosso enxoval ou o vosso presente ainda mais memorável.
                            </p>

                            <div className="cellar-stats">
                                <div className="stat-item">
                                    <div className="stat-number">200+</div>
                                    <div className="stat-label">Artigos</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">100%</div>
                                    <div className="stat-label">Personalizado</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">10+</div>
                                    <div className="stat-label">Anos de Experiência</div>
                                </div>
                            </div>
                        </div>

                        <div className="cellar-image">
                            <Image
                                src="/images/access-bg.png"
                                alt="Ateliê O Mundo de Lizzie"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="container">
                        <div className="cta-content">
                            <h2 className="cta-title">Descubra o meu Catálogo</h2>
                            <p className="cta-text">
                                Precisa de um presente especial ou quer personalizar o enxoval do seu bebé? 
                                Fale comigo ou explore a loja.
                            </p>
                            <a href="/loja" className="btn btn-primary">
                                Ver Loja
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
