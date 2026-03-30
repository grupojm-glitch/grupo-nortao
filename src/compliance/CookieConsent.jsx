/**
 * GRUPO NORTÃO — Banner de Cookies (LGPD)
 * 
 * Banner fixo no rodapé da tela que aparece na primeira visita.
 * Oferece consentimento granular por categoria de cookie.
 * Registra a decisão com timestamp via consentManager.
 * 
 * Uso: Inserido automaticamente no App.jsx
 */

import { useState, useEffect } from 'react';
import {
  getConsent,
  saveConsent,
  CONSENT_CATEGORIES,
} from './consentManager';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // sempre ativo, não pode desmarcar
    analytics: false,
    marketing: false,
  });

  // Verifica se já existe consentimento salvo
  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      // Espera 1.5s para não competir com o carregamento da página
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Aceitar todos
  function handleAcceptAll() {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
    setVisible(false);
  }

  // Rejeitar opcionais (só necessários)
  function handleRejectOptional() {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(onlyNecessary);
    setVisible(false);
  }

  // Salvar preferências personalizadas
  function handleSavePreferences() {
    saveConsent({ ...preferences, necessary: true });
    setVisible(false);
  }

  // Toggle de categoria
  function toggleCategory(category) {
    if (category === 'necessary') return; // não pode desativar
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.banner}>
        {/* Conteúdo principal */}
        <div style={styles.content}>
          <h3 style={styles.title}>Sua privacidade importa</h3>
          <p style={styles.text}>
            Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site 
            e personalizar conteúdo. Você pode escolher quais cookies aceitar. 
            Saiba mais na nossa{' '}
            <a href="/politica-de-privacidade" style={styles.link}>
              Política de Privacidade
            </a>.
          </p>

          {/* Detalhes granulares */}
          {showDetails && (
            <div style={styles.categories}>
              {CONSENT_CATEGORIES.map((cat) => (
                <label key={cat.key} style={styles.categoryRow}>
                  <div style={styles.categoryInfo}>
                    <span style={styles.categoryName}>{cat.label}</span>
                    <span style={styles.categoryDesc}>{cat.description}</span>
                  </div>
                  <div style={styles.toggleWrapper}>
                    {cat.key === 'necessary' ? (
                      <span style={styles.alwaysOn}>Sempre ativo</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.key)}
                        style={{
                          ...styles.toggle,
                          backgroundColor: preferences[cat.key]
                            ? 'var(--green-accent)'
                            : 'var(--graphite-300)',
                        }}
                        aria-label={`${preferences[cat.key] ? 'Desativar' : 'Ativar'} ${cat.label}`}
                      >
                        <span
                          style={{
                            ...styles.toggleDot,
                            transform: preferences[cat.key]
                              ? 'translateX(20px)'
                              : 'translateX(2px)',
                          }}
                        />
                      </button>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div style={styles.actions}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={styles.btnDetails}
          >
            {showDetails ? 'Ocultar detalhes' : 'Personalizar'}
          </button>

          <div style={styles.actionsRight}>
            <button onClick={handleRejectOptional} style={styles.btnReject}>
              Rejeitar opcionais
            </button>

            {showDetails ? (
              <button onClick={handleSavePreferences} style={styles.btnAccept}>
                Salvar preferências
              </button>
            ) : (
              <button onClick={handleAcceptAll} style={styles.btnAccept}>
                Aceitar todos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Estilos ---
const styles = {
  overlay: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    padding: '1rem',
    pointerEvents: 'none',
  },
  banner: {
    maxWidth: '720px',
    margin: '0 auto',
    backgroundColor: 'var(--navy-900)',
    borderRadius: 'var(--radius-xl)',
    padding: '1.75rem',
    boxShadow: '0 -4px 40px rgba(10, 22, 40, 0.3)',
    pointerEvents: 'auto',
    animation: 'fadeInUp 0.5s ease',
  },
  content: {
    marginBottom: '1.25rem',
  },
  title: {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '1rem',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  text: {
    fontSize: '0.875rem',
    lineHeight: 1.65,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  link: {
    color: 'var(--green-accent)',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
  categories: {
    marginTop: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  categoryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    cursor: 'default',
  },
  categoryInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    flex: 1,
    marginRight: '1rem',
  },
  categoryName: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#fff',
  },
  categoryDesc: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.45)',
    lineHeight: 1.4,
  },
  toggleWrapper: {
    flexShrink: 0,
  },
  alwaysOn: {
    fontSize: '0.6875rem',
    fontWeight: 600,
    color: 'var(--green-accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  toggle: {
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s ease',
  },
  toggleDot: {
    display: 'block',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    transition: 'transform 0.2s ease',
    position: 'absolute',
    top: '2px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  actionsRight: {
    display: 'flex',
    gap: '0.625rem',
    flexWrap: 'wrap',
  },
  btnDetails: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.6)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem 0',
    transition: 'color 0.2s',
  },
  btnReject: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#fff',
    backgroundColor: 'transparent',
    border: '1.5px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 'var(--radius-md)',
    padding: '0.625rem 1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnAccept: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--navy-900)',
    backgroundColor: 'var(--green-accent)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: '0.625rem 1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
