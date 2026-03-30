/**
 * GRUPO NORTÃO — useSecureSubmit Hook
 * 
 * Hook de envio seguro de formulários.
 * Gerencia: proteção → validação → loading → envio → feedback.
 * 
 * Uso:
 * const { submit, isLoading, error, success } = useSecureSubmit({
 *   endpoint: '/api/contato',
 *   validators: [() => validateRequired(form.nome, 'Nome')],
 *   onSuccess: () => resetForm(),
 * });
 * 
 * <form onSubmit={(e) => { e.preventDefault(); submit(formData); }}>
 */

import { useState, useCallback } from 'react';
import { useFormProtection } from './useFormProtection';
import { validateAll } from '../security/validate';

/**
 * @param {Object} options
 * @param {string} options.endpoint — URL da API para envio
 * @param {Array<Function>} options.validators — array de funções de validação
 * @param {Function} options.onSuccess — callback após envio com sucesso
 * @param {Function} options.onError — callback após erro
 * @param {number} options.maxAttempts — limite de tentativas (padrão: 5)
 * @param {string} options.method — método HTTP (padrão: 'POST')
 * @returns {Object}
 */
export function useSecureSubmit({
  endpoint = '',
  validators = [],
  onSuccess = () => {},
  onError = () => {},
  maxAttempts = 5,
  method = 'POST',
} = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Integra todas as proteções
  const protection = useFormProtection({ maxAttempts });

  /**
   * Executa o fluxo completo de submit seguro.
   * 
   * @param {Object} formData — dados do formulário
   * @returns {Promise<boolean>} — true se enviou com sucesso
   */
  const submit = useCallback(async (formData) => {
    // Reset do estado
    setError(null);
    setSuccess(false);

    // 1. Proteção (honeypot, rate limit, sanitização)
    const protectionResult = protection.validateSubmit(formData);

    if (!protectionResult.safe) {
      // Bloqueio silencioso (bot) — simula sucesso
      if (protectionResult.silentBlock) {
        setSuccess(true);
        return false;
      }
      // Bloqueio com feedback
      setError(protectionResult.error);
      onError(protectionResult.error);
      return false;
    }

    // 2. Validação dos campos
    if (validators.length > 0) {
      const validation = validateAll(validators);
      if (!validation.valid) {
        setError(validation.error);
        onError(validation.error);
        return false;
      }
    }

    // 3. Envio
    setIsLoading(true);

    try {
      // Se não tem endpoint configurado, simula sucesso
      // (útil para formulários que só vão pro WhatsApp)
      if (!endpoint) {
        await simulateDelay(800);
        setSuccess(true);
        setIsLoading(false);
        onSuccess(protectionResult.data);
        return true;
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // previne CSRF básico
        },
        body: JSON.stringify(protectionResult.data),
      });

      if (!response.ok) {
        const errorMsg = await parseErrorResponse(response);
        throw new Error(errorMsg);
      }

      const result = await response.json();
      setSuccess(true);
      setIsLoading(false);
      onSuccess(result);
      return true;

    } catch (err) {
      const errorMsg = err.message || 'Erro ao enviar. Tente novamente em alguns instantes.';
      setError(errorMsg);
      setIsLoading(false);
      onError(errorMsg);
      return false;
    }
  }, [endpoint, method, validators, protection, onSuccess, onError]);

  /**
   * Reseta o estado do hook (loading, error, success, proteção).
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
    protection.resetProtection();
  }, [protection]);

  return {
    submit,
    isLoading,
    error,
    success,
    reset,
    renderHoneypot: protection.renderHoneypot,
  };
}

// --- Helpers internos ---

/**
 * Simula delay de rede (para formulários sem endpoint real).
 * @param {number} ms
 */
function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extrai mensagem de erro amigável da resposta HTTP.
 * @param {Response} response
 * @returns {Promise<string>}
 */
async function parseErrorResponse(response) {
  try {
    const data = await response.json();
    return data.message || data.error || `Erro ${response.status}. Tente novamente.`;
  } catch {
    return `Erro ${response.status}. Tente novamente em alguns instantes.`;
  }
}
