import { useState } from "react";
import HeaderSellWithUs from "./HeaderSellWithUs";

export const SellWithUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <HeaderSellWithUs />
        
        <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 py-6">
        {/* Texto e botão */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            A Stik Tech banca o frete dos seus clientes em produtos acima de R$ 19*
          </h1>
          <a
            href="/venda-com-a-gente/login"
            className="bg-[#5483B3] hover:bg-[#1E3A8A] transition text-white font-semibold rounded-full px-8 py-4 text-lg mb-4 shadow-md"
          >
            Comece a vender
          </a>
          <span className="text-xs text-gray-500 underline cursor-pointer">
            *Consulte termos e condições
          </span>
        </div>
        {/* Imagem */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <img
            src="img/Vendedor/banner_vendedor.png" // Substitua pelo caminho da sua imagem
            alt="Pessoa segurando caixa"
            className="max-h-[550px] md:max-h-[620px] w-auto object-contain"
            draggable={false}
          />
        </div>
      </section>
      <section className="bg-[#F7F6F2] w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Precisa de mais motivos para vender online com a Stik Tech?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                <img
                src="img/Vendedor/card-1.jpg"
                alt="Taxas reduzidas"
                className="w-full h-40 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded mb-2">
                    Taxas reduzidas
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Comissões de 10% a 15% e sem taxa fixa
                </h3>
                <ul className="text-sm text-gray-700 mb-6 list-disc pl-4">
                    <li>Comissão MÁXIMA de 15%;</li>
                    <li>Sem taxa fixa por item vendido no Plano Profissional.</li>
                </ul>
                <button className="mt-auto bg-gray-900 text-white rounded-full px-6 py-2 font-semibold hover:bg-gray-700 transition">
                    Saiba mais
                </button>
                </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                <img
                src="img/Vendedor/card-2.jpg"
                alt="Frete grátis"
                className="w-full h-40 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded mb-2">
                    Frete grátis
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Frete grátis a partir de R$ 19 em todas as categorias¹
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                    A Stik Tech envia produtos acima de R$ 19 com frete grátis – economia para você e seus clientes.
                </p>
                <a href="#" className="text-xs text-blue-700 underline mb-6">
                    *Confira termos e condições
                </a>
                <button className="mt-auto bg-gray-900 text-white rounded-full px-6 py-2 font-semibold hover:bg-gray-700 transition">
                    Saiba mais
                </button>
                </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                <img
                src="img/Vendedor/card-3.jpg"
                alt="Recompensas"
                className="w-full h-40 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded mb-2">
                    Recompensas
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Ganhe benefícios de até R$ 80.000
                </h3>
                <ul className="text-sm text-gray-700 mb-2 list-disc pl-4">
                    <li>Sem custo de mensalidade por 1 ano</li>
                    <li>Gerenciamento de conta dedicado</li>
                    <li>Comissão reduzida para 5% para novos ASINs adicionados com Prime badge</li>
                    <li>Comissão reduzida em 5% para Propriedades de Marca</li>
                    <li>R$ 5.000 em créditos com Amazon Ads</li>
                </ul>
                <a href="#" className="text-xs text-blue-700 underline mb-6">
                    *Consulte termos e condições
                </a>
                <button className="mt-auto bg-gray-900 text-white rounded-full px-6 py-2 font-semibold hover:bg-gray-700 transition">
                    Saiba mais
                </button>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section className="w-full py-12">
  <div className="max-w-3xl mx-auto px-4">
    <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8">
      O que é necessário para vender com a Stik Tech
    </h2>
    <AccordionStikTech />
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6">
      <a
        href="#"
        className="text-sm text-gray-800 underline text-center"
      >
        Clique aqui para mais informações sobre o registro
      </a>
      <a
        href="/venda-com-a-gente/login"
        className="bg-[#4373b3] hover:bg-[#5469c0] transition text-white font-semibold rounded-full px-8 py-3 text-lg shadow-md"
      >
        Cadastrar agora
      </a>
    </div>
  </div>
</section>
<section className="w-full py-12">
  <div className="max-w-3xl mx-auto px-4">
    <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8">
      Perguntas Frequentes
    </h2>
    <AccordionFaqStikTech />
  </div>
</section>
<section className="w-full py-12">
  <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden flex flex-col-reverse lg:flex-row items-center bg-gray-900 relative">
    {/* Texto */}
    <div className="flex-1 flex flex-col py-8 lg:py-0 *:justify-center z-10">
      <h3 className="text-2xl lg:text-4xl px-8 font-extrabold text-white mb-4 leading-tight">
        60% das vendas na Stik Tech são feitas por pequenas e médias empresas<sup>2</sup>
      </h3>
      <p className="text-white text-lg px-8 mb-8">
        Aproveite todos os benefícios de vender na Stik Tech
      </p>
      <span className="px-8">
      <a
        href="/venda-com-a-gente/login"
        className="bg-[#4373b3] hover:bg-[#5469c0] text-white w-60 flex items-center justify-center font-semibold rounded-full px-8 py-4 text-lg transition shadow"
      >
        Comece a vender
      </a>
      </span>
    </div>
    {/* Imagem */}
    <div className="flex-1 md:h-auto w-full relative flex items-stretch">
    <img
      src="img/Vendedor/pequena-media.jpg"
      alt="Pequenas empresas"
      className="w-full h-full object-cover object-center md:rounded-none rounded-b-2xl md:rounded-r-2xl opacity-80"
      draggable={false}
    />

    </div>
  </div>
</section>
    </div>
    
  )
};

export default SellWithUsPage;

function AccordionStikTech() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      title: "1. Pessoa física ou jurídica",
      content: (
        <>
          <p className="mb-2">
            Para se tornar um vendedor na Stik Tech, seu cadastro pode ser feito com CPF ou CNPJ.
          </p>
          <p className="mb-2">
            Para cadastrar o titular da conta, tenha em mãos um documento de identificação oficial. Pode ser qualquer um entre:
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li>RG</li>
            <li>Passaporte</li>
            <li>Carteira de motorista</li>
          </ul>
        </>
      ),
    },
    {
      title: "2. Documentos necessários para o processo de registro",
      content: (
        <>
          <ul className="list-disc pl-5 mb-2">
            <li>Nome do titular da conta | contato principal</li>
            <li>E-mail e número de celular</li>
            <li>
              Informações para criação da sua loja na Stik Tech:
              <ul className="list-disc pl-5">
                <li>Razão social, ou nome da pessoa física titular da conta</li>
                <li>Endereço comercial que seja comprovado com um comprovante de domicílio</li>
                <li>Nome fantasia (nome da sua loja online na Stik Tech)</li>
                <li>CPF ou CNPJ</li>
                <li>Cartão de crédito ou débito (nome no cartão deve coincidir com o titular da conta)</li>
                <li>
                  A cobrança não é feita no momento do registro. Após os 12 meses gratuitos, a cobrança da primeira mensalidade é feita neste cartão. Depois disso, será debitada automaticamente dos seus ganhos por venda.
                </li>
              </ul>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Documentos necessários para verificação de identidade",
      content: (
        <>
          <ul className="list-disc pl-5 mb-2">
            <li>
              Documento de identificação oficial do titular da conta escaneado e colorido. Deve coincidir com o nome que consta no cartão de crédito ou débito.
            </li>
            <li>CPF ou CNPJ</li>
            <li>
              Comprovante de domicílio de serviço fixo (telefone, internet, água ou luz) com data de emissão de no máximo 90 dias.
            </li>
            <li>Cartão de crédito ou débito ativo</li>
            <li>
              Comprovação dos dados bancários com data de emissão de no máximo 90 dias
              <ul className="list-disc pl-5">
                <li>O método de depósito deve corresponder ao registrado</li>
                <li>O endereço deve coincidir com o registrado como endereço comercial</li>
                <li>O destinatário deve ser a razão social registrada ou nome do titular da conta</li>
                <li>Deve ser visível o extrato completo e não somente a capa</li>
              </ul>
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="bg-[#F7F6F2] rounded-xl p-4 shadow flex flex-col"
        >
          <button
            className="flex items-center justify-between w-full font-semibold text-left text-gray-800 text-base md:text-lg"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span>{item.title}</span>
            <span
              className={`ml-2 transition-transform duration-200 ${
                open === idx ? "rotate-45" : "rotate-0"
              } text-2xl`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === idx ? "max-h-[500px] mt-4" : "max-h-0"
            }`}
          >
            <div className="text-gray-700 text-sm md:text-base">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AccordionFaqStikTech() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      title: "Por que vender na Stik Tech?",
      content: (
        <p className="mb-2">
          Vender na Stik Tech é uma oportunidade para alavancar o crescimento do seu negócio, já que nosso marketplace possui milhares de clientes fidelizados que usam a plataforma para conhecer, testar e comprar novos produtos.
          <br /><br />
          A Stik Tech quer ajudar empreendedores a impulsionar seus negócios e vender online, assegurando uma experiência simples e confiável para vendedores e clientes.
          <br /><br />
          Trabalhamos para atrair mais consumidores por meio de uma ampla seleção de produtos, conveniência e atendimento de qualidade.
          <br /><br />
          Nossos parceiros se beneficiam ao expor seus produtos para um público maior, aumentando vendas e alcance.
          <br /><br />
          Além disso, quem utiliza nossos serviços de logística conta com centros de distribuição e atendimento especializado, facilitando o envio dos pedidos e aumentando a satisfação dos clientes.
        </p>
      ),
    },
    {
      title: "Quem pode vender na Stik Tech?",
      content: (
        <p className="mb-2">
          Qualquer pessoa ou empresa com CPF ou CNPJ válido, conta de e-mail, conta bancária e cartão de crédito (Visa, MasterCard, Diners) ativos pode vender na Stik Tech. O cartão de crédito é necessário para verificação da conta e para cobranças de taxas, caso o saldo não seja suficiente.
          <br /><br />
          Todos os vendedores precisam emitir e enviar Notas Fiscais Eletrônicas referentes às vendas realizadas.
        </p>
      ),
    },
    {
      title: "Quanto custa vender na Stik Tech?",
      content: (
        <p className="mb-2">
          A Stik Tech oferece diferentes planos de assinatura para vendedores. O plano Profissional tem mensalidade <b>GRÁTIS por 1 ano</b>. Após esse período, o custo mensal é de R$ 19,00.
          <br /><br />
          O plano Individual é isento de mensalidade, mas cobra uma taxa de R$ 2,00 por item vendido.
          <br /><br />
          As comissões e taxas variam conforme a categoria do produto. Consulte nossa página de tarifas para mais informações.
        </p>
      ),
    },
    {
      title: "Quais categorias posso vender na Stik Tech?",
      content: (
        <p className="mb-2">
          Atualmente, você pode vender produtos de diversas categorias na Stik Tech. Confira a lista completa na nossa página de Categorias Disponíveis.
        </p>
      ),
    },
    {
      title: "Quando a mensalidade começará a ser cobrada?",
      content: (
        <p className="mb-2">
          Apenas o plano Profissional possui mensalidade, que é <b>GRÁTIS por 1 ano</b>. Após o 13º mês, o valor de R$ 19,00 será cobrado mensalmente, salvo condições promocionais vigentes no momento da adesão.
        </p>
      ),
    },
    {
      title: "Como eu gerencio minha conta de vendedor na Stik Tech?",
      content: (
        <p className="mb-2">
          Toda a gestão da sua conta de vendedor é feita pela Central do Vendedor Stik Tech, onde você encontra ferramentas para administrar e expandir seu negócio.
        </p>
      ),
    },
    {
      title: "Qual a tarifa de envio para produtos vendidos na Stik Tech?",
      content: (
        <p className="mb-2">
          No plano Profissional, você pode definir suas próprias taxas de envio por item ou peso. No plano Individual, a tarifa de envio é definida pela Stik Tech. Consulte as configurações de envio na Central do Vendedor.
        </p>
      ),
    },
    {
      title: "Como recebo o pagamento dos produtos vendidos na Stik Tech?",
      content: (
        <p className="mb-2">
          A Stik Tech deposita o pagamento dos produtos vendidos diretamente na sua conta bancária quinzenalmente. Você pode acompanhar os valores e datas dos próximos depósitos pela Central do Vendedor.
        </p>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="bg-white rounded-xl p-4 shadow flex flex-col border-b"
        >
          <button
            className="flex items-center justify-between w-full font-semibold text-left text-gray-800 text-base md:text-lg"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span>{item.title}</span>
            <span
              className={`ml-2 transition-transform duration-200 ${
                open === idx ? "rotate-45" : "rotate-0"
              } text-2xl`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === idx ? "max-h-[800px] mt-4" : "max-h-0"
            }`}
          >
            <div className="text-gray-700 text-sm md:text-base">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}