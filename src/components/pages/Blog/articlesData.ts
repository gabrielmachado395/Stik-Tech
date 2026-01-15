// src/components/pages/articlesData.ts
export interface Article {
  id: number;
  title: string;
  image: string;
  tags: string[];
  category: string;
  date: string;
  content: string;
}

const localArticles: Article[] = JSON.parse(localStorage.getItem("customArticles") || "[]");
export const articles: Article[] = [

//   {
//     id: 9,
//     title: "Mês da moda: os destaques que marcaram setembro",
//     image: "/img/Blog/teste_blog-768x384.png",
//     tags: ["Estilo", "Moda", "Negócios", "Tendências"],
//     category: "Estilo",
//     date: "7 dezembro, 2025",
//     content: `<h2>Setembro fashion</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p><img src='/img/Blog/teste_blog-768x384.png' style='max-width:100%;border-radius:12px;margin:24px 0;'/><p>O mês foi marcado por grandes lançamentos.</p>`
//   },
// //   {
// //     id: 10,
// //     title: "Tendência Club para moda esportiva",
// //     image: "/img/Blog/teste_blog-768x384.png",
// //     tags: ["Estilo", "Moda", "Negócios", "Tendências"],
// //     category: "Estilo",
// //     date: "10 dezembro, 2025",
// //     content: `<h2>Club esportivo</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p><img src='/img/Blog/teste_blog-768x384.png' style='max-width:100%;border-radius:12px;margin:24px 0;'/><p>O club esportivo é tendência nas passarelas.</p>`
// //   },
// //   {
// //     id: 11,
// //     title: "Lançamento editorial 2026/27",
// //     image: "/img/Blog/teste_blog-768x384.png",
// //     tags: ["Estilo", "Lançamentos", "Moda", "Tendências"],
// //     category: "Estilo",
// //     date: "12 dezembro, 2025",
// //     content: `<h2>Novos editoriais</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p><img src='/img/Blog/teste_blog-768x384.png' style='max-width:100%;border-radius:12px;margin:24px 0;'/><p>Confira os lançamentos editoriais para 2026/27.</p>`
// //   },
  {
    id: 12,
    title: "Roxo é o queridinho das passarelas de inverno em 2025",
    image: "/img/Blog/teste_blog-768x384.png",
    tags: ["Dicas", "Estilo", "Moda"],
    category: "Estilo",
    date: "15 dezembro, 2025",
    content: `<h2>Roxo nas passarelas</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.</p><img src='/img/Blog/teste_blog-768x384.png' style='max-width:100%;border-radius:12px;margin:24px 0;'/><p>O roxo é destaque nas coleções de inverno.</p>`
  }
].concat(localArticles);
