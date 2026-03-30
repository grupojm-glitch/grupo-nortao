/**
 * GRUPO NORTÃO — B2BPartnerPage
 * 
 * Página do programa de parceria B2B.
 * Função: captar oficinas, lojas, mecânicas e revendedores.
 * 
 * Estrutura:
 * 1. Hero B2B
 * 2. Benefícios (6 cards)
 * 3. Quem pode participar
 * 4. Formulário de cadastro (com CNPJ)
 * 5. FAQ B2B
 * 6. CTA WhatsApp comercial
 */

import { useState, useEffect } from 'react';
import { DollarSign, Headphones, Zap, ShieldCheck, Truck, Users, CheckCircle, MessageCircle, Building } from 'lucide-react';
import SectionTitle from '../components/shared/SectionTitle';
import CTAButton from '../components/shared/CTAButton';
import FAQAccordion from '../components/shared/FAQAccordion';
import ConsentCheckbox, { validateConsent, createConsentRecord } from '../compliance/ConsentCheckbox';
import { useSecureSubmit } from '../hooks/useSecureSubmit';
import { validateRequired, validatePhone, validateEmail, validateCNPJ } from '../security/validate';

const BENEFITS = [
  { icon: DollarSign, title: 'Tabela Diferenciada', desc: 'Preços exclusivos para parceiros que compram com frequência.' },
  { icon: Headphones, title: 'Canal Direto', desc: 'Atendimento prioritário com time comercial dedicado.' },
  { icon: Zap, title: 'Acesso Antecipado', desc: 'Veja peças novas antes de entrarem no catálogo público.' },
  { icon: ShieldCheck, title: 'Garantia Estendida', desc: 'Condições de garantia ampliadas para parceiros ativos.' },
  { icon: Truck, title: 'Frete Especial', desc: 'Condições de frete diferenciadas para compras recorrentes.' },
  { icon: Users, title: 'Flexibilidade', desc: 'Condições ajustadas para diferentes volumes e perfis.' },
];

const ELIGIBLE = [
  'Oficinas mecânicas especializadas em pickups',
  'Lojas de autopeças que trabalham com seminovos',
  'Revendedores de peças automotivas',
  'Funilarias e centros de reparação automotiva',
  'Empresas de manutenção de frotas',
];

const B2B_FAQS = [
  { question: 'Preciso ter CNPJ para ser parceiro?', answer: 'Sim. O programa B2B é voltado para empresas com CNPJ ativo. Profissionais autônomos com MEI também podem participar.' },
  { question: 'Qual o volume mínimo de compra?', answer: 'Não exigimos volume mínimo para entrar no programa. A tabela diferenciada se aplica a partir do cadastro aprovado.' },
  { question: 'Como funciona a tabela diferenciada?', answer: 'Após aprovação do cadastro, você recebe acesso a preços exclusivos que não aparecem no site público. Os descontos variam por categoria e volume.' },
  { question: 'Quanto tempo leva para aprovar meu cadastro?', answer: 'A análise do cadastro leva até 2 dias úteis. Após aprovação, você já pode fazer pedidos com condições de parceiro.' },
  { question: 'Posso comprar para revenda?', answer: 'Sim. Muitos de nossos parceiros são revendedores. Oferecemos condições comerciais compatíveis com a operação de revenda.' },
];

const INITIAL_FORM = {
  nome_responsavel: '',
  empresa: '',
  cnpj: '',
  telefone: '',
  email: '',
  cidade_estado: '',
  tipo_negocio: '',
  observacoes: '',
  website: '', // honeypot
};

const WHATSAPP_B2B = 'https://wa.me/5500000000000?text=Olá,%20sou%20empresa%20e%20gostaria%20de%20saber%20sobre%20o%20programa%20de%20parceria%20B2B.';

export default function B2BPartnerPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { submit, isLoading, error, success, renderHoneypot } = useSecureSubmit({
    endpoint: '',
    validators: [
      () => validateRequired(form.nome_responsavel, 'Nome'),
      () => validateRequired(form.empresa, 'Empresa'),
      () => validateCNPJ(form.cnpj),
      () => validatePhone(form.telefone),
      () => validateEmail(form.email),
      () => validateRequired(form.tipo_negocio, 'Tipo de negócio'),
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
    await submit({ ...form, consent: createConsentRecord('b2b') });
  }

  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <span style={styles.overline}>Programa de Parceria</span>
          <h1 style={styles.heroTitle}>Condições especiais para quem vende e repara pickups</h1>
          <p style={styles.heroSubtitle}>Tabela diferenciada, atendimento prioritário e acesso antecipado a peças estratégicas para oficinas, lojas e revendedores.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <CTAButton variant="primary" size="lg" icon={<Building size={18} />} href="#cadastro">Quero Ser Parceiro</CTAButton>
            <CTAButton variant="outline" size="lg" icon={<MessageCircle size={18} />} href={WHATSAPP_B2B} external>Falar com Comercial</CTAButton>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section style={styles.section}>
        <div style={styles.container}>
          <SectionTitle overline="Benefícios" title="O que você ganha como parceiro" center />
          <div style={styles.benefitsGrid}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={styles.benefitCard}>
                <div style={styles.benefitIcon}><b.icon size={22} /></div>
                <h3 style={styles.benefitTitle}>{b.title}</h3>
                <p style={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quem pode participar */}
      <section style={styles.sectionLight}>
        <div style={styles.containerNarrow}>
          <SectionTitle overline="Elegibilidade" title="Quem pode participar" center />
          <div style={styles.eligibleList}>
            {ELIGIBLE.map((item, i) => (
              <div key={i} style={styles.eligibleItem}>
                <CheckCircle size={18} style={{ color: 'var(--green-accent)', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Cadastro */}
      <section style={styles.section} id="cadastro">
        <div style={styles.containerNarrow}>
          <SectionTitle overline="Cadastro" title="Solicitar parceria B2B" subtitle="Preencha seus dados comerciais. Analisamos em até 2 dias úteis." center />

          {success ? (
            <div style={styles.successBox}>
              <CheckCircle size={32} style={{ color: 'var(--green-accent)' }} />
              <h3 style={styles.successTitle}>Cadastro enviado!</h3>
              <p style={styles.successText}>Nossa equipe comercial vai analisar e entrar em contato em até 2 dias úteis.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              {renderHoneypot()}

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Nome do responsável *</label>
                  <input name="nome_responsavel" value={form.nome_responsavel} onChange={handleChange} placeholder="Seu nome completo" style={styles.input} maxLength={80} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Nome da empresa *</label>
                  <input name="empresa" value={form.empresa} onChange={handleChange} placeholder="Razão social ou nome fantasia" style={styles.input} maxLength={100} />
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>CNPJ *</label>
                  <input name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" style={styles.input} maxLength={20} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Tipo de negócio *</label>
                  <select name="tipo_negocio" value={form.tipo_negocio} onChange={handleChange} style={styles.input}>
                    <option value="">Selecione</option>
                    <option value="oficina">Oficina mecânica</option>
                    <option value="loja_pecas">Loja de autopeças</option>
                    <option value="revendedor">Revendedor</option>
                    <option value="funilaria">Funilaria</option>
                    <option value="frota">Manutenção de frotas</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>WhatsApp / Telefone *</label>
                  <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" style={styles.input} maxLength={20} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>E-mail *</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="comercial@empresa.com" style={styles.input} type="email" maxLength={80} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Cidade / Estado</label>
                  <input name="cidade_estado" value={form.cidade_estado} onChange={handleChange} placeholder="Ex: São Paulo — SP" style={styles.input} maxLength={60} />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Observações</label>
                <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Informações adicionais sobre sua operação..." style={styles.textarea} rows={3} maxLength={500} />
              </div>

              <ConsentCheckbox checked={consent} onChange={setConsent} purpose="b2b" error={consentError} />
              {error && <p style={styles.error}>{error}</p>}

              <CTAButton variant="primary" size="lg" type="submit" icon={<Building size={18} />} disabled={isLoading} fullWidth>
                {isLoading ? 'Enviando...' : 'Solicitar Parceria B2B'}
              </CTAButton>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.sectionLight}>
        <div style={styles.containerNarrow}>
          <SectionTitle overline="Dúvidas" title="Perguntas sobre o programa B2B" center />
          <FAQAccordion items={B2B_FAQS} />
        </div>
      </section>

      {/* CTA final */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaTitle}>Prefere falar direto com nosso comercial?</h2>
          <p style={styles.ctaSubtitle}>Tire suas dúvidas e conheça as condições pelo WhatsApp.</p>
          <CTAButton variant="whatsapp" size="lg" icon={<MessageCircle size={18} />} href={WHATSAPP_B2B} external>Falar com Comercial</CTAButton>
        </div>
      </section>
    </div>
  );
}

// --- Estilos ---
const styles = {
  hero: { backgroundColor: 'var(--navy-900)', padding: '5rem 1.5rem', textAlign: 'center' },
  heroInner: { maxWidth: 'var(--max-width-narrow)', margin: '0 auto' },
  overline: { display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--green-accent)', marginBottom: '1rem' },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem', textWrap: 'balance' },
  heroSubtitle: { fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '580px', margin: '0 auto' },

  section: { padding: '5rem 1.5rem' },
  sectionLight: { backgroundColor: 'var(--off-white)', padding: '5rem 1.5rem' },
  container: { maxWidth: 'var(--max-width)', margin: '0 auto' },
  containerNarrow: { maxWidth: '760px', margin: '0 auto' },

  benefitsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' },
  benefitCard: { padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--graphite-100)', backgroundColor: '#fff' },
  benefitIcon: { width: '44px', height: '44px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--green-soft)', color: 'var(--green-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' },
  benefitTitle: { fontWeight: 700, fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '0.375rem' },
  benefitDesc: { fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--graphite-500)' },

  eligibleList: { display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '500px', margin: '0 auto' },
  eligibleItem: { display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '1rem', color: 'var(--graphite-700)' },

  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  fieldRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  field: { flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label: { fontSize: '0.8125rem', fontWeight: 600, color: 'var(--graphite-700)' },
  input: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  textarea: { padding: '0.875rem 1rem', border: '2px solid var(--graphite-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', color: 'var(--graphite-900)', backgroundColor: '#fff' },
  error: { fontSize: '0.875rem', color: 'var(--red-alert)', fontWeight: 500 },

  successBox: { textAlign: 'center', padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--off-white)', border: '1px solid var(--graphite-100)' },
  successTitle: { fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy-900)', marginTop: '1rem', marginBottom: '0.5rem' },
  successText: { fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--graphite-500)' },

  ctaSection: { padding: '4rem 1.5rem', background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)', textAlign: 'center' },
  ctaInner: { maxWidth: '600px', margin: '0 auto' },
  ctaTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '1rem', lineHeight: 1.15 },
  ctaSubtitle: { color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '1.0625rem' },
};
