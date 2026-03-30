/**
 * GRUPO NORTÃO — CompatibilityBlock
 * 
 * Tabela/lista de veículos compatíveis com a peça.
 * Elemento crítico para autopeças: compatibilidade é a maior dúvida.
 * 
 * Funcionalidades:
 * - Lista de veículos com check verde
 * - Grid responsivo
 * - Nota de suporte para dúvidas
 * - CTA para confirmar compatibilidade
 * 
 * Percepção:
 * - "Consigo ver claramente se serve no meu."
 * - "Se tiver dúvida, eles confirmam pra mim."
 * 
 * Uso:
 * <CompatibilityBlock
 *   vehicles={['Hilux SRV 2016', 'Hilux SRX 2017']}
 *   code="81130-0K690"
 * />
 */

import { CheckCircle, HelpCircle, MessageCircle } from 'lucide-react';
import CTAButton from '../shared/CTAButton';

export default function CompatibilityBlock({
  vehicles = [],
  code = '',
  whatsappUrl = 'https://wa.me/5500000000000',
}) {
  const compatMessage = encodeURIComponent(
    `Olá, gostaria de confirmar se a peça ${code} é compatível com meu veículo:\n\n` +
    `Meu veículo: [informar modelo, ano e versão]`
  );

  return (
    <div style={styles.wrapper}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <h3 style={styles.title}>Veículos compatíveis</h3>
        <span style={styles.count}>{vehicles.length} aplicações</span>
      </div>

      {/* Lista de veículos */}
      {vehicles.length > 0 ? (
        <div style={styles.grid}>
          {vehicles.map((vehicle, i) => (
            <div key={i} style={styles.item}>
              <CheckCircle size={16} style={styles.checkIcon} />
              <span style={styles.vehicleName}>{vehicle}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <HelpCircle size={20} style={{ color: 'var(--graphite-300)' }} />
          <p>Compatibilidade disponível sob consulta. Fale com nosso time.</p>
        </div>
      )}

      {/* Nota + CTA */}
      <div style={styles.footer}>
        <div style={styles.footerNote}>
          <HelpCircle size={16} style={{ color: 'var(--blue-info)', flexShrink: 0 }} />
          <p style={styles.noteText}>
            Não tem certeza se a peça serve no seu veículo? 
            Nosso time confirma a compatibilidade gratuitamente antes da compra.
          </p>
        </div>
        <CTAButton
          variant="ghost"
          icon={<MessageCircle size={16} />}
          href={`${whatsappUrl}?text=${compatMessage}`}
          external
        >
          Confirmar Compatibilidade
        </CTAButton>
      </div>
    </div>
  );
}

// --- Estilos ---
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: '1.125rem',
    color: 'var(--navy-900)',
  },
  count: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--graphite-500)',
    padding: '0.25rem 0.75rem',
    backgroundColor: 'var(--graphite-100)',
    borderRadius: 'var(--radius-full)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '0.5rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--off-white)',
    transition: 'background-color 0.2s ease',
  },
  checkIcon: {
    color: 'var(--green-accent)',
    flexShrink: 0,
  },
  vehicleName: {
    fontSize: '0.9375rem',
    color: 'var(--graphite-700)',
    fontWeight: 500,
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1.5rem',
    backgroundColor: 'var(--off-white)',
    borderRadius: 'var(--radius-lg)',
    fontSize: '0.9375rem',
    color: 'var(--graphite-500)',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.25rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--graphite-100)',
    backgroundColor: '#fff',
  },
  footerNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.625rem',
  },
  noteText: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--graphite-500)',
  },
};
