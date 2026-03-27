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
              <h1 className="hero-title animate-fadeIn">
                O Mundo de <span className="text-gold logo-text-hero">Lizzie</span>
                <img src="/images/logo.png" alt="Logo" className="hero-crown-icon" />
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
                                            src={weeklyHighlight?.weekly_highlight_image || "/images/handmade-hero.png"}
                                            alt={weeklyHighlight?.name || "Destaque da Semana"}
                                            fill
                                            style={{ objectFit: 'cover' }}
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
              {/* Atelier Section */}
              <section className="atelier-section">
                  <div className="atelier-grid">
                      <div className="atelier-content">
                          <h2 className="section-title">O Meu Ateliê</h2>
                          <div className="divider-gold" style={{ margin: 'var(--spacing-md) 0' }}></div>
                          
                          <p className="atelier-text">
                              O meu ateliê é o espaço onde a imaginação ganha forma. É aqui que as linhas se cruzam 
                              para criar histórias e onde os tecidos se transformam em memórias. Equipado com 
                              tudo o que é necessário para garantir a perfeição técnica dos bordados e costuras.
                          </p>
                          
                          <p className="atelier-text">
                              Convido-vos a explorar a minha coleção e a descobrir como podemos tornar 
                              o vosso enxoval ou o vosso presente ainda mais memorável.
                          </p>
                          
                          <div className="atelier-stats">
                              <div className="stat-item">
                                  <div className="stat-number">Artigos</div>
                                  <div className="stat-label">Personalizados</div>
                              </div>
                              <div className="stat-item">
                                  <div className="stat-number">100%</div>
                                  <div className="stat-label">Feito à Mão</div>
                              </div>
                              <div className="stat-item">
                                  <div className="stat-number">10+</div>
                                  <div className="stat-label">Anos de Experiência</div>
                              </div>
                          </div>
                      </div>
                      
                      <div className="atelier-image">
                          <Image 
                              src="/images/atelier-v2.png" 
                              alt="Ateliê O Mundo de Lizzie" 
                              fill
                              style={{ objectFit: 'cover' }}
                          />
                      </div>
                  </div>
              </section>
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
                /* No products yet */
                <div className="w-full text-center py-10">
                  <p className="text-gray-500 italic">Novidades em breve... ✨</p>
                </div>
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
                src="/images/atelier.png"
                alt="Ateliê O Mundo de Lizzie"
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
