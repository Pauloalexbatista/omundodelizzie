'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getWeeklyHighlight, getFeaturedProducts } from '@/app/actions/products';
import './page.css';

export default function Home() {
  const [weeklyHighlight, setWeeklyHighlight] = useState<any>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [highlight, products] = await Promise.all([
          getWeeklyHighlight(),
          getFeaturedProducts(3)
        ]);

        if (highlight) setWeeklyHighlight(highlight);
        if (products) setFeaturedProducts(products);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />

      <main className="home-page">
        {/* Nova Hero Section Reestruturada com Fundo Total */}
        <section className="hero-modern-redesign">
          <div className="hero-overlay-redesign"></div>
          
          <div className="container hero-grid-redesign">
            {/* Coluna Esquerda: Texto e Botões */}
            <div className="hero-text-side">
              <div className="hero-badge animate-fadeIn">Trabalhos Manuais Únicos</div>
              <h1 className="hero-title animate-fadeIn flex items-center gap-4">
                O Mundo de <br />
                <span className="text-gold logo-text-hero">Lizzie</span>
                <img src="/images/crown-icon.png" alt="Crown" className="hero-crown-icon" />
              </h1>
              <p className="hero-subtitle animate-fadeIn">
                Personalização de artigos feitos à mão com amor e dedicação para todas as ocasiões. ✨
              </p>
              <div className="hero-buttons animate-fadeIn">
                <Link href="/loja" className="btn btn-primary">
                  Ver Loja
                </Link>
                <Link href="/sobre" className="btn btn-outline-white">
                  Sobre Mim
                </Link>
              </div>
            </div>

            {/* Coluna Direita: Destaque da Semana */}
            <div className="hero-highlight-side animate-fadeIn">
              <div className="weekly-highlight-box">
                <div className="highlight-label">Destaque da Semana</div>
                <div className="highlight-frame">
                  <div className="highlight-image-container">
                    <Image
                      src={weeklyHighlight?.weekly_highlight_image || weeklyHighlight?.image || "/images/products/fralda-exemplo.jpg"}
                      alt={weeklyHighlight?.name || "Destaque da Semana"}
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                  <div className="highlight-info">
                    <h3>{weeklyHighlight?.name || "Artigo Especial"}</h3>
                    <p>{weeklyHighlight?.description ? weeklyHighlight.description.substring(0, 50) + '...' : "Uma peça única feita à mão com carinho."}</p>
                    <Link href="/loja" className="btn-details">Ver Detalhes</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Destaques</h2>
              <div className="divider-gold"></div>
              <p className="section-subtitle">
                As peças mais queridas e recentes da nossa coleção
              </p>
            </div>

            <div className="products-grid">
              {(featuredProducts && featuredProducts.length > 0) ? featuredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <div className="product-badge">Destaque</div>
                    <div className="product-image-placeholder">
                      <Image
                        src={product.image || "/images/products/fralda-exemplo.jpg"}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'contain', padding: '1rem' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-type">{product.type}</p>
                    <p className="product-description">
                      {product.description || "Artigo artesanal feito com amor."}
                    </p>
                    <div className="product-footer">
                      <span className="product-price">€{product.price.toFixed(2)}</span>
                      <button className="btn-add-cart">Adicionar</button>
                    </div>
                  </div>
                </div>
              )) : (
                /* Fallback placeholders */
                <>
                  <div className="product-card opacity-50">
                    <div className="product-image-wrapper">
                      <div className="product-image-placeholder">
                        <Image src="/images/products/fralda-exemplo.jpg" alt="Fralda" fill style={{ objectFit: 'contain', padding: '1rem' }} />
                      </div>
                    </div>
                    <div className="product-content">
                      <h3 className="product-name">Fralda Bordada (Exemplo)</h3>
                      <p className="product-type">Bebé</p>
                      <div className="product-footer">
                        <span className="product-price">€15,00</span>
                        <button className="btn-add-cart" disabled>Em breve</button>
                      </div>
                    </div>
                  </div>
                  <div className="product-card opacity-50">
                    <div className="product-image-wrapper">
                      <div className="product-image-placeholder">
                        <Image src="/images/products/babete-exemplo.jpg" alt="Babete" fill style={{ objectFit: 'contain', padding: '1rem' }} />
                      </div>
                    </div>
                    <div className="product-content">
                      <h3 className="product-name">Babete Personalizado (Exemplo)</h3>
                      <p className="product-type">Bebé</p>
                      <div className="product-footer">
                        <span className="product-price">€10,00</span>
                        <button className="btn-add-cart" disabled>Em breve</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="section-cta">
              <Link href="/loja" className="btn btn-secondary">
                Ver Toda a Coleção
              </Link>
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="about-preview">
          <div className="about-grid">
            <div className="about-image">
              <Image
                src="/images/products/fralda-exemplo.jpg"
                alt="Artesanato Lizzie"
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
              />
              <div className="about-image-overlay"></div>
            </div>

            <div className="about-content">
              <div className="about-badge">A Minha História</div>
              <h2 className="about-title">
                Paixão pelo Artesanato, <br />
                <span className="text-secondary">Compromisso com a Qualidade</span>
              </h2>
              <div className="divider-secondary" style={{ margin: 'var(--spacing-md) 0' }}></div>
              <p className="about-text">
                O Mundo de Lizzie nasce da paixão por criar peças únicas e personalizadas
                que contam histórias. Cada ponto é dado com amor.
              </p>
              <Link href="/sobre" className="btn btn-outline">
                Conheça a Minha História
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
