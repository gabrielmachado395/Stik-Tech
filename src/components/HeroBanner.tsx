export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-[#6a00b0] to-[#af8fc4] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nova Coleção
            </h1>
            <p className="text-xl mb-6">
              Lingeries que valorizam sua beleza e conforto
            </p>
            <button className="bg-white text-[#6a00b0] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Conferir Coleção
            </button>
          </div>
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <span className="text-white/50 text-lg">Imagem da Coleção</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
