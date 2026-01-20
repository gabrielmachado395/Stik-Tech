
import { Link } from "react-router-dom";
import type { Product } from "./Products";

interface ProductImageGroupCardProps {
  title: string;
  products: Product[];
  link?: string;
}

export default function ProductImageGroupCard({ title, products, link }: ProductImageGroupCardProps) {
  return (
    <Link to={link || "#"}>
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center w-full border transition-shadow hover:shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">{title}</h3>
      <div className="grid grid-cols-2 gap-2 mb-2 w-full">
        {products.slice(0, 4).map((prod) => {
          const imgSrc = Array.isArray(prod.imagem) ? prod.imagem[0] : prod.imagem;
          return (
            <div key={prod.id} className="aspect-square bg-gray-100 rounded flex items-center justify-center overflow-hidden">
              <img src={imgSrc} alt={prod.nome} className="object-cover w-full h-full" loading="lazy" />
            </div>
          );
        })}
      </div>
        <a className="text-[#5483B3] text-sm font-semibold hover:underline mt-2">Ver mais</a>
      
    </div>
    </Link>
  );
}
