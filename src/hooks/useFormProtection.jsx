/**
 * GRUPO NORTÃO — useFormProtection Hook
 * 
 * Combina todas as camadas de proteção de formulário em um único hook:
 * - Honeypot (anti-bot)
 * - Rate Limiter (anti-spam)
 * - Sanitização (anti-XSS)
 * 
 * Uso:
 * const protection = useFormProtection({ maxAttempts: 3 });
 * 
 * No JSX:     {protection.renderHoneypot()}
 * No submit:  const result = protection.validateSubmit(formData);
 *             if (!result.safe) { mostrar result.error; return; }
 *             // usar result.data (dados sanitizados)
 */

import { useState, useRef, useCallback, useMemo } from 'react';
import { isBot, HoneypotField, HONEYPOT_FIELD } from '../security/honeypot';
import { createRateLimiter, formatWaitTime } from '../security/rateLimiter';
import { sanitizeObject, hasSuspiciousContent } from '../security/sanitize';

/**
 * @param {Object} options
 * @param {number} options.maxAttempts — máximo de envios por janela (padrão: 5)
 * @param {number} options.windowMs — janela de tempo em ms (padrão: 60000)
 * @param {number} options.cooldownMs — cooldown após exceder limite (padrão: 30000)
 * @returns {Object}
 */
export function useFormProtection({
  maxAttempts = 5,
  windowMs = 60000,
  cooldownMs = 30000,
} = {}) {
  // Estado do honeypot
  const [honeypotValue, setHoneypotValue] = useState('');

  // Rate limiter — persiste durante o ciclo de vida do componente
  const limiterRef = useRef(
    createRateLimiter({ maxAttempts, windowMs, cooldownMs })
  );

  // Timestamp da montagem — bots submetem rápido demais
  const mountTimeRef = useRef(Date.now());

  // Tempo mínimo antes de permitir submit (2 segundos)
  const MIN_FILL_TIME_MS = 2000;

  /**
   * Renderiza o campo honeypot invisível.
   * Colocar dentro do <form>.
   */
  const renderHoneypot = useCallback(() => {
    return (
      <HoneypotField
        value={honeypotValue}
        onChange={(e) => setHoneypotValue(e.target.value)}
      />
    );
  }, [honeypotValue]);

  /**
   * Valida todas as camadas de proteção antes do envio.
   * 
   * @param {Object} formData — dados do formulário (objeto chave: valor)
   * @returns {{ safe: boolean, error: string | null, data: Object | null }}
   */
  const validateSubmit = useCallback((formData) => {
    // 1. Honeypot — verifica se bot preencheu o campo oculto
    if (isBot(honeypotValue)) {
      // Retorna sucesso falso para não alertar o bot
      return {
        safe: false,
        error: null, // silencioso — bot não recebe feedback
        data: null,
        silentBlock: true,
      };
    }

    // 2. Tempo mínimo — bots enviam instantaneamente
    const elapsed = Date.now() - mountTimeRef.current;
    if (elapsed < MIN_FILL_TIME_MS) {
      return {
        safe: false,
        error: null,
        data: null,
        silentBlock: true,
      };
    }

    // 3. Rate limiter — verifica frequência de envio
    const limiter = limiterRef.current;
    if (!limiter.canProceed()) {
      const waitTime = formatWaitTime(limiter.getWaitTime());
      return {
        safe: false,
        error: `Muitas tentativas. Aguarde ${waitTime} antes de enviar novamente.`,
        data: null,
        silentBlock: false,
      };
    }

    // 4. Conteúdo suspeito — verifica injeção em todos os campos
    const values = Object.values(formData);
    for (const value of values) {
      if (typeof value === 'string' && hasSuspiciousContent(value)) {
        return {
          safe: false,
          error: 'Conteúdo inválido detectado. Revise os campos e tente novamente.',
          data: null,
          silentBlock: false,
        };
      }
    }

    // 5. Sanitização — limpa todos os campos
    const sanitizedData = sanitizeObject(formData);

    // Remove o campo honeypot dos dados
    delete sanitizedData[HONEYPOT_FIELD];

    // Registra a tentativa no rate limiter
    limiter.record();

    return {
      safe: true,
      error: null,
      data: sanitizedData,
      silentBlock: false,
    };
  }, [honeypotValue]);

  /**
   * Reseta o rate limiter (útil após sucesso ou navegação).
   */
  const resetProtection = useCallback(() => {
    limiterRef.current.reset();
    setHoneypotValue('');
    mountTimeRef.current = Date.now();
  }, []);

  /**
   * Retorna info sobre o estado atual do rate limiter.
   */
  const limiterStatus = useMemo(() => ({
    attempts: limiterRef.current.getAttempts(),
    canProceed: limiterRef.current.canProceed(),
    waitTime: limiterRef.current.getWaitTime(),
  }), []);

  return {
    renderHoneypot,
    validateSubmit,
    resetProtection,
    limiterStatus,
  };
}
