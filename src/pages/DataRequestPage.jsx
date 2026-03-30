/**
 * GRUPO NORTÃO — DataRequestPage
 * 
 * Página de Direitos do Titular (LGPD).
 * Permite ao titular solicitar: acesso, correção, exclusão, portabilidade.
 * 
 * Estrutura:
 * 1. Hero explicativo
 * 2. Lista de direitos
 * 3. Formulário de solicitação (com CPF)
 * 4. Informações sobre prazo e DPO
 */

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, User, FileText, Trash2, Download, Send } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import CTAButton from '../components/shared/CTAButton';
import ConsentCheckbox, { validateConsent, createConsentRecord } from '../compliance/ConsentCheckbox';
import { useSecureSubmit } from '../hooks/useSecureSubmit';
import { validateRequired, validateEmail, validateCPF } from '../security/validate';

const RIGHTS = [
  { icon: User, title: 'Acesso', description: 'Saber quais dados pessoais temos sobre você e como são utilizados.' },
  { icon: FileText, title: 'Correção', description: 'Solicitar a atualização ou correção de dados incompletos ou inexatos.' },
  { icon: Trash2, title: 'Eliminação', description: 'Solicitar a exclusão de dados pessoais tratados com base no seu consentimento.' },
  { icon: Download, title: 'Portabilidade', description: 'Receber seus dados em formato estruturado para transferência a outro serviço.' },
];

const REQUEST_TYPES = [
  { value: 'acesso', label: 'Quero saber quais dados vocês têm sobre mim' },
  { value: 'correcao', label: 'Quero corrigir ou atualizar meus dados' },
  { value: 'eliminacao', label: 'Quero que meus dados sejam excluídos' },
  { value: 'portabilidade', label: 'Quero receber uma cópia dos meus dados' },
  { value: 'revogacao', label: 'Quero revogar meu consentimento' },
  { value: 'informacao', label: 'Quero saber com quem meus dados foram compartilhados' },
  { value: 'outro', label: 'Outra solicitação' },
];

const INITIAL_FORM = {
  nome: '',
  cpf: '',
  email: '',
  tipo_solicitacao: '',
  detalhes: '',
  website: '', // honeypot
};

export default function DataRequestPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { submit, isLoading, error, success, renderHoneypot } = useSecureSubmit({
    endpoint: '',
    validators: [
      () => validateRequired(form.nome, 'Nome'),
      () => validateCPF(form.cpf),
      () => validateEmail(form.email),
      () => validateRequired(form.tipo_solicitacao, 'Tipo de solicitação'),
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
    const cv = validateConsent(consent);
    if (!cv.valid) { setConsentError(cv.error); return; }
    await submit({ ...form, consent: createConsentRecord('direitos_titular') });
  }

  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <Shield size={32} style={{ color: 'var(--green-accent)', marginBottom: '1rem' }} />
          <h1 style={styles.heroTitle}>Seus Dados, Seus Direitos</h1>
          <p style={styles.heroSubtitle}>
            Conforme a LGPD, você tem o direito de saber, corrigir, excluir e 
            portar seus dados pessoais. Utilize esta página para exercer seus direitos.
          </p>
        </div>
      </section>

      {/* Direitos */}
      <section style={styles.section}>
        <div style={styles.container}>
          <SectionTitle
            overline="LGPD"
            title="Seus direitos como titular de dados"
            center
          />
          <div style={styles.rightsGrid}>
            {RIGHTS.map((right, i) => (
              <div key={i} style={styles.rightCard}>
                <div style={styles.rightIcon}>
                  <right.icon size={22} />
                </div>
                <h3 style={styles.rightTitle}>{right.title}</h3>
                <p style={styles.rightDesc}>{right.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section style={styles.sectionLight}>
        <div style={styles.containerNarrow}>
          <SectionTitle
            overline="Solicitação"
            title="Exercer meus direitos"
            subtitle="Preencha o formulário abaixo. Responderemos em até 15 dias conforme a LGPD."
            center
          />

          {success ? (
            <div style={styles.successBox}>
              <CheckCircle size={32} style={{ color: 'var(--green-accent)' }} />
              <h3 style={styles.successTitle}>Solicitação registrada</h3>
              <p style={styles.successText}>
                Sua solicitação foi recebida e será analisada pelo nosso 
                Encarregado de Proteção de Dados. Retornaremos no e-mail 
                informado em até 15 dias, conforme previsto na LGPD.
              </p>
              <p style={styles.successProtocol}>
                Protocolo: {Date.now().toString(36).toUpperCase()}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              {renderHoneypot()}

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Nome completo *</label>
                  <input name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome completo" style={styles.input} maxLength={80} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>CPF *</label>
                  <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" style={styles.input} maxLength={14} />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>E-mail para resposta *</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" style={styles.input} type="email" maxLength={80} />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Tipo de solicitação *</label>
                <select name="tipo_solicitacao" value={form.tipo_solicitacao} onChange={handleChange} style={styles.input}>
                  <option value="">Selecione o tipo de solicitação</option>
                  {REQUEST_TYPES.map((rt) => (
                    <option key={rt.value} value={rt.value}>{rt.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Detalhes da solicitação</label>
                <textarea
                  name="detalhes"
                  value={form.detalhes}
                  onChange={handleChange}
                  placeholder="Descreva com mais detalhes o que deseja, se necessário..."
                  style={styles.textarea}
                  rows={4}
                  maxLength={1000}
                />
              </div>

              <ConsentCheckbox checked={consent} onChange={setConsent} purpose="direitos_titular" error={consentError} />
              {error && <p style={styles.error}>{error}</p>}

              <CTAButton variant="primary" size="lg" type="submit" icon={<Send size={18} />} disabled={isLoading} fullWidth>
                {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
              </CTAButton>
            </form>
          )}
        </div>
      </section>

      {/* Informações DPO */}
      <section style={styles.section}>
        <div style={styles.containerNarrow}>
          <div style={styles.dpoBox}>
            <h3 style={styles.dpoTitle}>Encarregado de Proteção de Dados (DPO)</h3>
            <p style={styles.dpoText}>
              Para questões sobre privacidade e proteção de dados, 
              você também pode entrar em contato diretamente com nosso 
              Encarregado de Proteção de Dados:
            </p>
            <p style={styles.dpoEmail}>privacidade@gruponortao.com.br</p>
            <p style={styles.dpoNote}>
              Prazo legal de resposta: até 15 dias a partir do recebimento da solicitação.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Estilos ---
const styles = {
  hero: { backgroundColor: 'var(--navy-900)', padding: '4rem 1.5rem', textAlign: 'center' },
  heroInner: { maxWidth: 'var(--max-width-narrow)', margin: '0 auto' },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 2.75rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1rem' },
  heroSubtitle: { fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '540px', margin: '0 auto' },

  section: { padding: '5rem 1.5rem' },
  sectionLight: { backgroundColor: 'var(--off-white)', padding: '5rem 1.5rem' },
  container: { maxWidth: 'var(--max-width)', margin: '0 auto' },
  containerNarrow: { maxWidth: '680px', margin: '0 auto' },

  rightsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' },
  rightCard: { padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--graphite-100)', backgroundColor: '#fff', textAlign: 'center' },
  rightIcon: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--navy-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' },
  rightTitle: { fontWeight: 700, fontSize: '1.0625rem', color: 'var(--navy-900)', marginBottom: '0.375rem' },
  rightDesc: { fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--graphite-500)' },

  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  fieldRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  field: { flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.8125rem', fontWeight: 600, color: 'var(--graphite-700)' },
  input: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  textarea: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  error: { fontSize: '0.875rem', color: 'var(--red-alert)', fontWeight: 500 },

  successBox: { textAlign: 'center', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', backgroundColor: '#fff', border: '1px solid var(--graphite-100)' },
  successTitle: { fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy-900)', marginTop: '1rem', marginBottom: '0.5rem' },
  successText: { fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--graphite-500)', maxWidth: '460px', margin: '0 auto' },
  successProtocol: { fontSize: '0.8125rem', color: 'var(--graphite-500)', marginTop: '1rem', fontFamily: 'monospace', backgroundColor: 'var(--graphite-100)', display: 'inline-block', padding: '0.375rem 1rem', borderRadius: 'var(--radius-md)' },

  dpoBox: { padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--off-white)', border: '1px solid var(--graphite-100)', textAlign: 'center' },
  dpoTitle: { fontWeight: 700, fontSize: '1.0625rem', color: 'var(--navy-900)', marginBottom: '0.75rem' },
  dpoText: { fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--graphite-500)', marginBottom: '0.75rem' },
  dpoEmail: { fontSize: '1rem', fontWeight: 700, color: 'var(--navy-700)', marginBottom: '0.5rem' },
  dpoNote: { fontSize: '0.8125rem', color: 'var(--graphite-500)', fontStyle: 'italic' },
};
