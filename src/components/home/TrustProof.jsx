/**
 * GRUPO NORTÃO — TrustProof (Home)
 * 
 * Seção de prova social / depoimentos.
 * Reforça confiança com experiências reais de clientes.
 * 
 * Percepção que deve gerar:
 * - "Posso confiar."
 * - "Outras pessoas já compraram e aprovaram."
 * - "Funciona pra cliente final e pra oficina."
 * 
 * 3 depoimentos cobrindo perfis diferentes:
 * - Cliente final
 * - Dono de oficina (B2B)
 * - Cliente que não encontrou e a Nortão resolveu
 */

import { Star } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

const TESTIMONIALS = [
  {
    text: 'Comprei uma porta da Hilux que chegou exatamente como descreveram. Embalagem impecável e peça em ótimo estado. Já fiz três compras e todas foram assim.',
    author: 'Ricardo M.',
    location: 'Goiânia — GO',
    role: 'Cliente final',
    stars: 5,
  },
  {
    text: 'Sou dono de oficina e comecei a comprar peças de pickup direto com a Nortão. Atendimento rápido, preço justo e eles realmente entendem de compatibilidade. Virou meu fornecedor fixo.',
    author: 'Carlos A.',
    location: 'São Paulo — SP',
    role: 'Oficina parceira',
    stars: 5,
  },
  {
    text: 'Procurei essa peça da Ranger por semanas em tudo quanto é lugar. A Nortão encontrou, confirmou compatibilidade, mandou fotos reais e enviou em 3 dias. Impressionante.',
    author: 'Fernanda T.',
    location: 'Curitiba — PR',
    role: 'Cliente final',
    stars: 5,
  },
];

export default function TrustProof() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <SectionTitle
          overline="Confiança"
          title="Por que clientes confiam no Grupo Nortão"
          subtitle="Experiências reais de quem já comprou. De cliente final a dono de oficina."
          center
        />

        <div style={styles.grid}>
          {TESTIMONIALS.map((item, i) => (
            <div key={i} style={styles.card}>
              {/* Estrelas */}
              <div style={styles.stars}>
                {Array.from({ length: item.stars }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    fill="var(--amber-warm)"
                    color="var(--amber-warm)"
                  />
                ))}
              </div>

              {/* Depoimento */}
              <p style={styles.text}>"{item.text}"</p>

              {/* Autor */}
              <div style={styles.author}>
                {/* Avatar placeholder */}
                <div style={styles.avatar}>
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div style={styles.authorName}>{item.author}</div>
                  <div style={styles.authorMeta}>
                    {item.role} · {item.location}
                  </div>
                </div>
              </div>
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
    padding: '5rem 1.5rem',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
  },
  stars: {
    display: 'flex',
    gap: '0.125rem',
  },
  text: {
    fontSize: '0.9375rem',
    lineHeight: 1.7,
    color: 'var(--graphite-700)',
    fontStyle: 'italic',
    flex: 1,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid var(--graphite-100)',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--navy-700)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 700,
    flexShrink: 0,
  },
  authorName: {
    fontWeight: 700,
    fontSize: '0.9375rem',
    color: 'var(--navy-900)',
    lineHeight: 1.3,
  },
  authorMeta: {
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
  },
};
