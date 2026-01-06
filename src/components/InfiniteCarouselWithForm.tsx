import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/img/tumb-blog-01.jpg",
    "/img/thumb-blog-09-1024x683.jpg",
    "/img/thumb-blog-17-1.jpg",
    "/img/IMG_9257-Editar-1024x683.jpg",
    "/img/arranjo-de-lingerie-feminina-natureza-morta-1024x683.jpg"
];

export default function InfiniteCarouselWithForm() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current!);
  }, [index]);

  return (
    <div className="relative w-full h-[420px] md:h-[600px] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="
        w-full max-w-md mx-auto 
        bg-white/80 rounded-lg p-6 shadow-lg
        mb-0 md:mb-0
        bottom-0
        md:static
        translate-y-24 md:translate-y-0
        ">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">BAIXE NOSSO CATÁLOGO</h2>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Seu e-mail..."
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#5483B3] text-white px-6 py-2 rounded font-semibold hover:bg-[#052659] transition"
            >
              Inscrever-se
            </button>
            <label className="flex items-center text-xs text-gray-700 mt-2">
              <input type="checkbox" required className="mr-2" />
              <span>Eu concordo em receber comunicações da Stik por e-mail (promoções e novidades). Li a <a href="#" className="underline ml-1">Política de Privacidade</a>.</span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}