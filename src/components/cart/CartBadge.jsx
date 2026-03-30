/**
 * GRUPO NORTÃO — CartBadge
 * 
 * Ícone do carrinho com contador de itens.
 * Fica no Header, ao lado do CTA do WhatsApp.
 * Clique abre a gaveta lateral (CartDrawer).
 * 
 * - Badge com número aparece só quando tem itens
 * - Animação de bounce ao adicionar item
 * - Cores da identidade visual
 * 
 * Uso: <CartBadge /> dentro do Header.jsx
 */

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartBadge() {
  const { itemCount, toggleDrawer } = useCart();
  const [bounce, setBounce] = useState(false);

  // Animação de bounce quando itemCount muda
  useEffect(() => {
    if (itemCount > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <button
      onClick={toggleDrawer}
      style={{
        ...styles.button,
        transform: bounce ? 'scale(1.15)' : 'scale(1)',
      }}
      aria-label={`Carrinho com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
    >
      <ShoppingBag size={20} />

      {/* Badge com contador */}
      {itemCount > 0 && (
        <span style={styles.badge}>
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}

// --- Estilos ---
const styles = {
  button: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    flexShrink: 0,
  },
  badge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    minWidth: '18px',
    height: '18px',
    borderRadius: '9px',
    backgroundColor: '#F5B301',
    color: '#081F33',
    fontSize: '0.625rem',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
    lineHeight: 1,
    fontFamily: 'var(--font-body)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
};
