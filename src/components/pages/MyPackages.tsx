
export default function MyPackages() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-20 px-4">
      <h1 className="text-2xl font-bold text-[#5483B3] mb-4">Você ainda não fez nenhum pedido!</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Quando você realizar uma compra, seus pedidos aparecerão aqui para acompanhamento e histórico.
      </p>
      <a href="/" className="bg-[#5483B3] text-white px-6 py-2 rounded font-semibold hover:bg-[#052659] transition">Ver produtos</a>
    </div>
  );
}
