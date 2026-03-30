/**
 * GRUPO NORTÃO — Consent Manager (LGPD)
 * 
 * Gerencia o registro de consentimento de cookies.
 * Salva no localStorage com timestamp e versão.
 * Permite revogação e consulta por categoria.
 * 
 * Uso:
 * import { getConsent, saveConsent, hasConsentFor, revokeConsent } from '@/compliance/consentManager';
 */

// Chave de armazenamento
const STORAGE_KEY = 'gn_cookie_consent';

// Versão da política — incrementar quando alterar categorias ou textos
const CONSENT_VERSION = '1.0';

/**
 * Categorias de cookies com descrições para o banner.
 */
export const CONSENT_CATEGORIES = [
  {
    key: 'necessary',
    label: 'Necessários',
    description: 'Essenciais para o funcionamento do site. Não podem ser desativados.',
    required: true,
  },
  {
    key: 'analytics',
    label: 'Analíticos',
    description: 'Nos ajudam a entender como os visitantes usam o site para melhorar a experiência.',
    required: false,
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Utilizados para exibir conteúdo e ofertas relevantes para você.',
    required: false,
  },
];

/**
 * Salva o consentimento do usuário.
 * @param {Object} preferences — { necessary: true, analytics: boolean, marketing: boolean }
 */
export function saveConsent(preferences) {
  const record = {
    preferences: {
      ...preferences,
      necessary: true, // sempre forçado como true
    },
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch (error) {
    // localStorage indisponível (modo privado, etc.)
    console.warn('Não foi possível salvar o consentimento:', error);
  }
}

/**
 * Recupera o consentimento salvo.
 * Retorna null se não existe ou se a versão é diferente (pedir novamente).
 * @returns {Object | null} — { preferences, timestamp, version }
 */
export function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const record = JSON.parse(raw);

    // Se a versão mudou, pede consentimento novamente
    if (record.version !== CONSENT_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return record;
  } catch (error) {
    console.warn('Erro ao ler consentimento:', error);
    return null;
  }
}

/**
 * Verifica se o usuário consentiu com uma categoria específica.
 * @param {string} category — 'necessary' | 'analytics' | 'marketing'
 * @returns {boolean}
 */
export function hasConsentFor(category) {
  const consent = getConsent();
  if (!consent) return category === 'necessary'; // necessários sempre permitidos
  return consent.preferences[category] === true;
}

/**
 * Revoga todo o consentimento.
 * O banner aparecerá novamente na próxima visita.
 */
export function revokeConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Erro ao revogar consentimento:', error);
  }
}

/**
 * Atualiza uma categoria específica sem alterar as demais.
 * @param {string} category — 'analytics' | 'marketing'
 * @param {boolean} value
 */
export function updateConsentCategory(category, value) {
  if (category === 'necessary') return; // não pode alterar

  const consent = getConsent();
  if (!consent) return;

  consent.preferences[category] = value;
  consent.timestamp = new Date().toISOString();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch (error) {
    console.warn('Erro ao atualizar consentimento:', error);
  }
}

/**
 * Retorna uma cópia segura do consentimento para envio ao backend.
 * Não expõe dados internos.
 * @returns {Object | null}
 */
export function getConsentForAPI() {
  const consent = getConsent();
  if (!consent) return null;

  return {
    categories: { ...consent.preferences },
    consentedAt: consent.timestamp,
    policyVersion: consent.version,
  };
}

/**
 * Verifica se o consentimento existe e é válido (mesma versão).
 * @returns {boolean}
 */
export function hasValidConsent() {
  return getConsent() !== null;
}
