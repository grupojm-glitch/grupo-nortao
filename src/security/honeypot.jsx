/**
 * GRUPO NORTÃO — Honeypot Anti-Bot
 * 
 * Campo invisível inserido nos formulários.
 * Bots preenchem automaticamente; humanos não veem.
 * Se o campo tiver valor no submit → bloqueia silenciosamente.
 * 
 * Uso:
 * import { HONEYPOT_FIELD, HoneypotField, isBot } from '@/security/honeypot';
 * 
 * No formulário:  <HoneypotField value={form.website} onChange={handleChange} />
 * No submit:      if (isBot(form.website)) return; // silencioso
 */

/**
 * Nome do campo honeypot.
 * Usa nome genérico que bots tentam preencher automaticamente.
 */
export const HONEYPOT_FIELD = 'website';

/**
 * Verifica se o campo honeypot foi preenchido (indica bot).
 * @param {string} value — valor do campo honeypot
 * @returns {boolean} — true se for bot
 */
export function isBot(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Componente React do campo honeypot.
 * Invisível para humanos via CSS, acessível para bots via DOM.
 * 
 * @param {{ value: string, onChange: function }} props
 */
export function HoneypotField({ value, onChange }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        width: 0,
        height: 0,
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
        tabIndex: -1,
      }}
      aria-hidden="true"
    >
      <label htmlFor="website">
        Não preencha este campo
      </label>
      <input
        type="text"
        id="website"
        name="website"
        value={value || ''}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

/**
 * Gera o estado inicial do honeypot para usar com useState.
 * @returns {string}
 */
export function honeypotInitialState() {
  return '';
}
