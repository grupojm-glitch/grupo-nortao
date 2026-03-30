/**
 * GRUPO NORTÃO — PrivacyPolicyPage
 * 
 * Política de Privacidade conforme LGPD (Lei 13.709/2018).
 * 
 * Estrutura:
 * 1. Hero
 * 2. Sumário de navegação
 * 3. Seções completas da política
 * 4. Tabela de retenção de dados
 * 5. Direitos do titular
 * 6. Contato do encarregado (DPO)
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { getAllRetentionRulesForDisplay } from '../compliance/dataRetention';
import CTAButton from '../components/shared/CTAButton';

const LAST_UPDATED = '01 de janeiro de 2025';

const SECTIONS = [
  {
    id: 'introducao',
    title: '1. Introdução',
    content: `O Grupo Nortão ("nós", "nosso" ou "Empresa") valoriza a privacidade dos seus usuários e está comprometido com a proteção dos dados pessoais coletados através do nosso site (www.gruponortao.com.br) e demais canais digitais. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).`,
  },
  {
    id: 'dados-coletados',
    title: '2. Dados que coletamos',
    content: `Coletamos dados pessoais que você nos fornece voluntariamente ao utilizar nossos serviços, incluindo:

• Dados de identificação: nome completo, CPF, CNPJ.
• Dados de contato: e-mail, telefone, WhatsApp, endereço.
• Dados do veículo: modelo, ano, versão (para busca de peças).
• Dados comerciais: tipo de negócio, razão social (para parceria B2B).
• Dados de navegação: cookies, endereço IP, páginas visitadas, tempo de permanência.
• Dados de comunicação: mensagens enviadas via formulários e WhatsApp.

Não coletamos dados sensíveis (origem racial, convicção religiosa, dados de saúde, etc.) em nenhuma circunstância.`,
  },
  {
    id: 'finalidade',
    title: '3. Para que usamos seus dados',
    content: `Utilizamos seus dados pessoais exclusivamente para as seguintes finalidades:

• Responder solicitações de contato e atendimento.
• Realizar busca de peças solicitadas.
• Processar e gerenciar pedidos de compra.
• Avaliar e gerenciar parcerias comerciais (B2B).
• Enviar comunicações sobre disponibilidade de peças.
• Melhorar a experiência de navegação no site.
• Analisar o desempenho do site e otimizar nossos serviços.
• Cumprir obrigações legais e regulatórias.

Não utilizamos seus dados para finalidades diferentes das informadas sem seu consentimento prévio.`,
  },
  {
    id: 'base-legal',
    title: '4. Base legal para o tratamento',
    content: `O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:

• Consentimento do titular (Art. 7º, I): para formulários de contato, busca de peças e comunicações.
• Execução de contrato (Art. 7º, V): para processamento de vendas e parcerias B2B.
• Legítimo interesse (Art. 7º, IX): para análise de navegação e melhoria dos serviços.
• Cumprimento de obrigação legal (Art. 7º, II): para registros fiscais e atendimento a solicitações de direitos do titular.`,
  },
  {
    id: 'compartilhamento',
    title: '5. Compartilhamento de dados',
    content: `Seus dados pessoais podem ser compartilhados com:

• Prestadores de serviços: empresas de logística (para envio de peças), processadores de pagamento, plataformas de e-mail e ferramentas de análise.
• Parceiros homologados: quando a busca de uma peça é encaminhada para a rede de parceiros, compartilhamos apenas os dados necessários para a localização da peça (modelo do veículo e descrição da peça).
• Autoridades públicas: quando exigido por lei ou decisão judicial.

Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins de marketing.`,
  },
  {
    id: 'cookies',
    title: '6. Cookies',
    content: `Utilizamos cookies para melhorar sua experiência no site. Os cookies são classificados em:

• Necessários: essenciais para o funcionamento do site. Não podem ser desativados.
• Analíticos: nos ajudam a entender como os visitantes usam o site.
• Marketing: utilizados para exibir conteúdo relevante.

Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de consentimento exibido no site.`,
  },
  {
    id: 'seguranca',
    title: '7. Segurança dos dados',
    content: `Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, alteração ou destruição, incluindo:

• Criptografia de dados em trânsito (HTTPS/SSL).
• Sanitização de todos os dados de entrada (prevenção contra XSS e injeção).
• Controle de acesso restrito a dados pessoais.
• Monitoramento e auditoria de acessos.
• Política de retenção com prazos definidos por finalidade.

Nenhum sistema é 100% seguro. Em caso de incidente de segurança que possa gerar risco relevante, comunicaremos os titulares afetados e a Autoridade Nacional de Proteção de Dados (ANPD) conforme previsto na LGPD.`,
  },
  {
    id: 'direitos',
    title: '8. Seus direitos como titular',
    content: `Conforme a LGPD, você tem os seguintes direitos sobre seus dados pessoais:

• Confirmação da existência de tratamento.
• Acesso aos dados pessoais tratados.
• Correção de dados incompletos, inexatos ou desatualizados.
• Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.
• Portabilidade dos dados a outro fornecedor de serviço.
• Eliminação dos dados tratados com base em consentimento.
• Informação sobre entidades com as quais seus dados foram compartilhados.
• Informação sobre a possibilidade de não fornecer consentimento e consequências.
• Revogação do consentimento a qualquer momento.

Para exercer qualquer um desses direitos, acesse nossa página de Solicitação de Direitos do Titular.`,
  },
  {
    id: 'contato-dpo',
    title: '9. Encarregado de Proteção de Dados (DPO)',
    content: `Para questões relacionadas à privacidade e proteção de dados, entre em contato com nosso Encarregado de Proteção de Dados:

E-mail: privacidade@gruponortao.com.br
Formulário: página "Meus Dados" no site.

Nos comprometemos a responder sua solicitação no prazo legal de 15 dias.`,
  },
  {
    id: 'alteracoes',
    title: '10. Alterações nesta política',
    content: `Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças nas nossas práticas ou na legislação aplicável. Quando realizarmos alterações significativas, notificaremos através do site e solicitaremos novo consentimento quando necessário.

A versão atual desta política foi atualizada em ${LAST_UPDATED}.`,
  },
];

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const retentionRules = getAllRetentionRulesForDisplay();

  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <Shield size={32} style={{ color: 'var(--green-accent)', marginBottom: '1rem' }} />
          <h1 style={styles.heroTitle}>Política de Privacidade</h1>
          <p style={styles.heroSubtitle}>
            Como o Grupo Nortão coleta, utiliza e protege seus dados pessoais, 
            em conformidade com a LGPD.
          </p>
          <p style={styles.updated}>Última atualização: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Sumário */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.summaryBox}>
            <h2 style={styles.summaryTitle}>Sumário</h2>
            <div style={styles.summaryList}>
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} style={styles.summaryLink}>{s.title}</a>
              ))}
              <a href="#retencao" style={styles.summaryLink}>Tabela de Retenção de Dados</a>
            </div>
          </div>
        </div>
      </section>

      {/* Seções */}
      <section style={styles.section}>
        <div style={styles.container}>
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} style={styles.policySection}>
              <h2 style={styles.sectionTitle}>{s.title}</h2>
              <div style={styles.sectionContent}>
                {s.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} style={styles.paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Tabela de Retenção */}
          <div id="retencao" style={styles.policySection}>
            <h2 style={styles.sectionTitle}>Tabela de Retenção de Dados</h2>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Finalidade</th>
                    <th style={styles.th}>Dados Coletados</th>
                    <th style={styles.th}>Prazo</th>
                    <th style={styles.th}>Base Legal</th>
                  </tr>
                </thead>
                <tbody>
                  {retentionRules.map((rule) => (
                    <tr key={rule.key}>
                      <td style={styles.td}>{rule.label}</td>
                      <td style={styles.td}>{rule.dataCollected.join(', ')}</td>
                      <td style={styles.td}>{rule.retention}</td>
                      <td style={styles.tdSmall}>{rule.legalBasis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaTitle}>Quer exercer seus direitos?</h2>
          <p style={styles.ctaSubtitle}>Acesse a página de solicitação de direitos do titular.</p>
          <Link to="/meus-dados">
            <CTAButton variant="primary" size="lg" icon={<Shield size={18} />}>
              Meus Dados (LGPD)
            </CTAButton>
          </Link>
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
  heroSubtitle: { fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto' },
  updated: { fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', marginTop: '1rem' },

  section: { padding: '3rem 1.5rem' },
  container: { maxWidth: '820px', margin: '0 auto' },

  summaryBox: { padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--off-white)', border: '1px solid var(--graphite-100)', marginBottom: '2rem' },
  summaryTitle: { fontWeight: 700, fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '1rem' },
  summaryList: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  summaryLink: { fontSize: '0.9375rem', color: 'var(--navy-600)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' },

  policySection: { marginBottom: '3rem' },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--navy-900)', marginBottom: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--graphite-100)' },
  sectionContent: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  paragraph: { fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--graphite-700)', whiteSpace: 'pre-line' },

  tableWrapper: { overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--graphite-100)' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: { textAlign: 'left', padding: '1rem', backgroundColor: 'var(--navy-900)', color: '#fff', fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap' },
  td: { padding: '0.875rem 1rem', borderBottom: '1px solid var(--graphite-100)', color: 'var(--graphite-700)', verticalAlign: 'top', lineHeight: 1.5 },
  tdSmall: { padding: '0.875rem 1rem', borderBottom: '1px solid var(--graphite-100)', color: 'var(--graphite-500)', fontSize: '0.8125rem', verticalAlign: 'top', lineHeight: 1.5 },

  ctaSection: { padding: '4rem 1.5rem', backgroundColor: 'var(--off-white)', textAlign: 'center' },
  ctaInner: { maxWidth: '500px', margin: '0 auto' },
  ctaTitle: { fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--navy-900)', marginBottom: '0.75rem' },
  ctaSubtitle: { color: 'var(--graphite-500)', marginBottom: '1.5rem', fontSize: '1rem' },
};
