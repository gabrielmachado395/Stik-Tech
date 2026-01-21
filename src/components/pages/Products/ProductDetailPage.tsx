import { useParams, Link } from "react-router-dom";
import { CollapsibleMenu } from "../../utils/CollapsibleMenu";
import { products } from "../../Products";
import ProductCard from "../../ProductCard";
import { useEffect, useState } from "react"
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../utils/CartContext";
import { AnimatedSection } from "../../animations/AnimatedSections";
import type { ProductColor } from "../../utils/productColors";
import { getCategoryHrefByName } from "../../utils/categories";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [mainImage, setMainImage] = useState(
    Array.isArray(product?.imagem) ? product.imagem[0] : product?.imagem
  );

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Produto não encontrado.</div>;
  }

  const productColors = product.cores ?? [];

  const hasDiscount = typeof product.originalPrice === "number" && product.originalPrice > product.preco;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.preco / (product.originalPrice as number)) * 100)
    : null;

  const brl = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  useEffect(() => {
    const colors = product?.cores ?? [];
    if (colors.length > 0) setSelectedColor(colors[0]);
    else setSelectedColor(null);
  }, [product?.id]);

  // Pega a primeira frase da descrição
  const descShort = product.descricao.split('. ')[0] + '.';

  const recomendados = products
    .filter(p => p.categoria === product.categoria && p.id !== product.id)
    .slice(0, 8);

  // Função para calcular frete (simples simulação)
  const calcularFrete = () => {
    setFrete(19.90); // Valor fixo para simulação
  };

  const { addItem } = useCart();
  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.nome,
      image: Array.isArray(product.imagem) ? product.imagem[0] : product.imagem,
      price: product.preco,
      quantity: quantity,
      variant: selectedColor ? `Cor: ${selectedColor.nome} ${selectedColor.hex}` : undefined,
    });
  };
  return (
    <AnimatedSection>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className=" text-center text-ms  text-gray-500 mb-4">
        <Link to="/" className="hover:underline">Home</Link> &gt;{" "}
        <Link to={getCategoryHrefByName(product.categoria)} className="hover:underline">{product.categoria}</Link> &gt;{" "}
        <span className="text-gray-700">{product.nome}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagens */}
        <div className="flex flex-col gap-2 md:w-1/3">
          <img src={mainImage} alt={product.nome} className="w-full rounded-lg shadow transition-transform duration-200 hover:scale-105" />
          {/* Miniaturas */}
          <div className="flex gap-2">
            {(Array.isArray(product.imagem) ? product.imagem : [product.imagem]).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.nome}
                className={`w-16 h-16 rounded border cursor-pointer ${mainImage === img ? 'ring-2 ring-[#5483B3]' : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Infos do produto */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.nome}</h1>
          <p className="text-gray-700 mb-2">{descShort}</p>

          {hasDiscount && (
            <div className="flex items-center gap-3 mb-1">
              {typeof discountPercent === "number" && (
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  -{discountPercent}%
                </span>
              )}
              <span className="text-sm text-gray-400 line-through">{brl(product.originalPrice as number)}</span>
            </div>
          )}

          <div className="text-3xl font-bold text-[#5483B3] mb-4">{brl(product.preco)}</div>
          

          {/* Simulação de cor/tamanho */}
          <div className="my-4 flex gap-2 justify-start items-center">
            {/* <span className="text-ms text-gray-600">Tamanho:</span>
            <button className="border rounded px-2 py-1">Carretel C/ 100 Metros</button> */}
            <span className="text-ms text-gray-600">Cor:</span>
            {productColors.length === 0 ? (
              <span className="text-sm text-gray-500">Não informado</span>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {productColors.map((c) => (
                  <button
                    key={`${c.nome}-${c.hex}`}
                    type="button"
                    className={`flex items-center gap-2 px-2 py-1 rounded-full border bg-white hover:bg-gray-50 transition ${selectedColor?.hex === c.hex && selectedColor?.nome === c.nome ? ' border-[#5483B3]' : 'border-gray-200'}`}
                    onClick={() => setSelectedColor(c)}
                    title={c.hex}
                  >
                    <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: c.hex }} />
                    <span className="text-sm text-gray-700">{c.nome}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quantidade e botão */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center border rounded-lg px-2 py-1">
                <button
                type="button"
                className="px-2 text-lg text-gray-600 hover:text-[#5483B3] focus:outline-none"
                onClick={() => setQuantity(qty => Math.max(1, qty - 1))}
                >
                −
                </button>
                <input 
                min={1}
                max={100}
                value={quantity}
                onChange={e => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") {
                        setQuantity(0);
                    } else if (val >=1 && val <= 100) {
                        setQuantity(val)
                    } else if (val > 100) {
                        setQuantity(100);
                    }
                }}
                className="w-8 text-center select-none border-0 focus:ring-0 focus:outline-none"
                inputMode="numeric"
                pattern="[0-9]*"
                />
                <button
                type="button"
                className="px-2 text-lg text-gray-600 hover:text-[#5483B3] focus:outline-none"
                onClick={() => setQuantity(qty => Math.min(100, qty + 1))}
                >
                +
                </button>
            </div>
            <button className="bg-[#5483B3] w-full md:w-3/6 text-white py-2 px-4 rounded-lg font-medium hover:bg-[#052659] transition flex items-center justify-center gap-2"
            onClick={handleAddToCart}>
              <ShoppingBag className="w-5 h-5" />
              Adicionar à sacola
                </button>
          </div>

        {/* Menu colapsável para descrição completa */}
        <CollapsibleMenu title="Descrição" defaultOpen={false}>
        <p className="bg-gray-100 p-4 rounded">{product.descricao}</p>
        </CollapsibleMenu>{
        
        /* Menu colapsável para composição */}
        <CollapsibleMenu title="Composição" defaultOpen={false}>
        <p className="bg-gray-100 p-4 rounded">{product.material}</p>
        </CollapsibleMenu>

          {/* Cálculo de frete */}
          <div className="my-4">
            <label className="block text-lg font-semibold mb-1">Calcule o valor do frete:</label>
            <div className="items-start flex gap-2">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={e => setCep(e.target.value)}
                className="border h-12 rounded px-2 py-1"
              />
              <button
                onClick={calcularFrete}
                className=" h-12 bg-[#5483B3] hover:bg-[#052659] text-white px-4 py-1 items-start rounded"
                type="button"
              >
                Consultar
              </button>
            </div>
            {frete && <div className="mt-2 text-sm text-gray-700">{frete}</div>}
          </div>
        </div>
      </div>

      {/* Quem viu, também gostou */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-center ">Quem viu, também gostou</h2>
        <div className="overflow-x-auto flex gap-4 pb-2">
          {recomendados.map(prod => (
            <Link to={`/produto/${prod.id}`} key={prod.id} className="no-underline ">
            <div key={prod.id} className="min-w-[220px] max-w-[220px] ">
              <ProductCard {...prod} />
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </AnimatedSection>
  );
}