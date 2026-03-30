import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';

// Cart
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/cart/CartDrawer';

// Compliance
import CookieConsent from './compliance/CookieConsent';

// Pages — lazy load para performance
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WarrantyPage = lazy(() => import('./pages/WarrantyPage'));
const PartRequestPage = lazy(() => import('./pages/PartRequestPage'));
const B2BPartnerPage = lazy(() => import('./pages/B2BPartnerPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const DataRequestPage = lazy(() => import('./pages/DataRequestPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--graphite-500)',
      fontSize: '0.9375rem',
      fontFamily: 'var(--font-body)',
    }}>
      Carregando...
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 'var(--header-height)' }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Páginas principais */}
              <Route path="/" element={<HomePage />} />
              <Route path="/pecas" element={<SearchPage />} />
              <Route path="/pecas/:slug" element={<ProductPage />} />
              <Route path="/quem-somos" element={<AboutPage />} />
              <Route path="/garantia" element={<WarrantyPage />} />
              <Route path="/nao-achei-minha-peca" element={<PartRequestPage />} />
              <Route path="/seja-parceiro" element={<B2BPartnerPage />} />
              <Route path="/contato" element={<ContactPage />} />

              {/* Checkout */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* LGPD / Compliance */}
              <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
              <Route path="/termos-de-uso" element={<TermsPage />} />
              <Route path="/meus-dados" element={<DataRequestPage />} />

              {/* 404 — redireciona pra home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <WhatsAppFloat />
        <CartDrawer />
        <CookieConsent />
      </div>
    </CartProvider>
  );
}
