/**
 * GRUPO NORTÃO — ProductGallery
 * 
 * Galeria de fotos da página de produto.
 * Fundamental para autopeças: o cliente precisa ver a peça real.
 * 
 * Funcionalidades:
 * - Imagem principal grande
 * - Thumbnails clicáveis abaixo
 * - Indicador visual da foto ativa
 * - Badge de condição sobre a imagem
 * - Placeholder quando não há foto
 * 
 * Uso:
 * <ProductGallery
 *   images={['/img/foto1.jpg', '/img/foto2.jpg']}
 *   condition="Seminovo Original"
 *   alt="Farol Hilux 2020"
 * />
 */

import { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';

export default function ProductGallery({
  images = [],
  condition = 'Seminovo Original',
  alt = 'Foto da peça',
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div style={styles.wrapper}>
      {/* Imagem principal */}
      <div style={styles.mainImage}>
        {hasImages ? (
          <img
            src={images[activeIndex]}
            alt={`${alt} — foto ${activeIndex + 1}`}
            style={styles.img}
            loading="lazy"
          />
        ) : (
          <div style={styles.placeholder}>
            <Camera size={48} />
            <span style={styles.placeholderText}>Fotos reais disponíveis sob consulta</span>
          </div>
        )}

        {/* Badge de condição */}
        <span style={styles.conditionBadge}>{condition}</span>

        {/* Ícone de zoom */}
        {hasImages && (
          <span style={styles.zoomHint}>
            <ZoomIn size={16} />
          </span>
        )}

        {/* Contador */}
        {hasImages && images.length > 1 && (
          <span style={styles.counter}>
            {activeIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div style={styles.thumbs}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                ...styles.thumb,
                borderColor: i === activeIndex
                  ? 'var(--navy-600)'
                  : 'var(--graphite-100)',
                opacity: i === activeIndex ? 1 : 0.6,
              }}
              aria-label={`Ver foto ${i + 1}`}
            >
              <img
                src={src}
                alt={`${alt} — miniatura ${i + 1}`}
                style={styles.thumbImg}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Nota de fotos reais */}
      <p style={styles.note}>
        <Camera size={14} />
        Todas as fotos são reais e da peça que será enviada.
      </p>
    </div>
  );
}

// --- Estilos ---
const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  mainImage: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4 / 3',
    borderRadius: 'var(--radius-xl)',
    backgroundColor: 'var(--graphite-100)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    color: 'var(--graphite-300)',
  },
  placeholderText: {
    fontSize: '0.875rem',
    color: 'var(--graphite-500)',
  },
  conditionBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    padding: '0.375rem 0.875rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--green-soft)',
    color: 'var(--green-deep)',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  zoomHint: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  counter: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    padding: '0.25rem 0.75rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  thumbs: {
    display: 'flex',
    gap: '0.625rem',
  },
  thumb: {
    flex: 1,
    aspectRatio: '1 / 1',
    maxWidth: '80px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, opacity 0.2s ease',
    padding: 0,
    background: 'var(--graphite-100)',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  note: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.75rem',
    color: 'var(--graphite-500)',
    fontWeight: 500,
  },
};
