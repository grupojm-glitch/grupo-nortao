/**
 * GRUPO NORTÃO — HomeFAQ (Home)
 * 
 * FAQ resumido na Home.
 * Responde as dúvidas mais comuns que impedem a conversão.
 * 
 * Estratégia: cada pergunta ataca uma objeção real.
 * 1. Originalidade → "É original mesmo?"
 * 2. Compatibilidade → "Como sei se serve?"
 * 3. Envio → "Chegam no meu estado?"
 * 4. Garantia → "E se der problema?"
 * 5. B2B → "Sou oficina, tem desconto?"
 * 6. Não encontrou → "E se não tiver a peça?"
 * 
 * Usa o FAQAccordion compartilhado.
 */

import SectionTitle from '../shared/SectionTitle';
import FAQAccordion from '../shared/FAQAccordion';

const HOME_FAQS = [
  {
    question: 'As peças são realmente originais?',
    answer: 'Sim. Trabalhamos exclusivamente com peças originais de fábrica, retiradas de veículos com procedência verificada. Não comercializamos réplicas, peças paralelas ou recondicionadas. Cada peça passa por triagem técnica antes de entrar no estoque.',
  },
  {
    question: 'Como sei se a peça é compatível com meu veículo?',
    answer: 'Cada peça tem informações de aplicação e compatibilidade na página do produto. Em caso de dúvida, nosso time de suporte técnico confirma a compatibilidade antes da compra, sem custo e sem compromisso. Basta clicar em "Confirmar Compatibilidade" ou chamar no WhatsApp.',
  },
  {
    question: 'Vocês enviam para todo o Brasil?',
    answer: 'Sim. Temos logística profissional com envio para todos os 27 estados brasileiros. As peças são embaladas com proteção reforçada e todas as remessas possuem rastreamento completo.',
  },
  {
    question: 'Qual a garantia das peças?',
    answer: 'Todas as peças possuem garantia documentada. Os prazos variam conforme o tipo e categoria da peça, e são informados de forma clara na página de cada produto. Em caso de problema, temos processo estruturado de troca ou devolução.',
  },
  {
    question: 'Sou oficina ou loja. Posso ter condição especial?',
    answer: 'Sim! Temos um programa de parceria B2B com tabela diferenciada, prioridade de atendimento e acesso antecipado a peças estratégicas. Acesse a página "Seja Parceiro" ou fale com nosso time comercial pelo WhatsApp.',
  },
  {
    question: 'E se a peça que eu preciso não estiver no catálogo?',
    answer: 'Sem problema. Temos um formulário de busca onde você descreve a peça e o veículo. Nossa equipe consulta o estoque interno e a rede de parceiros homologados, e retorna com disponibilidade, condição e valor em até 24h úteis.',
  },
];

export default function HomeFAQ() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <SectionTitle
          overline="Dúvidas frequentes"
          title="Perguntas que nossos clientes fazem"
          subtitle="Se a sua dúvida não estiver aqui, fale com nosso time pelo WhatsApp."
          center
        />

        <FAQAccordion items={HOME_FAQS} />
      </div>
    </section>
  );
}

// --- Estilos ---
const styles = {
  section: {
    padding: '5rem 1.5rem',
  },
  container: {
    maxWidth: '720px',
    margin: '0 auto',
  },
};
