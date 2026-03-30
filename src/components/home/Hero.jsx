/**
 * GRUPO NORTÃO — Hero (Home)
 * 
 * Seção hero principal da página inicial.
 * Primeira coisa que o visitante vê. Deve responder:
 * - O que a empresa faz?
 * - Para quem?
 * - Como buscar a peça?
 * - Como falar com a empresa?
 * 
 * Elementos:
 * - Badge de credibilidade
 * - Título display com destaque em verde
 * - Subtítulo funcional
 * - CTA primário (buscar peça) + CTA WhatsApp
 * - Métricas de prova (estoque, estados, satisfação)
 * - Fundo: navy com grid decorativo + green glow
 */

import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Shield } from 'lucide-react';
import CTAButton from '../shared/CTAButton';

// Métricas de prova social
const METRICS = [
  { value: '2.500+', label: 'Peças em estoque' },
  { value: '27', label: 'Estados atendidos' },
  { value: '98%', label: 'Satisfação dos clientes' },
];

const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20vim%20pelo%20site%20e%20preciso%20de%20uma%20peça%20para%20minha%20pickup.';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      {/* Fundo decorativo — grid pontilhado */}
      <div style={styles.gridBg} />

      {/* Fundo decorativo — glow verde */}
      <div style={styles.greenGlow} />

      {/* Conteúdo */}
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Badge */}
          <span style={styles.badge}>
            <Shield size={14} />
            Peças Seminovas Originais com Garantia
          </span>

          {/* Título */}
          <h1 style={styles.title}>
            A peça certa para sua pickup.{' '}
            <span style={styles.titleAccent}>Com critério.</span>
          </h1>

          {/* Subtítulo */}
          <p style={styles.subtitle}>
            Estoque nacional de peças seminovas originais para pickups. 
            Processo técnico, atendimento especializado e envio para todo o Brasil.
          </p>

          {/* CTAs */}
          <div style={styles.ctas}>
            <CTAButton
              variant="primary"
              size="lg"
              icon={<Search size={18} />}
              onClick={() => navigate('/pecas')}
            >
              Buscar Minha Peça
            </CTAButton>
            <CTAButton
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
              href={WHATSAPP_URL}
              external
            >
              Falar com Especialista
            </CTAButton>
          </div>

          {/* Métricas */}
          <div style={styles.metrics}>
            {METRICS.map((metric) => (
              <div key={metric.label} style={styles.metric}>
                <span style={styles.metricValue}>{metric.value}</span>
                <span style={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Estilos ---
const styles = {
  section: {
    position: 'relative',
    minHeight: '92vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 40%, #081F33 100%)',
    overflow: 'hidden',
  },

  // Backgrounds decorativos
  gridBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  greenGlow: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245, 179, 1, 0.08) 0%, transparent 60%)',
    pointerEvents: 'none',
  },

  // Container
  container: {
    width: '100%',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '4rem 1.5rem',
    position: 'relative',
    zIndex: 2,
  },
  content: {
    maxWidth: '720px',
  },

  // Badge
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.375rem 1rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'rgba(245, 179, 1, 0.1)',
    border: '1px solid rgba(245, 179, 1, 0.2)',
    color: 'var(--green-accent)',
    fontSize: '0.8125rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    animation: 'fadeInUp 0.6s ease both',
  },

  // Título
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    color: '#fff',
    marginBottom: '1.5rem',
    textWrap: 'balance',
    animation: 'fadeInUp 0.7s ease 0.1s both',
  },
  titleAccent: {
    color: 'var(--green-accent)',
  },

  // Subtítulo
  subtitle: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '540px',
    marginBottom: '2.5rem',
    animation: 'fadeInUp 0.7s ease 0.2s both',
  },

  // CTAs
  ctas: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    animation: 'fadeInUp 0.7s ease 0.3s both',
  },

  // Métricas
  metrics: {
    display: 'flex',
    gap: '2.5rem',
    marginTop: '3.5rem',
    flexWrap: 'wrap',
    animation: 'fadeInUp 0.7s ease 0.4s both',
  },
  metric: {
    display: 'flex',
    flexDirection: 'column',
  },
  metricValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    color: '#fff',
    lineHeight: 1.2,
  },
  metricLabel: {
    fontSize: '0.8125rem',
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: '0.125rem',
  },
};
