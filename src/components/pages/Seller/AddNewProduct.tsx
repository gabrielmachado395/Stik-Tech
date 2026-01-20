import { useMemo, useState } from "react";
import type { ProductColor } from "../../utils/productColors";
import {
  filterColorSuggestions,
  findSuggestionByName,
  isHexColor,
  normalizeHex,
} from "../../utils/productColors";

const CATEGORIES = [
  "Roupas, Calçados e Acessórios",
  "Automotivo",
  "Beleza e Cuidados Pessoais",
  "Brinquedos e Jogos",
  "Casa, Jardim e Limpeza",
  "Cozinha",
  "Eletrônicos, TV e Áudio",
  "Esportes, Aventura e Lazer",
  "Ferramentas e Construção",
  "Games e Consoles",
  "Livros",
  "Papelaria e Escritório",
  "Pet Shop",
  "Bolsas, Malas e Mochilas",
  "Celulares e Comunicação",
  "Computadores e Informática",
  "Filmes, Séries e Música",
];

export default function AddNewProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [colorQuery, setColorQuery] = useState("");
  const [customHex, setCustomHex] = useState("#2563EB");
  const [colorError, setColorError] = useState<string | null>(null);
  const [isLaunch, setIsLaunch] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);

  // Simulação de upload de imagens
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const suggestions = useMemo(() => filterColorSuggestions(colorQuery, 8), [colorQuery]);
  const livePreviewHex = useMemo(() => {
    const q = colorQuery.trim();
    if (!q) return null;
    const byName = findSuggestionByName(q);
    if (byName) return byName.hex;
    const byHex = normalizeHex(q);
    return byHex;
  }, [colorQuery]);

  const addColor = (c: ProductColor) => {
    setColors((prev) => {
      const exists = prev.some((p) => p.nome.toLowerCase() === c.nome.toLowerCase() || p.hex === c.hex);
      if (exists) return prev;
      return [...prev, c];
    });
    setColorQuery("");
    setColorError(null);
  };

  const removeColor = (nome: string) => {
    setColors((prev) => prev.filter((c) => c.nome !== nome));
  };

  const tryAddFromQuery = () => {
    const q = colorQuery.trim();
    if (!q) return;
    const byName = findSuggestionByName(q);
    if (byName) {
      addColor(byName);
      return;
    }
    if (isHexColor(q)) {
      addColor({ nome: q.toUpperCase(), hex: normalizeHex(q) ?? "#9CA3AF" });
      return;
    }
    setColorError("Selecione uma sugestão (autocomplete) ou adicione manualmente com o seletor.");
  };

  // Categoria: selecionar existente ou criar nova
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "__new__") {
      setShowNewCategory(true);
      setCategory("");
    } else {
      setShowNewCategory(false);
      setCategory(e.target.value);
    }
  };

  // Simulação de submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converter imagens para base64
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const imagensBase64 = await Promise.all(images.map(toBase64));

    // Gerar slug
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    // Gerar id único (timestamp + random)
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const createdAt = Date.now();

    // Montar objeto do produto
    const produto = {
      id,
      createdAt,
      nome: name,
      categoria: showNewCategory ? newCategory : category,
      slug,
      imagem: imagensBase64.length === 1 ? imagensBase64[0] : imagensBase64,
      descricao: description,
      preco: hasDiscount ? Number(discountPrice) : Number(price),
      cores: colors,
      isLaunch,
      hasDiscount,
      originalPrice: hasDiscount ? Number(originalPrice) : undefined,
      discountPrice: hasDiscount ? Number(discountPrice) : undefined,
    };

    // Salvar no localStorage
    const produtosSalvos = JSON.parse(localStorage.getItem("produtosVendedor") || "[]");
    localStorage.setItem("produtosVendedor", JSON.stringify([...produtosSalvos, produto]));

    alert("Produto cadastrado! (simulação dinâmica)");
    // Limpar formulário ou redirecionar, se desejar
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Cadastrar novo produto</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Imagens */}
        <div>
          <label className="block font-semibold mb-1">Imagens do produto</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block border rounded-xl px-3 py-2 border-gray-300"
          />
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <span key={idx} className="text-xs text-gray-500 ">{img.name}</span>
            ))}
          </div>
        </div>
        {/* Nome */}
        <div>
          <label className="block font-semibold mb-1">Nome</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        {/* Preço */}
        <div>
          <label className="block font-semibold mb-1">Preço</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            min={0}
            step="0.01"
          />
        </div>
        {/* Descrição */}
        <div>
          <label className="block font-semibold mb-1">Descrição</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        {/* Cores */}
        <div>
          <label className="block font-semibold mb-1">Cores</label>

          {/* Chips selecionadas */}
          {colors.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {colors.map((c) => (
                <div
                  key={c.nome}
                  className="flex items-center gap-2 px-3 py-1 rounded-full border bg-white shadow-sm"
                  title={c.hex}
                >
                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.nome}
                  />
                  <span className="text-sm text-gray-700">{c.nome}</span>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-900 text-sm"
                    onClick={() => removeColor(c.nome)}
                    aria-label={`Remover ${c.nome}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input + autocomplete */}
          <div className="relative">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 pr-10"
              placeholder="Adicionar cor… (ex: Azul Marinho)"
              value={colorQuery}
              onChange={(e) => setColorQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  tryAddFromQuery();
                }
              }}
            />

            {livePreviewHex && (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border"
                style={{ backgroundColor: livePreviewHex }}
                title={livePreviewHex}
              />
            )}

            {suggestions.length > 0 && colorQuery.trim().length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-lg border bg-white shadow-lg overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    key={s.nome}
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => addColor(s)}
                  >
                    <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: s.hex }} />
                    <span className="text-sm text-gray-700">{s.nome}</span>
                    <span className="ml-auto text-xs text-gray-400">{s.hex}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Adição manual quando não houver match */}
          <div className="mt-2 flex items-center gap-3">
            <input
              type="color"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="h-10 w-12 p-0 border rounded"
              title="Escolher cor"
            />
            <button
              type="button"
              className="px-3 py-2 rounded border bg-gray-50 hover:bg-gray-100 text-sm"
              onClick={() => {
                const q = colorQuery.trim();
                if (!q) {
                  setColorError("Digite um nome para a cor antes de adicionar.");
                  return;
                }
                addColor({ nome: q, hex: (normalizeHex(customHex) ?? customHex).toUpperCase() });
              }}
            >
              Adicionar cor manual
            </button>
          </div>

          {colorError && <p className="text-sm text-red-600 mt-2">{colorError}</p>}
          <p className="text-xs text-gray-500 mt-2">
            Dica: escolha uma sugestão para converter automaticamente. Se não existir, use o seletor de cor.
          </p>
        </div>
        {/* Lançamento */}
        <div>
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={isLaunch}
              onChange={e => setIsLaunch(e.target.checked)}
            />
            Lançamento
          </label>
        </div>
        {/* Desconto */}
        <div>
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={e => setHasDiscount(e.target.checked)}
            />
            Produto em promoção/desconto
          </label>
          {hasDiscount && (
            <div className="flex gap-4 mt-2">
              <div>
                <label className="block text-sm">Preço original</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={originalPrice}
                  onChange={e => setOriginalPrice(e.target.value)}
                  min={0}
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm">Novo preço</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={discountPrice}
                  onChange={e => setDiscountPrice(e.target.value)}
                  min={0}
                  step="0.01"
                />
              </div>
            </div>
          )}
        </div>
        {/* Categoria */}
        <div>
          <label className="block font-semibold mb-1">Categoria</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={handleCategoryChange}
            required={!showNewCategory}
          >
            <option value="">Selecione uma categoria</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="__new__">Criar nova categoria</option>
          </select>
          {showNewCategory && (
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-2"
              placeholder="Nova categoria"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              required
            />
          )}
        </div>
        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-[#5483B3] hover:bg-[#1E3A8A] text-white font-bold rounded py-3 text-lg transition"
        >
          Cadastrar produto
        </button>
      </form>
    </div>
  );
}