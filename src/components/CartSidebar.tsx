import React from "react";
import { useCart } from "./utils/CartContext";
import { Trash } from "lucide-react";
import { formatBRL as brl } from "./utils/formatBRL";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CartSidebar: React.FC<Props> = ({ open, onClose }) => {
  const { items, removeItem, updateQuantity, total } = useCart();

  const extractHexFromVariant = (variant?: string) => {
    if (!variant) return undefined;
    const match = variant.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/);
    return match?.[0];
  };

  // Sempre renderiza, mas controla visibilidade com classes
  return (
    <>
      {/* Backdrop animado */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${open ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Sidebar animada */}
      <div 
        className={`fixed top-0 right-0 h-full md:w-1/3 bg-white shadow-lg z-50 duration-300 flex flex-col
        ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        style={{ willChange: "transform, opacity" }}
      >
        <button className="p-4 text-2xl text-left" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-semibold px-4">Sacola</h2>
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center">Sua sacola está vazia.</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={`${item.id}-${item.variant ?? "default"}`} className="flex gap-3 items-center h-28 my-10 border-t pt-10">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between lg:items-center flex-col lg:flex-row">
                      <div className="text-xl">{item.name}</div>
                    <div className="flex flex-col lg:flex-col lg:items-end">
                      <span className="font-light  text-gray-500">{brl(item.price)}</span>
                      <div className="font-semibold text-xl">{brl(item.price * item.quantity)}</div>
                    </div>
                    </div>
                    {item.variant && (
                      <div className="text-xs text-gray-500 flex items-center gap-2 ">
                        <span className="text-xl">Cor: </span>
                        {extractHexFromVariant(item.variant) && (
                          <span
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: extractHexFromVariant(item.variant) }}
                            aria-hidden="true"
                          />
                        )}
                        {/* <span>{item.variant}</span> */}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1 text-4sm justify-between">
                      <div className="border rounded-lg flex items-center">
                      <button>
                        <button
                          type="button"
                          className="px-2 text-lg text-gray-600 hover:text-[#5483B3] focus:outline-none"
                          onClick={() => updateQuantity(item.id, item.variant, Math.max(1, item.quantity - 1))}
                        >
                          −
                        </button>
                        <input 
                          min={1}
                          max={100}
                          value={item.quantity}
                          onChange={e => {
                            const qty = parseInt(e.target.value, 10);
                            if (!isNaN(qty) && qty >= 1 && qty <= 100) {
                              updateQuantity(item.id, item.variant, qty);
                            }
                          }}
                          className="w-10 text-center mx-2"
                        />
                        <button
                          type="button"
                          className="px-2 text-lg text-gray-600 hover:text-[#5483B3] focus:outline-none"
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                        >
                          +
                        </button>
                      </button>
                      </div>
                      <button onClick={() => removeItem(item.id, item.variant)} className="text-gray-400 hover:text-red-500">
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pb-12 mt-2 text-center">
                <a href="/" className="text-[#5483B3] hover:underline font-medium text-sm">Adicionar mais itens</a>
              </div>
            </>
          )}
        </div>
        <div className="px-2 py-4 border-t h-30">
          <div className="flex justify-between mx-4 text-xl">
            <span>Total</span>
            <span className="font-semibold">{brl(total)}</span>
          </div>
          <button className="w-full mt-4 bg-[#5483B3] hover:bg-[#052659] text-white py-2 border rounded-lg font-bold">
            <><a href="/checkout">Fechar pedido</a></>
          </button>
          <button className="w-full mt-4  hover:bg-[#e0e0e0] text-gray-700 py-2 border rounded-lg font-bold">
            <a href="/">Continuar comprando</a>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;