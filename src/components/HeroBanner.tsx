import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "/img/thumb-blog-09-1024x683.jpg",
  "/img/thumb-blog-17-1.jpg",
  "/img/tumb-blog-01.jpg"
];

export default function HeroBanner() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Scroll Automático
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Scroll para a imagem atual
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [index]);

  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <section className="relative h-[300px] md:h-[500px] flex items-center justify-center overflow-y-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <div 
            ref={carouselRef}
            className="w-full h-full flex scroll-smooth"
            style={{
              scrollSnapType: 'x mandatory',
              overflow: 'hidden',
            }}
          >
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Coleção ${i + 1}`}
                className="w-full h-full flex-shrink-0 transition-opacity duration-700 items-center justify-center"
                style={{
                  minWidth: "100%",
                  scrollSnapAlign: 'start',
                  opacity: index === i ? 1 : 0,
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  transition: 'opacity 0.7s ease-in-out',
                }}
                />
            ))}
            </div>
            
          </div>
            {/* Setas Laterais */}
            <button
              onClick={prev}
              className="absolute left-1 z-10 bg-white/70 hover:bg-white text-[#435c79] rounded-full p-2 shadow-md"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
              aria-label="Anterior"
            >
              <ChevronLeft />
            </button>
        
            <button
              onClick={next}
              className="absolute right-1 z-10 bg-white/70 hover:bg-white text-[#435c79] rounded-full p-2 shadow-md"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
              aria-label="Próximo"
            >
              <ChevronRight />
            </button>
            {/* Indicadores minimalistas */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-8 rounded transition-all duration-300 ${
                    index === i
                      ? "bg-[#7DA0CA]"
                      : "bg-white/60"
                  }`}
                />
              ))}
            </div>
    </section>
  );
}