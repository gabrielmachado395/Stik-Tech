import { useState} from "react";
import { products } from "./Products";
import  { useGoTo }  from "./utils/navigation";
import { Search } from "lucide-react";


// Remove acentos
function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


export default function SearchProducts() {
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const goTo = useGoTo();

    // Filtra produtos com base na consulta
    const results = query.length > 0
    ? products.filter(p =>
        removeAccents(p.nome.toLowerCase()).includes(removeAccents(query.toLowerCase()))
    )
    : [];

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={e => {
                    setQuery(e.target.value);
                    setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                placeholder="O que você está procurando?"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#B9D7EA]"
            />
            <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-400" />
            {showResults && results.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
                    <ul>
                        {results.map(prod => (
                            <li
                                key={prod.id}
                                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onMouseDown={() => {
                                    goTo(`/produto/${prod.id}`);
                                    setShowResults(false);
                                    setQuery("");
                                }}
                            >
                             <img src={prod.imagem} alt={prod.nome} className="w-12 h-12 object-cover rounded" />
                             <span className="text-gray-800">{prod.nome}</span>
                            </li>
                        ))}
                    </ul>
                    </div>
            )}
            {showResults && query.length > 0 && results.length === 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 p-4">
                    <p className="text-gray-600">Nenhum produto encontrado para "{query}".</p>
                </div>
            )}
        </div>
    )
}