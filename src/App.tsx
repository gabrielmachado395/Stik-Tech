import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import {AnimatedSection} from './components/animations/AnimatedSections';
import InfiniteCarouselWithForm from './components/InfiniteCarouselWithForm';
import ProductCategories from './components/ProductCategories';
import Diferentials from './components/Diferentials';
import { Routes, Route, useLocation } from 'react-router-dom';
import CategoryPage from './components/pages/Products/CategoryPage';
import ScrollToTop from './components/animations/ScrollToTop';
import {products} from './components/Products';
import ProductDetailPage from './components/pages/Products/ProductDetailPage';
import AboutUsPage from './components/pages/Footer/AboutUsPage';
import PrivacyPoliticPage from './components/pages/Footer/PrivacyPoliticPage';
import FAQ from './components/pages/Footer/FAQ';
import CreateArticlePage from './components/pages/Blog/CreateArticlePage';
import BlogPage from './components/pages/Blog/BlogPage';
import ArticlePage from './components/pages/Blog/ArticlePage';
import MyPackages from './components/pages/Footer/MyPackages';
import CheckoutPage from './components/pages/Checkout/CheckoutPage';
import "react-quill/dist/quill.snow.css";
import LoginPage from './components/pages/Login/LoginPage';
import LoginConfirmationEmail from './components/pages/Login/LoginConfirmationEmail';
import { AuthProvider } from './components/utils/AuthContext';
import { ProtectedRoute } from './components/utils/ProtectedRoute';
import PaymentPage from './components/pages/Checkout/PaymentPage';




const newReleases = products.slice(0,8)


const bestSellers = products.filter(p => p.categoria === "Premium").slice(0,8);

function HomePage() {
  // Conteúdo da home
  return (
    <>
      <HeroBanner />
      <AnimatedSection>
        <ProductCategories />
      </AnimatedSection>
      <AnimatedSection>
        <ProductSection title="Lançamentos" products={newReleases} />
      </AnimatedSection>
      <AnimatedSection>
        <Diferentials />
      </AnimatedSection>
      <AnimatedSection>
        <ProductSection title="Mais Vendidos" products={bestSellers} />
      </AnimatedSection>
    </>
  );
}

// Conteúdo das outras páginas de forma padronizada
function App() {
  const location = useLocation();

  // Função para verificar se está na página de checkout
  const isCheckoutPage = location.pathname === "/checkout";
  const isLoginPage = location.pathname === "/login";
  const isLoginConfirmationPage = location.pathname === "/register/confirmation";
  const isPaymentPage = location.pathname === "/checkout/payment";

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col bg-white-50">
      <ScrollToTop/>
      { !isLoginPage && !isLoginConfirmationPage && !isPaymentPage && (<Header />)}
      {!isCheckoutPage && !isLoginPage && !isLoginConfirmationPage && !isPaymentPage && (<WhatsAppButton />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias/:categoria" element={<CategoryPage />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="/sobre-nos" element={<AboutUsPage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPoliticPage />} />
        <Route path="/perguntas-frequentes" element={<FAQ />} />
        <Route path="/criar-artigo" element={
          <ProtectedRoute>
            <CreateArticlePage />
          </ProtectedRoute>
        } />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        <Route path="/meus-pacotes" element={<MyPackages />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/confirmation" element={<LoginConfirmationEmail />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
      </Routes>
      {/* Só mostra o carrosel se não for na página de checkout */}
      {!isCheckoutPage && !isLoginPage && !isLoginConfirmationPage && !isPaymentPage && (
        <AnimatedSection>
          <InfiniteCarouselWithForm />
        </AnimatedSection>
      )}
      {!isCheckoutPage && !isLoginPage && !isLoginConfirmationPage && !isPaymentPage && (<Footer />)}
    </div>
    </AuthProvider>
  );
}
export default App;
