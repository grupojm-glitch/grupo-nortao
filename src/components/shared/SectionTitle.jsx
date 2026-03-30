/**
 * GRUPO NORTÃO — SectionTitle
 * 
 * Título de seção reutilizável em todo o site.
 * Padrão: overline (etiqueta) + título display + subtítulo.
 * 
 * Uso:
 * <SectionTitle
 *   overline="Especialidade"
 *   title="Pickup exige critério."
 *   subtitle="Nosso foco é exclusivo em pickups."
 *   center
 *   light
 * />
 */

export default function SectionTitle({
  overline = '',
  title = '',
  subtitle = '',
  center = false,
  light = false,
  tag: Tag = 'h2',
  maxWidth = 680,
}) {
  return (
    <div
      style={{
        textAlign: center ? 'center' : 'left',
        marginBottom: '2.5rem',
        maxWidth: center ? maxWidth : 'none',
        marginLeft: center ? 'auto' : undefined,
        marginRight: center ? 'auto' : undefined,
      }}
    >
      {/* Overline — etiqueta superior */}
      {overline && (
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: light ? 'var(--green-accent)' : 'var(--green-deep)',
            marginBottom: '0.75rem',
          }}
        >
          {overline}
        </span>
      )}

      {/* Título principal — fonte display */}
      <Tag
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: light ? '#fff' : 'var(--navy-900)',
          marginBottom: subtitle ? '1rem' : 0,
          textWrap: 'balance',
        }}
      >
        {title}
      </Tag>

      {/* Subtítulo — corpo */}
      {subtitle && (
        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            color: light ? 'rgba(255, 255, 255, 0.6)' : 'var(--graphite-500)',
            maxWidth: center ? 560 : 'none',
            marginLeft: center ? 'auto' : undefined,
            marginRight: center ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
