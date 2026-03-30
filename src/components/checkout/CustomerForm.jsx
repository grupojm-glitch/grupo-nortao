/**
 * GRUPO NORTÃO — CustomerForm
 * 
 * Formulário de dados do comprador no checkout.
 * Coleta: dados pessoais + endereço de entrega.
 * 
 * O endereço é parcialmente preenchido pelo ShippingCalculator
 * (via ViaCEP). O usuário completa número e complemento.
 * 
 * Integra: validação + sanitização + consentimento LGPD.
 * 
 * Uso:
 * <CustomerForm
 *   data={customerData}
 *   onChange={(data) => setCustomerData(data)}
 *   address={addressFromCep}
 *   errors={validationErrors}
 * />
 */

import { useCallback } from 'react';
import { User, MapPin } from 'lucide-react';
import { validateRequired, validateEmail, validatePhone, validateCPF } from '../../security/validate';
import { sanitizeObject } from '../../security/sanitize';

export default function CustomerForm({ data, onChange, address, errors = {} }) {

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    // Máscara de CPF
    if (name === 'cpf') {
      const digits = value.replace(/\D/g, '').slice(0, 11);
      let masked = digits;
      if (digits.length > 3) masked = digits.slice(0, 3) + '.' + digits.slice(3);
      if (digits.length > 6) masked = masked.slice(0, 7) + '.' + digits.slice(6);
      if (digits.length > 9) masked = masked.slice(0, 11) + '-' + digits.slice(9);
      onChange({ ...data, [name]: masked });
      return;
    }

    // Máscara de telefone
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 11);
      let masked = digits;
      if (digits.length > 0) masked = '(' + digits;
      if (digits.length > 2) masked = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
      if (digits.length > 7) masked = '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
      onChange({ ...data, [name]: masked });
      return;
    }

    onChange({ ...data, [name]: value });
  }, [data, onChange]);

  return (
    <div style={styles.wrapper}>
      {/* ========================
          DADOS PESSOAIS
          ======================== */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          <User size={18} />
          Seus dados
        </h3>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Nome completo *</label>
            <input
              type="text"
              name="name"
              value={data.name || ''}
              onChange={handleChange}
              placeholder="Como está no documento"
              maxLength={80}
              style={{
                ...styles.input,
                borderColor: errors.name ? 'var(--red-alert)' : 'var(--graphite-100)',
              }}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>CPF *</label>
            <input
              type="text"
              name="cpf"
              value={data.cpf || ''}
              onChange={handleChange}
              placeholder="000.000.000-00"
              maxLength={14}
              style={{
                ...styles.input,
                borderColor: errors.cpf ? 'var(--red-alert)' : 'var(--graphite-100)',
              }}
            />
            {errors.cpf && <span style={styles.error}>{errors.cpf}</span>}
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>E-mail *</label>
            <input
              type="email"
              name="email"
              value={data.email || ''}
              onChange={handleChange}
              placeholder="seu@email.com"
              maxLength={80}
              style={{
                ...styles.input,
                borderColor: errors.email ? 'var(--red-alert)' : 'var(--graphite-100)',
              }}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>WhatsApp / Telefone *</label>
            <input
              type="text"
              name="phone"
              value={data.phone || ''}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              maxLength={15}
              style={{
                ...styles.input,
                borderColor: errors.phone ? 'var(--red-alert)' : 'var(--graphite-100)',
              }}
            />
            {errors.phone && <span style={styles.error}>{errors.phone}</span>}
          </div>
        </div>
      </div>

      {/* ========================
          ENDEREÇO DE ENTREGA
          ======================== */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          <MapPin size={18} />
          Endereço de entrega
        </h3>

        {address && (address.street || address.city) ? (
          /* Endereço pré-preenchido via CEP */
          <div style={styles.addressPreview}>
            <span style={styles.addressTag}>Preenchido via CEP</span>
            <p style={styles.addressText}>
              {address.street && `${address.street}, `}
              {address.neighborhood && `${address.neighborhood} — `}
              {address.city}/{address.state}
            </p>
          </div>
        ) : (
          <p style={styles.addressNote}>
            Calcule o frete acima para preencher automaticamente.
          </p>
        )}

        <div style={styles.row}>
          <div style={{ ...styles.field, flex: 3 }}>
            <label style={styles.label}>Rua / Avenida</label>
            <input
              type="text"
              name="street"
              value={data.street || address?.street || ''}
              onChange={handleChange}
              placeholder="Nome da rua"
              maxLength={120}
              style={styles.input}
            />
          </div>
          <div style={{ ...styles.field, flex: 1, minWidth: '100px' }}>
            <label style={styles.label}>Número *</label>
            <input
              type="text"
              name="number"
              value={data.number || ''}
              onChange={handleChange}
              placeholder="Nº"
              maxLength={10}
              style={{
                ...styles.input,
                borderColor: errors.number ? 'var(--red-alert)' : 'var(--graphite-100)',
              }}
            />
            {errors.number && <span style={styles.error}>{errors.number}</span>}
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Complemento</label>
            <input
              type="text"
              name="complement"
              value={data.complement || ''}
              onChange={handleChange}
              placeholder="Apto, bloco, referência..."
              maxLength={60}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Bairro</label>
            <input
              type="text"
              name="neighborhood"
              value={data.neighborhood || address?.neighborhood || ''}
              onChange={handleChange}
              placeholder="Bairro"
              maxLength={60}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={{ ...styles.field, flex: 2 }}>
            <label style={styles.label}>Cidade</label>
            <input
              type="text"
              name="city"
              value={data.city || address?.city || ''}
              onChange={handleChange}
              placeholder="Cidade"
              maxLength={60}
              style={styles.input}
              readOnly={!!address?.city}
            />
          </div>
          <div style={{ ...styles.field, flex: 1, minWidth: '80px' }}>
            <label style={styles.label}>Estado</label>
            <input
              type="text"
              name="state"
              value={data.state || address?.state || ''}
              onChange={handleChange}
              placeholder="UF"
              maxLength={2}
              style={styles.input}
              readOnly={!!address?.state}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Estado inicial do formulário de cliente.
 */
export const INITIAL_CUSTOMER = {
  name: '',
  cpf: '',
  email: '',
  phone: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

/**
 * Valida os dados do cliente usando validações centralizadas.
 * Retorna objeto de erros (vazio se tudo OK).
 * @param {Object} data
 * @returns {Object} errors
 */
export function validateCustomer(data) {
  const errors = {};

  const nameCheck = validateRequired(data.name, 'Nome');
  if (!nameCheck.valid) errors.name = nameCheck.error;
  
  const cpfCheck = validateCPF(data.cpf);
  if (!cpfCheck.valid) errors.cpf = cpfCheck.error;
  
  const emailCheck = validateEmail(data.email);
  if (!emailCheck.valid) errors.email = emailCheck.error;
  
  const phoneCheck = validatePhone(data.phone);
  if (!phoneCheck.valid) errors.phone = phoneCheck.error;
  
  const numberCheck = validateRequired(data.number, 'Número');
  if (!numberCheck.valid) errors.number = numberCheck.error;

  return errors;
}

/**
 * Sanitiza todos os dados do cliente antes do envio.
 * @param {Object} data
 * @returns {Object} dados limpos
 */
export function sanitizeCustomer(data) {
  return sanitizeObject(data);
}

// --- Estilos ---
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.875rem',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1rem',
    color: 'var(--graphite-900)',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--graphite-100)',
  },
  row: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  field: {
    flex: 1,
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--graphite-700)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  input: {
    padding: '0.875rem 1rem',
    border: '2px solid var(--graphite-100)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-body)',
    color: 'var(--graphite-900)',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff',
  },
  error: {
    fontSize: '0.6875rem',
    color: 'var(--red-alert)',
    fontWeight: 500,
  },
  addressPreview: {
    padding: '0.875rem 1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--green-soft)',
    border: '1px solid var(--green-accent)',
  },
  addressTag: {
    fontSize: '0.625rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--green-deep)',
    marginBottom: '0.25rem',
    display: 'block',
  },
  addressText: {
    fontSize: '0.875rem',
    color: 'var(--graphite-900)',
    fontWeight: 500,
  },
  addressNote: {
    fontSize: '0.8125rem',
    color: 'var(--graphite-500)',
    fontStyle: 'italic',
  },
};
