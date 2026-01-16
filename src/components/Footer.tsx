import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#021024] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">STIK ELÁSTICOS</h3>
            <p className="text-sm mb-4">
              Elásticos de qualidade para valorizar sua beleza e conforto.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=100092188292700" className="hover:text-[#08407a] transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/stikelasticos?igshid=MzRlODBiNWFlZA%3D%3D" className="hover:text-[#08407a] transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=558532025400" className="hover:text-[#08407a] transition">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/sobre-nos" className="hover:text-[#08407a] transition">Sobre Nós</a></li>
              {/* <li><a href="#" className="hover:text-[#08407a] transition">Lojas Físicas</a></li> */}
              <li><a href="https://vagas.stik.com.br" className="hover:text-[#08407a] transition">Trabalhe Conosco</a></li>
              <li><a href="/blog" className="hover:text-[#08407a] transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/perguntas-frequentes" className="hover:text-[#08407a] transition">Fale Conosco</a></li>
              <li><a href="/meus-pacotes" className="hover:text-[#08407a] transition">Meus Pedidos</a></li>
              <li><a href="/politica-de-privacidade" className="hover:text-[#08407a] transition">Política de Privacidade</a></li>
              {/* <li><a href="#" className="hover:text-[#08407a] transition">Tabela de Medidas</a></li> */}
              {/* <li><a href="#" className="hover:text-[#08407a] transition">Formas de Pagamento</a></li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Localização</h4>
            <p className="space-y-2 text-sm">
              Rua Professor Vieira, 400 - Autran Nunes, Fortaleza - CE, 60526-450
            </p>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2026 Stik Elásticos. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <span>CNPJ: 07.295.413/0001-90</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
