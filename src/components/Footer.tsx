import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">NAYANE LINGERIE</h3>
            <p className="text-sm mb-4">
              Lingeries de qualidade para valorizar sua beleza e conforto.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#6a00b0] transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#6a00b0] transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#6a00b0] transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#6a00b0] transition">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-[#6a00b0] transition">Lojas Físicas</a></li>
              <li><a href="#" className="hover:text-[#6a00b0] transition">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-[#6a00b0] transition">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#6a00b0] transition">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-[#6a00b0] transition">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-[#6a00b0] transition">Tabela de Medidas</a></li>
              <li><a href="#" className="hover:text-[#6a00b0] transition">Formas de Pagamento</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">
              Receba nossas novidades e promoções
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#6a00b0] text-sm"
              />
              <button className="bg-[#6a00b0] px-4 py-2 rounded-r-lg hover:bg-[#8a20d0] transition">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2024 Nayane Lingerie. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <span>CNPJ: 00.000.000/0000-00</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
