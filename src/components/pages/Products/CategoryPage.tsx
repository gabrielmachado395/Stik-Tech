import { useParams } from "react-router-dom"; // ou use sua solução de rotas
import { products } from "../../Products";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard";
import { AnimatedSection } from "../../animations/AnimatedSections";
import { CollapsibleMenu } from "../../utils/CollapsibleMenu";
import { useCart } from "../../utils/CartContext";
import React, { useState, useRef } from "react";
import { CATEGORIES } from "../../utils/categories";
const ORDER_OPTIONS = [
  { label: "Relevância", value: "relevancia" },
  { label: "Mais vendidos", value: "mais-vendidos" },
  { label: "Mais recentes", value: "mais-recentes" },
  { label: "Desconto", value: "desconto" },
  { label: "Preço: Do maior para o menor", value: "preco-desc" },
  { label: "Preço: Do menor para o maior", value: "preco-asc" },
  { label: "Nome em ordem crescente", value: "nome-asc" },
  { label: "Nome em ordem decrescente", value: "nome-desc" },
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
  useCart();
  
  // Estado para controlar quantos produtos mostrar
  const [visibleCount, setVisibleCount] = useState(12);

  // Estado para ordenação
  const [order, setOrder] = useState("relevancia");
  const [orderOpen, setOrderOpen] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  // Ordenação dos produtos
  function sortProducts(list: typeof products) {
    switch (order) {
      case "mais-recentes":
        return [...list].sort((a, b) => {
          const aTime = a.createdAt ?? 0;
          const bTime = b.createdAt ?? 0;
          if (bTime !== aTime) return bTime - aTime;
          return (b.id ?? 0) - (a.id ?? 0);
        });
      case "preco-asc":
        return [...list].sort((a, b) => a.preco - b.preco);
      case "preco-desc":
        return [...list].sort((a, b) => b.preco - a.preco);
      case "nome-asc":
        return [...list].sort((a, b) => a.nome.localeCompare(b.nome));
      case "nome-desc":
        return [...list].sort((a, b) => b.nome.localeCompare(a.nome));
      // Adicione lógica para outras opções se necessário
      default:
        return list;
    }
  }

  const produtosOrdenados = sortProducts(produtosFiltrados);
  const produtosVisiveis = produtosOrdenados.slice(0, visibleCount);

  // Fecha o menu ao clicar fora
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (orderRef.current && !orderRef.current.contains(event.target as Node)) {
        setOrderOpen(false);
      }
    }
    if (orderOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [orderOpen]);

  return (
    <div className=" min-h-screen pb-20">
      {/* Banner */}
      <div className="w-full h-20 md:h-40 bg-cover bg-center flex items-center bg-gradient-to-r from-[#141e30] to-[#35577d] " >
        <h1 className="text-white text-3xl md:text-4xl font-bold p-6 flex items-center justify-center mx-auto">{categoriaAtual}</h1>
      </div>
      <AnimatedSection>

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
            {/* Dropdown de ordenação */}
            <div className="relative" ref={orderRef}>
              <button
                className="flex items-center gap-2 px-4 py-2 border-b border-gray-300 text-gray-700 font-medium focus:outline-none min-w-[180px]"
                onClick={() => setOrderOpen((v) => !v)}
                type="button"
              >
                Ordenar por <span className="font-bold">{ORDER_OPTIONS.find(opt => opt.value === order)?.label}</span>
                <svg className={`w-4 h-4 ml-1 transition-transform ${orderOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {orderOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-20">
                  {ORDER_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`block w-full text-left px-4 py-2 hover:bg-[#f0f4fa] ${order === opt.value ? 'bg-gray-100 font-semibold' : ''}`}
                      onClick={() => { setOrder(opt.value); setOrderOpen(false); }}
                      type="button"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid de produtos */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produtosVisiveis.map(prod => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                nome={prod.nome}
                preco={prod.preco}
                originalPrice={prod.originalPrice}
                imagem={prod.imagem}
                cores={prod.cores}
                discount={prod.originalPrice && prod.originalPrice > prod.preco
                  ? Math.round((1 - prod.preco / prod.originalPrice) * 100)
                  : undefined}
                isNew={prod.isLaunch}
              />
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
    </AnimatedSection>
    </div>
  );
}