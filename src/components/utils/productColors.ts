export type ProductColor = {
  nome: string;
  hex: string;
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ");
}

export const COLOR_SUGGESTIONS: ProductColor[] = [
  { nome: "Preto", hex: "#000000" },
  { nome: "Branco", hex: "#FFFFFF" },
  { nome: "Cinza", hex: "#9CA3AF" },
  { nome: "Cinza Claro", hex: "#E5E7EB" },
  { nome: "Cinza Chumbo", hex: "#374151" },

  { nome: "Azul", hex: "#2563EB" },
  { nome: "Azul Marinho", hex: "#1E3A8A" },
  { nome: "Azul Royal", hex: "#1D4ED8" },
  { nome: "Azul Bebê", hex: "#93C5FD" },
  { nome: "Azul Turquesa", hex: "#06B6D4" },

  { nome: "Vermelho", hex: "#DC2626" },
  { nome: "Vinho", hex: "#7F1D1D" },
  { nome: "Bordô", hex: "#7F1D1D" },

  { nome: "Verde", hex: "#16A34A" },
  { nome: "Verde Musgo", hex: "#166534" },
  { nome: "Verde Limão", hex: "#84CC16" },
  { nome: "Verde Água", hex: "#2DD4BF" },

  { nome: "Amarelo", hex: "#EAB308" },
  { nome: "Amarelo Canário", hex: "#FACC15" },

  { nome: "Rosa", hex: "#EC4899" },
  { nome: "Rosa Bebê", hex: "#FBCFE8" },
  { nome: "Rosa Choque", hex: "#DB2777" },

  { nome: "Roxo", hex: "#7C3AED" },
  { nome: "Lilás", hex: "#C4B5FD" },

  { nome: "Laranja", hex: "#F97316" },
  { nome: "Marrom", hex: "#92400E" },
  { nome: "Bege", hex: "#E7D3B0" },
  { nome: "Nude", hex: "#EBC0A3" },

  { nome: "Dourado", hex: "#D4AF37" },
  { nome: "Prateado", hex: "#C0C0C0" },
];

export function isHexColor(input: string): boolean {
  const value = input.trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

export function normalizeHex(input: string): string | null {
  const value = input.trim();
  if (!isHexColor(value)) return null;
  if (value.length === 4) {
    const r = value[1];
    const g = value[2];
    const b = value[3];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return value.toUpperCase();
}

export function findSuggestionByName(name: string): ProductColor | null {
  const n = normalizeText(name);
  if (!n) return null;
  const exact = COLOR_SUGGESTIONS.find((c) => normalizeText(c.nome) === n);
  return exact ?? null;
}

export function filterColorSuggestions(query: string, limit = 8): ProductColor[] {
  const q = normalizeText(query);
  if (!q) return [];
  return COLOR_SUGGESTIONS.filter((c) => normalizeText(c.nome).includes(q)).slice(0, limit);
}

export function coerceColors(
  value: unknown
): ProductColor[] | undefined {
  if (!value) return undefined;

  // Novo formato: [{nome, hex}]
  if (
    Array.isArray(value) &&
    value.every(
      (v) =>
        typeof v === "object" &&
        v !== null &&
        "nome" in v &&
        "hex" in v &&
        typeof (v as any).nome === "string" &&
        typeof (v as any).hex === "string"
    )
  ) {
    return (value as any[])
      .map((v) => ({ nome: String(v.nome), hex: normalizeHex(String(v.hex)) ?? "#9CA3AF" }))
      .filter((v) => v.nome.trim().length > 0);
  }

  // Formato antigo: ["Azul", "Preto"]
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    const mapped = (value as string[])
      .map((name) => {
        const suggestion = findSuggestionByName(name);
        if (suggestion) return suggestion;
        const maybeHex = normalizeHex(name);
        if (maybeHex) return { nome: name, hex: maybeHex };
        return { nome: name, hex: "#9CA3AF" };
      })
      .filter((v) => v.nome.trim().length > 0);

    return mapped.length ? mapped : undefined;
  }

  return undefined;
}
