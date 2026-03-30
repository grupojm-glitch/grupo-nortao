/**
 * GRUPO NORTÃO — InstitutionalSnap (Home)
 * 
 * Resumo institucional rápido na Home.
 * Não é a página "Quem Somos" — é um snapshot.
 * 
 * Função:
 * - Posicionar a empresa como operação séria
 * - Reforçar que não é autopeças improvisada
 * - Apresentar métricas que geram confiança
 * - Direcionar pra página completa "Quem Somos"
 * 
 * Layout split:
 * - Esquerda: texto + CTA
 * - Direita: grid 2x2 de métricas
 * 
 * Percepção:
 * - "É uma empresa séria, moderna e preparada pra crescer."
 */

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import CTAButton from '../shared/CTAButton';

const METRICS = [
  { value: '8+', label: 'Anos de mercado' },
  { value: '2.500+', label: 'Peças catalogadas' },
  { value: '27', label: 'Estados atendidos' },
  { value: '100%', label: 'Peças originais' },
];

export default function InstitutionalSnap() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Coluna esquerda — Texto */}
          <div>
            <SectionTitle
              overline="Grupo Nortão"
              title="Uma operação nacional de verdade"
              subtitle="Não somos uma autopeças improvisada. Somos uma plataforma comercial para pickups, com estoque estratégico, processo técnico e visão de crescimento."
            />

            <p style={styles.extraText}>
              Do estoque à entrega, cada etapa é pensada para gerar confiança. 
              Nosso time é especializado em pickups e nosso processo garante 
              que a peça certa chegue no destino certo, na condição descrita.
            </p>

            <CTAButton
              variant="ghost"
              icon={<ArrowRight size={16} />}
              onClick={() => navigate('/quem-somos')}
              style={{ marginTop: '1.5rem' }}
            >
              Conheça Nossa História
            </CTAButton>
          </div>

          {/* Coluna direita — Métricas */}
          <div style={styles.metricsGrid}>
            {METRICS.map((item, i) => (
              <div key={i} style={styles.metricCard}>
                <span style={styles.metricValue}>{item.value}</span>
                <span style={styles.metricLabel}>{item.label}</span>
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
    backgroundColor: 'var(--off-white)',
    padding: '5rem 1.5rem',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    alignItems: 'center',
  },
  extraText: {
    fontSize: '0.9375rem',
    lineHeight: 1.75,
    color: 'var(--graphite-500)',
    maxWidth: '480px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.25rem',
  },
  metricCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1.75rem 1rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: '#fff',
    border: '1px solid var(--graphite-100)',
    transition: 'box-shadow 0.3s ease',
  },
  metricValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--navy-700)',
    lineHeight: 1.1,
    marginBottom: '0.375rem',
  },
  metricLabel: {
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
    fontWeight: 500,
  },
};
