/**
 * GRUPO NORTÃO — Sanitização de Inputs
 * 
 * Previne XSS (Cross-Site Scripting) e injeção de código
 * em todos os campos de formulário do site.
 * 
 * Uso: import { sanitize, sanitizeObject } from '@/security/sanitize';
 */

// Mapa de caracteres perigosos → entidades HTML seguras
const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
};

const ESCAPE_REGEX = /[&<>"'`/]/g;

/**
 * Escapa caracteres HTML perigosos de uma string.
 * @param {string} str — texto do input do usuário
 * @returns {string} — texto seguro para renderização
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(ESCAPE_REGEX, (char) => ESCAPE_MAP[char] || char);
}

/**
 * Remove tags HTML/script de uma string.
 * @param {string} str — texto bruto
 * @returns {string} — texto sem tags
 */
export function stripTags(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Remove espaços excessivos e caracteres de controle.
 * @param {string} str — texto bruto
 * @returns {string} — texto limpo
 */
export function trimAndClean(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // remove control chars
    .replace(/\s+/g, ' ') // normaliza espaços
    .trim();
}

/**
 * Sanitização completa de um campo de texto.
 * Aplica: strip tags → escape HTML → limpeza de espaços.
 * @param {string} str — input do usuário
 * @returns {string} — texto seguro e limpo
 */
export function sanitize(str) {
  if (typeof str !== 'string') return '';
  return trimAndClean(escapeHtml(stripTags(str)));
}

/**
 * Sanitiza todos os valores string de um objeto (1 nível).
 * Útil para sanitizar um formulário inteiro de uma vez.
 * @param {Object} obj — ex: { nome: '<script>alert(1)</script>', email: 'a@b.com' }
 * @returns {Object} — ex: { nome: '', email: 'a@b.com' }
 */
export function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return {};

  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    clean[key] = typeof value === 'string' ? sanitize(value) : value;
  }
  return clean;
}

/**
 * Valida se uma string contém padrões suspeitos de injeção.
 * Retorna true se parecer perigoso.
 * @param {string} str — texto a verificar
 * @returns {boolean}
 */
export function hasSuspiciousContent(str) {
  if (typeof str !== 'string') return false;

  const patterns = [
    /<script[\s>]/i,
    /javascript:/i,
    /on\w+\s*=/i,        // onclick=, onerror=, etc.
    /data:\s*text\/html/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
    /url\s*\(/i,
  ];

  return patterns.some((pattern) => pattern.test(str));
}
