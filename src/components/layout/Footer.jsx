/**
 * GRUPO NORTÃO — Footer
 * 
 * Rodapé institucional do site.
 * - 4 colunas: Marca, Navegação, Comercial, Segurança
 * - Links LGPD (Privacidade, Termos, Meus Dados)
 * - Selos de confiança compactos
 * - Copyright com frase da marca
 * 
 * Uso: Inserido no App.jsx (layout persistente)
 */

import { Link } from 'react-router-dom';
import { Shield, Truck, Headphones, Award } from 'lucide-react';

// Links por coluna
const NAV_LINKS = [
  { label: 'Buscar Peças', path: '/pecas' },
  { label: 'Quem Somos', path: '/quem-somos' },
  { label: 'Garantia e Devolução', path: '/garantia' },
  { label: 'Não Achei Minha Peça', path: '/nao-achei-minha-peca' },
];

const COMMERCIAL_LINKS = [
  { label: 'Seja Parceiro B2B', path: '/seja-parceiro' },
  { label: 'Contato', path: '/contato' },
];

const LEGAL_LINKS = [
  { label: 'Política de Privacidade', path: '/politica-de-privacidade' },
  { label: 'Termos de Uso', path: '/termos-de-uso' },
  { label: 'Meus Dados (LGPD)', path: '/meus-dados' },
];

const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20informações.';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        {/* Grid principal */}
        <div style={styles.grid}>
          {/* Coluna 1 — Marca */}
          <div>
            <Link to="/" style={styles.logo}>
              Grupo <span style={styles.logoAccent}>Nortão</span>
            </Link>
            <p style={styles.desc}>
              Especialistas em peças seminovas originais para pickups, 
              com estoque estratégico e envio para todo o Brasil.
            </p>
            <div style={styles.badges}>
              <span style={styles.badge}>
                <Shield size={14} /> Garantia
              </span>
              <span style={styles.badge}>
                <Truck size={14} /> Nacional
              </span>
              <span style={styles.badge}>
                <Award size={14} /> Original
              </span>
              <span style={styles.badge}>
                <Headphones size={14} /> Suporte
              </span>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <h4 style={styles.colTitle}>Navegação</h4>
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} style={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Coluna 3 — Comercial */}
          <div>
            <h4 style={styles.colTitle}>Comercial</h4>
            {COMMERCIAL_LINKS.map((link) => (
              <Link key={link.path} to={link.path} style={styles.link}>
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.link, color: '#25D366' }}
            >
              Atendimento via WhatsApp
            </a>
          </div>

          {/* Coluna 4 — Legal / LGPD */}
          <div>
            <h4 style={styles.colTitle}>Privacidade</h4>
            {LEGAL_LINKS.map((link) => (
              <Link key={link.path} to={link.path} style={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider + Copyright */}
        <div style={styles.bottom}>
          <span style={styles.copyright}>
            © {new Date().getFullYear()} Grupo Nortão. Todos os direitos reservados.
          </span>
          <span style={styles.tagline}>
            Peça certa. Processo certo. Compra certa.
          </span>
        </div>
      </div>
    </footer>
  );
}

// --- Estilos ---
const styles = {
  footer: {
    backgroundColor: 'var(--navy-900)',
    color: 'rgba(255, 255, 255, 0.6)',
    paddingTop: '4rem',
    paddingBottom: '2rem',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2.5rem',
    marginBottom: '3rem',
  },

  // Logo
  logo: {
    display: 'inline-block',
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  logoAccent: {
    color: 'var(--green-accent)',
  },
  desc: {
    fontSize: '0.875rem',
    lineHeight: 1.7,
    marginBottom: '1.25rem',
  },

  // Badges
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.625rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.6875rem',
    fontWeight: 600,
    color: 'var(--green-accent)',
  },

  // Colunas
  colTitle: {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    color: '#fff',
    fontSize: '0.8125rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '1rem',
  },
  link: {
    display: 'block',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    marginBottom: '0.625rem',
    transition: 'color 0.2s ease',
    lineHeight: 1.5,
  },

  // Bottom
  bottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    fontSize: '0.8125rem',
  },
  tagline: {
    fontSize: '0.8125rem',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.35)',
  },
};
