import { useState, useEffect } from "react";
import { getFavorites } from "../../utils/Favorites";
import ProductCard from "../../ProductCard";
import { Search } from "lucide-react";

export default function FavoriteProductsPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const filtered = favorites.filter(product =>
    product.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Favoritos</h1>
        <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Pesquisar favoritos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded-xl px-3 py-2 w-full sm:w-72 relative"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></Search>
      </div>
    </div>
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-20">Nenhum produto favoritado.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              nome={product.nome} // mapeando para o nome esperado pelo ProductCard
              preco={product.preco}
              originalPrice={product.originalPrice}
              imagem={product.imagem}
              isNew={product.isNew}
              discount={product.discount}
              cores={product.cores}
            />
          ))}
        </div>
      )}
    </div>
  );
}