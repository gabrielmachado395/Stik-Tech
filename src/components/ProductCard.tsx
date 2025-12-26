import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number;
}

export default function ProductCard({ name, price, originalPrice, image, isNew, discount }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {isNew && (
        <span className="absolute top-2 left-2 bg-[#6a00b0] text-white text-xs px-3 py-1 rounded-full z-10">
          NOVO
        </span>
      )}
      {discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
          -{discount}%
        </span>
      )}

      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {image}
        </div>

        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
          <Heart className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm text-gray-700 mb-2 line-clamp-2">{name}</h3>

        <div className="flex items-center gap-2 mb-3">
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              R$ {originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-[#6a00b0]">
            R$ {price.toFixed(2)}
          </span>
        </div>

        <button className="w-full bg-[#6a00b0] text-white py-2 rounded-lg font-medium hover:bg-[#8a20d0] transition flex items-center justify-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
