/**
 * GRUPO NORTÃO — Header
 * 
 * Navbar fixa no topo do site.
 * - Fundo translúcido com blur que solidifica no scroll
 * - Logo clicável → home
 * - Navegação principal com link ativo
 * - CTA WhatsApp no desktop
 * - Menu mobile com overlay fullscreen
 * 
 * Uso: Inserido no App.jsx (layout persistente)
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import CartBadge from '../cart/CartBadge';

// Links de navegação principal
const NAV_LINKS = [
  { label: 'Peças', path: '/pecas' },
  { label: 'Quem Somos', path: '/quem-somos' },
  { label: 'Garantia', path: '/garantia' },
  { label: 'Não Achei Minha Peça', path: '/nao-achei-minha-peca' },
  { label: 'Seja Parceiro', path: '/seja-parceiro' },
  { label: 'Contato', path: '/contato' },
];

// Número do WhatsApp (trocar pelo real em produção)
const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20informações.';

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para mudar estilo da navbar
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha menu mobile ao navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // Verifica se link está ativo
  function isActive(path) {
    if (path === '/pecas') {
      return location.pathname.startsWith('/pecas');
    }
    return location.pathname === path;
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: scrolled
            ? 'rgba(10, 22, 40, 0.97)'
            : 'rgba(10, 22, 40, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div style={styles.inner}>
          {/* Logo */}
          <Link to="/" style={styles.logo} aria-label="Grupo Nortão - Página Inicial">
            <span style={styles.logoText}>
              Grupo <span style={styles.logoAccent}>Nortão</span>
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="nav-desktop" style={styles.navDesktop} aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  ...styles.navLink,
                  color: isActive(link.path) ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                  borderBottomColor: isActive(link.path)
                    ? 'var(--green-accent)'
                    : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="cta-desktop" style={styles.ctaDesktop}>
            <CartBadge />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ctaBtn}
            >
              <MessageCircle size={16} />
              Fale Conosco
            </a>
          </div>

          {/* Mobile: Carrinho + Menu */}
          <div style={styles.mobileActions}>
            <CartBadge />
            <button
              onClick={toggleMobile}
              className="mobile-toggle"
              style={styles.mobileToggle}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay Mobile */}
      {mobileOpen && (
        <div style={styles.mobileOverlay}>
          <nav style={styles.mobileNav} aria-label="Navegação mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  ...styles.mobileLink,
                  color: isActive(link.path) ? 'var(--green-accent)' : '#fff',
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Mobile */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.mobileCta}
            >
              <MessageCircle size={18} />
              Fale Conosco no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

// --- Estilos ---
const styles = {
  inner: {
    width: '100%',
    maxWidth: 'var(--max-width-wide)',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Logo
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: '#fff',
    letterSpacing: '-0.02em',
  },
  logoAccent: {
    color: 'var(--green-accent)',
  },

  // Nav Desktop
  navDesktop: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.75rem',
  },
  navLink: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textDecoration: 'none',
    paddingBottom: '2px',
    borderBottom: '2px solid transparent',
    transition: 'color 0.2s ease, border-color 0.2s ease',
    whiteSpace: 'nowrap',
  },

  // CTA Desktop
  ctaDesktop: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1.25rem',
    backgroundColor: '#25D366',
    color: '#fff',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.8125rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    whiteSpace: 'nowrap',
  },

  // Mobile Actions (carrinho + hamburger)
  mobileActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  // Mobile Toggle
  mobileToggle: {
    color: '#fff',
    padding: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },

  // Mobile Overlay
  mobileOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    backgroundColor: 'var(--navy-900)',
    paddingTop: 'calc(var(--header-height) + 2rem)',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: '2rem',
    animation: 'fadeIn 0.2s ease',
    overflowY: 'auto',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  mobileLink: {
    display: 'block',
    fontSize: '1.25rem',
    fontWeight: 500,
    textDecoration: 'none',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    transition: 'color 0.2s ease',
  },
  mobileCta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.625rem',
    marginTop: '2rem',
    padding: '1rem 1.5rem',
    backgroundColor: '#25D366',
    color: '#fff',
    borderRadius: 'var(--radius-lg)',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
  },
};

/*
 * CSS necessário para responsividade do header.
 * Adicionar ao globals.css ou usar media query JS.
 * 
 * @media (max-width: 968px) {
 *   O navDesktop e ctaDesktop devem ficar display: none
 *   O mobileToggle deve ficar display: block
 * }
 * 
 * Nota: Como estamos usando inline styles, a responsividade
 * do header é controlada via media query no globals.css.
 * Adicionar estas regras lá ou usar um hook useMediaQuery.
 */
