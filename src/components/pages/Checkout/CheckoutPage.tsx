import { useCart } from "../../utils/CartContext";
import { Trash, ShoppingBag} from "lucide-react";
import {AnimatedSection} from "../../animations/AnimatedSections";
import { Link } from "react-router-dom";
import  FooterCheckoutPage  from "./FooterCheckoutPage";
import { formatBRL as brl } from "../../utils/formatBRL";

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  const extractHexFromVariant = (variant?: string) => {
    if (!variant) return undefined;
    const match = variant.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/);
    return match?.[0];
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <AnimatedSection>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Lista de produtos */}
        <div className="flex-1">
          <h1 className="text-xl xl:text-2xl font-bold mb-6">Minha sacola</h1>
          <div className="bg-white rounded shadow p-4">
            <div className="grid grid-cols-10 font-semibold text-gray-700 border-b pb-2 mb-2 text-xs sm:text-sm xl:text-base">
              <div className="col-span-5">Produto</div>
              <div className="col-span-3 text-center">Quantidade</div>
              <div className="col-span-2 text-right">Preço</div>
            </div>
            {items.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">Sua sacola está vazia.</div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.variant ?? "default"}`} className="grid grid-cols-10 items-center border-b last:border-b-0 py-3 sm:py-4 text-xs sm:text-sm xl:text-base">
                  <div className="col-span-5 flex items-center gap-2 sm:gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                    <div className="min-w-0">
                      <div className="truncate max-w-[80px] sm:max-w-[120px] xl:max-w-none">{item.name}</div>
                      {item.variant && (
                        <div className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-2 mt-1">
                          {extractHexFromVariant(item.variant) && (
                            <span
                              className="w-3 h-3 rounded-full border"
                              style={{ backgroundColor: extractHexFromVariant(item.variant) }}
                              aria-hidden="true"
                            />
                          )}
                          <span className="truncate">{item.variant}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center justify-center gap-1 sm:gap-2 border rounded-lg w-20 sm:w-24 mx-auto">
                    <button
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded text-base sm:text-xl"
                      onClick={() => updateQuantity(item.id, item.variant, Math.max(1, item.quantity - 1))}
                    >-</button>
                    <span className="w-5 sm:w-6 text-center">{item.quantity}</span>
                    <button
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded text-base sm:text-xl"
                      onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                    >+</button>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1 sm:gap-2">
                    <span className="font-semibold text-[#5483B3] text-xs sm:text-sm xl:text-base">{brl(item.price * item.quantity)}</span>
                    <button onClick={() => removeItem(item.id, item.variant)} className="text-gray-400 hover:text-red-500">
                      <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Resumo do pedido */}
        <div className="w-full md:w-96">
          <div className="bg-white rounded shadow p-6 flex flex-col gap-4">
            {/* Entrega */}
            <div>
              <h2 className="font-semibold mb-2">Entrega</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="CEP"
                  className="border border-gray-300 rounded px-3 py-2 w-52 focus:outline-none flex-1"
                />
                <button
                  className="border border-[#5483B3] text-[#5483B3] px-4 py-2 rounded hover:bg-[#e0e0e0] transition-all duration-300 w-full text-center"
                >
                  Calcular
                </button>
              </div>
            </div>
            <h2 className="font-semibold">Tem cupom?</h2>
            {/* Cupom */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Cupom"
                className="border border-gray-300 rounded px-3 py-2 w-52 focus:outline-none flex-1"
              />
              <button
                className="border border-[#5483B3] text-[#5483B3] px-4 py-2 rounded hover:bg-[#e0e0e0] transition-all duration-300 w-full text-center"
              >
                Adicionar
              </button>
            </div>
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-1">
                <span className="inline-block">Resumo do pedido</span>
                <span className="ml-auto">
                  <span className="text-gray-400">
                    <ShoppingBag width="20" height="20" />
                  </span>
                </span>
              </h3>
              <p className="text-xs text-gray-500 mb-2">Confira abaixo o resumo do seu pedido e finalize sua compra.</p>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{brl(total)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span className="text-[#5483B3]">{brl(total)}</span>
              </div>
            </div>
            <Link to="/checkout/payment">
            <button className="w-full mt-2 bg-[#5483B3] hover:bg-[#052659] text-white py-3 rounded font-bold text-lg">
              Ir para pagamento
            </button>
            </Link>
            <Link to="/" className="w-full mt-2 text-gray-400 hover:underline font-medium bg-transparent">
            <button className="w-full mt-2 text-gray-400 hover:underline font-medium bg-transparent">
              Escolher mais produtos
            </button>
            </Link>
          </div>
        </div>
      </div>
      <FooterCheckoutPage />
    </AnimatedSection>
    </div>
  );
}