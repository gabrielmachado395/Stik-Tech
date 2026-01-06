import { Heart, User, Menu, ShoppingBag } from 'lucide-react';
import { useGoTo } from './utils/navigation';
import CartSidebar from './CartSidebar';
import { useCart } from './utils/CartContext';
import { useState } from 'react';
import SearchProducts from './SearchProducts';

export default function Header() {
  const goTo = useGoTo();
  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-[#7DA0CA] text-black text-center py-2 text-sm">
        FRETE GRÁTIS para todo Brasil a partir de R$149,99
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <button className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <a href="/" className="flex items-center">
            <img src="/img/logo.png" alt="Logo" className="h-20 w-auto" />
          </a>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <SearchProducts />
          </div>

          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center text-gray-700 hover:text-[#769FCD]">
              <User className="w-6 h-6" />
              <span className="text-xs hidden sm:block">Conta</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-[#769FCD]">
              <Heart className="w-6 h-6" />
              <span className="text-xs hidden sm:block">Favoritos</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-[#769FCD] relative"
             onClick={() => setCartOpen(true)}
             >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-2 -right-2 bg-[#5483B3] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white">
              {totalItems}
              </span>
              )}
              <span className="text-xs hidden sm:block">Sacola</span>
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-6 mt-4 text-sm font-medium">
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/lancamentos')}>LANÇAMENTOS</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/elasticos-crus')}>ELÁSTICOS CRUS</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/modeladores')}>MODELADORES</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/alcas')}>ALÇAS</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/bases')}>BASES</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/vies')}>VIÉS</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/premium')}>PREMIUM</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/rendas')}>RENDAS</a>
          <a href="#" className="text-gray-700 hover:text-[#769FCD] transition" onClick={() => goTo('/categorias/personalizados')}>PERSONALIZADOS</a>
        </nav>
      </div>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
