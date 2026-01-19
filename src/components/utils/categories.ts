export type Category = {
  name: string;
  slug: string;
};

export const CATEGORIES: Category[] = [
  { name: 'Alimentos e Bebidas', slug: 'alimentos-e-bebidas' },
  { name: 'Automotivo', slug: 'automotivo' },
  { name: 'Bebês', slug: 'bebes' },
  { name: 'Beleza e Cuidados Pessoais', slug: 'beleza-e-cuidados-pessoais' },
  { name: 'Bolsas, Malas e Mochilas', slug: 'bolsas-malas-mochilas' },
  { name: 'Brinquedos e Jogos', slug: 'brinquedos-e-jogos' },
  { name: 'Casa, Jardim e Limpeza', slug: 'casa-jardim-limpeza' },
  { name: 'Celulares e Comunicação', slug: 'celulares-e-comunicacao' },
  { name: 'Computadores e Informática', slug: 'computadores-e-informatica' },
  { name: 'Cozinha', slug: 'cozinha' },
  { name: 'Eletrônicos, TV e Áudio', slug: 'eletronicos-tv-audio' },
  { name: 'Esportes, Aventura e Lazer', slug: 'esportes-aventura-lazer' },
  { name: 'Ferramentas e Construção', slug: 'ferramentas-e-construcao' },
  { name: 'Filmes, Séries e Música', slug: 'filmes-series-musica' },
  { name: 'Games e Consoles', slug: 'games-e-consoles' },
  { name: 'Livros', slug: 'livros' },
  { name: 'Papelaria e Escritório', slug: 'papelaria-e-escritorio' },
  { name: 'Pet Shop', slug: 'pet-shop' },
  { name: 'Roupas, Calçados e Acessórios', slug: 'roupas-calcados-acessorios' },
];

export function getCategorySlugByName(name: string): string | undefined {
  return CATEGORIES.find((c) => c.name === name)?.slug;
}

export function getCategoryHrefByName(name: string): string {
  const slug = getCategorySlugByName(name) ?? CATEGORIES[0]?.slug;
  return `/categorias/${slug}`;
}
