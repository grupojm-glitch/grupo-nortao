/**
 * GRUPO NORTÃO — ConsentCheckbox (LGPD)
 * 
 * Checkbox de consentimento explícito para formulários.
 * Requisitos LGPD:
 * - Nunca pré-marcado (opt-in explícito)
 * - Texto claro sobre uso dos dados
 * - Link para política de privacidade
 * - Registra timestamp do consentimento
 * 
 * Uso:
 * <ConsentCheckbox
 *   checked={consentiu}
 *   onChange={(checked) => setConsentiu(checked)}
 *   purpose="contato"
 * />
 */

import { useCallback } from 'react';

/**
 * Textos de consentimento por finalidade do formulário.
 * Cada formulário tem um texto específico conforme LGPD.
 */
const CONSENT_TEXTS = {
  contato: {
    text: 'Autorizo o Grupo Nortão a utilizar meus dados para responder à minha solicitação de contato.',
    detail: 'Seus dados serão usados exclusivamente para atendimento e não serão compartilhados com terceiros.',
  },
  busca_peca: {
    text: 'Autorizo o uso dos meus dados para busca da peça solicitada e retorno sobre disponibilidade.',
    detail: 'Podemos entrar em contato via WhatsApp ou e-mail para informar sobre a peça.',
  },
  b2b: {
    text: 'Autorizo o Grupo Nortão a utilizar meus dados para avaliação e comunicação referente ao programa de parceria B2B.',
    detail: 'Dados comerciais serão utilizados para análise de parceria e envio de condições comerciais.',
  },
  newsletter: {
    text: 'Autorizo o recebimento de comunicações sobre novidades, ofertas e conteúdo do Grupo Nortão.',
    detail: 'Você pode cancelar a inscrição a qualquer momento.',
  },
  direitos_titular: {
    text: 'Confirmo que os dados informados são verdadeiros e autorizo o processamento desta solicitação sobre meus dados pessoais.',
    detail: 'Seus dados serão utilizados exclusivamente para atender à solicitação conforme a LGPD.',
  },
};

/**
 * @param {Object} props
 * @param {boolean} props.checked — estado do checkbox
 * @param {Function} props.onChange — callback (boolean)
 * @param {string} props.purpose — finalidade: 'contato' | 'busca_peca' | 'b2b' | 'newsletter' | 'direitos_titular'
 * @param {string} props.error — mensagem de erro (opcional)
 */
export default function ConsentCheckbox({
  checked = false,
  onChange,
  purpose = 'contato',
  error = null,
}) {
  const consentText = CONSENT_TEXTS[purpose] || CONSENT_TEXTS.contato;

  const handleChange = useCallback((e) => {
    onChange(e.target.checked);
  }, [onChange]);

  return (
    <div style={styles.wrapper}>
      <label style={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          style={styles.checkbox}
          aria-required="true"
        />
        <div style={styles.customCheck}>
          {checked && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <div style={styles.textWrapper}>
          <span style={styles.text}>{consentText.text}</span>
          <span style={styles.detail}>{consentText.detail}</span>
          <a href="/politica-de-privacidade" style={styles.link}>
            Ler Política de Privacidade completa
          </a>
        </div>
      </label>
      {error && (
        <p style={styles.error}>{error}</p>
      )}
    </div>
  );
}

/**
 * Valida se o consentimento foi dado.
 * Usar antes do submit.
 * @param {boolean} checked
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateConsent(checked) {
  if (!checked) {
    return {
      valid: false,
      error: 'É necessário autorizar o uso dos seus dados para prosseguir.',
    };
  }
  return { valid: true, error: null };
}

/**
 * Gera o registro de consentimento com timestamp.
 * Enviar junto com os dados do formulário.
 * @param {string} purpose — finalidade
 * @returns {Object}
 */
export function createConsentRecord(purpose) {
  return {
    consentGiven: true,
    purpose,
    timestamp: new Date().toISOString(),
    version: '1.0',
  };
}

// --- Estilos ---
const styles = {
  wrapper: {
    marginTop: '1rem',
  },
  label: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    cursor: 'pointer',
  },
  checkbox: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
    pointerEvents: 'none',
  },
  customCheck: {
    flexShrink: 0,
    width: '22px',
    height: '22px',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--graphite-300)',
    backgroundColor: 'var(--white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1px',
    transition: 'all 0.15s ease',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  text: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: 'var(--graphite-700)',
    fontWeight: 500,
  },
  detail: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    color: 'var(--graphite-500)',
  },
  link: {
    fontSize: '0.75rem',
    color: 'var(--navy-600)',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    marginTop: '0.125rem',
    display: 'inline-block',
  },
  error: {
    fontSize: '0.8125rem',
    color: 'var(--red-alert)',
    marginTop: '0.5rem',
    fontWeight: 500,
  },
};
