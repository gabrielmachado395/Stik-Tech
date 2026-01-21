import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Product } from "../../Products";

function readSellerName(): string {
  const fromStorage = localStorage.getItem("sellerName");
  return (fromStorage && fromStorage.trim()) || "NomeVendedor";
}

function readSellerAvatar(): string | null {
  const fromStorage = localStorage.getItem("sellerAvatar");
  return fromStorage && fromStorage.trim() ? fromStorage : null;
}

function loadSellerProducts(): Product[] {
  try {
    const raw = localStorage.getItem("produtosVendedor");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Product[]) : [];
  } catch {
    return [];
  }
}

function saveSellerProducts(next: Product[]) {
  localStorage.setItem("produtosVendedor", JSON.stringify(next));
}

export default function SellerDashboardPage() {
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState(readSellerName());
  const sellerAvatar = useMemo(() => readSellerAvatar(), []);
  const [products, setProducts] = useState<Product[]>(() => loadSellerProducts());

  useEffect(() => {
    const onStorage = () => {
      setSellerName(readSellerName());
      setProducts(loadSellerProducts());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleDelete = (id: number) => {
    const prod = products.find((p) => p.id === id);
    const ok = window.confirm(`Excluir o produto "${prod?.nome ?? ""}"?`);
    if (!ok) return;
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveSellerProducts(next);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-gradient-to-b from-[#0B1020] to-[#111B34] text-white px-5 py-6">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <img src="/img/logo.png" alt="Stik Tech" className="h-10 w-auto" />
          <div className="font-semibold">Seller Central</div>
        </Link>

        <nav className="flex-1 space-y-2">
          <button
            type="button"
            className="w-full text-left px-4 py-3 rounded-xl bg-white/10"
            onClick={() => navigate("/venda-com-a-gente/dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10"
            onClick={() => navigate("/venda-com-a-gente/adicionar-produto")}
          >
            Cadastrar produto
          </button>
        </nav>

        <div className="text-xs text-white/60">© 2026 Stik Tech</div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
            />
          </div>

          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            {sellerAvatar ? (
              <img src={sellerAvatar} alt="Avatar" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-[#5483B3] text-white flex items-center justify-center font-bold">
                {sellerName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="leading-tight">
              <div className="text-sm font-semibold text-gray-900">{sellerName}</div>
              <div className="text-xs text-gray-500">Seller</div>
            </div>
          </div>
        </div>

        {/* Hello section */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            {sellerAvatar ? (
              <img src={sellerAvatar} alt="Foto do vendedor" className="h-14 w-14 rounded-full object-cover" />
            ) : (
              <div className="h-14 w-14 rounded-full bg-[#0B1020] text-white flex items-center justify-center text-xl font-bold">
                {sellerName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <div className="text-gray-900 text-xl sm:text-2xl font-bold">Olá, {sellerName}</div>
              <div className="text-gray-500 text-sm">Confira seus produtos cadastrados.</div>
            </div>

            <div className="ml-auto">
              <Link
                to="/venda-com-a-gente/adicionar-produto"
                className="inline-flex items-center gap-2 bg-[#5483B3] hover:bg-[#1E3A8A] text-white font-semibold rounded-2xl px-4 py-3 transition"
              >
                <Plus className="w-4 h-4" />
                Adicionar produto
              </Link>
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-bold text-[#0B1020]">Produtos</div>
              <div className="text-xs text-gray-500">Seus produtos</div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-gray-500 text-sm py-10 text-center">
              Você ainda não cadastrou produtos.
              <div className="mt-3">
                <Link
                  to="/venda-com-a-gente/adicionar-produto"
                  className="text-[#5483B3] hover:underline"
                >
                  Cadastrar o primeiro produto
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((p) => {
                const image = Array.isArray(p.imagem) ? p.imagem[0] : p.imagem;
                return (
                  <div key={p.id} className="relative rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden group">
                    <div className="relative aspect-square bg-gray-50">
                      {image ? (
                        <img src={image} alt={p.nome} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">Sem imagem</div>
                      )}

                      {/* Delete (top-right) */}
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                        title="Excluir"
                        aria-label="Excluir"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate" title={p.nome}>
                            {p.nome}
                          </div>
                          <div className="text-xs text-gray-500 truncate" title={p.categoria}>
                            {p.categoria}
                          </div>
                        </div>

                        {/* Edit (right side) */}
                        <Link
                          to={`/venda-com-a-gente/adicionar-produto/${p.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#5483B3] hover:text-[#1E3A8A]"
                          title="Alterar produto"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Alterar
                        </Link>
                      </div>

                      <div className="mt-3 text-sm font-bold text-[#0B1020]">R$ {p.preco.toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
