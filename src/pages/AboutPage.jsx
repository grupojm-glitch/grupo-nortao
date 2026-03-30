/**
 * GRUPO NORTÃO — AboutPage
 * 
 * Página institucional "Quem Somos".
 * Função: contar a história, reforçar credibilidade, humanizar sem perder força.
 * 
 * Estrutura:
 * 1. Hero institucional
 * 2. História (de onde viemos)
 * 3. Pilares da operação
 * 4. Métricas
 * 5. Visão de futuro
 * 6. CTA final
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, Zap, Target, Users, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import CTAButton from '../components/shared/CTAButton';
import TrustBadges from '../components/shared/TrustBadges';

const PILLARS = [
  {
    icon: Shield,
    title: 'Critério Técnico',
    description: 'Toda peça é avaliada antes de entrar no estoque. Código verificado, condição documentada, fotos reais. Sem improviso.',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description: 'O cliente sabe exatamente o que está comprando. Sem surpresa, sem peça maquiada, sem descrição genérica.',
  },
  {
    icon: Target,
    title: 'Foco em Pickups',
    description: 'Não somos autopeças genérica. Nosso estoque, conhecimento e time são especializados em pickups.',
  },
  {
    icon: Zap,
    title: 'Inteligência Digital',
    description: 'Usamos tecnologia e dados para otimizar estoque, precificação e atendimento. Operação moderna com visão de escala.',
  },
];

const METRICS = [
  { value: '8+', label: 'Anos de mercado' },
  { value: '2.500+', label: 'Peças catalogadas' },
  { value: '27', label: 'Estados atendidos' },
  { value: '100%', label: 'Peças originais' },
  { value: '98%', label: 'Clientes satisfeitos' },
  { value: '24h', label: 'Tempo médio de resposta' },
];

const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20Grupo%20Nortão.';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* ========================
          Hero Institucional
          ======================== */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.overline}>Quem Somos</span>
          <h1 style={styles.heroTitle}>
            Uma operação nacional de peças para pickups, construída sobre confiança
          </h1>
          <p style={styles.heroSubtitle}>
            O Grupo Nortão nasceu da visão de que o mercado de peças para pickups 
            merecia mais seriedade, mais processo e mais inteligência.
          </p>
        </div>
      </section>

      {/* ========================
          História
          ======================== */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.storyGrid}>
            <div>
              <SectionTitle
                overline="Nossa história"
                title="De onde viemos"
              />
              <p style={styles.text}>
                O Grupo Nortão começou como uma operação focada em peças de pickups 
                no coração do Brasil. Com o tempo, percebemos que não bastava ter peça 
                — era preciso ter processo, critério técnico e uma estrutura que 
                gerasse confiança de verdade.
              </p>
              <p style={styles.text}>
                Hoje, operamos com estoque estratégico nacional, triagem técnica 
                rigorosa e uma plataforma digital que atende desde o cliente final 
                que precisa de um farol até a oficina que compra com frequência.
              </p>
              <p style={styles.text}>
                Nosso diferencial não é apenas ter a peça. É ter a peça certa, 
                com o processo certo, gerando a compra certa.
              </p>
            </div>
            <div style={styles.storyHighlight}>
              <blockquote style={styles.quote}>
                "Pickup exige critério. Não é qualquer peça que serve, 
                não é qualquer fornecedor que entende, e não é qualquer 
                processo que garante a confiança que o cliente precisa."
              </blockquote>
              <span style={styles.quoteAuthor}>— Grupo Nortão</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================
          Pilares
          ======================== */}
      <section style={styles.sectionDark}>
        <div style={styles.container}>
          <SectionTitle
            overline="Como operamos"
            title="Os pilares do Grupo Nortão"
            subtitle="Cada decisão é guiada por esses princípios."
            light
            center
          />
          <div style={styles.pillarsGrid}>
            {PILLARS.map((pillar, i) => (
              <div key={i} style={styles.pillarCard}>
                <div style={styles.pillarIcon}>
                  <pillar.icon size={22} />
                </div>
                <h3 style={styles.pillarTitle}>{pillar.title}</h3>
                <p style={styles.pillarDesc}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================
          Métricas
          ======================== */}
      <section style={styles.section}>
        <div style={styles.container}>
          <SectionTitle
            overline="Em números"
            title="O tamanho da nossa operação"
            center
          />
          <div style={styles.metricsGrid}>
            {METRICS.map((metric, i) => (
              <div key={i} style={styles.metricCard}>
                <span style={styles.metricValue}>{metric.value}</span>
                <span style={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================
          Visão de Futuro
          ======================== */}
      <section style={styles.sectionLight}>
        <div style={styles.containerNarrow}>
          <SectionTitle
            overline="Visão"
            title="Para onde estamos indo"
            center
          />
          <p style={styles.visionText}>
            O Grupo Nortão está se posicionando como a principal plataforma 
            digital de peças para pickups do Brasil. Com investimentos em 
            tecnologia, automação e rede de parceiros, estamos construindo 
            um ecossistema que conecta quem precisa de peça com quem tem 
            peça — com confiança, velocidade e inteligência.
          </p>
          <p style={styles.visionText}>
            Nosso plano inclui expansão do catálogo, portal de parceiros B2B, 
            integração com marketplaces e uma plataforma de automação que já 
            está em operação e sendo validada no mercado.
          </p>
        </div>
      </section>

      {/* ========================
          Trust Badges
          ======================== */}
      <section style={styles.section}>
        <div style={styles.container}>
          <TrustBadges
            layout="row"
            badges={['original', 'garantia', 'envio', 'atendimento', 'conferencia', 'embalagem']}
          />
        </div>
      </section>

      {/* ========================
          CTA Final
          ======================== */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaTitle}>Quer conhecer melhor nosso trabalho?</h2>
          <p style={styles.ctaSubtitle}>
            Fale com nosso time ou navegue pelo catálogo.
          </p>
          <div style={styles.ctaButtons}>
            <CTAButton
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
              href={WHATSAPP_URL}
              external
            >
              Falar com o Time
            </CTAButton>
            <CTAButton
              variant="outline"
              size="lg"
              icon={<Users size={18} />}
              onClick={() => navigate('/seja-parceiro')}
            >
              Programa de Parceria
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Estilos ---
const styles = {
  // Hero
  hero: {
    backgroundColor: 'var(--navy-900)',
    padding: '5rem 1.5rem',
    textAlign: 'center',
  },
  heroInner: {
    maxWidth: 'var(--max-width-narrow)',
    margin: '0 auto',
  },
  overline: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--green-accent)',
    marginBottom: '1rem',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    textWrap: 'balance',
  },
  heroSubtitle: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '580px',
    margin: '0 auto',
  },

  // Sections
  section: { padding: '5rem 1.5rem' },
  sectionDark: { backgroundColor: 'var(--navy-900)', padding: '5rem 1.5rem' },
  sectionLight: { backgroundColor: 'var(--off-white)', padding: '5rem 1.5rem' },
  container: { maxWidth: 'var(--max-width)', margin: '0 auto' },
  containerNarrow: { maxWidth: 'var(--max-width-narrow)', margin: '0 auto', textAlign: 'center' },

  // Story
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    alignItems: 'center',
  },
  text: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: 'var(--graphite-700)',
    marginBottom: '1rem',
  },
  storyHighlight: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-xl)',
    backgroundColor: 'var(--off-white)',
    borderLeft: '4px solid var(--green-accent)',
  },
  quote: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.375rem',
    lineHeight: 1.5,
    color: 'var(--navy-800)',
    fontStyle: 'italic',
    marginBottom: '1rem',
  },
  quoteAuthor: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--graphite-500)',
  },

  // Pillars
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  pillarCard: {
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  pillarIcon: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(245,179,1,0.1)',
    color: 'var(--green-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.25rem',
  },
  pillarTitle: {
    fontWeight: 700,
    fontSize: '1.0625rem',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  pillarDesc: {
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    color: 'rgba(255,255,255,0.5)',
  },

  // Metrics
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1.25rem',
  },
  metricCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1.75rem 1rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
  },
  metricValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.25rem',
    color: 'var(--navy-700)',
    lineHeight: 1.1,
    marginBottom: '0.375rem',
  },
  metricLabel: {
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
    fontWeight: 500,
  },

  // Vision
  visionText: {
    fontSize: '1.0625rem',
    lineHeight: 1.8,
    color: 'var(--graphite-700)',
    marginBottom: '1rem',
    maxWidth: '640px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  // CTA
  ctaSection: {
    padding: '4rem 1.5rem',
    background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
    textAlign: 'center',
  },
  ctaInner: { maxWidth: '600px', margin: '0 auto' },
  ctaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    color: '#fff',
    marginBottom: '1rem',
    lineHeight: 1.15,
  },
  ctaSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '2rem',
    fontSize: '1.0625rem',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};
