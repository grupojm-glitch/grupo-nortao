/**
 * GRUPO NORTÃO — ContactPage
 * 
 * Página de contato / WhatsApp / suporte.
 * Canal direto para atendimento.
 * 
 * Estrutura:
 * 1. Hero
 * 2. Cards de canais (WhatsApp, E-mail, Horário)
 * 3. Formulário de contato geral
 * 4. FAQ rápido
 */

import { useState, useEffect } from 'react';
import { MessageCircle, Mail, Clock, Send, MapPin, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import CTAButton from '../components/shared/CTAButton';
import FAQAccordion from '../components/shared/FAQAccordion';
import ConsentCheckbox, { validateConsent, createConsentRecord } from '../compliance/ConsentCheckbox';
import { useSecureSubmit } from '../hooks/useSecureSubmit';
import { validateRequired, validatePhone, validateEmail } from '../security/validate';

const CHANNELS = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Atendimento rápido com especialistas em pickups.',
    action: 'Chamar no WhatsApp',
    href: 'https://wa.me/5500000000000?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20informações.',
    highlight: true,
  },
  {
    icon: Mail,
    title: 'E-mail',
    description: 'Para assuntos comerciais e documentações.',
    action: 'contato@gruponortao.com.br',
    href: 'mailto:contato@gruponortao.com.br',
    highlight: false,
  },
  {
    icon: Clock,
    title: 'Horário de Atendimento',
    description: 'Segunda a sexta, das 8h às 18h. Sábados, das 8h às 12h.',
    action: null,
    href: null,
    highlight: false,
  },
];

const CONTACT_FAQS = [
  { question: 'Qual o tempo médio de resposta?', answer: 'Respondemos via WhatsApp em minutos durante o horário comercial. Formulários e e-mails são respondidos em até 24h úteis.' },
  { question: 'Vocês atendem aos finais de semana?', answer: 'Aos sábados atendemos das 8h às 12h. Domingos e feriados não temos atendimento, mas você pode enviar sua mensagem e responderemos na segunda.' },
  { question: 'Posso visitar o estoque?', answer: 'Sim, mas com agendamento prévio. Entre em contato pelo WhatsApp para combinar data e horário.' },
];

const INITIAL_FORM = {
  nome: '',
  telefone: '',
  email: '',
  assunto: '',
  mensagem: '',
  website: '', // honeypot
};

export default function ContactPage() {
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
      () => validatePhone(form.telefone),
      () => validateRequired(form.mensagem, 'Mensagem'),
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
    await submit({ ...form, consent: createConsentRecord('contato') });
  }

  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.overline}>Contato</span>
          <h1 style={styles.heroTitle}>Fale com o Grupo Nortão</h1>
          <p style={styles.heroSubtitle}>
            Atendimento humano, especializado em pickups. 
            Escolha o canal que preferir.
          </p>
        </div>
      </section>

      {/* Canais */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.channelsGrid}>
            {CHANNELS.map((ch, i) => (
              <div
                key={i}
                style={{
                  ...styles.channelCard,
                  borderColor: ch.highlight ? 'var(--green-accent)' : 'var(--graphite-100)',
                  backgroundColor: ch.highlight ? 'rgba(245,179,1,0.03)' : '#fff',
                }}
              >
                <div style={{
                  ...styles.channelIcon,
                  backgroundColor: ch.highlight ? 'var(--green-accent)' : 'var(--navy-700)',
                }}>
                  <ch.icon size={22} />
                </div>
                <h3 style={styles.channelTitle}>{ch.title}</h3>
                <p style={styles.channelDesc}>{ch.description}</p>
                {ch.href && (
                  <a
                    href={ch.href}
                    target={ch.href.startsWith('http') ? '_blank' : undefined}
                    rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      ...styles.channelAction,
                      color: ch.highlight ? 'var(--green-deep)' : 'var(--navy-700)',
                    }}
                  >
                    {ch.action}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section style={styles.sectionLight}>
        <div style={styles.containerNarrow}>
          <SectionTitle
            overline="Envie uma mensagem"
            title="Formulário de contato"
            subtitle="Preencha abaixo e nossa equipe retorna em até 24h úteis."
            center
          />

          {success ? (
            <div style={styles.successBox}>
              <CheckCircle size={32} style={{ color: 'var(--green-accent)' }} />
              <h3 style={styles.successTitle}>Mensagem enviada!</h3>
              <p style={styles.successText}>Recebemos sua mensagem e vamos retornar em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              {renderHoneypot()}

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Nome *</label>
                  <input name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome" style={styles.input} maxLength={80} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>WhatsApp / Telefone *</label>
                  <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" style={styles.input} maxLength={20} />
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>E-mail</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" style={styles.input} type="email" maxLength={80} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Assunto</label>
                  <select name="assunto" value={form.assunto} onChange={handleChange} style={styles.input}>
                    <option value="">Selecione</option>
                    <option value="peca">Dúvida sobre uma peça</option>
                    <option value="compra">Acompanhar compra</option>
                    <option value="garantia">Garantia / Devolução</option>
                    <option value="parceria">Parceria B2B</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Mensagem *</label>
                <textarea name="mensagem" value={form.mensagem} onChange={handleChange} placeholder="Escreva sua mensagem..." style={styles.textarea} rows={5} maxLength={1000} />
              </div>

              <ConsentCheckbox checked={consent} onChange={setConsent} purpose="contato" error={consentError} />
              {error && <p style={styles.error}>{error}</p>}

              <CTAButton variant="primary" size="lg" type="submit" icon={<Send size={18} />} disabled={isLoading} fullWidth>
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
              </CTAButton>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.section}>
        <div style={styles.containerNarrow}>
          <SectionTitle overline="Dúvidas" title="Perguntas sobre atendimento" center />
          <FAQAccordion items={CONTACT_FAQS} />
        </div>
      </section>
    </div>
  );
}

// --- Estilos ---
const styles = {
  hero: { backgroundColor: 'var(--navy-900)', padding: '4rem 1.5rem', textAlign: 'center' },
  heroInner: { maxWidth: 'var(--max-width-narrow)', margin: '0 auto' },
  overline: { display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--green-accent)', marginBottom: '1rem' },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem' },
  heroSubtitle: { fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' },

  section: { padding: '5rem 1.5rem' },
  sectionLight: { backgroundColor: 'var(--off-white)', padding: '5rem 1.5rem' },
  container: { maxWidth: 'var(--max-width)', margin: '0 auto' },
  containerNarrow: { maxWidth: '680px', margin: '0 auto' },

  channelsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' },
  channelCard: { padding: '2rem', borderRadius: 'var(--radius-lg)', border: '2px solid', textAlign: 'center', transition: 'box-shadow 0.3s ease' },
  channelIcon: { width: '52px', height: '52px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' },
  channelTitle: { fontWeight: 700, fontSize: '1.0625rem', color: 'var(--navy-900)', marginBottom: '0.375rem' },
  channelDesc: { fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--graphite-500)', marginBottom: '0.75rem' },
  channelAction: { fontSize: '0.875rem', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' },

  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  fieldRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  field: { flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.8125rem', fontWeight: 600, color: 'var(--graphite-700)' },
  input: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  textarea: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  error: { fontSize: '0.875rem', color: 'var(--red-alert)', fontWeight: 500 },

  successBox: { textAlign: 'center', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', backgroundColor: '#fff', border: '1px solid var(--graphite-100)' },
  successTitle: { fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy-900)', marginTop: '1rem', marginBottom: '0.5rem' },
  successText: { fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--graphite-500)' },
};
