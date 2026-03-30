/**
 * GRUPO NORTÃO — ProductPage
 * 
 * Página de produto — uma das mais importantes do site.
 * 
 * Estrutura:
 * - Topo: Galeria (esq) + ProductInfo (dir)
 * - Meio: Tabs (Descrição / Compatibilidade / Dúvidas)
 * - Final: Peças relacionadas
 * 
 * Em produção: dados vêm da API via useParams().slug
 * Aqui usamos dados de exemplo.
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import CompatibilityBlock from '../components/product/CompatibilityBlock';
import RelatedParts from '../components/product/RelatedParts';
import FAQAccordion from '../components/shared/FAQAccordion';

// --- Dados de exemplo (em produção, vêm da API) ---
const EXAMPLE_PRODUCT = {
  name: 'Farol Dianteiro Direito — Toyota Hilux SRV 2016/2020',
  code: '81130-0K690',
  condition: 'Seminovo Original',
  price: 'R$ 890,00',
  warranty: '90 dias de garantia contra defeitos não aparentes',
  images: [],
  description: 'Peça original Toyota, retirada de veículo com procedência documentada. Em excelente estado de conservação, sem trincas, sem marcas de impacto. Funcionamento 100% testado. Leve desgaste natural de uso, compatível com a quilometragem do veículo de origem. Ideal para reposição direta, sem necessidade de adaptação.',
  observations: 'Conferir versão e ano do veículo antes da compra. Em caso de dúvida, nosso suporte técnico confirma a compatibilidade gratuitamente.',
  vehicles: [
    'Hilux SRV 2016', 'Hilux SRV 2017', 'Hilux SRV 2018',
    'Hilux SRX 2016', 'Hilux SRX 2017', 'Hilux SRX 2018',
    'Hilux SRX 2019', 'Hilux SRX 2020',
  ],
};

const EXAMPLE_RELATED = [
  { slug: 'farol-esquerdo-hilux-2016', name: 'Farol Dianteiro Esquerdo — Hilux 2016/2020', code: '81170-0K690', condition: 'Seminovo Original', price: 'R$ 890,00' },
  { slug: 'lanterna-hilux-2016', name: 'Lanterna Traseira Direita — Hilux 2016/2020', code: '81551-0K290', condition: 'Seminovo Original', price: 'R$ 480,00' },
  { slug: 'grade-hilux-srv-2016', name: 'Grade Frontal — Hilux SRV 2016/2018', code: '53114-0K110', condition: 'Seminovo Original', price: 'R$ 520,00' },
];

const PRODUCT_FAQS = [
  { question: 'A peça tem garantia?', answer: 'Sim. Esta peça possui 90 dias de garantia contra defeitos não aparentes. Caso identifique algum problema, entre em contato pelo WhatsApp que resolveremos.' },
  { question: 'A peça já foi reparada ou repintada?', answer: 'Não. Trabalhamos apenas com peças originais em estado de conservação. Não comercializamos peças recuperadas, repintadas ou recondicionadas.' },
  { question: 'Como é feito o envio?', answer: 'A peça é embalada com proteção reforçada e enviada por transportadora com rastreamento completo para todo o Brasil. O prazo depende da região.' },
  { question: 'Posso devolver se não servir?', answer: 'Sim, desde que a peça não tenha sido instalada e esteja nas mesmas condições em que foi recebida. Consulte nossa página de Garantia e Devolução para detalhes.' },
];

export default function ProductPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('descricao');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Em produção: buscar produto pela slug
  const product = EXAMPLE_PRODUCT;

  const tabs = [
    { key: 'descricao', label: 'Descrição' },
    { key: 'compatibilidade', label: 'Compatibilidade' },
    { key: 'duvidas', label: 'Dúvidas' },
  ];

  return (
    <div>
      {/* ========================
          Topo: Galeria + Info
          ======================== */}
      <section style={styles.topSection}>
        <div style={styles.topGrid}>
          <ProductGallery
            images={product.images}
            condition={product.condition}
            alt={product.name}
          />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* ========================
          Tabs: Descrição / Compatibilidade / FAQ
          ======================== */}
      <section style={styles.tabsSection}>
        <div style={styles.tabsContainer}>
          {/* Tab headers */}
          <div style={styles.tabHeaders}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  ...styles.tabBtn,
                  color: activeTab === tab.key ? 'var(--navy-900)' : 'var(--graphite-500)',
                  borderBottomColor: activeTab === tab.key ? 'var(--navy-700)' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={styles.tabContent}>
            {activeTab === 'descricao' && (
              <div style={styles.descriptionContent}>
                <p style={styles.descText}>{product.description}</p>
                {product.observations && (
                  <div style={styles.obsBlock}>
                    <h4 style={styles.obsTitle}>Observações importantes</h4>
                    <p style={styles.obsText}>{product.observations}</p>
                  </div>
                )}
                <div style={styles.detailsGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Condição</span>
                    <span style={styles.detailValue}>{product.condition}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Código Original</span>
                    <span style={styles.detailValue}>{product.code}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Garantia</span>
                    <span style={styles.detailValue}>{product.warranty}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Envio</span>
                    <span style={styles.detailValue}>Todo o Brasil</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compatibilidade' && (
              <CompatibilityBlock
                vehicles={product.vehicles}
                code={product.code}
              />
            )}

            {activeTab === 'duvidas' && (
              <FAQAccordion items={PRODUCT_FAQS} />
            )}
          </div>
        </div>
      </section>

      {/* ========================
          Peças Relacionadas
          ======================== */}
      <RelatedParts parts={EXAMPLE_RELATED} />
    </div>
  );
}

// --- Estilos ---
const styles = {
  topSection: {
    padding: '2.5rem 1.5rem',
  },
  topGrid: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '3rem',
    alignItems: 'start',
  },
  tabsSection: {
    padding: '0 1.5rem 4rem',
  },
  tabsContainer: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  tabHeaders: {
    display: 'flex',
    gap: 0,
    borderBottom: '2px solid var(--graphite-100)',
    marginBottom: '2rem',
  },
  tabBtn: {
    padding: '1rem 1.5rem',
    fontWeight: 600,
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-body)',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  },
  tabContent: {
    maxWidth: '780px',
  },

  // Descrição
  descriptionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  descText: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: 'var(--graphite-700)',
  },
  obsBlock: {
    padding: '1.25rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--off-white)',
    border: '1px solid var(--graphite-100)',
  },
  obsTitle: {
    fontWeight: 700,
    fontSize: '0.9375rem',
    color: 'var(--navy-900)',
    marginBottom: '0.5rem',
  },
  obsText: {
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    color: 'var(--graphite-500)',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--off-white)',
  },
  detailLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--graphite-500)',
  },
  detailValue: {
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: 'var(--navy-900)',
  },
};
