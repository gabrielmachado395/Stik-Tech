import { useState } from "react";
import { Link } from "react-router-dom";
// Importe a logo do header principal

const MENUS = [
  {
    label: "Como funciona",
    options: [
      "Como funciona",
      "Pequenos e médios negócios",
      "Guia de cadastro de novos vendedores",
      "Histórias de sucesso",
      "Indique um vendedor",
    ],
  },
  {
    label: "Quanto custa?",
    options: [
      "Planos de venda",
      "Comissões de venda",
      "Custos de envio",
    ],
  },
  {
    label: "Cresça seu negócio",
    options: [
      "Como crescer seu negócio",
      "FBA - Logística da Amazon",
      "FBA Onsite - Logística da Amazon",
      "DBA - Delivery by Amazon",
      "Venda nos Estados Unidos",
      "Programa de Recompensas do Vendedor",
      "Publicidade Amazon",
      "Promoções",
      "Programa de aceleração",
      "Consultoria Estratégica",
      "Brand Registry - Registre sua marca",
    ],
  },
  {
    label: "Ajuda?",
    options: [
      "Obtenha ajuda",
      "Seller University",
      "Perguntas Frequentes",
      "Webinars e treinamentos",
      "Fale conosco",
      "Rede de prestadores de serviço",
      "Amazon Mentor",
      "Soluções de Integração",
    ],
  },
];

function DropdownMenu({ label, options }: { label: string; options: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 font-semibold text-gray-800 px-3 py-2 transition-colors hover:text-blue-700 focus:outline-none"
        type="button"
      >
        <span>{label}</span>
        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg width={16} height={16} fill="none" viewBox="0 0 24 24">
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border z-30 animate-fadeIn">
          <div className="border-b-2 border-blue-500 w-full h-1 rounded-t-lg mb-1" />
          <ul className="py-2">
            {options.map((opt) => (
              <li
                key={opt}
                className="px-5 py-2 hover:bg-gray-100 text-gray-800 cursor-pointer text-sm"
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function HeaderSellWithUs() {
  return (
    <header className="w-full bg-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src="/img/logo.png" alt="Stik Tech Logo" className="h-14 md:h-20" />
        </Link>

        {/* Menus - só aparecem no desktop */}
        <nav className="hidden lg:flex gap-2 md:gap-4 flex-1 justify-center">
          {MENUS.map((menu) => (
            <DropdownMenu key={menu.label} label={menu.label} options={menu.options} />
          ))}
        </nav>

        {/* Botão - sempre visível, alinhado à direita */}
        <div className="flex items-center flex-shrink-0">
          <Link
            to="/venda-com-a-gente/login"
            className="ml-2 px-5 py-2 rounded-full font-semibold text-white hover:shadow-lg hover:opacity-90 transition-none"
            style={{ background: "linear-gradient(90deg, #5483B3 0%, #1E3A8A 100%)" }}
          >
            Comece a vender
          </Link>
        </div>
      </div>
    </header>
  );
}

// Tailwind animação fadeIn (adicione no seu CSS global se quiser transição suave)
// @layer utilities {
//   .animate-fadeIn {
//     animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1);
//   }
//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
// }