import { AnimatedSection } from "../animations/AnimatedSections";
export default function PrivacyPoliticPage() {
  return (
    <AnimatedSection>
      <div className="min-h-screen flex flex-col py-12 px-4">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 border-b-2 py-4 border-solid border-gray-300 tracking-tight">
          POLÍTICA DE PRIVACIDADE
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          Esta Política de Privacidade descreve como a STIK coleta, usa e protege suas informações pessoais ao utilizar nossos serviços e nosso site.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 ">Coleta de Informações</h2>
          <p className=" text-gray-700">
            Coletamos informações que você nos fornece diretamente, como nome, e-mail e endereço, para processar seus pedidos, fornecer suporte e enviar comunicações de marketing, caso você opte por recebê-las.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 ">Uso das Informações</h2>
          <p className=" text-gray-700 mb-2">Suas informações são utilizadas para:</p>
          <ul className="list-disc list-inside text-gray-700 mb-2">
            <li>Processar e gerenciar seus pedidos.</li>
            <li>Melhorar a experiência de navegação e personalização do site.</li>
            <li>Comunicar sobre promoções e novidades.</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 ">Proteção de Dados</h2>
          <p className=" text-gray-700">
            Adotamos medidas de segurança técnicas e administrativas para proteger suas informações pessoais contra acesso não autorizado e uso indevido. Seus dados são armazenados de forma segura e apenas o pessoal autorizado tem acesso a eles.
          </p>
        </section>

        <p className=" text-gray-700 mt-8">
          Para mais informações, entre em contato conosco.
        </p>
      </div>
    </div>
    </AnimatedSection>
  );
}