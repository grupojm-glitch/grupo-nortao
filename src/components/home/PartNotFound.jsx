/**
 * GRUPO NORTÃO — PartNotFound (Home)
 * 
 * Seção estratégica que captura demanda não atendida.
 * Transforma o visitante que não achou a peça em lead.
 * 
 * Posicionamento:
 * "Se a peça que você precisa não está no catálogo,
 *  a gente busca pra você."
 * 
 * Percepção que deve gerar:
 * - "Se eu não achar, eles conseguem me ajudar."
 * - "Eles não empurram peça, eles orientam."
 * 
 * Fundo off-white para destacar da seção anterior.
 */

import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Clock, Users } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import CTAButton from '../shared/CTAButton';

const STEPS = [
  {
    icon: Search,
    title: 'Você solicita',
    description: 'Preencha o formulário com os dados do veículo e da peça que precisa.',
  },
  {
    icon: Clock,
    title: 'A gente busca',
    description: 'Consultamos nosso estoque interno e a rede de parceiros homologados.',
  },
  {
    icon: Users,
    title: 'Você recebe',
    description: 'Retornamos com disponibilidade, condição, valor e prazo de envio.',
  },
];

export default function PartNotFound() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <SectionTitle
          overline="Não encontrou?"
          title="A gente busca pra você."
          subtitle="Se a peça que você precisa não está no nosso catálogo, preencha o formulário de busca. Consultamos nosso estoque interno e a rede de parceiros homologados."
          center
        />

        {/* Passos do processo */}
        <div style={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={i} style={styles.step}>
              <div style={styles.stepIcon}>
                <step.icon size={22} />
              </div>
              <h4 style={styles.stepTitle}>{step.title}</h4>
              <p style={styles.stepDesc}>{step.description}</p>

              {/* Seta entre passos (exceto último) */}
              {i < STEPS.length - 1 && (
                <div style={styles.arrow}>
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={styles.ctaWrapper}>
          <CTAButton
            variant="secondary"
            size="lg"
            icon={<Search size={18} />}
            onClick={() => navigate('/nao-achei-minha-peca')}
          >
            Solicitar Busca de Peça
          </CTAButton>
          <p style={styles.ctaNote}>
            Sem compromisso. Respondemos em até 24h úteis.
          </p>
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
    maxWidth: 'var(--max-width-narrow)',
    margin: '0 auto',
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2.5rem',
  },
  step: {
    position: 'relative',
    textAlign: 'center',
    padding: '1.5rem 1rem',
  },
  stepIcon: {
    width: '52px',
    height: '52px',
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
  arrow: {
    display: 'none', // visível apenas em desktop via media query futura
    position: 'absolute',
    top: '2rem',
    right: '-1.25rem',
    color: 'var(--graphite-300)',
  },
  ctaWrapper: {
    textAlign: 'center',
  },
  ctaNote: {
    marginTop: '0.75rem',
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
  },
};
