import { container, item } from './animations/StaggeredEffect';
import { motion } from 'framer-motion';
import { useGoTo } from './utils/navigation';
import ProductCard from './ProductCard';
import ProductImageGroupCard from './ProductImageGroupCard';
import {
  getBestSellersInFashion,
  getBestSellersInHome,
  getBestPricesInStationery,
  getTopRatedInBeauty,
  getTrendingInElectronics,
  getPopularInToys,
  getEssentialsInKitchen,
  getFavoritesInBooks,
  getDealsInAutomotive,
  getHighlightsInSports,
} from './Products';
import { CATEGORIES, getCategoryHrefByName } from './utils/categories';
import type { Product } from './Products';


const CATEGORY_IMAGES_BY_NAME: Record<string, string> = {
  'Automotivo': '/img/Categorias/Automotivo/automotivo.jpg',
  'Bebês': '/img/Categorias/Bebês/bebes.webp',
  'Beleza e Cuidados Pessoais': '/img/Categorias/Beleza e Cuidados Pessoais/batom.jpg',
  'Bolsas, Malas e Mochilas': '/img/Categorias/Bolsas, Malas e Mochilas/mala.webp',
  'Brinquedos e Jogos': '/img/Categorias/Brinquedos e Jogos/brinquedos.jpg',
  'Casa, Jardim e Limpeza': '/img/Categorias/Casa, Jardim, e Limpeza/ventilador.jpg',
  'Celulares e Comunicação': '/img/Categorias/Celulares e Comunicação/celular.jpg',
  'Computadores e Informática': '/img/Categorias/Computadores e Informática/computador.jpg',
  'Cozinha': '/img/Categorias/Cozinha/cozinha.jpg',
  'Eletrônicos, TV e Áudio': '/img/Categorias/Eletrônicos, TV, Áudio/eletrodomesticos.jpg',
  'Esportes, Aventura e Lazer': '/img/Categorias/Esportes, Aventura e Lazer/Esportes.jpg',
  'Ferramentas e Construção': '/img/Categorias/Ferramentas e Construção/ferramentas.jpg',
  'Filmes, Séries e Música': '/img/Categorias/Filmes, Séries e Música/filmes.jpg',
  'Games e Consoles': '/img/Categorias/Games e Consoles/games.jpg',
  'Livros': '/img/Categorias/Livros/livros.jpg',
  'Papelaria e Escritório': '/img/Categorias/Papelaria e Escritório/papel.webp',
  'Pet Shop': '/img/Categorias/Pet Shop/pet.webp',
  'Roupas, Calçados e Acessórios': '/img/Categorias/Roupas, Calçados e Acessórios/moda.jpg',
};

const highlights: Array<{ title: string; categoryName: string; products: Product[] }> = [
  { title: 'Mais Vendidos em Moda', categoryName: 'Roupas, Calçados e Acessórios', products: getBestSellersInFashion()  },
  { title: 'Mais Vendidos em Casa', categoryName: 'Casa, Jardim e Limpeza', products: getBestSellersInHome() },
  { title: 'Melhores Preços em Papelaria', categoryName: 'Papelaria e Escritório', products: getBestPricesInStationery() },
  { title: 'Mais Bem Avaliados em Beleza', categoryName: 'Beleza e Cuidados Pessoais', products: getTopRatedInBeauty() },
  { title: 'Tendências em Eletrônicos', categoryName: 'Eletrônicos, TV e Áudio', products: getTrendingInElectronics() },
  { title: 'Populares em Brinquedos', categoryName: 'Brinquedos e Jogos', products: getPopularInToys() },
  { title: 'Essenciais para Cozinha', categoryName: 'Cozinha', products: getEssentialsInKitchen() },
  { title: 'Favoritos em Livros', categoryName: 'Livros', products: getFavoritesInBooks() },
  { title: 'Promoções em Automotivo', categoryName: 'Automotivo', products: getDealsInAutomotive() },
  { title: 'Destaques em Esportes', categoryName: 'Esportes, Aventura e Lazer', products: getHighlightsInSports() },
];

function ProductHighlightCarousel({
  title,
  categoryName,
  products,
}: {
  title: string;
  categoryName: string;
  products: Product[];
}) {
  const goTo = useGoTo();
  const href = getCategoryHrefByName(categoryName);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
              <img
                src={CATEGORY_IMAGES_BY_NAME[categoryName] ?? '/img/categoria-banner.webp'}
                alt={categoryName}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <h2 className="text-2xl md:text-2xl font-bold text-gray-800 tracking-wide">{title}</h2>
          </div>

          <button
            type="button"
            onClick={() => goTo(href)}
            className="text-[#5483B3] font-semibold hover:underline"
          >
            Ver mais
          </button>
        </div>

        <div className="flex flex-nowrap overflow-x-auto justify-start gap-x-6 md:gap-8 scrollbar-thin scrollbar-thumb-gray-300 pb-2">
          {products.map((product) => (
            <div key={product.id} className="min-w-[220px] max-w-[220px]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CategorySection() {
  const goTo = useGoTo();

  return (
    <section className="bg-white">
      <div className="py-10 md:py-16 mx-auto max-w-7xl">
        <h2 className="text-2xl md:text-2xl font-bold mb-8 text-gray-800 tracking-wide">Mais Amados por Categorias</h2>

        <motion.div
          className="flex flex-nowrap overflow-x-auto justify-start gap-x-6 md:gap-12 px-4 md:px-0 scrollbar-thin scrollbar-thumb-gray-300 pb-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.slug} className="flex flex-col items-center mx-2 w-24 md:w-32" variants={item}>
              <div
                onClick={() => goTo(`/categorias/${cat.slug}`)}
                className="w-24 h-24 hover:shadow-xl transition-shadow md:w-40 md:h-40 overflow-hidden shadow-md border-2 border-gray-200 mb-2 bg-gray-100 flex items-center justify-center"
              >
                <img
                  src={CATEGORY_IMAGES_BY_NAME[cat.name] ?? '/img/categoria-banner.webp'}
                  alt={cat.name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <span className="text-ms md:text-2xl font-semibold text-gray-800 text-center mt-1">{cat.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Destaques (alternando cards e carrosséis) */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-2xl font-bold mb-6 text-gray-800 tracking-wide">Destaques</h2>
        </div>

        {/* 4 cards lado a lado */}
        <section className="pb-10 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.slice(0, 4).map((h) => (
                <ProductImageGroupCard
                  key={h.title}
                  title={h.title}
                  products={h.products}
                  link={getCategoryHrefByName(h.categoryName)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Carrossel */}
        <ProductHighlightCarousel {...highlights[4]} />

        {/* 4 cards lado a lado */}
        <section className="pb-10 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.slice(5, 9).map((h) => (
                <ProductImageGroupCard
                  key={h.title}
                  title={h.title}
                  products={h.products}
                  link={getCategoryHrefByName(h.categoryName)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Carrossel */}
        <ProductHighlightCarousel {...highlights[9]} />
      </div>
    </section>
  );
}
