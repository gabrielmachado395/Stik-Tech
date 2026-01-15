import { useState } from "react";

const faqs = [
  {
    question: "O site STIK Online é seguro?",
    answer: "Sim, utilizamos protocolos de segurança para proteger seus dados e garantir uma compra segura."
  },
  {
    question: "Os produtos são originais?",
    answer: "Todos os produtos comercializados são originais e passam por rigoroso controle de qualidade."
  },
  {
    question: "Quais as formas de entrega?",
    answer: "Trabalhamos com Correios e transportadoras parceiras. O prazo e valor variam conforme o CEP."
  },
  {
    question: "Preço do Frete, como consultar?",
    answer: "Você pode simular o frete informando seu CEP na página do produto ou no carrinho."
  },
  {
    question: "Em quanto tempo eu recebo meu pedido?",
    answer: "O prazo depende da sua região e da forma de envio escolhida. Após a postagem, você recebe o código de rastreio."
  },
  {
    question: "O site possui Frete Grátis?",
    answer: "Sim, para compras acima de R$149,99 o frete é grátis para todo o Brasil."
  },
  {
    question: "Como funciona o Cupom de Desconto?",
    answer: "Basta inserir o cupom no campo indicado no carrinho para receber o desconto."
  },
  {
    question: "É possível acrescentar produto ou trocar endereço após o pedido fechado?",
    answer: "Entre em contato com nosso atendimento o quanto antes para verificar a possibilidade."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-12 px-6 md:px-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">DÚVIDAS FREQUENTES</h1>
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-[#E9E6F6]">
              <button
                className={`w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-gray-800 text-left focus:outline-none transition-all ${
                  openIndex === idx ? "border" : "grey-800"
                }`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.question}
                <span className={`ml-4 w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-gray-200 transition-transform ${openIndex === idx ? "rotate-180" : ""}`}>
                  <svg width="18" height="18" fill="none" stroke="#5B21B6" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4  text-gray-700 text-base animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Seção de contato */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">ENTRE EM CONTATO</h2>
        <form className="space-y-6 max-w-5xl mx-auto">
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Nome</label>
            <input type="text" placeholder="Ex: Maria Silva" className="w-full border border-[#E9E6F6] rounded-lg px-4 py-2 focus:outline-none focus:border-[#A78BFA]" />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Email</label>
            <input type="email" placeholder="Ex: seuEmail@email.com" className="w-full border border-[#E9E6F6] rounded-lg px-4 py-2 focus:outline-none focus:border-[#A78BFA]" />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Telefone</label>
            <input type="tel" placeholder="Ex: (xx) x xxxx-xxxx" className="w-full border border-[#E9E6F6] rounded-lg px-4 py-2 focus:outline-none focus:border-[#A78BFA]" />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Mensagem</label>
            <textarea rows={4} placeholder="Digite sua mensagem..." className="w-full border border-[#E9E6F6] rounded-lg px-4 py-2 focus:outline-none focus:border-[#A78BFA]" />
          </div>
          <button type="submit" className="w-full bg-[#5483B3] hover:bg-[#052659] text-white font-bold py-2 rounded-lg transition">ENVIAR</button>
        </form>
      </div>
    </div>
  );
}