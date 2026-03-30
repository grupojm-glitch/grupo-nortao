/**
 * GRUPO NORTÃO — WhatsAppFloat
 * 
 * Botão flutuante fixo no canto inferior direito.
 * - Aparece após 2s de navegação
 * - Tooltip no hover
 * - Animação de pulso suave para chamar atenção
 * - Esconde quando o banner de cookies está visível (z-index menor)
 * - Link direto para WhatsApp com mensagem pré-definida
 * 
 * Uso: Inserido no App.jsx (layout persistente)
 */

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20informações%20sobre%20peças.';

// Delay antes de aparecer (ms)
const SHOW_DELAY = 2000;

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={styles.wrapper}>
      {/* Tooltip */}
      {hovered && (
        <div style={styles.tooltip}>
          Fale com um especialista
        </div>
      )}

      {/* Pulse ring */}
      <span style={styles.pulse} />

      {/* Botão */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...styles.button,
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2} />
      </a>
    </div>
  );
}

// --- Estilos ---
const styles = {
  wrapper: {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    zIndex: 900,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    animation: 'fadeInUp 0.5s ease',
  },
  button: {
    position: 'relative',
    zIndex: 2,
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  pulse: {
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    opacity: 0.3,
    zIndex: 1,
    animation: 'whatsappPulse 2s ease-in-out infinite',
    pointerEvents: 'none',
  },
  tooltip: {
    position: 'absolute',
    right: '72px',
    bottom: '12px',
    backgroundColor: 'var(--navy-900)',
    color: '#fff',
    fontSize: '0.8125rem',
    fontWeight: 500,
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-md)',
    whiteSpace: 'nowrap',
    boxShadow: 'var(--shadow-lg)',
    animation: 'fadeIn 0.15s ease',
    pointerEvents: 'none',
  },
};

/*
 * Adicionar ao globals.css:
 * 
 * @keyframes whatsappPulse {
 *   0% { transform: scale(1); opacity: 0.3; }
 *   50% { transform: scale(1.4); opacity: 0; }
 *   100% { transform: scale(1); opacity: 0; }
 * }
 */
