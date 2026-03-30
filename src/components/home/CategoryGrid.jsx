/**
 * GRUPO NORTÃO — CategoryGrid (Home)
 * 
 * Grid de categorias para navegação rápida por tipo de peça.
 * Facilita a busca para quem já sabe o que precisa.
 * 
 * Cada card é clicável e redireciona para /pecas?categoria=X
 * 
 * Percepção que deve gerar:
 * - "Eles são organizados."
 * - "Consigo encontrar rápido."
 * - "Têm variedade."
 */

import { useNavigate } from 'react-router-dom';
import {
  Cog,
  Layers,
  SunDim,
  Armchair,
  Zap,
  Disc,
  PanelTop,
  CircuitBoard,
} from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

const CATEGORIES = [
  { label: 'Motor', icon: Cog, slug: 'motor' },
  { label: 'Lataria', icon: PanelTop, slug: 'lataria' },
  { label: 'Suspensão', icon: Layers, slug: 'suspensao' },
  { label: 'Iluminação', icon: SunDim, slug: 'iluminacao' },
  { label: 'Interior', icon: Armchair, slug: 'interior' },
  { label: 'Câmbio', icon: CircuitBoard, slug: 'cambio' },
  { label: 'Elétrica', icon: Zap, slug: 'eletrica' },
  { label: 'Freios', icon: Disc, slug: 'freios' },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  function handleClick(slug) {
    navigate(`/pecas?categoria=${slug}`);
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <SectionTitle
          overline="Categorias"
          title="Encontre por tipo de peça"
          subtitle="Navegue pelo nosso estoque organizado por categorias técnicas."
          center
        />

        <div style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleClick(cat.slug)}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--navy-600)';
                e.currentTarget.style.backgroundColor = 'var(--navy-900)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.querySelector('.cat-icon').style.backgroundColor = 'rgba(245, 179, 1, 0.15)';
                e.currentTarget.querySelector('.cat-icon').style.color = 'var(--green-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--graphite-100)';
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = 'var(--navy-900)';
                e.currentTarget.querySelector('.cat-icon').style.backgroundColor = 'var(--graphite-100)';
                e.currentTarget.querySelector('.cat-icon').style.color = 'var(--graphite-700)';
              }}
            >
              <div className="cat-icon" style={styles.iconBox}>
                <cat.icon size={24} />
              </div>
              <span style={styles.label}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Estilos ---
const styles = {
  section: {
    padding: '5rem 1.5rem',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '1rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.875rem',
    padding: '2rem 1.25rem',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--graphite-100)',
    backgroundColor: '#fff',
    color: 'var(--navy-900)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: 'var(--font-body)',
  },
  iconBox: {
    width: '52px',
    height: '52px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--graphite-100)',
    color: 'var(--graphite-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease',
  },
  label: {
    fontWeight: 700,
    fontSize: '0.9375rem',
    lineHeight: 1.2,
  },
};
