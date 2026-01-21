import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';
import {AnimatedSection} from './components/animations/AnimatedSections';
import CategorySection from './components/CategorySection';
import { Routes, Route, useLocation } from 'react-router-dom';
import CategoryPage from './components/pages/Products/CategoryPage';
import ScrollToTop from './components/animations/ScrollToTop';
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
import PaymentPage from './components/pages/Checkout/PaymentPage';
import FavoriteProductsPage from './components/pages/Products/FavoriteProductsPage';
import SellWithUsPage from './components/pages/Seller/SellWithUsPage';
import LoginSellWithUs from './components/pages/Seller/LoginSellWithUs';
import AddNewProduct from './components/pages/Seller/AddNewProduct';
import SellerDashboardPage from './components/pages/Seller/SellerDashboardPage';

function HomePage() {
  // Conteúdo da home
  return (
    <>
      <HeroBanner />

      <AnimatedSection>
        <CategorySection />
      </AnimatedSection>
    </>
  );
}

// Conteúdo das outras páginas de forma padronizada
function App() {
  const location = useLocation();

  // Função para verificar a página atual
  const isCheckoutPage = location.pathname === "/checkout";
  const isLoginPage = location.pathname === "/login";
  const isLoginConfirmationPage = location.pathname === "/register/confirmation";
  const isPaymentPage = location.pathname === "/checkout/payment";
  const isSellWithUsPage = location.pathname.startsWith("/venda-com-a-gente");
  const isLoginSellWithUsPage = location.pathname.startsWith("/venda-com-a-gente/login");
  const isAddNewProductPage = location.pathname.startsWith("/venda-com-a-gente/adicionar-produto");
  const isSellerDashboardPage = location.pathname.startsWith("/venda-com-a-gente/dashboard");

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col bg-white-50">
      <ScrollToTop/>
      { !isLoginPage && !isLoginConfirmationPage && !isPaymentPage && !isSellWithUsPage && !isLoginSellWithUsPage && (<Header />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias/:categoria" element={<CategoryPage />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="/sobre-nos" element={<AboutUsPage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPoliticPage />} />
        <Route path="/perguntas-frequentes" element={<FAQ />} />
        <Route path="/criar-artigo" element={
          // <ProtectedRoute>
            <CreateArticlePage />
          // </ProtectedRoute>
        } />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        <Route path="/meus-pacotes" element={<MyPackages />} />
        <Route path="/checkout" element={
          // <ProtectedRoute>
            <CheckoutPage />
          // </ProtectedRoute>
        } 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/confirmation" element={<LoginConfirmationEmail />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route path="/venda-com-a-gente" element={<SellWithUsPage />} />
        <Route path="/favoritos" element={
          // <ProtectedRoute>
          <FavoriteProductsPage />} 
          // </ProtectedRoute>
          />
        <Route path="/venda-com-a-gente/login" element={<LoginSellWithUs />} />
        <Route path="/venda-com-a-gente/adicionar-produto" element={
          // <ProtectedRoute>
          <AddNewProduct />
          // </ProtectedRoute>
          } />
        <Route path="/venda-com-a-gente/adicionar-produto/:id" element={
          // <ProtectedRoute>
          <AddNewProduct />
          // </ProtectedRoute>
          } />
        <Route path="/venda-com-a-gente/dashboard" element={<SellerDashboardPage />} />
      </Routes>
      {!isCheckoutPage && !isLoginPage && !isLoginConfirmationPage && !isPaymentPage && !isSellWithUsPage && !isLoginSellWithUsPage && !isAddNewProductPage && !isSellerDashboardPage && (<Footer />)}
    </div>
    </AuthProvider>
  );
}
export default App;
