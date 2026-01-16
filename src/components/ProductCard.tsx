import { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './utils/CartContext';
import { addFavorite, removeFavorite, isFavorite } from './utils/Favorites';

interface ProductCardProps {
  id: number;
  nome: string;
  preco: number;
  originalPrice?: number;
  imagem: string;
  isNew?: boolean;
  discount?: number;
}

export default function ProductCard({ id, nome, preco, originalPrice, imagem, isNew, discount }: ProductCardProps) {
  const { addItem } = useCart();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: String(id),
      name: nome,
      image: imagem,
      price: preco,
      quantity: 1,
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(id);
      setFavorite(false);
    } else {
      addFavorite({ id, title:nome, price:preco, originalPrice, image:imagem, isNew, discount });
      setFavorite(true);
    }
  };

  return (
    <Link to={`/produto/${id}`} className="no-underline ">
      <div className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 ">
        {isNew && (
          <span className="absolute top-2 left-2 bg-[#5483B3] text-white text-xs px-3 py-1 rounded-full z-10">
            NOVO
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}

        <div className="relative aspect-square bg-white-100 overflow-hidden">
          <img
            src={imagem}
            alt={nome}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <button
            className={`absolute top-2 right-2 transition-opacity bg-white rounded-full p-2 shadow-md 
              ${favorite ? ' opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}
            onClick={handleFavorite}
            title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart
              className={`w-5 h-5 ${favorite ? ' text-[#5483B3] fill-[#5483B3]' : 'text-gray-700'}`}
              fill={favorite ? '#fff' : 'none'}
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg text-black-700 mb-2 line-clamp-2">{nome}</h3>

          <div className="flex items-center gap-2 mb-3">
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                R$ {originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-[#5483B3]">
              R$ {preco.toFixed(2)}
            </span>
          </div>

          <button className="w-full bg-[#5483B3] text-white py-2 rounded-lg font-medium hover:bg-[#052659] transition flex items-center justify-center gap-2"
            onClick={handleAddToCart}>
            <ShoppingBag className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </Link>
  );
}