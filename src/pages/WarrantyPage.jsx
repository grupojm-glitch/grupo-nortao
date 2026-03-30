/**
 * GRUPO NORTÃO — WarrantyPage
 * 
 * Página de Garantia e Devolução.
 * Função: reduzir objeções, aumentar confiança, mostrar profissionalismo.
 * 
 * Estrutura:
 * 1. Hero
 * 2. Política de garantia (o que cobre / o que não cobre)
 * 3. Processo de troca/devolução (passos visuais)
 * 4. Condições importantes
 * 5. FAQ específico
 * 6. CTA suporte
 */

import { useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Clock, MessageCircle, Package, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import CTAButton from '../components/shared/CTAButton';
import FAQAccordion from '../components/shared/FAQAccordion';

const WARRANTY_COVERS = [
  'Defeitos não aparentes identificados após a compra',
  'Falhas de funcionamento não causadas por instalação inadequada',
  'Incompatibilidade comprovada quando a compatibilidade foi confirmada pelo nosso time',
  'Peça diferente da descrita no anúncio',
];

const WARRANTY_NOT_COVERS = [
  'Desgaste natural de uso previamente informado na descrição',
  'Danos causados por instalação incorreta ou por profissional não qualificado',
  'Peças que foram modificadas, pintadas ou reparadas após o recebimento',
  'Danos causados por acidente, mau uso ou negligência',
  'Incompatibilidade quando o cliente não confirmou com nosso suporte',
];

const RETURN_STEPS = [
  {
    icon: MessageCircle,
    title: 'Entre em contato',
    description: 'Fale com nosso suporte via WhatsApp informando o problema e o número do pedido.',
  },
  {
    icon: Shield,
    title: 'Análise técnica',
    description: 'Nossa equipe analisa a situação e orienta sobre os próximos passos.',
  },
  {
    icon: Package,
    title: 'Envio da peça',
    description: 'Se aprovado, orientamos sobre o envio de devolução com frete por nossa conta.',
  },
  {
    icon: CheckCircle,
    title: 'Resolução',
    description: 'Após recebimento e conferência, realizamos troca ou reembolso conforme o caso.',
  },
];

const WARRANTY_FAQS = [
  { question: 'Qual o prazo de garantia?', answer: 'O prazo padrão é de 90 dias a partir do recebimento, podendo variar conforme a categoria da peça. O prazo específico é informado na página de cada produto.' },
  { question: 'Como aciono a garantia?', answer: 'Entre em contato pelo WhatsApp informando seu nome, número do pedido e uma descrição do problema. Responderemos em até 24h úteis com a orientação.' },
  { question: 'Quem paga o frete da devolução?', answer: 'Se o problema estiver coberto pela garantia, o frete de devolução é por conta do Grupo Nortão.' },
  { question: 'Posso devolver se a peça não servir?', answer: 'Sim, desde que a peça não tenha sido instalada, esteja nas mesmas condições em que foi recebida e a devolução seja solicitada em até 7 dias após o recebimento, conforme o Código de Defesa do Consumidor.' },
  { question: 'Quanto tempo leva para resolver?', answer: 'Após o recebimento da peça devolvida, a análise e resolução acontecem em até 5 dias úteis. Troca ou reembolso são processados imediatamente após a aprovação.' },
  { question: 'A garantia cobre instalação incorreta?', answer: 'Não. Recomendamos que a instalação seja feita por profissional qualificado. Danos causados por instalação inadequada não são cobertos pela garantia.' },
];

const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20preciso%20de%20suporte%20com%20garantia%20de%20uma%20peça.';

export default function WarrantyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* ========================
          Hero
          ======================== */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.overline}>Garantia e Devolução</span>
          <h1 style={styles.heroTitle}>
            Sua compra protegida. Nosso compromisso.
          </h1>
          <p style={styles.heroSubtitle}>
            Todas as peças do Grupo Nortão possuem garantia documentada. 
            Trabalhamos com transparência para que você compre com segurança.
          </p>
        </div>
      </section>

      {/* ========================
          O que cobre / O que não cobre
          ======================== */}
      <section style={styles.section}>
        <div style={styles.container}>
          <SectionTitle
            overline="Política de garantia"
            title="O que está coberto"
            center
          />
          <div style={styles.coversGrid}>
            {/* Cobre */}
            <div style={styles.coversCard}>
              <h3 style={styles.coversTitle}>
                <CheckCircle size={20} style={{ color: 'var(--green-accent)' }} />
                A garantia cobre
              </h3>
              <div style={styles.coversList}>
                {WARRANTY_COVERS.map((item, i) => (
                  <div key={i} style={styles.coversItem}>
                    <CheckCircle size={16} style={{ color: 'var(--green-accent)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Não cobre */}
            <div style={{ ...styles.coversCard, borderColor: 'var(--graphite-100)' }}>
              <h3 style={styles.coversTitle}>
                <XCircle size={20} style={{ color: 'var(--red-alert)' }} />
                A garantia não cobre
              </h3>
              <div style={styles.coversList}>
                {WARRANTY_NOT_COVERS.map((item, i) => (
                  <div key={i} style={styles.coversItem}>
                    <XCircle size={16} style={{ color: 'var(--red-alert)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================
          Processo de Troca/Devolução
          ======================== */}
      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <SectionTitle
            overline="Como funciona"
            title="Processo de troca ou devolução"
            subtitle="Simples, transparente e sem burocracia."
            center
          />
          <div style={styles.stepsGrid}>
            {RETURN_STEPS.map((step, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</div>
                <div style={styles.stepIcon}>
                  <step.icon size={22} />
                </div>
                <h4 style={styles.stepTitle}>{step.title}</h4>
                <p style={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================
          FAQ
          ======================== */}
      <section style={styles.section}>
        <div style={styles.containerNarrow}>
          <SectionTitle
            overline="Dúvidas sobre garantia"
            title="Perguntas frequentes"
            center
          />
          <FAQAccordion items={WARRANTY_FAQS} />
        </div>
      </section>

      {/* ========================
          CTA Suporte
          ======================== */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaTitle}>Precisa acionar a garantia?</h2>
          <p style={styles.ctaSubtitle}>
            Nosso time de suporte resolve. Fale com a gente agora.
          </p>
          <CTAButton
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle size={18} />}
            href={WHATSAPP_URL}
            external
          >
            Falar com Suporte
          </CTAButton>
        </div>
      </section>
    </div>
  );
}

// --- Estilos ---
const styles = {
  hero: {
    backgroundColor: 'var(--navy-900)',
    padding: '5rem 1.5rem',
    textAlign: 'center',
  },
  heroInner: { maxWidth: 'var(--max-width-narrow)', margin: '0 auto' },
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
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: '#fff',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    textWrap: 'balance',
  },
  heroSubtitle: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '560px',
    margin: '0 auto',
  },

  section: { padding: '5rem 1.5rem' },
  sectionLight: { backgroundColor: 'var(--off-white)', padding: '5rem 1.5rem' },
  container: { maxWidth: 'var(--max-width)', margin: '0 auto' },
  containerNarrow: { maxWidth: '720px', margin: '0 auto' },

  // Covers
  coversGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  coversCard: {
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--green-soft)',
    backgroundColor: '#fff',
  },
  coversTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 700,
    fontSize: '1.0625rem',
    color: 'var(--navy-900)',
    marginBottom: '1.25rem',
  },
  coversList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  coversItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.625rem',
    fontSize: '0.9375rem',
    lineHeight: 1.5,
    color: 'var(--graphite-700)',
  },

  // Steps
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  stepCard: {
    textAlign: 'center',
    padding: '2rem 1.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: '#fff',
    border: '1px solid var(--graphite-100)',
    position: 'relative',
  },
  stepNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--graphite-100)',
    lineHeight: 1,
    marginBottom: '0.5rem',
  },
  stepIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--navy-700)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  stepTitle: {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--navy-900)',
    marginBottom: '0.375rem',
  },
  stepDesc: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--graphite-500)',
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
};
