import { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './utils/CartContext';
import { addFavorite, removeFavorite, isFavorite } from './utils/Favorites';
import type { ProductColor } from './utils/productColors';

interface ProductCardProps {
  id: number;
  nome: string;
  preco: number;
  originalPrice?: number;
  imagem: string | string[];
  isNew?: boolean;
  discount?: number;
  cores?: ProductColor[];
}

export default function ProductCard(props: ProductCardProps) {
  const { addItem } = useCart();
  const [favorite, setFavorite] = useState(false);
  const [mainImage, setMainImage] = useState(
    Array.isArray(props.imagem) ? props.imagem[0] : props.imagem
  );

  useEffect(() => {
    setFavorite(isFavorite(props.id));
  }, [props.id]);

  useEffect(() => {
    setMainImage(Array.isArray(props.imagem) ? props.imagem[0] : props.imagem);
  }, [props.imagem]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: String(props.id),
      name: props.nome,
      image: mainImage,
      price: props.preco,
      quantity: 1,
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
  e.preventDefault();
  if (favorite) {
    removeFavorite(props.id);
    setFavorite(false);
  } else {
    const productToSave = {
      id: props.id,
      nome: props.nome,
      preco: props.preco,
      originalPrice: props.originalPrice,
      imagem: props.imagem,
      isNew: props.isNew,
      discount: props.discount,
      cores: props.cores,
    };
    console.log("Salvando nos favoritos:", productToSave);
    addFavorite(productToSave);
    setFavorite(true);
    console.log(localStorage.getItem('favorites'));
    }
  };

  return (
    <Link to={`/produto/${props.id}`} className="no-underline ">
      <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 ">
        {(props.discount || props.isNew) && (
          <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
            {props.discount && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                -{props.discount}%
              </span>
            )}
            {props.isNew && (
              <span className="bg-[#5483B3] text-white text-xs px-3 py-1 rounded-full">
                NOVO
              </span>
            )}
          </div>
        )}

        <div className="relative aspect-square bg-white-100 overflow-hidden flex flex-col items-center justify-center">
          <img
            src={mainImage}
            alt={props.nome}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          <h3 className="text-lg text-black-700 mb-2 line-clamp-2">{props.nome}</h3>
          
          {/* Cores do Produto */}
          {props.cores && props.cores.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              {props.cores.map(
                (c) =>
                  c &&
                  c.hex && (
                    <span
                      key={c.nome + c.hex}
                      className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: c.hex }}
                      title={c.nome}
                      aria-label={c.nome}
                    />
                  )
              )}
            </div>
            )}
          <div className="flex items-center gap-2 mb-3">
            {props.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                R$ {props.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-[#5483B3]">
              R$ {props.preco.toFixed(2)}
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