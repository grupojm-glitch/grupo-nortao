/**
 * GRUPO NORTÃO — RelatedParts
 * 
 * Seção de peças relacionadas na página de produto.
 * Aumenta o ticket médio e mantém o visitante navegando.
 * 
 * Exibe peças do mesmo veículo ou mesma categoria.
 * 
 * Uso:
 * <RelatedParts
 *   parts={[
 *     { slug: 'farol-hilux', name: '...', code: '...', price: '...', condition: '...' },
 *   ]}
 * />
 */

import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

export default function RelatedParts({ parts = [] }) {
  if (parts.length === 0) return null;

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <SectionTitle
          overline="Veja também"
          title="Peças relacionadas"
          subtitle="Outras peças para o mesmo veículo ou categoria."
        />

        <div style={styles.grid}>
          {parts.map((part, i) => (
            <Link
              key={i}
              to={`/pecas/${part.slug}`}
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
              {/* Imagem / Placeholder */}
              <div style={styles.imageBox}>
                {part.image ? (
                  <img
                    src={part.image}
                    alt={part.name}
                    style={styles.image}
                    loading="lazy"
                  />
                ) : (
                  <Package size={32} style={{ color: 'var(--graphite-300)' }} />
                )}
              </div>

              {/* Info */}
              <div style={styles.info}>
                <span style={styles.condition}>{part.condition || 'Seminovo Original'}</span>
                <h4 style={styles.name}>{part.name}</h4>
                <p style={styles.code}>Cód: {part.code}</p>
                <div style={styles.bottom}>
                  <span style={styles.price}>{part.price}</span>
                  <span style={styles.arrow}>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Estilos ---
const styles = {
  section: {
    padding: '4rem 1.5rem',
    borderTop: '1px solid var(--graphite-100)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.25rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
  },
  imageBox: {
    width: '100%',
    aspectRatio: '16 / 10',
    backgroundColor: 'var(--graphite-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    flex: 1,
  },
  condition: {
    fontSize: '0.6875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--green-deep)',
    backgroundColor: 'var(--green-soft)',
    padding: '0.2rem 0.5rem',
    borderRadius: 'var(--radius-full)',
    alignSelf: 'flex-start',
  },
  name: {
    fontWeight: 600,
    fontSize: '0.9375rem',
    color: 'var(--navy-900)',
    lineHeight: 1.4,
  },
  code: {
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',
    paddingTop: '0.625rem',
    borderTop: '1px solid var(--graphite-100)',
  },
  price: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    color: 'var(--navy-700)',
  },
  arrow: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'var(--graphite-100)',
    color: 'var(--graphite-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
