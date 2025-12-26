import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const newReleases = [
  { id: 1, name: 'Conjunto Sutiã e Calcinha Renda Delicada', price: 89.90, originalPrice: 129.90, image: 'Produto', isNew: true, discount: 31 },
  { id: 2, name: 'Sutiã Com Bojo Microfibra Conforto', price: 54.90, originalPrice: 79.90, image: 'Produto', isNew: true, discount: 31 },
  { id: 3, name: 'Calcinha Fio Dental Renda Francesa', price: 29.90, image: 'Produto', isNew: true },
  { id: 4, name: 'Conjunto Top e Calcinha Cotton Soft', price: 69.90, originalPrice: 99.90, image: 'Produto', isNew: true, discount: 30 },
  { id: 5, name: 'Sutiã Amamentação Sem Costura', price: 79.90, image: 'Produto', isNew: true },
  { id: 6, name: 'Calcinha Caleçon Alta Modeladora', price: 39.90, image: 'Produto', isNew: true },
  { id: 7, name: 'Conjunto Strappy Sensual Renda', price: 119.90, originalPrice: 159.90, image: 'Produto', isNew: true, discount: 25 },
  { id: 8, name: 'Sutiã Plus Size Reforçado', price: 89.90, image: 'Produto', isNew: true },
];

const bestSellers = [
  { id: 9, name: 'Conjunto Sutiã e Calcinha Clássico', price: 79.90, originalPrice: 109.90, image: 'Produto', discount: 27 },
  { id: 10, name: 'Sutiã Push Up Efeito Natural', price: 64.90, image: 'Produto' },
  { id: 11, name: 'Calcinha Alta Cintura Modeladora', price: 44.90, originalPrice: 59.90, image: 'Produto', discount: 25 },
  { id: 12, name: 'Conjunto Renda Floral Romântico', price: 94.90, image: 'Produto' },
  { id: 13, name: 'Sutiã Bralette Sem Bojo Conforto', price: 49.90, image: 'Produto' },
  { id: 14, name: 'Calcinha Tanga Microfibra Lisa', price: 24.90, image: 'Produto' },
  { id: 15, name: 'Conjunto Luxo Renda Premium', price: 149.90, originalPrice: 199.90, image: 'Produto', discount: 25 },
  { id: 16, name: 'Sutiã Triângulo Ajustável', price: 59.90, image: 'Produto' },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />

      <ProductSection title="Lançamentos" products={newReleases} />

      <div className="bg-[#6a00b0] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Encontre seu Tamanho Ideal</h2>
          <p className="text-lg mb-6">Use nosso guia de medidas para garantir o ajuste perfeito</p>
          <button className="bg-white text-[#6a00b0] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Ver Guia de Medidas
          </button>
        </div>
      </div>

      <ProductSection title="Mais Vendidos" products={bestSellers} />

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Por Que Escolher Nayane?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6a00b0] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Qualidade Premium</h3>
              <p className="text-gray-600 text-sm">Tecidos nobres e acabamento impecável</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6a00b0] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">★</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Conforto Garantido</h3>
              <p className="text-gray-600 text-sm">Design pensado para seu bem-estar</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6a00b0] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">♥</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Estilo Único</h3>
              <p className="text-gray-600 text-sm">Peças exclusivas que valorizam sua beleza</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
