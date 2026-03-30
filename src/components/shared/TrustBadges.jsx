/**
 * GRUPO NORTÃO — TrustBadges
 * 
 * Selos de confiança reutilizáveis para reforçar credibilidade.
 * Usados na Home, Página de Produto, Garantia e rodapé de formulários.
 * 
 * Variantes de layout:
 * - 'row'    → horizontal (padrão, bom para barras)
 * - 'grid'   → grid 2x2 ou 3x2 (bom para blocos)
 * - 'compact' → inline pequeno (bom para dentro de cards)
 * 
 * Uso:
 * <TrustBadges layout="grid" />
 * <TrustBadges layout="compact" badges={['original', 'garantia', 'envio']} />
 */

import {
  Shield,
  Truck,
  CheckCircle,
  Headphones,
  Award,
  PackageCheck,
} from 'lucide-react';

// Todos os badges disponíveis
const ALL_BADGES = {
  original: {
    icon: Shield,
    label: 'Peça Original',
    desc: 'Somente peças originais de fábrica',
  },
  garantia: {
    icon: Award,
    label: 'Garantia Real',
    desc: 'Garantia documentada em todas as peças',
  },
  envio: {
    icon: Truck,
    label: 'Envio Nacional',
    desc: 'Para todos os 27 estados brasileiros',
  },
  atendimento: {
    icon: Headphones,
    label: 'Atendimento Humano',
    desc: 'Suporte técnico com especialistas',
  },
  conferencia: {
    icon: CheckCircle,
    label: 'Conferência Técnica',
    desc: 'Peças avaliadas antes da venda',
  },
  embalagem: {
    icon: PackageCheck,
    label: 'Embalagem Reforçada',
    desc: 'Proteção profissional para transporte',
  },
};

// Badges padrão quando nenhum é especificado
const DEFAULT_BADGES = ['original', 'garantia', 'envio', 'atendimento'];

export default function TrustBadges({
  layout = 'row',
  badges = DEFAULT_BADGES,
  light = false,
}) {
  const items = badges
    .map((key) => (ALL_BADGES[key] ? { key, ...ALL_BADGES[key] } : null))
    .filter(Boolean);

  if (items.length === 0) return null;

  // Layout compact — inline pequeno
  if (layout === 'compact') {
    return (
      <div style={styles.compact.wrapper}>
        {items.map((item) => (
          <div key={item.key} style={styles.compact.badge}>
            <item.icon
              size={14}
              style={{ color: light ? 'var(--green-accent)' : 'var(--green-deep)', flexShrink: 0 }}
            />
            <span
              style={{
                ...styles.compact.label,
                color: light ? 'rgba(255,255,255,0.7)' : 'var(--graphite-700)',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Layout grid — 2x2 ou 3x2
  if (layout === 'grid') {
    return (
      <div
        style={{
          ...styles.grid.wrapper,
          backgroundColor: light ? 'rgba(255,255,255,0.04)' : 'var(--off-white)',
          border: light
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid var(--graphite-100)',
        }}
      >
        {items.map((item) => (
          <div key={item.key} style={styles.grid.badge}>
            <item.icon
              size={20}
              style={{ color: light ? 'var(--green-accent)' : 'var(--green-deep)', flexShrink: 0, marginTop: '2px' }}
            />
            <div>
              <div
                style={{
                  ...styles.grid.label,
                  color: light ? '#fff' : 'var(--navy-900)',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  ...styles.grid.desc,
                  color: light ? 'rgba(255,255,255,0.5)' : 'var(--graphite-500)',
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Layout row — horizontal (padrão)
  return (
    <div
      style={{
        ...styles.row.wrapper,
        borderColor: light ? 'rgba(255,255,255,0.08)' : 'var(--graphite-100)',
      }}
    >
      {items.map((item, i) => (
        <div key={item.key} style={styles.row.badge}>
          <item.icon
            size={18}
            style={{ color: light ? 'var(--green-accent)' : 'var(--green-deep)', flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                ...styles.row.label,
                color: light ? '#fff' : 'var(--navy-900)',
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                ...styles.row.desc,
                color: light ? 'rgba(255,255,255,0.45)' : 'var(--graphite-500)',
              }}
            >
              {item.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Estilos ---
const styles = {
  row: {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      padding: '1.5rem 0',
      borderTop: '1px solid',
      borderBottom: '1px solid',
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.625rem',
      flex: '1 1 200px',
    },
    label: {
      fontSize: '0.8125rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    desc: {
      fontSize: '0.6875rem',
      lineHeight: 1.4,
    },
  },
  grid: {
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '0.75rem',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
    },
    badge: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.625rem',
    },
    label: {
      fontSize: '0.8125rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    desc: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      marginTop: '0.125rem',
    },
  },
  compact: {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
    },
    label: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  },
};
