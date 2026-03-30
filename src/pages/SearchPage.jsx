/**
 * GRUPO NORTÃO — SearchPage
 * 
 * Página de busca e catálogo de peças.
 * 
 * Estrutura:
 * - Header escuro com input de busca + select de veículo
 * - Sidebar com filtros (veículo + categoria)
 * - Grid de produtos com cards clicáveis
 * - CTA "Não encontrou?" no final
 * 
 * Lê query params: ?q=termo&categoria=motor&veiculo=hilux
 * 
 * Em produção, conectar com API real.
 * Aqui usamos dados de exemplo.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Search, Package, SlidersHorizontal, X, ShoppingBag } from 'lucide-react';
import CTAButton from '../components/shared/CTAButton';
import { sanitize } from '../security/sanitize';
import { useCart, parsePrice } from '../context/CartContext';

// --- Dados de exemplo ---
const VEHICLES = [
  'Hilux', 'Ranger', 'S10', 'Amarok', 'Frontier',
  'L200 Triton', 'Toro', 'Saveiro', 'Montana', 'Strada',
];

const CATEGORIES = [
  'Motor', 'Lataria', 'Suspensão', 'Iluminação',
  'Interior', 'Câmbio', 'Elétrica', 'Freios',
  'Rodas', 'Escapamento',
];

const SAMPLE_PRODUCTS = [
  { slug: 'farol-hilux-2016-2020', name: 'Farol Dianteiro Direito — Toyota Hilux 2016/2020', code: '81130-0K690', condition: 'Seminovo Original', price: 'R$ 890,00' },
  { slug: 'parachoque-ranger-2017-2019', name: 'Parachoque Dianteiro Completo — Ford Ranger 2017/2019', code: 'EB3B-17757-A', condition: 'Seminovo Original', price: 'R$ 1.450,00' },
  { slug: 'grade-s10-hc-2018-2021', name: 'Grade Frontal — Chevrolet S10 High Country 2018/2021', code: '52131318', condition: 'Seminovo Original', price: 'R$ 680,00' },
  { slug: 'retrovisor-amarok-v6-2018', name: 'Espelho Retrovisor Esquerdo — VW Amarok V6 2018/2022', code: '2H6857507B', condition: 'Seminovo Original', price: 'R$ 720,00' },
  { slug: 'capo-frontier-2017-2023', name: 'Capô — Nissan Frontier 2017/2023', code: 'F5100-4KF0A', condition: 'Seminovo Original', price: 'R$ 1.200,00' },
  { slug: 'lanterna-toro-2019-2022', name: 'Lanterna Traseira — Fiat Toro 2019/2022', code: '52087859', condition: 'Seminovo Original', price: 'R$ 560,00' },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedVehicle, setSelectedVehicle] = useState(searchParams.get('veiculo') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { addItem, isInCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleSearch(e) {
    e?.preventDefault();
    const cleaned = sanitize(query);
    navigate(`/pecas?q=${encodeURIComponent(cleaned)}`);
  }

  function clearFilters() {
    setQuery('');
    setSelectedVehicle('');
    setSelectedCategory('');
    navigate('/pecas');
  }

  const hasFilters = query || selectedVehicle || selectedCategory;

  return (
    <div>
      {/* ========================
          Header de Busca
          ======================== */}
      <section style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={styles.pageTitle}>Encontre sua peça</h1>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <div style={styles.inputWrapper}>
              <Search size={18} style={styles.inputIcon} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome da peça, código ou modelo..."
                style={styles.input}
                maxLength={120}
              />
            </div>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              style={styles.select}
            >
              <option value="">Todos os veículos</option>
              {VEHICLES.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <CTAButton variant="primary" size="lg" icon={<Search size={18} />} type="submit">
              Buscar
            </CTAButton>
          </form>
        </div>
      </section>

      {/* ========================
          Conteúdo: Sidebar + Grid
          ======================== */}
      <section style={styles.content}>
        <div style={styles.contentInner}>
          {/* Botão mobile para filtros */}
          <button
            style={styles.mobileFilterBtn}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>

          {/* Sidebar */}
          <aside style={{
            ...styles.sidebar,
            ...(showMobileFilters ? { display: 'flex' } : {}),
          }}>
            {/* Veículos */}
            <div style={styles.filterGroup}>
              <h3 style={styles.filterTitle}>Veículo</h3>
              {VEHICLES.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVehicle(selectedVehicle === v ? '' : v)}
                  style={{
                    ...styles.filterItem,
                    color: selectedVehicle === v ? 'var(--navy-700)' : 'var(--graphite-700)',
                    fontWeight: selectedVehicle === v ? 700 : 400,
                    backgroundColor: selectedVehicle === v ? 'var(--graphite-100)' : 'transparent',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Categorias */}
            <div style={styles.filterGroup}>
              <h3 style={styles.filterTitle}>Categoria</h3>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(selectedCategory === c ? '' : c)}
                  style={{
                    ...styles.filterItem,
                    color: selectedCategory === c ? 'var(--navy-700)' : 'var(--graphite-700)',
                    fontWeight: selectedCategory === c ? 700 : 400,
                    backgroundColor: selectedCategory === c ? 'var(--graphite-100)' : 'transparent',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Limpar filtros */}
            {hasFilters && (
              <button onClick={clearFilters} style={styles.clearBtn}>
                <X size={14} /> Limpar filtros
              </button>
            )}
          </aside>

          {/* Grid de Produtos */}
          <div style={styles.main}>
            <div style={styles.resultsBar}>
              <span style={styles.resultsCount}>
                {SAMPLE_PRODUCTS.length} peças encontradas
              </span>
            </div>

            <div style={styles.productGrid}>
              {SAMPLE_PRODUCTS.map((prod) => {
                const inCart = isInCart(prod.slug);
                return (
                  <div
                    key={prod.slug}
                    style={styles.card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'var(--graphite-100)';
                    }}
                  >
                    {/* Link para página do produto */}
                    <Link to={`/pecas/${prod.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {/* Imagem placeholder */}
                      <div style={styles.cardImage}>
                        <Package size={36} style={{ color: 'var(--graphite-300)' }} />
                      </div>

                      {/* Info */}
                      <div style={styles.cardInfo}>
                        <span style={styles.cardBadge}>{prod.condition}</span>
                        <h3 style={styles.cardName}>{prod.name}</h3>
                        <p style={styles.cardCode}>Cód: {prod.code}</p>
                        <div style={styles.cardPrice}>{prod.price}</div>
                      </div>
                    </Link>

                    {/* Botão adicionar ao carrinho */}
                    <div style={styles.cardActions}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem({
                            slug: prod.slug,
                            name: prod.name,
                            code: prod.code,
                            price: prod.price,
                            priceNum: parsePrice(prod.price),
                            condition: prod.condition,
                            image: '',
                          });
                        }}
                        disabled={inCart}
                        style={{
                          ...styles.addBtn,
                          backgroundColor: inCart ? 'var(--graphite-100)' : 'var(--green-accent)',
                          color: inCart ? 'var(--graphite-500)' : 'var(--navy-900)',
                          cursor: inCart ? 'default' : 'pointer',
                        }}
                      >
                        <ShoppingBag size={14} />
                        {inCart ? 'No carrinho' : 'Adicionar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================
          CTA Não Encontrou
          ======================== */}
      <section style={styles.notFound}>
        <h3 style={styles.notFoundTitle}>Não encontrou o que procura?</h3>
        <p style={styles.notFoundText}>
          Envie sua solicitação e nossa equipe busca pra você.
        </p>
        <CTAButton
          variant="secondary"
          icon={<Search size={18} />}
          onClick={() => navigate('/nao-achei-minha-peca')}
        >
          Solicitar Busca de Peça
        </CTAButton>
      </section>
    </div>
  );
}

// --- Estilos ---
const styles = {
  // Header
  header: {
    backgroundColor: 'var(--navy-900)',
    padding: '3rem 1.5rem',
  },
  headerInner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  pageTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    color: '#fff',
    marginBottom: '1.5rem',
  },
  searchForm: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    flex: 1,
    minWidth: '250px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    color: 'rgba(255,255,255,0.3)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem 1rem 2.75rem',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
  },
  select: {
    padding: '1rem 1.25rem',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: '0.9375rem',
    outline: 'none',
    minWidth: '180px',
    fontFamily: 'var(--font-body)',
  },

  // Content
  content: {
    padding: '2rem 1.5rem 4rem',
  },
  contentInner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gap: '2rem',
  },

  // Mobile filter button
  mobileFilterBtn: {
    display: 'none', // visible via media query
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--navy-900)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    gridColumn: '1 / -1',
  },

  // Sidebar
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  filterTitle: {
    fontWeight: 700,
    fontSize: '0.8125rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.75rem',
    color: 'var(--graphite-500)',
  },
  filterItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '0.5rem 0.75rem',
    fontSize: '0.9375rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: 'var(--radius-sm)',
    transition: 'all 0.15s ease',
    fontFamily: 'var(--font-body)',
  },
  clearBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.625rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--graphite-300)',
    backgroundColor: 'transparent',
    color: 'var(--graphite-700)',
    fontSize: '0.8125rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  },

  // Main
  main: {
    minWidth: 0,
  },
  resultsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  resultsCount: {
    fontSize: '0.9375rem',
    color: 'var(--graphite-500)',
    fontWeight: 500,
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.25rem',
  },

  // Card
  card: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--graphite-100)',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    backgroundColor: '#fff',
    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    width: '100%',
    height: '180px',
    backgroundColor: 'var(--graphite-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    flex: 1,
  },
  cardBadge: {
    alignSelf: 'flex-start',
    padding: '0.2rem 0.625rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--green-soft)',
    color: 'var(--green-deep)',
    fontSize: '0.6875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardName: {
    fontWeight: 600,
    fontSize: '0.9375rem',
    color: 'var(--navy-900)',
    lineHeight: 1.4,
  },
  cardCode: {
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
  },
  cardPrice: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.375rem',
    color: 'var(--navy-700)',
    marginTop: '0.375rem',
  },
  cardActions: {
    padding: '0 1rem 1rem',
  },
  addBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.375rem',
    padding: '0.625rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.75rem',
    fontWeight: 700,
    fontFamily: 'var(--font-body)',
    border: 'none',
    transition: 'all 0.2s ease',
  },

  // Not Found CTA
  notFound: {
    padding: '3rem 1.5rem',
    backgroundColor: 'var(--off-white)',
    textAlign: 'center',
  },
  notFoundTitle: {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: 'var(--navy-900)',
    marginBottom: '0.5rem',
  },
  notFoundText: {
    color: 'var(--graphite-500)',
    marginBottom: '1.5rem',
    fontSize: '0.9375rem',
  },
};
