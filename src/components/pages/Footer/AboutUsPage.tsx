import { motion } from 'framer-motion';
import { container, item } from '../../animations/StaggeredEffect';

export default function AboutUsPage() {
  return (
    <div className="] min-h-screen w-full text-gray-800">

    <div className="max-w-7xl mx-auto px-4 border-b-2 border-solid border-gray-200 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
            <h1 className="text-4xl font-bold  my-10 md:mb-24 text-left">Quem Somos</h1>
            <p className="text-lg leading-relaxed mb-6">
                Fundada em 1968, a STIK Elásticos nasceu do desejo de inovar no setor de moda íntima, oferecendo soluções ágeis e personalizadas para o mercado nacional. Com uma trajetória marcada pela busca constante de qualidade, tecnologia e atendimento diferenciado, a empresa se consolidou como referência no segmento, sempre valorizando parcerias e o desenvolvimento local.
            </p>
            <p className="text-lg leading-relaxed">
                Nossa missão é entregar produtos de excelência, com preços justos e respeito ao cliente, promovendo crescimento sustentável e inovação contínua. Acreditamos no potencial criativo e na força do trabalho em equipe para superar desafios e construir um futuro melhor.
            </p>
            </div>
            <div className="flex justify-center">
            <img
                src="/img/SobreNos/primeira foto.png"
                alt="Equipe STIK Elásticos"
                className="w-auto h-full object-cover"
            />
            </div>
        </div>
    </div>
      {/* Banner com imagens */}
            <motion.div 
            className="max-w-7xl mx-auto pt-8 flex flex-wrap justify-center gap-6 border-b-2 border-solid border-gray-200 pb-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            >
            {["/img/SobreNos/maquina1.png", "/img/SobreNos/maquina2.png", "/img/SobreNos/maquina3.png", "/img/SobreNos/maquina4.png"].map((src, i) => (
                <motion.img
                    key={i}
                    src={src}
                    alt={`Sobre nós ${i + 1}`}
                    className="w-72 h-72 object-cover rounded-xl transition-shadow hover:shadow-xl" 
                    variants={item}
                />
            ))}
            </motion.div>
      {/* Frase de impacto */}
      <div className="max-w-3xl mx-auto mt-12 mb-8 text-center">
        <blockquote className="italic text-2xl font-semibold text-[#181C23]">
          “Inovar para avançar, crescer com qualidade e respeito, é o que nos move todos os dias.”
        </blockquote>
      </div>

      {/* Card de relatório ou destaque */}
      <div className="flex justify-center mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-7xl w-full">
          <img src="/img/SobreNos/relatorio.jpg" alt="Relatório de Transparência" className="rounded-lg mb-4" />
          <p className="text-gray-700 text-base">
            Valorizamos a igualdade, a diversidade e a transparência em todas as nossas ações. Nosso relatório de responsabilidade social está disponível para consulta, reafirmando nosso compromisso com um ambiente de trabalho justo e inclusivo.
          </p>
        </div>
      </div>
    </div>
  );
}