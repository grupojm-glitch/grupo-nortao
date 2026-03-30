/**
 * GRUPO NORTÃO — PartRequestPage
 * 
 * Página "Não Achei Minha Peça".
 * Função: captar demanda que o estoque próprio não atende.
 * Transforma perda em oportunidade.
 * 
 * Estrutura:
 * 1. Hero com tom de consultoria
 * 2. Formulário detalhado (veículo + peça + contato)
 * 3. Como funciona (3 passos)
 * 4. Nota de transparência
 * 
 * Segurança: honeypot + rate limiter + sanitização + consentimento LGPD
 */

import { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import CTAButton from '../components/shared/CTAButton';
import ConsentCheckbox, { validateConsent, createConsentRecord } from '../compliance/ConsentCheckbox';
import { useSecureSubmit } from '../hooks/useSecureSubmit';
import { validateRequired, validatePhone, validateEmail } from '../security/validate';

const INITIAL_FORM = {
  nome: '',
  telefone: '',
  email: '',
  veiculo_modelo: '',
  veiculo_ano: '',
  veiculo_versao: '',
  peca_nome: '',
  peca_codigo: '',
  observacoes: '',
  website: '', // honeypot
};

const STEPS = [
  { icon: Search, title: 'Você descreve', text: 'Preencha o formulário com os dados do veículo e da peça que precisa.' },
  { icon: Clock, title: 'A gente busca', text: 'Consultamos nosso estoque interno e parceiros homologados.' },
  { icon: CheckCircle, title: 'Você recebe', text: 'Retornamos com disponibilidade, condição, valor e prazo.' },
];

const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20não%20encontrei%20uma%20peça%20no%20site%20e%20gostaria%20de%20ajuda.';

export default function PartRequestPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { submit, isLoading, error, success, renderHoneypot } = useSecureSubmit({
    endpoint: '', // sem endpoint por enquanto — simula sucesso
    validators: [
      () => validateRequired(form.nome, 'Nome'),
      () => validatePhone(form.telefone),
      () => validateRequired(form.veiculo_modelo, 'Modelo do veículo'),
      () => validateRequired(form.peca_nome, 'Nome da peça'),
    ],
    onSuccess: () => {
      setForm(INITIAL_FORM);
      setConsent(false);
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setConsentError(null);

    const consentValidation = validateConsent(consent);
    if (!consentValidation.valid) {
      setConsentError(consentValidation.error);
      return;
    }

    const dataToSend = {
      ...form,
      consent: createConsentRecord('busca_peca'),
    };

    await submit(dataToSend);
  }

  return (
    <div>
      {/* ========================
          Hero
          ======================== */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.overline}>Não encontrou sua peça?</span>
          <h1 style={styles.heroTitle}>
            A gente busca pra você.
          </h1>
          <p style={styles.heroSubtitle}>
            Preencha o formulário abaixo com os dados do veículo e da peça que precisa. 
            Nossa equipe consulta o estoque e a rede de parceiros homologados.
          </p>
        </div>
      </section>

      {/* ========================
          Formulário + Sidebar
          ======================== */}
      <section style={styles.section}>
        <div style={styles.contentGrid}>
          {/* Formulário */}
          <div>
            <SectionTitle
              title="Solicitar busca de peça"
              subtitle="Preencha com o máximo de informações possível para agilizar a busca."
            />

            {success ? (
              <div style={styles.successBox}>
                <CheckCircle size={32} style={{ color: 'var(--green-accent)' }} />
                <h3 style={styles.successTitle}>Solicitação enviada!</h3>
                <p style={styles.successText}>
                  Nossa equipe vai analisar e retornar em até 24h úteis 
                  com informações sobre disponibilidade.
                </p>
                <CTAButton
                  variant="ghost"
                  onClick={() => window.location.reload()}
                  style={{ marginTop: '1rem' }}
                >
                  Enviar nova solicitação
                </CTAButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                {renderHoneypot()}

                {/* Dados do veículo */}
                <h3 style={styles.formGroup}>Dados do veículo</h3>
                <div style={styles.fieldRow}>
                  <div style={styles.field}>
                    <label style={styles.label}>Modelo *</label>
                    <input name="veiculo_modelo" value={form.veiculo_modelo} onChange={handleChange} placeholder="Ex: Hilux, Ranger, S10..." style={styles.input} maxLength={60} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Ano</label>
                    <input name="veiculo_ano" value={form.veiculo_ano} onChange={handleChange} placeholder="Ex: 2019" style={styles.input} maxLength={10} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Versão</label>
                    <input name="veiculo_versao" value={form.veiculo_versao} onChange={handleChange} placeholder="Ex: SRV, XLT, High Country..." style={styles.input} maxLength={40} />
                  </div>
                </div>

                {/* Dados da peça */}
                <h3 style={styles.formGroup}>Dados da peça</h3>
                <div style={styles.fieldRow}>
                  <div style={{ ...styles.field, flex: 2 }}>
                    <label style={styles.label}>Nome ou descrição da peça *</label>
                    <input name="peca_nome" value={form.peca_nome} onChange={handleChange} placeholder="Ex: farol dianteiro direito, parachoque traseiro..." style={styles.input} maxLength={120} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Código (se souber)</label>
                    <input name="peca_codigo" value={form.peca_codigo} onChange={handleChange} placeholder="Ex: 81130-0K690" style={styles.input} maxLength={40} />
                  </div>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Observações</label>
                  <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Informações adicionais que possam ajudar na busca..." style={styles.textarea} rows={3} maxLength={500} />
                </div>

                {/* Dados de contato */}
                <h3 style={styles.formGroup}>Seus dados de contato</h3>
                <div style={styles.fieldRow}>
                  <div style={styles.field}>
                    <label style={styles.label}>Nome *</label>
                    <input name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome" style={styles.input} maxLength={80} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>WhatsApp / Telefone *</label>
                    <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" style={styles.input} maxLength={20} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>E-mail</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" style={styles.input} type="email" maxLength={80} />
                  </div>
                </div>

                {/* Consentimento LGPD */}
                <ConsentCheckbox
                  checked={consent}
                  onChange={setConsent}
                  purpose="busca_peca"
                  error={consentError}
                />

                {/* Erro geral */}
                {error && <p style={styles.error}>{error}</p>}

                {/* Submit */}
                <CTAButton
                  variant="primary"
                  size="lg"
                  type="submit"
                  icon={<Search size={18} />}
                  disabled={isLoading}
                  fullWidth
                >
                  {isLoading ? 'Enviando...' : 'Enviar Solicitação de Busca'}
                </CTAButton>
              </form>
            )}
          </div>

          {/* Sidebar — Como funciona */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Como funciona</h3>
            <div style={styles.stepsList}>
              {STEPS.map((step, i) => (
                <div key={i} style={styles.step}>
                  <div style={styles.stepIcon}>
                    <step.icon size={18} />
                  </div>
                  <div>
                    <h4 style={styles.stepTitle}>{step.title}</h4>
                    <p style={styles.stepText}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.sidebarNote}>
              <p style={styles.noteTitle}>Sem compromisso</p>
              <p style={styles.noteText}>
                A solicitação não gera obrigação de compra. 
                Você recebe as informações e decide.
              </p>
            </div>

            <div style={styles.sidebarNote}>
              <p style={styles.noteTitle}>Prefere falar direto?</p>
              <CTAButton
                variant="whatsapp"
                icon={<MessageCircle size={16} />}
                href={WHATSAPP_URL}
                external
                fullWidth
                style={{ marginTop: '0.5rem' }}
              >
                Chamar no WhatsApp
              </CTAButton>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// --- Estilos ---
const styles = {
  hero: {
    backgroundColor: 'var(--navy-900)',
    padding: '4rem 1.5rem',
    textAlign: 'center',
  },
  heroInner: { maxWidth: 'var(--max-width-narrow)', margin: '0 auto' },
  overline: { display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--green-accent)', marginBottom: '1rem' },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem' },
  heroSubtitle: { fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto' },

  section: { padding: '4rem 1.5rem' },
  contentGrid: { maxWidth: 'var(--max-width)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' },

  // Form
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  formGroup: { fontWeight: 700, fontSize: '0.9375rem', color: 'var(--navy-900)', paddingTop: '0.5rem', borderTop: '1px solid var(--graphite-100)', marginTop: '0.5rem' },
  fieldRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  field: { flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.8125rem', fontWeight: 600, color: 'var(--graphite-700)' },
  input: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s ease', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  textarea: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s ease', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  error: { fontSize: '0.875rem', color: 'var(--red-alert)', fontWeight: 500 },

  // Success
  successBox: { textAlign: 'center', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--off-white)', border: '1px solid var(--graphite-100)' },
  successTitle: { fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy-900)', marginTop: '1rem', marginBottom: '0.5rem' },
  successText: { fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--graphite-500)', maxWidth: '400px', margin: '0 auto' },

  // Sidebar
  sidebar: { display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: 'calc(var(--header-height) + 2rem)' },
  sidebarTitle: { fontWeight: 700, fontSize: '1.0625rem', color: 'var(--navy-900)' },
  stepsList: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  step: { display: 'flex', gap: '0.75rem', alignItems: 'flex-start' },
  stepIcon: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--navy-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepTitle: { fontWeight: 700, fontSize: '0.9375rem', color: 'var(--navy-900)', marginBottom: '0.125rem' },
  stepText: { fontSize: '0.8125rem', lineHeight: 1.5, color: 'var(--graphite-500)' },
  sidebarNote: { padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--off-white)', border: '1px solid var(--graphite-100)' },
  noteTitle: { fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy-900)', marginBottom: '0.25rem' },
  noteText: { fontSize: '0.8125rem', lineHeight: 1.5, color: 'var(--graphite-500)' },
};
