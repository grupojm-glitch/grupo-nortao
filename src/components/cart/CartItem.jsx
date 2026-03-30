/**
 * GRUPO NORTÃO — CartItem
 * 
 * Item individual dentro do carrinho (gaveta e checkout).
 * Mostra: imagem, nome, código, condição, preço, botão remover.
 * 
 * Peça seminova = quantidade sempre 1, sem controle de +/-.
 * 
 * Uso:
 * <CartItem item={item} onRemove={removeItem} compact={false} />
 */

import { Package, X } from 'lucide-react';

export default function CartItem({ item, onRemove, compact = false }) {
  if (!item) return null;

  if (compact) {
    return (
      <div style={styles.compact}>
        <div style={styles.compactImage}>
          {item.image ? (
            <img src={item.image} alt={item.name} style={styles.compactImg} />
          ) : (
            <Package size={16} style={{ color: 'var(--graphite-300)' }} />
          )}
        </div>
        <div style={styles.compactInfo}>
          <span style={styles.compactName}>{item.name}</span>
          <span style={styles.compactPrice}>{item.price}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      {/* Imagem */}
      <div style={styles.image}>
        {item.image ? (
          <img src={item.image} alt={item.name} style={styles.img} loading="lazy" />
        ) : (
          <Package size={24} style={{ color: 'var(--graphite-300)' }} />
        )}
      </div>

      {/* Info */}
      <div style={styles.info}>
        {/* Condição */}
        <span style={styles.condition}>{item.condition || 'Seminovo Original'}</span>

        {/* Nome */}
        <h4 style={styles.name}>{item.name}</h4>

        {/* Código */}
        <span style={styles.code}>Cód: {item.code}</span>

        {/* Preço */}
        <span style={styles.price}>{item.price}</span>
      </div>

      {/* Remover */}
      {onRemove && (
        <button
          onClick={() => onRemove(item.slug)}
          style={styles.removeBtn}
          aria-label={`Remover ${item.name} do carrinho`}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
            e.currentTarget.style.color = 'var(--red-alert)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--graphite-500)';
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// --- Estilos ---
const styles = {
  card: {
    display: 'flex',
    gap: '0.875rem',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
    position: 'relative',
    transition: 'border-color 0.2s ease',
  },
  image: {
    width: '72px',
    height: '72px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--graphite-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    minWidth: 0,
  },
  condition: {
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--green-deep)',
    backgroundColor: 'var(--green-soft)',
    padding: '0.125rem 0.5rem',
    borderRadius: 'var(--radius-full)',
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--graphite-900)',
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  code: {
    fontSize: '0.6875rem',
    color: 'var(--graphite-500)',
    fontFamily: 'monospace',
  },
  price: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1rem',
    color: 'var(--navy-800)',
    marginTop: '0.25rem',
  },
  removeBtn: {
    position: 'absolute',
    top: '0.625rem',
    right: '0.625rem',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: 'var(--graphite-500)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  // Compact mode (para OrderSummary)
  compact: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.625rem 0',
    borderBottom: '1px solid var(--graphite-100)',
  },
  compactImage: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--graphite-100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  compactImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  compactInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactName: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: 'var(--graphite-900)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px',
  },
  compactPrice: {
    fontSize: '0.8125rem',
    fontWeight: 700,
    color: 'var(--navy-800)',
    flexShrink: 0,
  },
};
