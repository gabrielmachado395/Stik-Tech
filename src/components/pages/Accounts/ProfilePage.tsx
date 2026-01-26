import { useState, useEffect } from "react";
import { fetchAddressByCep } from "../../utils/fetchAddressByCep";
import { User, LogOut } from "lucide-react"; // ou qualquer ícone de sua preferência
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  // Informações pessoais
  const [personal, setPersonal] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  // Endereço
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });
  const [addressMsg, setAddressMsg] = useState("");

  // Cartões (simulação)
  const [cards, setCards] = useState<{ numero: string; nome: string }[]>([]);
  const [newCard, setNewCard] = useState({ numero: "", nome: "" });

  // Busca CEP
  const handleCepSearch = async () => {
    setAddressMsg("");
    const result = await fetchAddressByCep(cep);
    if (!result) {
      setAddressMsg("CEP não encontrado.");
      return;
    }
    setAddress({
      ...address,
      rua: result.endereco,
      bairro: result.bairro,
      cidade: result.cidade,
      estado: result.uf,
      cep,
    });
  };

  // Salvar cartão (simulação)
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.numero || !newCard.nome) return;
    setCards([...cards, newCard]);
    setNewCard({ numero: "", nome: "" });
  };
  
  const [editMode, setEditMode] = useState(false);
  const [backup, setBackup] = useState<any>(null);

  const handleEdit = () => {
    setBackup({ personal, address }); // salva estado atual para cancelar
    setEditMode(true);
  };

  const handleCancel = () => {
    setPersonal(backup.personal);
    setAddress(backup.address);
    setEditMode(false);
  };

  const handleSave = () => {
    // Aqui você pode fazer o PUT/POST para salvar no backend
    setEditMode(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redireciona para login ou recarrega a página
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,}
        });
        const data = await res.json();
        if (data.user) {
          setPersonal({
            nome: `${data.user.primeiroNome} ${data.user.ultimoNome}`,
            email: data.user.email,
            telefone: data.user.telefone || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };
    fetchProfile();
  }, []);
  
  
  return (
    <div className="w-full bg-gray-100 py-8 flex">
    {/* Conteúdo principal */}
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-8 flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-[#5483B3]">Meu Perfil</h2>
        {!editMode && (
          <button className="bg-[#5483B3] text-white font-bold py-2 px-4 rounded-full hover-btn" onClick={handleEdit}>
            Editar perfil
          </button>
        )}
      </div>

      {/* Informações Pessoais */}
      <div className="space-y-2 border-b pb-6">
        <h3 className="font-bold text-lg text-[#5483B3]">Informações Pessoais</h3>
        <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={personal.nome} onChange={e => setPersonal({ ...personal, nome: e.target.value })} placeholder="Nome" />
        <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} placeholder="Email" />
        <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={personal.telefone} onChange={e => setPersonal({ ...personal, telefone: e.target.value })} placeholder="Telefone" />
      </div>

      {/* Endereço */}
      <div className="space-y-2 border-b pb-6">
        <h3 className="font-bold text-lg text-[#5483B3]">Endereço</h3>
        <div className="flex gap-2">
          <input disabled={!editMode} className="md:w-1/2 w-1/2 border rounded-xl px-3 py-2" value={address.cep} onChange={e => setAddress({ ...address, cep: e.target.value })} placeholder="CEP" />
          <button disabled={!editMode || !address.cep} className="bg-[#5483B3] text-white font-bold py-2 px-4 rounded-full hover-btn" onClick={handleCepSearch}>Buscar CEP</button>
        </div>
        {addressMsg && <p className="text-red-500 text-sm">{addressMsg}</p>}
        <div className="flex gap-2">
          <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={address.rua} onChange={e => setAddress({ ...address, rua: e.target.value })} placeholder="Rua" />
        <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={address.numero} onChange={e => setAddress({ ...address, numero: e.target.value })} placeholder="Número" />
        </div>
        <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={address.bairro} onChange={e => setAddress({ ...address, bairro: e.target.value })} placeholder="Bairro" />
        <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={address.cidade} onChange={e => setAddress({ ...address, cidade: e.target.value })} placeholder="Cidade" />
        <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2" value={address.estado} onChange={e => setAddress({ ...address, estado: e.target.value })} placeholder="Estado" />
      </div>


      {/* Bloco 3: Formas de Pagamento (simulação) */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg text-[#5483B3]">Formas de Pagamento</h2>
        <form className="space-y-2" onSubmit={handleAddCard}>
          <input className="w-full border rounded-xl px-3 py-2" value={newCard.numero} onChange={e => setNewCard({ ...newCard, numero: e.target.value })} placeholder="Número do cartão" />
          <input className="w-full border rounded-xl px-3 py-2" value={newCard.nome} onChange={e => setNewCard({ ...newCard, nome: e.target.value })} placeholder="Nome impresso" />
          <div className="flex gap-2">
            <input disabled={!editMode} className="w-full border rounded-xl px-3 py-2 mt-2" placeholder="Validade" />
            <input disabled={!editMode} type="text" className="w-full border rounded-xl px-3 py-2 mt-2" placeholder="CVV" />
          </div>
        </form>
        <ul className="space-y-2 mt-4">
          {cards.map((card, i) => (
            <li key={i} className="border rounded-xl px-3 py-2 flex justify-between items-center">
              <span>**** {card.numero.slice(-4)} - {card.nome}</span>
              {/* Botão de remover pode ser adicionado aqui */}
            </li>
          ))}
        </ul>
      </div>

      {editMode && (
        <div className="flex gap-4 justify-end mt-6">
          <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full hover-btn" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="bg-[#5483B3] text-white font-bold py-2 px-4 rounded-full hover-btn" onClick={handleSave}>
            Salvar alterações
          </button>
        </div>
      )}
      </div>

      {/* Sidebar minimalista à direita */}
      <div className="fixed right-0 top-0 h-full flex flex-col items-center bg-white border-l shadow-lg py-8 px-2 z-40">
        <button
          className="mb-6 p-3 rounded-full hover:bg-gray-100 transition"
          title="Dados pessoais"
          // Aqui você pode adicionar navegação para outras abas futuramente
        >
          <User size={28} className="text-[#5483B3]" />
        </button>
        <button
          className="mt-auto p-3 rounded-full hover:bg-red-100 transition"
          title="Sair"
          onClick={handleLogout}
        >
          <LogOut size={28} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}