/**
 * GRUPO NORTÃO — TermsPage
 * 
 * Termos de Uso do site.
 * Define condições de uso, regras de compra e limitações.
 */

import { useEffect } from 'react';
import { FileText } from 'lucide-react';

const LAST_UPDATED = '01 de janeiro de 2025';

const SECTIONS = [
  {
    title: '1. Aceitação dos Termos',
    content: `Ao acessar e utilizar o site do Grupo Nortão (www.gruponortao.com.br), você concorda com estes Termos de Uso. Se não concordar com qualquer disposição, recomendamos que não utilize nossos serviços. O uso continuado do site após alterações nos termos constitui aceitação das mudanças.`,
  },
  {
    title: '2. Descrição dos Serviços',
    content: `O Grupo Nortão opera uma plataforma digital de comercialização de peças seminovas originais para pickups. Através do site, oferecemos:

• Catálogo de peças com informações técnicas e fotos reais.
• Busca por nome, código ou modelo de veículo.
• Atendimento especializado via WhatsApp e formulários.
• Serviço de busca de peças não disponíveis no estoque.
• Programa de parceria B2B para oficinas e revendedores.`,
  },
  {
    title: '3. Condições de Compra',
    content: `As peças comercializadas são seminovas originais de fábrica, retiradas de veículos com procedência verificada. As condições de cada peça são descritas individualmente na página do produto. Fotos são reais e correspondem à peça que será enviada.

Ao solicitar uma compra, o cliente declara que:
• Leu e compreendeu a descrição, condição e compatibilidade da peça.
• Verificou ou solicitou confirmação de compatibilidade com seu veículo.
• Concorda com o preço, prazo de envio e política de garantia informados.

Os preços podem ser alterados sem aviso prévio. O preço vigente no momento da confirmação do pedido é o que será aplicado.`,
  },
  {
    title: '4. Compatibilidade',
    content: `O Grupo Nortão fornece informações de compatibilidade como referência. Recomendamos que o cliente sempre confirme a compatibilidade antes da compra, utilizando o serviço gratuito de conferência disponível via WhatsApp.

O Grupo Nortão não se responsabiliza por incompatibilidades quando o cliente não utilizou o serviço de conferência e a informação de aplicação estava corretamente descrita na página do produto.`,
  },
  {
    title: '5. Envio e Entrega',
    content: `Os envios são realizados para todo o território brasileiro através de transportadoras parceiras. Todas as remessas incluem embalagem reforçada e código de rastreamento.

Prazos de entrega são estimativas e podem variar conforme a região e condições logísticas. O Grupo Nortão não se responsabiliza por atrasos causados pelas transportadoras, mas se compromete a acompanhar e mediar qualquer situação.`,
  },
  {
    title: '6. Garantia e Devolução',
    content: `Todas as peças possuem garantia contra defeitos não aparentes. Os prazos e condições de garantia são informados individualmente na página de cada produto e detalhados na página de Garantia e Devolução do site.

O direito de arrependimento previsto no Art. 49 do Código de Defesa do Consumidor é garantido no prazo de 7 dias corridos a partir do recebimento, desde que a peça não tenha sido instalada e esteja nas mesmas condições em que foi recebida.`,
  },
  {
    title: '7. Propriedade Intelectual',
    content: `Todo o conteúdo do site — incluindo textos, imagens, logotipos, layout, código-fonte e design — é de propriedade do Grupo Nortão ou de seus licenciadores e está protegido pela legislação de propriedade intelectual.

É proibida a reprodução, distribuição ou uso comercial do conteúdo do site sem autorização prévia por escrito.`,
  },
  {
    title: '8. Limitações de Responsabilidade',
    content: `O Grupo Nortão se empenha para manter as informações do site atualizadas e precisas, mas não garante que o conteúdo esteja livre de erros ou interrupções.

Não nos responsabilizamos por:
• Danos decorrentes de uso indevido das peças.
• Instalação realizada por profissional não qualificado.
• Decisões tomadas com base em informações do site sem confirmação com nosso time.
• Indisponibilidade temporária do site por manutenção ou fatores externos.`,
  },
  {
    title: '9. Uso Aceitável',
    content: `Ao utilizar o site, você concorda em não:

• Utilizar o site para fins ilegais ou não autorizados.
• Tentar acessar áreas restritas ou sistemas internos.
• Enviar conteúdo malicioso, spam ou dados falsos nos formulários.
• Copiar, modificar ou distribuir conteúdo do site sem autorização.
• Utilizar ferramentas automatizadas para coleta de dados (scraping).`,
  },
  {
    title: '10. Legislação Aplicável',
    content: `Estes Termos de Uso são regidos pela legislação brasileira. Qualquer disputa será submetida ao foro da comarca da sede do Grupo Nortão, com renúncia a qualquer outro, por mais privilegiado que seja.`,
  },
  {
    title: '11. Alterações nos Termos',
    content: `O Grupo Nortão reserva-se o direito de alterar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas através do site. A versão atual foi atualizada em ${LAST_UPDATED}.`,
  },
  {
    title: '12. Contato',
    content: `Para dúvidas sobre estes Termos de Uso, entre em contato:

E-mail: contato@gruponortao.com.br
WhatsApp: disponível no site.`,
  },
];

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <FileText size={32} style={{ color: 'var(--green-accent)', marginBottom: '1rem' }} />
          <h1 style={styles.heroTitle}>Termos de Uso</h1>
          <p style={styles.heroSubtitle}>
            Condições de uso do site, regras de compra e responsabilidades.
          </p>
          <p style={styles.updated}>Última atualização: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Conteúdo */}
      <section style={styles.section}>
        <div style={styles.container}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={styles.block}>
              <h2 style={styles.blockTitle}>{s.title}</h2>
              {s.content.split('\n\n').map((p, j) => (
                <p key={j} style={styles.paragraph}>{p}</p>
              ))}
            </div>
          ))}
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
  heroSubtitle: { fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto' },
  updated: { fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', marginTop: '1rem' },

  section: { padding: '3rem 1.5rem' },
  container: { maxWidth: '820px', margin: '0 auto' },

  block: { marginBottom: '2.5rem' },
  blockTitle: { fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--navy-900)', marginBottom: '0.875rem', paddingTop: '0.75rem', borderTop: '1px solid var(--graphite-100)' },
  paragraph: { fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--graphite-700)', marginBottom: '0.75rem', whiteSpace: 'pre-line' },
};
