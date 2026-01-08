import { articles } from "./articlesData";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleIdx = articles.findIndex(a => a.id === Number(id));
  const article = articles[articleIdx];
  if (!article) return <div className="p-10 text-center">Artigo não encontrado.</div>;

  // Próximo e anterior
  const prev = articles[articleIdx - 1];
  const next = articles[articleIdx + 1];

  // Leia também (3 artigos aleatórios, exceto o atual)
  const leiaTambem = articles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner gradiente */}
      <div className="w-full h-20 bg-gradient-to-r from-[#7da0ca] to-[#021024] justify-center flex items-end px-8 pb-6">
        <div>
          <nav className="text-white text-sm mb-2">
            <Link to="/">Home</Link> &gt; <Link to="/blog">Blog</Link> &gt; <span>{article.title}</span>
          </nav>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <img src={article.image} alt={article.title} className="w-full max-h-96 object-cover rounded-xl mb-6 mx-auto" />
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag, idx) => (
            <span key={tag + idx} className="bg-[#5483B3] text-white px-3 py-1 rounded-full text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-[#181C23] mb-2  pb-2">{article.title}</h1>
        <div className="text-gray-500 text-sm mb-6 border-b-2 border-gray-200 pb-2">{article.date}</div>
        {/* Conteúdo dinâmico */}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        {/* Navegação entre artigos */}
        <div className="flex justify-between items-center mt-12 mb-8">
          <button
            className={`px-6 py-2 rounded font-bold border ${prev ? "bg-white text-[#5483B3] hover:bg-[#B9D7EA]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            disabled={!prev}
            onClick={() => prev && navigate(`/blog/${prev.id}`)}
          >
            ANTERIOR
          </button>
          <button
            className={`px-6 py-2 rounded font-bold border ${next ? "bg-white text-[#5483B3] hover:bg-[#B9D7EA]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            disabled={!next}
            onClick={() => next && navigate(`/blog/${next.id}`)}
          >
            PRÓXIMO
          </button>
        </div>
        </div>
        {/* Leia também */}
        <div className="bg-white max-w-full mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4 mx-auto max-w-4xl">Leia também</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl h-full mx-auto">
          {leiaTambem.map(a => (
            <Link to={`/blog/${a.id}`} key={a.id} className="rounded-xl overflow-hidden shadow bg-white group transform transition-transform duration-300 hover:scale-105 flex flex-col">
            <div className="relative">
              <img src={a.image} alt={a.title} className="w-full h-64 object-cover object-center mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent  rounded-xl" />
                <div className="absolute bottom-0 left-0 w-full px-3 pb-3 flex flex-wrap gap-2 z-10">
          {a.tags.map((tag, idx) => (
            <span
              key={tag + idx}
              className="bg-white/90 text-[#5483B3] px-2 py-1 rounded text-xs font-semibold mb-1"
            >
              {tag}
            </span>
          ))}
          <h2 className="text-base font-sans text-white leading-tight break-words w-full mt-2">
            {a.title}
          </h2>
        </div>
              </div>
            </Link>
          ))}
      </div>
      </div>
    </div>
  );
}
