/**
 * GRUPO NORTÃO — Validações de Formulário
 * 
 * Validações client-side para todos os formulários do site.
 * Cada função retorna { valid: boolean, error: string | null }.
 * 
 * Uso: import { validateEmail, validatePhone, validateRequired } from '@/security/validate';
 */

/**
 * Verifica se o campo não está vazio.
 * @param {string} value 
 * @param {string} fieldName — nome amigável do campo para mensagem de erro
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateRequired(value, fieldName = 'Este campo') {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) {
    return { valid: false, error: `${fieldName} é obrigatório.` };
  }
  return { valid: true, error: null };
}

/**
 * Valida formato de email.
 * @param {string} email
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateEmail(email) {
  const req = validateRequired(email, 'E-mail');
  if (!req.valid) return req;

  const trimmed = email.trim();

  // Rejeita caracteres perigosos (HTML/XSS)
  if (/[<>"'`\\]/.test(trimmed)) {
    return { valid: false, error: 'E-mail contém caracteres inválidos.' };
  }

  // Regex para email válido (letras, números, pontos, hífens, underscores)
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(trimmed)) {
    return { valid: false, error: 'Informe um e-mail válido.' };
  }
  return { valid: true, error: null };
}

/**
 * Valida telefone brasileiro (com ou sem máscara).
 * Aceita: (11) 99999-9999, 11999999999, +5511999999999
 * @param {string} phone
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validatePhone(phone) {
  const req = validateRequired(phone, 'Telefone');
  if (!req.valid) return req;

  // Remove tudo que não é dígito
  const digits = phone.replace(/\D/g, '');

  // Celular BR: 10 ou 11 dígitos (com DDD), ou 12-13 com código do país
  if (digits.length < 10 || digits.length > 13) {
    return { valid: false, error: 'Informe um telefone válido com DDD.' };
  }
  return { valid: true, error: null };
}

/**
 * Valida CNPJ (formato e dígitos verificadores).
 * Usado no formulário B2B.
 * @param {string} cnpj
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateCNPJ(cnpj) {
  const req = validateRequired(cnpj, 'CNPJ');
  if (!req.valid) return req;

  const digits = cnpj.replace(/\D/g, '');

  if (digits.length !== 14) {
    return { valid: false, error: 'CNPJ deve ter 14 dígitos.' };
  }

  // Rejeita CNPJs com todos os dígitos iguais
  if (/^(\d)\1{13}$/.test(digits)) {
    return { valid: false, error: 'CNPJ inválido.' };
  }

  // Validação dos dígitos verificadores
  const calcDigit = (slice, weights) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += parseInt(slice[i]) * weights[i];
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digit1 = calcDigit(digits, weights1);
  const digit2 = calcDigit(digits, weights2);

  if (parseInt(digits[12]) !== digit1 || parseInt(digits[13]) !== digit2) {
    return { valid: false, error: 'CNPJ inválido.' };
  }

  return { valid: true, error: null };
}

/**
 * Valida CPF (formato e dígitos verificadores).
 * Usado no formulário de direitos do titular LGPD.
 * @param {string} cpf
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateCPF(cpf) {
  const req = validateRequired(cpf, 'CPF');
  if (!req.valid) return req;

  const digits = cpf.replace(/\D/g, '');

  if (digits.length !== 11) {
    return { valid: false, error: 'CPF deve ter 11 dígitos.' };
  }

  if (/^(\d)\1{10}$/.test(digits)) {
    return { valid: false, error: 'CPF inválido.' };
  }

  const calcDigit = (slice, factor) => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += parseInt(slice[i]) * (factor - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const digit1 = calcDigit(digits.slice(0, 9), 10);
  const digit2 = calcDigit(digits.slice(0, 10), 11);

  if (parseInt(digits[9]) !== digit1 || parseInt(digits[10]) !== digit2) {
    return { valid: false, error: 'CPF inválido.' };
  }

  return { valid: true, error: null };
}

/**
 * Valida comprimento mínimo e máximo de uma string.
 * @param {string} value
 * @param {number} min
 * @param {number} max
 * @param {string} fieldName
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateLength(value, min, max, fieldName = 'Este campo') {
  const trimmed = typeof value === 'string' ? value.trim() : '';

  if (trimmed.length < min) {
    return { valid: false, error: `${fieldName} deve ter no mínimo ${min} caracteres.` };
  }
  if (trimmed.length > max) {
    return { valid: false, error: `${fieldName} deve ter no máximo ${max} caracteres.` };
  }
  return { valid: true, error: null };
}

/**
 * Executa múltiplas validações em sequência.
 * Retorna no primeiro erro encontrado.
 * @param {Array<() => {valid: boolean, error: string | null}>} validators
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateAll(validators) {
  for (const validate of validators) {
    const result = validate();
    if (!result.valid) return result;
  }
  return { valid: true, error: null };
}
