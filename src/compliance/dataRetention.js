/**
 * GRUPO NORTÃO — Data Retention (LGPD)
 * 
 * Define regras de retenção de dados pessoais por finalidade.
 * Cada tipo de dado tem prazo máximo de armazenamento.
 * 
 * Importante: estas regras devem ser espelhadas no backend.
 * No frontend, servem como referência e para limpeza de dados locais.
 * 
 * Uso:
 * import { RETENTION_RULES, getRetentionInfo, cleanExpiredLocalData } from '@/compliance/dataRetention';
 */

/**
 * Regras de retenção por finalidade.
 * Prazos em dias. Baseados nas melhores práticas LGPD.
 */
export const RETENTION_RULES = {
  // Formulário de contato — mantém por 6 meses
  contato: {
    label: 'Solicitação de contato',
    retentionDays: 180,
    legalBasis: 'Consentimento do titular (Art. 7º, I, LGPD)',
    dataCollected: ['nome', 'email', 'telefone', 'mensagem'],
    purpose: 'Responder à solicitação de contato do visitante.',
  },

  // Busca de peça não encontrada — mantém por 12 meses
  busca_peca: {
    label: 'Solicitação de busca de peça',
    retentionDays: 365,
    legalBasis: 'Consentimento do titular (Art. 7º, I, LGPD)',
    dataCollected: ['nome', 'telefone', 'email', 'veículo', 'peça solicitada'],
    purpose: 'Buscar a peça solicitada e informar sobre disponibilidade.',
  },

  // Cadastro B2B — mantém por 24 meses
  b2b: {
    label: 'Cadastro de parceiro B2B',
    retentionDays: 730,
    legalBasis: 'Execução de contrato ou diligências pré-contratuais (Art. 7º, V, LGPD)',
    dataCollected: ['nome', 'empresa', 'CNPJ', 'telefone', 'email', 'cidade', 'tipo de negócio'],
    purpose: 'Avaliar e manter parceria comercial B2B.',
  },

  // Dados de navegação / analytics — mantém por 12 meses
  analytics: {
    label: 'Dados de navegação e analytics',
    retentionDays: 365,
    legalBasis: 'Legítimo interesse do controlador (Art. 7º, IX, LGPD)',
    dataCollected: ['cookies analíticos', 'páginas visitadas', 'tempo no site'],
    purpose: 'Melhorar a experiência do usuário e performance do site.',
  },

  // Direitos do titular — mantém por 5 anos (obrigação legal)
  direitos_titular: {
    label: 'Solicitação de direitos do titular',
    retentionDays: 1825,
    legalBasis: 'Cumprimento de obrigação legal (Art. 7º, II, LGPD)',
    dataCollected: ['nome', 'CPF', 'email', 'tipo de solicitação'],
    purpose: 'Registrar e atender solicitações de direitos conforme LGPD.',
  },

  // Dados de compra/venda — mantém por 5 anos (fiscal)
  transacao: {
    label: 'Dados de transação comercial',
    retentionDays: 1825,
    legalBasis: 'Cumprimento de obrigação legal e fiscal (Art. 7º, II, LGPD)',
    dataCollected: ['nome', 'CPF/CNPJ', 'endereço', 'dados da compra'],
    purpose: 'Cumprir obrigações fiscais e garantir direitos do consumidor.',
  },
};

/**
 * Retorna informações de retenção para uma finalidade.
 * @param {string} purpose — chave da finalidade
 * @returns {Object | null}
 */
export function getRetentionInfo(purpose) {
  return RETENTION_RULES[purpose] || null;
}

/**
 * Calcula a data de expiração para um dado com base na finalidade.
 * @param {string} purpose — chave da finalidade
 * @param {string|Date} collectedAt — data de coleta (ISO string ou Date)
 * @returns {Date | null}
 */
export function getExpirationDate(purpose, collectedAt) {
  const rule = RETENTION_RULES[purpose];
  if (!rule) return null;

  const collected = new Date(collectedAt);
  const expiration = new Date(collected);
  expiration.setDate(expiration.getDate() + rule.retentionDays);
  return expiration;
}

/**
 * Verifica se um dado já expirou.
 * @param {string} purpose — chave da finalidade
 * @param {string|Date} collectedAt — data de coleta
 * @returns {boolean}
 */
export function isDataExpired(purpose, collectedAt) {
  const expiration = getExpirationDate(purpose, collectedAt);
  if (!expiration) return false;
  return new Date() > expiration;
}

/**
 * Limpa dados locais expirados do localStorage.
 * Varre chaves com prefixo 'gn_' e remove se expiradas.
 * 
 * Estrutura esperada dos dados locais:
 * { purpose: string, collectedAt: string, data: any }
 */
export function cleanExpiredLocalData() {
  try {
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith('gn_data_')) continue;

      try {
        const raw = localStorage.getItem(key);
        const record = JSON.parse(raw);

        if (record.purpose && record.collectedAt) {
          if (isDataExpired(record.purpose, record.collectedAt)) {
            keysToRemove.push(key);
          }
        }
      } catch {
        // Registro inválido — marcar para remoção
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    return keysToRemove.length;
  } catch (error) {
    console.warn('Erro ao limpar dados expirados:', error);
    return 0;
  }
}

/**
 * Retorna todas as regras de retenção formatadas para exibição
 * na página de Política de Privacidade.
 * @returns {Array<Object>}
 */
export function getAllRetentionRulesForDisplay() {
  return Object.entries(RETENTION_RULES).map(([key, rule]) => ({
    key,
    label: rule.label,
    retention: formatRetentionPeriod(rule.retentionDays),
    legalBasis: rule.legalBasis,
    dataCollected: rule.dataCollected,
    purpose: rule.purpose,
  }));
}

/**
 * Formata dias de retenção em texto legível.
 * @param {number} days
 * @returns {string}
 */
function formatRetentionPeriod(days) {
  if (days <= 30) return `${days} dias`;
  if (days < 365) return `${Math.round(days / 30)} meses`;
  const years = Math.round(days / 365);
  return `${years} ano${years > 1 ? 's' : ''}`;
}
