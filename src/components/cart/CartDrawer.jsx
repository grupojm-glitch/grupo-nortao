/**
 * GRUPO NORTÃO — CartDrawer
 * 
 * Gaveta lateral que aparece ao adicionar item ao carrinho.
 * Mostra: lista de itens, subtotal, CTA checkout, continuar comprando.
 * 
 * - Abre da direita com animação slide
 * - Overlay escuro clicável para fechar
 * - Bloqueia scroll do body quando aberta
 * - Botão X para fechar
 * 
 * Uso: Inserido no App.jsx (persistente)
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    subtotalFormatted,
    removeItem,
    clearCart,
    drawerOpen,
    closeDrawer,
  } = useCart();

  // Bloqueia scroll quando aberto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Fecha com ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && drawerOpen) closeDrawer();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  function handleCheckout() {
    closeDrawer();
    navigate('/checkout');
  }

  function handleContinue() {
    closeDrawer();
    navigate('/pecas');
  }

  if (!drawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={styles.overlay}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside style={styles.drawer} role="dialog" aria-label="Carrinho de compras">
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <ShoppingBag size={20} />
            <span>Carrinho ({itemCount})</span>
          </div>
          <button onClick={closeDrawer} style={styles.closeBtn} aria-label="Fechar carrinho">
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        {items.length === 0 ? (
          /* Carrinho vazio */
          <div style={styles.empty}>
            <ShoppingBag size={48} style={{ color: 'var(--graphite-300)', marginBottom: '1rem' }} />
            <h3 style={styles.emptyTitle}>Seu carrinho está vazio</h3>
            <p style={styles.emptyText}>Encontre a peça certa para sua pickup.</p>
            <button onClick={handleContinue} style={styles.emptyBtn}>
              Ver Peças
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            {/* Lista de itens */}
            <div style={styles.items}>
              {items.map((item) => (
                <CartItem
                  key={item.slug}
                  item={item}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Footer com totais e CTAs */}
            <div style={styles.footer}>
              {/* Limpar carrinho */}
              {items.length > 1 && (
                <button onClick={clearCart} style={styles.clearBtn}>
                  <Trash2 size={14} />
                  Limpar carrinho
                </button>
              )}

              {/* Subtotal */}
              <div style={styles.subtotalRow}>
                <span style={styles.subtotalLabel}>Subtotal</span>
                <span style={styles.subtotalValue}>{subtotalFormatted}</span>
              </div>
              <p style={styles.shippingNote}>Frete calculado no checkout</p>

              {/* CTA Checkout */}
              <button onClick={handleCheckout} style={styles.checkoutBtn}>
                Finalizar Compra
                <ArrowRight size={16} />
              </button>

              {/* Continuar comprando */}
              <button onClick={handleContinue} style={styles.continueBtn}>
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// --- Estilos ---
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1100,
    animation: 'fadeIn 0.2s ease',
    cursor: 'pointer',
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--off-white)',
    zIndex: 1101,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-8px 0 40px rgba(0, 0, 0, 0.15)',
    animation: 'slideInRight 0.3s ease',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.0625rem',
    color: 'var(--graphite-900)',
  },
  closeBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--graphite-100)',
    color: 'var(--graphite-700)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },

  // Items
  items: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  // Empty
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  emptyTitle: {
    fontWeight: 700,
    fontSize: '1.0625rem',
    color: 'var(--graphite-900)',
    marginBottom: '0.375rem',
  },
  emptyText: {
    fontSize: '0.875rem',
    color: 'var(--graphite-500)',
    marginBottom: '1.5rem',
  },
  emptyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--navy-800)',
    color: '#fff',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.2s',
  },

  // Footer
  footer: {
    padding: '1.25rem 1.5rem',
    borderTop: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
  },
  clearBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--graphite-500)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontFamily: 'var(--font-body)',
    transition: 'color 0.2s',
  },
  subtotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem',
  },
  subtotalLabel: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--graphite-500)',
  },
  subtotalValue: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.375rem',
    color: 'var(--navy-800)',
  },
  shippingNote: {
    fontSize: '0.75rem',
    color: 'var(--graphite-500)',
    marginBottom: '1.25rem',
  },
  checkoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: 'var(--green-accent)',
    color: 'var(--navy-900)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: '0.9375rem',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.25s ease',
    marginBottom: '0.625rem',
  },
  continueBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: 'var(--graphite-700)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    fontSize: '0.8125rem',
    border: '1.5px solid var(--graphite-300)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.2s',
  },
};
