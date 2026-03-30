/**
 * GRUPO NORTÃO — PickupSpecialty (Home)
 * 
 * Seção que reforça o posicionamento:
 * "Não somos autopeças genérica. Somos especialistas em pickups."
 * 
 * Deve gerar a percepção:
 * - "Essa empresa entende de pickup."
 * - "Eles têm processo."
 * - "Aqui não parece bagunça."
 * 
 * 4 cards com ícone + título + descrição.
 */

import { Shield, Wrench, Truck, Star } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

const SPECIALTIES = [
  {
    icon: Shield,
    title: 'Peças Originais',
    description: 'Trabalhamos exclusivamente com peças originais de fábrica. Sem réplicas, sem adaptações, sem paralelas.',
  },
  {
    icon: Wrench,
    title: 'Triagem Técnica',
    description: 'Cada peça é avaliada, classificada e documentada antes de entrar no estoque. Nada é publicado sem conferência.',
  },
  {
    icon: Truck,
    title: 'Envio Nacional',
    description: 'Embalagem reforçada e logística profissional para todos os 27 estados brasileiros, com rastreamento completo.',
  },
  {
    icon: Star,
    title: 'Foco em Pickups',
    description: 'Hilux, Ranger, S10, Amarok, Frontier, L200, Toro, Saveiro e outros modelos nacionais e importados.',
  },
];

export default function PickupSpecialty() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <SectionTitle
          overline="Especialidade"
          title="Pickup exige critério. A gente entende disso."
          subtitle="Diferente de autopeças genéricas, nosso foco é exclusivo em pickups. Cada peça passa por triagem técnica antes de entrar no estoque."
          center
        />

        <div style={styles.grid}>
          {SPECIALTIES.map((item, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--green-accent)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--graphite-100)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Ícone */}
              <div style={styles.iconBox}>
                <item.icon size={22} />
              </div>

              {/* Título */}
              <h3 style={styles.cardTitle}>{item.title}</h3>

              {/* Descrição */}
              <p style={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Estilos ---
const styles = {
  section: {
    padding: '6rem 1.5rem 4rem',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--green-soft)',
    color: 'var(--green-deep)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.25rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '1.0625rem',
    color: 'var(--navy-900)',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    color: 'var(--graphite-500)',
  },
};
