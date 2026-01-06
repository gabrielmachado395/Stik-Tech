import React from "react";
import { useCart } from "./utils/CartContext";
import { Trash } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CartSidebar: React.FC<Props> = ({ open, onClose }) => {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (!open) return null;

  return (
    <>
    <div
      className="fixed inset-0 bg-black opacity-50 z-50"
      onClick={onClose}
    />
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button className="p-4 text-2xl" onClick={onClose}>
        &times;
      </button>
      <h2 className="text-xl font-bold px-4">Sacola</h2>
      <div className="overflow-y-auto h-[60vh] px-4">
        {items.length === 0 ? (
          <p className="mt-8 text-center">Sua sacola está vazia.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center my-4 border-b pb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-bold">{item.name}</div>
                <div className="text-xs text-gray-500">{item.variant}</div>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="border rounded px-1"
                    >
                    {[...Array(100)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="p-2 border-t translate-y-full">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-[#5483B3] hover:bg-[#052659] text-white py-2 rounded font-bold">
          IR PARA O CHECKOUT
        </button>
      </div>
    </div>
    </>
  );
};

export default CartSidebar;