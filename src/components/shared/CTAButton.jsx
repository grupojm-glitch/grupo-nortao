/**
 * GRUPO NORTÃO — CTAButton
 * 
 * Botão de ação reutilizável em todo o site.
 * 
 * Variantes:
 * - primary    → verde (ação principal)
 * - secondary  → navy escuro
 * - outline    → borda branca (fundo escuro)
 * - ghost      → borda cinza (fundo claro)
 * - whatsapp   → verde WhatsApp
 * - danger     → vermelho (ações destrutivas)
 * 
 * Tamanhos: 'md' (padrão) | 'lg'
 * 
 * Uso:
 * <CTAButton variant="primary" size="lg" icon={<Search />} onClick={fn}>
 *   Buscar Peça
 * </CTAButton>
 * 
 * Como link:
 * <CTAButton variant="whatsapp" href="https://wa.me/5500000000000" external>
 *   Fale Conosco
 * </CTAButton>
 */

import { useCallback } from 'react';

// Estilos por variante
const VARIANT_STYLES = {
  primary: {
    backgroundColor: 'var(--green-accent)',
    color: 'var(--navy-900)',
    border: 'none',
    hoverBg: '#C48F01',
  },
  secondary: {
    backgroundColor: 'var(--navy-700)',
    color: '#fff',
    border: 'none',
    hoverBg: 'var(--navy-600)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1.5px solid rgba(255, 255, 255, 0.3)',
    hoverBg: 'rgba(255, 255, 255, 0.05)',
    hoverBorder: 'rgba(255, 255, 255, 0.6)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--navy-700)',
    border: '1.5px solid var(--graphite-300)',
    hoverBg: 'var(--graphite-100)',
    hoverBorder: 'var(--graphite-500)',
  },
  whatsapp: {
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    hoverBg: '#1fb855',
  },
  danger: {
    backgroundColor: 'var(--red-alert)',
    color: '#fff',
    border: 'none',
    hoverBg: '#dc2626',
  },
};

// Estilos por tamanho
const SIZE_STYLES = {
  md: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    borderRadius: 'var(--radius-md)',
  },
  lg: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: 'var(--radius-lg)',
  },
};

export default function CTAButton({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  onClick = null,
  href = null,
  external = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  style: customStyle = {},
}) {
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.25s ease',
    textDecoration: 'none',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyle,
    backgroundColor: variantStyle.backgroundColor,
    color: variantStyle.color,
    border: variantStyle.border,
    ...customStyle,
  };

  // Hover handlers
  const handleMouseEnter = useCallback((e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-1px)';
    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    if (variantStyle.hoverBg) {
      e.currentTarget.style.backgroundColor = variantStyle.hoverBg;
    }
    if (variantStyle.hoverBorder) {
      e.currentTarget.style.borderColor = variantStyle.hoverBorder;
    }
  }, [disabled, variantStyle]);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.backgroundColor = variantStyle.backgroundColor;
    if (variantStyle.border && variantStyle.border !== 'none') {
      e.currentTarget.style.borderColor = variantStyle.border.split(' ').pop();
    }
  }, [variantStyle]);

  // Conteúdo interno
  const content = (
    <>
      {icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
      {children}
    </>
  );

  // Renderiza como link ou botão
  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
}
