import { useParams } from "react-router-dom"; // ou use sua solução de rotas
import { products } from "../Products";
import { Link } from "react-router-dom";
import { AnimatedSection } from "../animations/AnimatedSections";
import { CollapsibleMenu } from "../utils/CollapsibleMenu";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../utils/CartContext";
import { useState } from "react";



const CATEGORIES = [
  { name: "Elásticos Crus", slug: "elasticos-crus"},
  { name: "Modeladores", slug: "modeladores"},
  { name: "Alças", slug: "alcas"},
  { name: "Bases", slug: "bases"},
  { name: "Viés", slug: "vies"},
  { name: "Premium", slug: "premium"},
  { name: "Rendas", slug: "rendas"},
  { name: "Personalizados", slug: "personalizados"}
];



export default function CategoryPage() {
  // Exemplo: useParams retorna { categoria: "Personalizados" }
  const { categoria } = useParams<{ categoria: string }>();
  const categoriaObj = CATEGORIES.find(cat => cat.slug === categoria);
  const categoriaAtual = categoriaObj ? categoriaObj.name : CATEGORIES[0].name;
  
  // Filtra produtos pela categoria
  const produtosFiltrados = products.filter(
    (p) => p.categoria === categoriaAtual
  );
  const {addItem} = useCart();
  
  // Estado para controlar quantos produtos mostrar
  const [visibleCount, setVisibleCount] = useState(12);

  const produtosVisiveis = produtosFiltrados.slice(0, visibleCount);

  return (
    <AnimatedSection>
    <div className=" min-h-screen pb-20">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 bg-cover bg-center flex items-end" style={{ backgroundImage: "url('/img/categoria-banner.webp')" }}>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <nav className="flex items-center gap-2 text-gray-500 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <span>&gt;</span>
          <span className="text-gray-700 font-semibold">{categoriaAtual}</span>
        </nav>
      </div>

      {/* Filtros, Ordenação e Grid */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <aside className="w-7xl md:w-1/4 lg:w-1/6 mb-4 md:mb-0">
          <h3 className="font-bold text-lg mb-4">FILTROS</h3>
          <div>
            <CollapsibleMenu title="Categorias">
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/categorias/${cat.slug}`}
                    className={`block px-2 py-1 rounded ${cat.slug === categoriaAtual ? "bg-[#5483B3] text-white" : "hover:bg-gray-100"}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
            </CollapsibleMenu>
          </div>
        </aside>

        {/* Produtos e Ordenação */}
        <main className="flex-1">
          {/* Topo: quantidade e ordenação */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <span className="font-semibold text-base">
              {produtosFiltrados.length} Produtos Encontrados
            </span>
            {/* Dropdown de ordenação pode ser adicionado aqui */}
          </div>

          {/* Grid de produtos */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produtosVisiveis.map(prod => (
              <Link to={`/produto/${prod.id}`} key={prod.nome} className="no-underline">
              <div key={prod.nome} className="bg-zinc-100 w-full rounded-lg shadow hover:shadow-xl transition-shadow flex flex-col">
                <img src={prod.imagem} alt={prod.nome} className="w-full h-full rounded-t-sm" />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold mb-1">{prod.nome}</h3>
                  {prod.preco && (
                    <span className="text-[#5483B3] font-bold text-lg mb-2">R$ {prod.preco.toFixed(2)}</span>
                  )}
                  <button 
                  className="bg-[#5483B3] text-white px-4 py-2 rounded hover:bg-[#052659] transition flex items-center justify-center gap-2"
                  onClick={e => {
                    e.preventDefault();
                    addItem({
                      id: String(prod.id),
                      name: prod.nome,
                      image: prod.imagem,
                      price: prod.preco,
                      quantity: 1,
                  })
                  }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar à Sacola
                    </button>
                </div>
              </div>
              </Link>
            ))}
          </div>
          {/* Botão Carregar Mais */}
          {produtosFiltrados.length > visibleCount && (
            <div className="flex justify-center mt-8">
              <button
              className="bg-[#5483B3] text-white px-6 py-2 rounded hover:bg-[#052659] transition"
              onClick={() => setVisibleCount(prev => prev + 12)}
              >
                Mostrar mais
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
    </AnimatedSection>
  );
}