/**
 * GRUPO NORTÃO — OrderSummary
 * 
 * Resumo do pedido no checkout.
 * Mostra: itens (compact), subtotal, frete selecionado, total final.
 * 
 * Uso:
 * <OrderSummary shipping={selectedShipping} />
 */

import { useCart, formatPrice } from '../../context/CartContext';
import CartItem from '../cart/CartItem';
import { Shield, Truck, Lock } from 'lucide-react';

export default function OrderSummary({ shipping = null }) {
  const { items, subtotal, subtotalFormatted } = useCart();

  const shippingPrice = shipping ? shipping.price : 0;
  const total = subtotal + shippingPrice;

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>Resumo do pedido</h3>

      {/* Lista de itens (compact) */}
      <div style={styles.items}>
        {items.map((item) => (
          <CartItem key={item.slug} item={item} compact />
        ))}
      </div>

      {/* Subtotais */}
      <div style={styles.totals}>
        <div style={styles.row}>
          <span style={styles.label}>Subtotal ({items.length} {items.length === 1 ? 'peça' : 'peças'})</span>
          <span style={styles.value}>{subtotalFormatted}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>
            <Truck size={14} style={{ marginRight: '0.25rem' }} />
            Frete
          </span>
          <span style={styles.value}>
            {shipping ? formatPrice(shipping.price) : 'Calcular CEP'}
          </span>
        </div>

        {shipping && (
          <div style={styles.shippingDetail}>
            {shipping.name} · até {shipping.days} dias úteis
          </div>
        )}

        {/* Linha divisória */}
        <div style={styles.divider} />

        {/* Total */}
        <div style={styles.totalRow}>
          <span style={styles.totalLabel}>Total</span>
          <span style={styles.totalValue}>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Selos de segurança */}
      <div style={styles.trust}>
        <div style={styles.trustItem}>
          <Shield size={14} style={{ color: 'var(--green-accent)' }} />
          <span>Compra segura</span>
        </div>
        <div style={styles.trustItem}>
          <Lock size={14} style={{ color: 'var(--green-accent)' }} />
          <span>Dados protegidos</span>
        </div>
        <div style={styles.trustItem}>
          <Truck size={14} style={{ color: 'var(--green-accent)' }} />
          <span>Rastreamento incluso</span>
        </div>
      </div>
    </div>
  );
}

// --- Estilos ---
const styles = {
  wrapper: {
    padding: '1.75rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
    position: 'sticky',
    top: 'calc(var(--header-height) + 1.5rem)',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.125rem',
    color: 'var(--graphite-900)',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--graphite-100)',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.25rem',
  },
  totals: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.625rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '0.875rem',
    color: 'var(--graphite-500)',
    display: 'flex',
    alignItems: 'center',
  },
  value: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--graphite-900)',
  },
  shippingDetail: {
    fontSize: '0.6875rem',
    color: 'var(--graphite-500)',
    textAlign: 'right',
    marginTop: '-0.375rem',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--graphite-100)',
    margin: '0.5rem 0',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1rem',
    color: 'var(--graphite-900)',
  },
  totalValue: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.5rem',
    color: 'var(--navy-800)',
  },
  trust: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1.25rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--graphite-100)',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--graphite-500)',
  },
};
