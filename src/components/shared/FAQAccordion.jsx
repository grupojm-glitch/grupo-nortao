/**
 * GRUPO NORTÃO — FAQAccordion
 * 
 * Componente de perguntas frequentes reutilizável.
 * Usado na Home, Página de Produto, Garantia e outras.
 * 
 * Características:
 * - Apenas um item aberto por vez
 * - Animação suave de abertura
 * - Acessível (aria-expanded, aria-controls)
 * - Aceita qualquer array de perguntas
 * 
 * Uso:
 * <FAQAccordion
 *   items={[
 *     { question: 'As peças são originais?', answer: 'Sim...' },
 *   ]}
 * />
 */

import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * @param {Object} props
 * @param {Array<{question: string, answer: string}>} props.items — perguntas e respostas
 * @param {boolean} props.light — variante para fundo escuro
 * @param {number} props.defaultOpen — índice do item aberto por padrão (-1 = todos fechados)
 */
export default function FAQAccordion({
  items = [],
  light = false,
  defaultOpen = -1,
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  function toggle(index) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  if (items.length === 0) return null;

  return (
    <div style={styles.wrapper}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const questionId = `${baseId}-q-${i}`;
        const answerId = `${baseId}-a-${i}`;

        return (
          <div
            key={i}
            style={{
              ...styles.item,
              backgroundColor: isOpen
                ? light ? 'rgba(255,255,255,0.05)' : 'var(--off-white)'
                : light ? 'transparent' : '#fff',
              borderColor: light
                ? 'rgba(255,255,255,0.08)'
                : 'var(--graphite-100)',
            }}
          >
            {/* Pergunta */}
            <button
              id={questionId}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              style={{
                ...styles.question,
                color: light ? '#fff' : 'var(--navy-900)',
              }}
            >
              <span style={styles.questionText}>{item.question}</span>
              <span
                style={{
                  ...styles.chevron,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: light ? 'rgba(255,255,255,0.4)' : 'var(--graphite-500)',
                }}
              >
                <ChevronDown size={18} />
              </span>
            </button>

            {/* Resposta */}
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              style={{
                ...styles.answerWrapper,
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
                paddingBottom: isOpen ? '1.25rem' : '0',
              }}
            >
              <p
                style={{
                  ...styles.answerText,
                  color: light ? 'rgba(255,255,255,0.55)' : 'var(--graphite-500)',
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Estilos ---
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  item: {
    border: '1px solid',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    transition: 'background-color 0.2s ease',
  },
  question: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    textAlign: 'left',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    gap: '1rem',
  },
  questionText: {
    flex: 1,
    lineHeight: 1.4,
  },
  chevron: {
    flexShrink: 0,
    display: 'inline-flex',
    transition: 'transform 0.3s ease',
  },
  answerWrapper: {
    overflow: 'hidden',
    transition: 'max-height 0.35s ease, opacity 0.25s ease, padding-bottom 0.35s ease',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  answerText: {
    fontSize: '0.9375rem',
    lineHeight: 1.7,
  },
};
