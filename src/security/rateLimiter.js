/**
 * GRUPO NORTÃO — Rate Limiter (Client-Side)
 * 
 * Controla a frequência de envios de formulário por sessão.
 * Previne spam, abuso e envios duplicados acidentais.
 * 
 * Importante: rate limiting real deve existir também no backend.
 * Esta camada é uma proteção adicional no frontend.
 * 
 * Uso:
 * import { createRateLimiter } from '@/security/rateLimiter';
 * const limiter = createRateLimiter({ maxAttempts: 3, windowMs: 60000 });
 * 
 * if (!limiter.canProceed()) {
 *   const wait = limiter.getWaitTime();
 *   alert(`Aguarde ${Math.ceil(wait / 1000)} segundos.`);
 *   return;
 * }
 * limiter.record();
 */

/**
 * Cria uma instância de rate limiter.
 * 
 * @param {Object} options
 * @param {number} options.maxAttempts — máximo de tentativas na janela (padrão: 5)
 * @param {number} options.windowMs — janela de tempo em ms (padrão: 60000 = 1 min)
 * @param {number} options.cooldownMs — tempo de espera após exceder limite (padrão: 30000 = 30s)
 * @returns {Object} — { canProceed, record, getWaitTime, reset, getAttempts }
 */
export function createRateLimiter({
  maxAttempts = 5,
  windowMs = 60000,
  cooldownMs = 30000,
} = {}) {
  let attempts = [];
  let lockedUntil = null;

  /**
   * Remove tentativas fora da janela de tempo.
   */
  function cleanup() {
    const now = Date.now();
    attempts = attempts.filter((timestamp) => now - timestamp < windowMs);
  }

  /**
   * Verifica se o usuário pode prosseguir com o envio.
   * @returns {boolean}
   */
  function canProceed() {
    const now = Date.now();

    // Se está em cooldown, verifica se já passou
    if (lockedUntil && now < lockedUntil) {
      return false;
    }

    // Limpa o lock se o tempo passou
    if (lockedUntil && now >= lockedUntil) {
      lockedUntil = null;
    }

    cleanup();
    return attempts.length < maxAttempts;
  }

  /**
   * Registra uma tentativa de envio.
   * Se exceder o limite, ativa o cooldown.
   */
  function record() {
    const now = Date.now();
    attempts.push(now);
    cleanup();

    if (attempts.length >= maxAttempts) {
      lockedUntil = now + cooldownMs;
    }
  }

  /**
   * Retorna o tempo restante de espera em ms.
   * Retorna 0 se não há espera.
   * @returns {number}
   */
  function getWaitTime() {
    const now = Date.now();

    if (lockedUntil && now < lockedUntil) {
      return lockedUntil - now;
    }

    return 0;
  }

  /**
   * Reseta o limiter (útil para testes ou logout).
   */
  function reset() {
    attempts = [];
    lockedUntil = null;
  }

  /**
   * Retorna o número de tentativas na janela atual.
   * @returns {number}
   */
  function getAttempts() {
    cleanup();
    return attempts.length;
  }

  return {
    canProceed,
    record,
    getWaitTime,
    reset,
    getAttempts,
  };
}

/**
 * Formata o tempo de espera para exibição amigável.
 * @param {number} ms — tempo em milissegundos
 * @returns {string} — ex: "30 segundos", "1 minuto"
 */
export function formatWaitTime(ms) {
  const seconds = Math.ceil(ms / 1000);

  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  }

  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
}
