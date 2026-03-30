/**
 * GRUPO NORTÃO — ProductInfo
 * 
 * Bloco principal de informações do produto.
 * Lado direito da página (ao lado da galeria).
 * 
 * Elementos (em ordem de importância visual):
 * 1. Badge de condição
 * 2. Título técnico + comercial
 * 3. Código original
 * 4. Preço
 * 5. CTA principal (WhatsApp) + CTA secundário (Compatibilidade)
 * 6. Trust badges em grid
 * 7. Bloco "Antes de comprar, confirme"
 * 
 * Uso:
 * <ProductInfo product={productData} />
 */

import { MessageCircle, CheckCircle, Shield, Truck, Headphones, AlertTriangle, ShoppingBag } from 'lucide-react';
import CTAButton from '../shared/CTAButton';
import TrustBadges from '../shared/TrustBadges';
import { useCart, parsePrice } from '../../context/CartContext';

export default function ProductInfo({ product = {} }) {
  const {
    name = 'Nome da peça',
    slug = '',
    code = '000000',
    condition = 'Seminovo Original',
    price = 'Sob consulta',
    image = '',
    warranty = '90 dias de garantia contra defeitos não aparentes',
    whatsappUrl = 'https://wa.me/5500000000000',
  } = product;

  const { addItem, isInCart } = useCart();
  const alreadyInCart = isInCart(slug);

  function handleAddToCart() {
    addItem({
      slug,
      name,
      code,
      price,
      priceNum: parsePrice(price),
      condition,
      image,
    });
  }

  // Monta URL do WhatsApp com dados da peça
  const whatsappMessage = encodeURIComponent(
    `Olá, vim pelo site e tenho interesse na peça:\n\n` +
    `${name}\nCódigo: ${code}\n\n` +
    `Gostaria de mais informações.`
  );
  const whatsappLink = `${whatsappUrl}?text=${whatsappMessage}`;

  const compatMessage = encodeURIComponent(
    `Olá, gostaria de confirmar se esta peça é compatível com meu veículo:\n\n` +
    `Peça: ${name}\nCódigo: ${code}\n\n` +
    `Meu veículo: [informar modelo, ano e versão]`
  );
  const compatLink = `${whatsappUrl}?text=${compatMessage}`;

  return (
    <div style={styles.wrapper}>
      {/* Badge de condição */}
      <span style={styles.badge}>{condition}</span>

      {/* Título */}
      <h1 style={styles.title}>{name}</h1>

      {/* Código */}
      <p style={styles.code}>
        Código original: <strong style={styles.codeValue}>{code}</strong>
      </p>

      {/* Preço */}
      <div style={styles.price}>{price}</div>

      {/* CTAs */}
      <div style={styles.ctas}>
        {/* NOVO: Adicionar ao Carrinho */}
        <CTAButton
          variant="primary"
          size="lg"
          icon={<ShoppingBag size={18} />}
          onClick={handleAddToCart}
          disabled={alreadyInCart}
          fullWidth
        >
          {alreadyInCart ? 'Já está no carrinho' : 'Adicionar ao Carrinho'}
        </CTAButton>

        <CTAButton
          variant="whatsapp"
          size="lg"
          icon={<MessageCircle size={18} />}
          href={whatsappLink}
          external
          fullWidth
        >
          Comprar via WhatsApp
        </CTAButton>
        <CTAButton
          variant="ghost"
          size="lg"
          icon={<CheckCircle size={18} />}
          href={compatLink}
          external
          fullWidth
        >
          Confirmar Compatibilidade
        </CTAButton>
      </div>

      {/* Trust badges */}
      <TrustBadges
        layout="grid"
        badges={['original', 'envio', 'garantia', 'atendimento']}
      />

      {/* Bloco "Antes de comprar" */}
      <div style={styles.warningBlock}>
        <div style={styles.warningHeader}>
          <AlertTriangle size={16} style={{ color: 'var(--amber-warm)', flexShrink: 0 }} />
          <span style={styles.warningTitle}>Antes de comprar, confirme estes pontos:</span>
        </div>
        <div style={styles.warningList}>
          <div style={styles.warningItem}>
            <CheckCircle size={14} style={styles.warningCheck} />
            Verifique se o código da peça é compatível com seu veículo
          </div>
          <div style={styles.warningItem}>
            <CheckCircle size={14} style={styles.warningCheck} />
            Confira o ano, modelo e versão da sua pickup
          </div>
          <div style={styles.warningItem}>
            <CheckCircle size={14} style={styles.warningCheck} />
            Em caso de dúvida, use o botão "Confirmar Compatibilidade"
          </div>
          <div style={styles.warningItem}>
            <CheckCircle size={14} style={styles.warningCheck} />
            Nosso time de suporte pode ajudar gratuitamente
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Estilos ---
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  badge: {
    display: 'inline-block',
    alignSelf: 'flex-start',
    padding: '0.375rem 0.875rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--green-soft)',
    color: 'var(--green-deep)',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    lineHeight: 1.2,
    color: 'var(--navy-900)',
    letterSpacing: '-0.01em',
  },
  code: {
    fontSize: '0.9375rem',
    color: 'var(--graphite-500)',
  },
  codeValue: {
    color: 'var(--navy-700)',
    fontWeight: 700,
    fontFamily: 'monospace',
    fontSize: '0.9375rem',
  },
  price: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.25rem',
    color: 'var(--navy-800)',
    lineHeight: 1.2,
  },
  ctas: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  warningBlock: {
    padding: '1.25rem 1.5rem',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--amber-warm)',
    backgroundColor: 'rgba(245, 158, 11, 0.04)',
  },
  warningHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
  },
  warningTitle: {
    fontWeight: 700,
    fontSize: '0.875rem',
    color: 'var(--navy-900)',
  },
  warningList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  warningItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8125rem',
    color: 'var(--graphite-700)',
    lineHeight: 1.5,
  },
  warningCheck: {
    color: 'var(--green-accent)',
    flexShrink: 0,
  },
};
