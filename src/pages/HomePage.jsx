/**
 * GRUPO NORTÃO — HomePage
 * 
 * Página inicial do site.
 * Monta todas as seções da home na ordem estratégica:
 * 
 * 1. Hero → impacto + CTAs
 * 2. SearchBlock → busca rápida
 * 3. PickupSpecialty → credibilidade técnica
 * 4. Differentials → por que nós?
 * 5. CategoryGrid → navegação por tipo
 * 6. PartNotFound → captação de demanda
 * 7. B2BTeaser → segmentação B2B
 * 8. TrustProof → prova social
 * 9. InstitutionalSnap → posicionamento
 * 10. HomeFAQ → objeções
 * 11. FinalCTA → fechamento
 * 
 * Cada seção tem papel claro na jornada:
 * branding → confiança → triagem → ativação comercial
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Search } from 'lucide-react';
import CTAButton from '../components/shared/CTAButton';

// Seções da Home
import Hero from '../components/home/Hero';
import SearchBlock from '../components/home/SearchBlock';
import PickupSpecialty from '../components/home/PickupSpecialty';
import Differentials from '../components/home/Differentials';
import CategoryGrid from '../components/home/CategoryGrid';
import PartNotFound from '../components/home/PartNotFound';
import B2BTeaser from '../components/home/B2BTeaser';
import TrustProof from '../components/home/TrustProof';
import InstitutionalSnap from '../components/home/InstitutionalSnap';
import HomeFAQ from '../components/home/HomeFAQ';

const WHATSAPP_URL = 'https://wa.me/5500000000000?text=Olá,%20vim%20pelo%20site%20e%20preciso%20de%20uma%20peça%20para%20minha%20pickup.';

export default function HomePage() {
  const navigate = useNavigate();

  // Scroll to top ao montar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <SearchBlock />
      <PickupSpecialty />
      <Differentials />
      <CategoryGrid />
      <PartNotFound />
      <B2BTeaser />
      <TrustProof />
      <InstitutionalSnap />
      <HomeFAQ />

      {/* ========================
          CTA Final de Fechamento
          ======================== */}
      <section style={styles.finalCta}>
        <div style={styles.finalCtaInner}>
          <h2 style={styles.finalTitle}>
            Precisa de uma peça para sua pickup?
          </h2>
          <p style={styles.finalSubtitle}>
            Fale com nosso time agora. Atendimento humano, sem robôs.
          </p>
          <div style={styles.finalButtons}>
            <CTAButton
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
              href={WHATSAPP_URL}
              external
            >
              Chamar no WhatsApp
            </CTAButton>
            <CTAButton
              variant="outline"
              size="lg"
              icon={<Search size={18} />}
              onClick={() => navigate('/pecas')}
            >
              Buscar no Catálogo
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

// --- Estilos do CTA Final ---
const styles = {
  finalCta: {
    padding: '4rem 1.5rem',
    background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
    textAlign: 'center',
  },
  finalCtaInner: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  finalTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    color: '#fff',
    marginBottom: '1rem',
    lineHeight: 1.15,
    textWrap: 'balance',
  },
  finalSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '2rem',
    fontSize: '1.0625rem',
    lineHeight: 1.6,
  },
  finalButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};
