/**
 * GRUPO NORTÃO — ShippingCalculator
 * 
 * Calculadora de frete por CEP no checkout.
 * 
 * Fluxo:
 * 1. Usuário digita o CEP
 * 2. Busca endereço via ViaCEP (API gratuita)
 * 3. Calcula opções de frete (simulação — em produção usar Melhor Envio)
 * 4. Usuário seleciona a opção
 * 
 * Em produção: substituir simulação pela API do Melhor Envio.
 * Endpoint: https://melhorenvio.com.br/api/v2/me/shipment/calculate
 * 
 * Uso:
 * <ShippingCalculator
 *   onShippingSelect={(option) => setShipping(option)}
 *   onAddressFound={(address) => setAddress(address)}
 * />
 */

import { useState, useCallback } from 'react';
import { Truck, MapPin, Loader, AlertCircle } from 'lucide-react';
import { sanitize, hasSuspiciousContent } from '../../security/sanitize';

// Opções de frete simuladas (substituir por API real em produção)
function simulateShippingOptions(cep) {
  const region = parseInt(cep.substring(0, 1));
  
  // Multiplier baseado na região do CEP
  const multipliers = {
    0: 1.3,  // SP capital
    1: 1.2,  // SP interior
    2: 1.1,  // RJ/ES
    3: 1.0,  // MG
    4: 1.2,  // PR/SC
    5: 1.1,  // RS
    6: 1.4,  // Centro-Oeste
    7: 1.5,  // Norte/Nordeste
    8: 1.3,  // PR/SC/MS
    9: 1.2,  // RS
  };
  const mult = multipliers[region] || 1.3;

  return [
    {
      id: 'pac',
      name: 'PAC — Econômico',
      carrier: 'Correios',
      price: Math.round(35 * mult * 100) / 100,
      days: Math.round(8 * mult),
      icon: 'truck',
    },
    {
      id: 'sedex',
      name: 'SEDEX — Rápido',
      carrier: 'Correios',
      price: Math.round(55 * mult * 100) / 100,
      days: Math.round(4 * mult),
      icon: 'zap',
    },
    {
      id: 'transportadora',
      name: 'Transportadora',
      carrier: 'Parceiro logístico',
      price: Math.round(45 * mult * 100) / 100,
      days: Math.round(6 * mult),
      icon: 'package',
    },
  ];
}

// Formata CEP com máscara
function formatCep(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

// Formata preço
function fmtPrice(v) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
}

export default function ShippingCalculator({ onShippingSelect, onAddressFound }) {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleCepChange = useCallback((e) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    setError(null);
    // Reset se mudar o CEP
    if (formatted.replace(/\D/g, '').length < 8) {
      setAddress(null);
      setOptions([]);
      setSelected(null);
    }
  }, []);

  const handleCalculate = useCallback(async () => {
    const digits = cep.replace(/\D/g, '');

    if (digits.length !== 8) {
      setError('Informe um CEP válido com 8 dígitos.');
      return;
    }

    // Segurança: verifica conteúdo suspeito
    if (hasSuspiciousContent(cep)) {
      setError('Conteúdo inválido detectado.');
      return;
    }

    setLoading(true);
    setError(null);
    setOptions([]);
    setSelected(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado. Verifique e tente novamente.');
        setLoading(false);
        return;
      }

      // Sanitiza dados retornados da API
      const addr = {
        cep: sanitize(data.cep || ''),
        street: sanitize(data.logradouro || ''),
        neighborhood: sanitize(data.bairro || ''),
        city: sanitize(data.localidade || ''),
        state: sanitize(data.uf || ''),
      };

      setAddress(addr);
      if (onAddressFound) onAddressFound(addr);

      // 2. Calcula frete (simulação — substituir por API real)
      // Simula delay de rede
      await new Promise((r) => setTimeout(r, 600));
      const shippingOptions = simulateShippingOptions(digits);
      setOptions(shippingOptions);

    } catch (err) {
      setError('Erro ao calcular frete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [cep, onAddressFound]);

  const handleSelect = useCallback((option) => {
    setSelected(option.id);
    if (onShippingSelect) onShippingSelect(option);
  }, [onShippingSelect]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleCalculate();
  }, [handleCalculate]);

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>
        <Truck size={18} />
        Calcular frete
      </h3>

      {/* Input de CEP */}
      <div style={styles.inputRow}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            onKeyDown={handleKeyDown}
            placeholder="00000-000"
            maxLength={9}
            style={styles.input}
            aria-label="CEP de entrega"
          />
        </div>
        <button
          onClick={handleCalculate}
          disabled={loading}
          style={{
            ...styles.calcBtn,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Calcular'}
        </button>
      </div>

      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.cepLink}
      >
        Não sei meu CEP
      </a>

      {/* Erro */}
      {error && (
        <div style={styles.error}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Endereço encontrado */}
      {address && (
        <div style={styles.address}>
          <MapPin size={14} style={{ color: 'var(--green-accent)', flexShrink: 0 }} />
          <span>{address.street ? `${address.street}, ` : ''}{address.neighborhood ? `${address.neighborhood} — ` : ''}{address.city}/{address.state}</span>
        </div>
      )}

      {/* Opções de frete */}
      {options.length > 0 && (
        <div style={styles.options}>
          {options.map((opt) => (
            <label
              key={opt.id}
              style={{
                ...styles.option,
                borderColor: selected === opt.id ? 'var(--green-accent)' : 'var(--graphite-100)',
                backgroundColor: selected === opt.id ? 'var(--green-soft)' : '#fff',
              }}
            >
              <input
                type="radio"
                name="shipping"
                checked={selected === opt.id}
                onChange={() => handleSelect(opt)}
                style={styles.radio}
              />
              <div style={styles.optionInfo}>
                <div style={styles.optionName}>{opt.name}</div>
                <div style={styles.optionMeta}>
                  {opt.carrier} · até {opt.days} dias úteis
                </div>
              </div>
              <div style={styles.optionPrice}>{fmtPrice(opt.price)}</div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Estilos ---
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1rem',
    color: 'var(--graphite-900)',
  },
  inputRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '2px solid var(--graphite-100)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    color: 'var(--graphite-900)',
    outline: 'none',
    transition: 'border-color 0.2s',
    letterSpacing: '0.05em',
  },
  calcBtn: {
    padding: '0.875rem 1.5rem',
    backgroundColor: 'var(--navy-800)',
    color: '#fff',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  cepLink: {
    fontSize: '0.75rem',
    color: 'var(--navy-700)',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    alignSelf: 'flex-start',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.8125rem',
    color: 'var(--red-alert)',
    fontWeight: 500,
  },
  address: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8125rem',
    color: 'var(--graphite-700)',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--off-white)',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  radio: {
    accentColor: 'var(--green-accent)',
    width: '18px',
    height: '18px',
    flexShrink: 0,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--graphite-900)',
  },
  optionMeta: {
    fontSize: '0.75rem',
    color: 'var(--graphite-500)',
    marginTop: '0.125rem',
  },
  optionPrice: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1rem',
    color: 'var(--navy-800)',
    flexShrink: 0,
  },
};
