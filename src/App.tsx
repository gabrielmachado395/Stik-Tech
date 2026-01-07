import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import {AnimatedSection} from './components/animations/AnimatedSections';
import InfiniteCarouselWithForm from './components/InfiniteCarouselWithForm';
import ProductCategories from './components/ProductCategories';
import Diferentials from './components/Diferentials';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './components/pages/CategoryPage';
import ScrollToTop from './components/animations/ScrollToTop';
import {products} from './components/Products';
import ProductDetailPage from './components/pages/ProductDetailPage';
import AboutUsPage from './components/pages/AboutUsPage';
import PrivacyPoliticPage from './components/pages/PrivacyPoliticPage';
import FAQ from './components/pages/FAQ';
import CreateArticlePage from './components/pages/CreateArticlePage';
import BlogPage from './components/pages/BlogPage';
import ArticlePage from './components/pages/ArticlePage';




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

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white-50">
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias/:categoria" element={<CategoryPage />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="/sobre-nos" element={<AboutUsPage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPoliticPage />} />
        <Route path="/perguntas-frequentes" element={<FAQ />} />
        <Route path="/criar-artigo" element={<CreateArticlePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        

      </Routes>
      <AnimatedSection>
        <InfiniteCarouselWithForm />
      </AnimatedSection>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
export default App;
