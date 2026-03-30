/**
 * GRUPO NORTÃO — SearchBlock (Home)
 * 
 * Bloco de busca em destaque, posicionado sobre o hero.
 * Elemento central de conversão da home.
 * 
 * Funcionalidades:
 * - Input de busca por nome, código ou modelo
 * - Tags clicáveis de pickups populares
 * - Sombra forte para destaque visual
 * - Redireciona para /pecas com query
 * 
 * Deve facilitar a primeira ação do usuário: encontrar a peça.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import CTAButton from '../shared/CTAButton';
import { sanitize } from '../../security/sanitize';

// Pickups mais buscadas — tags rápidas
const POPULAR_TAGS = [
  'Hilux',
  'Ranger',
  'S10',
  'Amarok',
  'Frontier',
  'Toro',
  'L200 Triton',
  'Saveiro',
];

export default function SearchBlock() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e?.preventDefault();
    const cleaned = sanitize(query);
    if (cleaned.trim()) {
      navigate(`/pecas?q=${encodeURIComponent(cleaned)}`);
    } else {
      navigate('/pecas');
    }
  }

  function handleTagClick(tag) {
    setQuery(tag);
    navigate(`/pecas?q=${encodeURIComponent(tag)}`);
  }

  return (
    <section style={styles.section}>
      <div style={styles.card}>
        {/* Instrução */}
        <p style={styles.instruction}>
          Busque por nome da peça, código original ou modelo da pickup
        </p>

        {/* Form de busca */}
        <form onSubmit={handleSearch} style={styles.form}>
          <div style={styles.inputWrapper}>
            <Search size={18} style={styles.inputIcon} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: farol Hilux 2020, parachoque Ranger, código 81110-0K440..."
              style={styles.input}
              aria-label="Buscar peça"
              maxLength={120}
            />
          </div>
          <CTAButton
            variant="primary"
            size="lg"
            icon={<Search size={18} />}
            type="submit"
          >
            Buscar
          </CTAButton>
        </form>

        {/* Tags populares */}
        <div style={styles.tags}>
          <span style={styles.tagsLabel}>Populares:</span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={styles.tag}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--navy-700)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--graphite-100)';
                e.currentTarget.style.color = 'var(--graphite-700)';
              }}
            >
              {tag}
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
    position: 'relative',
    marginTop: '-3rem',
    zIndex: 10,
    padding: '0 1.5rem',
  },
  card: {
    maxWidth: '820px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    padding: '2rem',
  },
  instruction: {
    textAlign: 'center',
    fontWeight: 600,
    color: 'var(--navy-800)',
    marginBottom: '1rem',
    fontSize: '0.9375rem',
  },
  form: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    flex: 1,
    minWidth: '240px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    color: 'var(--graphite-300)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem 1rem 2.75rem',
    border: '2px solid var(--graphite-100)',
    borderRadius: 'var(--radius-lg)',
    fontSize: '1rem',
    color: 'var(--graphite-900)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: '#fff',
  },
  tags: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  tagsLabel: {
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
    fontWeight: 500,
    marginRight: '0.25rem',
  },
  tag: {
    padding: '0.375rem 0.875rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--graphite-100)',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: 'var(--graphite-700)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-body)',
  },
};
