import { articles } from "./articlesData";
import { Link } from "react-router-dom";
import { AnimatedSection } from "../../animations/AnimatedSections";

const TAGS_PER_LINE = 3;
const ARTICLES_PER_PAGE = 9;

export default function BlogPage() {
  const page = 1; // Para exemplo fixo, depois pode ser dinâmico
  const paginated = articles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner gradiente */}
      <div className="w-full h-32 bg-gradient-to-r from-[#7da0ca]  to-[#021024] flex items-center text-center justify-center px-8 pb-6">
        <div>
          <nav className="text-white text-sm mb-2">
            <Link to="/">Home</Link> &gt; <Link to="/blog">Blog</Link>
          </nav>
          <h1 className="text-4xl font-bold text-white">Blog</h1>
        </div>
      </div>
      <AnimatedSection>
      {/* Grid de artigos */}
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {paginated.map(article => (
          <Link to={`/blog/${article.id}`} key={article.id} className="rounded-xl overflow-hidden shadow bg-white hover:shadow-lg  flex flex-col group transform transition-transform duration-300 hover:scale-105">
            <div className="relative">
              <img src={article.image} alt={article.title} className="w-full h-56 object-cover object-center mx-auto" />
              {/* Gradiente das imagens */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent  rounded-xl" />
              {/* Tags */}
              <div className="absolute bottom-0 left-0 w-full px-3 pb-3 flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span
                    key={tag + idx}
                    className="bg-white/90 text-[#5483B3] px-2 py-1 rounded text-xs font-semibold mb-1"
                
                  >
                    {tag}
                  </span>
                ))}
              <h2 className="text-lg font-sans text-gray-100 leading-tight break-words">
                {article.title}
              </h2>
              </div>
            </div>
            
          </Link>
        ))}
      </div>
      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded border font-bold ${page === i + 1 ? "bg-[#5483B3] text-white" : "bg-white text-[#5483B3]"}`}
              onClick={() => {
                // Lógica para mudar de página
                }
              } 
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AnimatedSection>
    </div>
  );
}
