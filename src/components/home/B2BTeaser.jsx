/**
 * GRUPO NORTÃO — B2BTeaser (Home)
 * 
 * Seção de chamada para o programa de parceria B2B.
 * Segmenta oficinas, mecânicas, lojas menores e revendedores.
 * 
 * Layout split:
 * - Esquerda: texto + CTAs
 * - Direita: 4 cards de benefícios
 * 
 * Percepção que deve gerar:
 * - "Se eu sou loja ou mecânica, posso comprar deles."
 * - "Eles têm estrutura pra parceria."
 * 
 * Fundo escuro com gradiente navy → verde escuro.
 */

import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, DollarSign, Headphones, Zap, ShieldCheck } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import CTAButton from '../shared/CTAButton';

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Tabela B2B',
    description: 'Preços diferenciados para quem compra com frequência.',
  },
  {
    icon: Headphones,
    title: 'Atendimento Direto',
    description: 'Canal exclusivo de suporte para parceiros.',
  },
  {
    icon: Zap,
    title: 'Prioridade',
    description: 'Acesso antecipado a peças estratégicas.',
  },
  {
    icon: ShieldCheck,
    title: 'Flexibilidade',
    description: 'Condições ajustadas para diferentes perfis de parceiro.',
  },
];

const WHATSAPP_B2B_URL = 'https://wa.me/5500000000000?text=Olá,%20sou%20loja/oficina%20e%20gostaria%20de%20saber%20sobre%20o%20programa%20de%20parceria%20B2B.';

export default function B2BTeaser() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Coluna esquerda — Texto + CTAs */}
          <div>
            <SectionTitle
              overline="Para oficinas e revendedores"
              title="Programa de Parceria B2B"
              subtitle="Condições especiais para quem compra com frequência. Tabela diferenciada, prioridade de atendimento e acesso antecipado a peças estratégicas."
              light
            />
            <div style={styles.ctas}>
              <CTAButton
                variant="primary"
                icon={<Users size={18} />}
                onClick={() => navigate('/seja-parceiro')}
              >
                Quero Ser Parceiro
              </CTAButton>
              <CTAButton
                variant="outline"
                icon={<ArrowRight size={16} />}
                href={WHATSAPP_B2B_URL}
                external
              >
                Falar sobre Parceria
              </CTAButton>
            </div>
          </div>

          {/* Coluna direita — Benefícios */}
          <div style={styles.benefitsGrid}>
            {BENEFITS.map((item, i) => (
              <div key={i} style={styles.benefitCard}>
                <div style={styles.benefitIcon}>
                  <item.icon size={18} />
                </div>
                <div>
                  <h4 style={styles.benefitTitle}>{item.title}</h4>
                  <p style={styles.benefitDesc}>{item.description}</p>
                </div>
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
    padding: '5rem 1.5rem',
    background: 'linear-gradient(135deg, var(--navy-800) 0%, #081F33 100%)',
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
  ctas: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  benefitCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '1.25rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'background-color 0.2s ease',
  },
  benefitIcon: {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(245, 179, 1, 0.1)',
    color: 'var(--green-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  benefitTitle: {
    fontWeight: 700,
    fontSize: '0.9375rem',
    color: '#fff',
    marginBottom: '0.25rem',
    lineHeight: 1.3,
  },
  benefitDesc: {
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    color: 'rgba(255, 255, 255, 0.5)',
  },
};
