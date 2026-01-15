import { useState } from "react";
import { TrashIcon, XIcon } from "lucide-react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function CreateArticlePage() {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Selecione um arquivo de imagem.");
            return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
    }
    // Titulo do artigo
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState<string | null>(null);

    // Conteúdo do artigo
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState<string | null>(null);

    // Tags
    const [allTags, setAllTags] = useState<string[]>(["Dicas", "Novidades", "Tutoriais", "Lançamentos"]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [tagError, setTagError] = useState<string | null>(null);

    // Adicionar tags existentes
    const handleSelectTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
            setTagError(null);
        }
    };

    // Remover tags selecionadas
    const handleRemoveTag = (tag: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    // Função para criar nova tag
    const handleCreateTag = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tag = newTag.trim();
    if (!tag) return;
    if (allTags.includes(tag)) {
        setTagError("Tag já existe.");
        return;
    }
    setAllTags([...allTags, tag]);
    setSelectedTags([...selectedTags, tag]);
    setNewTag("");
    setTagError(null);
    };

    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      let valid = true;
  
      if (!image) {
        setError("A imagem é obrigatória.");
        valid = false;
      } else {
        setError(null);
      }
  
      if (!title.trim()) {
        setTitleError("O título é obrigatório.");
        valid = false;
      } else {
        setTitleError(null);
      }
  
      if (!content || content === "<p><br></p>") {
        setContentError("O conteúdo é obrigatório.");
        valid = false;
      } else {
        setContentError(null);
      }
  
      if (selectedTags.length === 0) {
        setTagError("Adicione pelo menos uma tag.");
        valid = false;
      } else {
        setTagError(null);
      }
  
      if (!valid) return;
      
      const newArticle = {
        id: Date.now(),
        title,
        image: imagePreview,
        tags: selectedTags,
        category: "Estilo",
        date: new Date().toLocaleDateString("pt-BR", {day: "numeric", month: "long", year: "numeric"}),
        content, 
      }

      // Salvar no localStorage
      const customArticles = JSON.parse(localStorage.getItem("customArticles") || "[]");
      customArticles.push(newArticle);
      localStorage.setItem("customArticles", JSON.stringify(customArticles));
  
      // Aqui você pode salvar o artigo (ex: localStorage, arquivo, etc)
      setSuccess("Artigo cadastrado com sucesso!");
      // Limpar campos se desejar
        // setImage(null);
        // setImagePreview(null);
        // setTitle("");
        // setContent("");
        // setSelectedTags([]);

      
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl text-center font-bold mb-8">Cadastrar Artigo</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6 w-full">
                    <label className="block font-semiboldmb-2">Imagem Principal <span className="text-red-500">*</span></label>
                    <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-auto border rounded px-3 py-2"
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {imagePreview && (
                        <div className="mt-4 relative inline-block">
                            <img src={imagePreview} alt="Preview" className="max-h-64 rounded shadow" />
                            <button
                            type="button"
                            onClick={() => {
                                setImage(null);
                                setImagePreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                            title="Remover imagem"
                            >
                            <TrashIcon className="h-6 w-6" />
                            </button>
                        </div>
                    )}
                    <label className="block font-semibold my-2">
                        Título <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (e.target.value.trim() === "") {
                                setTitleError("O título é obrigatório.");
                            } else {
                                setTitleError(null);
                            }
                        }}
                        className="block w-full border rounded px-3 py-2"
                        placeholder="Digite aqui..."
                    />
                    {titleError && <p className="text-red-500 mt-2">{titleError}</p>}
                    <label className="block font-semibold my-2">
                        Conteúdo <span className="text-red-500">*</span>
                    </label>
                    <ReactQuill theme="snow" 
                    value={content}
                    onChange={setContent}
                    className="bg-white overflow-auto max-h-70"
                    placeholder="Digite aqui..."
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, false]}],
                            ['bold', 'italic', 'underline','strike', 'blockquote'],
                            [{'color': [] }, { 'background': [] }],
                            [{'align': [] }],
                            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image'],
                            ['clean']
                        ],
                    }}
                    />
                    {contentError && <p className="text-red-500 mt-2">{contentError}</p>}
                
                    <div className="mb-6 w-full">
                <label className="block font-semibold my-2">Tags</label>
                <div className="flex items-center flex-wrap border rounded px-3 py-2 min-h-[48px] bg-white focus-within:ring-2 focus-within:ring-[#5483b3]">
                    {/* Chips das tags selecionadas */}
                    {selectedTags.map((tag) => (
                    <span
                        key={tag}
                        className="flex items-center bg-[#5483b3] text-white px-3 py-1 rounded-full text-sm mr-2 mb-1"
                    >
                        {tag}
                        <button
                        type="button"
                        onClick={() => {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                            setAllTags(allTags.filter(t => t !== tag));
                        }}
                        className="ml-2 focus:outline-none"
                        title="Remover tag"
                        >
                        <XIcon className="h-4 w-4" />
                        </button>
                    </span>
                    ))}
                    {/* Input para nova tag */}
                    <input
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter" && newTag.trim()) {
                        e.preventDefault();
                        const tag = newTag.trim();
                        if (!selectedTags.includes(tag)) {
                            setSelectedTags([...selectedTags, tag]);
                            setAllTags([...allTags, tag]);
                            setNewTag("");
                            setTagError(null);
                        } else {
                            setTagError("Tag já adicionada.");
                        }
                        }
                    }}
                    className="flex-1 min-w-[120px] border-0 focus:ring-0 outline-none py-1"
                    placeholder="Adicionar tag..."
                    />
                </div>
                {tagError && <p className="text-red-500 mt-2">{tagError}</p>}
                </div>
                <button
        type="submit"
        className="mt-6 bg-[#5483b3] text-white px-6 py-2 rounded font-bold hover:bg-[#052659] transition"
      >
        Salvar Artigo
      </button>
      {success && <p className="text-green-600 mt-4">{success}</p>}
                </div>
                </form>
        </div>
    )
}