import { Search, Heart, User, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-[#6a00b0] text-white text-center py-2 text-sm">
        FRETE GRÁTIS para todo Brasil a partir de R$149,99
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <button className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <div className="text-2xl font-bold text-[#6a00b0]">
            NAYANE LINGERIE
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#6a00b0]"
              />
              <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center text-gray-700 hover:text-[#6a00b0]">
              <User className="w-6 h-6" />
              <span className="text-xs hidden sm:block">Conta</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-[#6a00b0]">
              <Heart className="w-6 h-6" />
              <span className="text-xs hidden sm:block">Favoritos</span>
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-6 mt-4 text-sm font-medium">
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">LANÇAMENTOS</a>
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">SUTIÃS</a>
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">CALCINHAS</a>
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">AMAMENTAÇÃO</a>
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">PLUS SIZE</a>
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">LINHA NOITE</a>
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">ALGODÃO</a>
          <a href="#" className="text-[#6a00b0] font-bold hover:text-[#8a20d0] transition">OUTLET</a>
          <a href="#" className="text-gray-700 hover:text-[#6a00b0] transition">COLEÇÕES</a>
        </nav>
      </div>
    </header>
  );
}
