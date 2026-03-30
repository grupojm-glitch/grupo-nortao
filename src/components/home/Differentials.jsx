/**
 * GRUPO NORTÃO — Differentials (Home)
 * 
 * Seção de diferenciais sobre fundo navy escuro.
 * 6 blocos numerados que respondem: "Por que o Grupo Nortão?"
 * 
 * Posicionamento central:
 * "A gente não empurra peça. A gente direciona a compra certa."
 * 
 * Cada bloco tem número grande + título + descrição curta.
 * Layout em grid responsivo, hover com borda verde.
 */

import SectionTitle from '../shared/SectionTitle';

const DIFFERENTIALS = [
  {
    num: '01',
    title: 'Estoque Estratégico',
    description: 'Peças selecionadas com foco em alta demanda e difícil localização. Não estocamos tudo — estocamos o que importa.',
  },
  {
    num: '02',
    title: 'Conferência Real',
    description: 'Fotos reais, códigos verificados e condição documentada. Você sabe exatamente o que está comprando.',
  },
  {
    num: '03',
    title: 'Orientação Técnica',
    description: 'Suporte para confirmar compatibilidade antes da compra. Nosso time entende de pickup, não apenas de logística.',
  },
  {
    num: '04',
    title: 'Garantia de Confiança',
    description: 'Garantia real e documentada em todas as peças vendidas. Se tiver problema, a gente resolve.',
  },
  {
    num: '05',
    title: 'Atendimento Humano',
    description: 'Você fala com gente que entende de pickup, não com robôs. Atendimento rápido, técnico e honesto.',
  },
  {
    num: '06',
    title: 'Logística Nacional',
    description: 'Envio profissional para os 27 estados, com embalagem reforçada e rastreamento completo.',
  },
];

export default function Differentials() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <SectionTitle
          overline="Diferenciais"
          title="Por que o Grupo Nortão?"
          subtitle="A gente não empurra peça. A gente direciona a compra certa."
          light
          center
        />

        <div style={styles.grid}>
          {DIFFERENTIALS.map((item) => (
            <div
              key={item.num}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.borderColor = 'rgba(245, 179, 1, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              {/* Número grande */}
              <span style={styles.num}>{item.num}</span>

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
    backgroundColor: 'var(--navy-900)',
    padding: '5rem 1.5rem',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
  },
  card: {
    padding: '1.75rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    cursor: 'default',
  },
  num: {
    display: 'block',
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--green-accent)',
    lineHeight: 1,
    marginBottom: '0.875rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '1rem',
    color: '#fff',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '0.875rem',
    lineHeight: 1.65,
    color: 'rgba(255, 255, 255, 0.5)',
  },
};
