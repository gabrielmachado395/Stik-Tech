import { useState } from "react";
import { Pencil } from "lucide-react";
import { useCart } from "../../utils/CartContext";
import FooterCheckoutPage  from "./FooterCheckoutPage";
import Header from "../../Header";
import { fetchAddressByCep } from "../../utils/fetchAddressByCep";

export default function PaymentPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "boleto" | "pix">("credit");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleCepSearch = async () => {
    const fetchedAddress = await fetchAddressByCep(cep);
    const result = fetchedAddress;
    if (!result) {
      setErrors((prev) => ({ ...prev, cep: "CEP não encontrado." }));
      alert("CEP não encontrado. Por favor, verifique e tente novamente.");
      return;
    }
    setErrors((prev) => ({ ...prev, cep: "" }));
    setAddress(result);
  };

  // Validação bloco 1
  const validatePersonalData = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.email) newErrors.email = "Preencha o e-mail.";
    if (!formData.primeiroNome) newErrors.primeiroNome = "Preencha o primeiro nome.";
    if (!formData.ultimoNome) newErrors.ultimoNome = "Preencha o último nome.";
    if (!formData.cpf) newErrors.cpf = "Preencha o CPF.";
    if (!formData.telefone) newErrors.telefone = "Preencha o telefone.";
    if (!formData.dataNascimento) newErrors.dataNascimento = "Preencha a data de nascimento.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validação bloco 2
  const validateAddress = () => {
    const newErrors: {[key: string]: string} = {};
    if (!address?.endereco) newErrors.endereco = "Preencha o endereço.";
    if (!address?.numero) newErrors.numero = "Preencha o número.";
    if (!address?.bairro) newErrors.bairro = "Preencha o bairro.";
    if (!address?.cidade) newErrors.cidade = "Preencha a cidade.";
    if (!address?.uf) newErrors.uf = "Preencha o UF.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [formData, setFormData] = useState({
    email: "",
    primeiroNome: "",
    ultimoNome: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
  });

  const { items, total} = useCart();

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];
  const years = Array.from({ length: 12 }, (_, i) => `${new Date().getFullYear() + i}`);

  return (
      <div className="items-center bg-white min-h-screen">
        <Header />
        <div className="flex flex-col md:flex-row w-full max-w-full md:max-w-5xl mx-auto gap-4 md:gap-8 px-2 md:px-0">
          {/* Coluna esquerda: Blocos principais */}
          <div className="flex flex-col flex-1 gap-4 md:gap-6">
          {/* Bloco 1: Dados Pessoais */}
          <div className="bg-white rounded shadow border flex-1">
            <div className="bg-gray-100 border rounded px-6 flex  items-center justify-between">
              <h2 className="font-bold text-lg  h-20 flex items-center text-[#5483B3] mb-2">
                1. Dados pessoais
              </h2>
              {step > 1 && (
                <button
                  type="button"
                  className="text-[#5483b3] hover:text-[#052659] p-2"
                  onClick={() => setStep(1)}
                  title="Editar"
                >
                  <Pencil size={19} />
                </button>
              )}
              </div>
              {step === 1 && (
                <form className="space-y-3 px-6 py-4">
                  <input className="w-full border rounded px-3 py-2" type="email" placeholder="E-mail" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                  <input className="w-full border rounded px-3 py-2" type="text" placeholder="Primeiro nome" value={formData.primeiroNome} onChange={e => setFormData({...formData, primeiroNome: e.target.value})} />
                  {errors.primeiroNome && <div className="text-red-500 text-xs">{errors.primeiroNome}</div>}
                  <input className="w-full border rounded px-3 py-2" type="text" placeholder="Último nome" value={formData.ultimoNome} onChange={e => setFormData({...formData, ultimoNome: e.target.value})} />
                  {errors.ultimoNome && <div className="text-red-500 text-xs">{errors.ultimoNome}</div>}
                  <input className="w-full border rounded px-3 py-2" type="text" placeholder="CPF" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} />
                  {errors.cpf && <div className="text-red-500 text-xs">{errors.cpf}</div>}
                  <input className="w-full border rounded px-3 py-2" type="tel" placeholder="Telefone" value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} />
                  {errors.telefone && <div className="text-red-500 text-xs">{errors.telefone}</div>}
                  <input className="w-full border rounded px-3 py-2" type="date" placeholder="Data de nascimento" value={formData.dataNascimento} onChange={e => setFormData({...formData, dataNascimento: e.target.value})} />
                  {errors.dataNascimento && <div className="text-red-500 text-xs">{errors.dataNascimento}</div>}
                  <button
                    type="button"
                    className="w-full bg-[#5483B3] text-white font-bold py-2 rounded mt-4"
                    onClick={() => {
                      if (validatePersonalData()) setStep(2);
                    }}
                  >
                    Ir para a entrega
                  </button>
                </form>
              )}
              {step > 1 && (
                <div className="px-6 py-4">
                <div className="mb-2">{formData.email}</div>
                <div className="mb-2">{formData.primeiroNome} {formData.ultimoNome}</div>
                <div className="mb-2">{formData.telefone}</div>
            </div>
              )}
          </div>
          {/* Bloco 2: Entrega */}
          <div className="bg-white rounded shadow border">
            <div className="bg-gray-100 border rounded px-6 flex items-center justify-between">
              <h2 className="font-bold text-lg  h-20 flex items-center text-[#5483B3] mb-2">
                2. Entrega
              </h2>
              <button
              type="button"
                className="text-[#5483b3] hover:text-[#052659] p-2"
                onClick={() => {
                  setStep(2)
                  setAddress(null);
                }}
                title="Editar"
              >
                <Pencil size={19} />
              </button>
              </div>
              {step < 2 && (
                <div className="text-gray-400">Preencha os dados pessoais para liberar</div>
              )}
              {step === 2 && (
                <form className="space-y-3">
                  {!address && (
                    <>
                      <input
                        className="w-full border rounded px-3 py-2"
                        placeholder="CEP"
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                      />
                      {errors.cep && <div className="text-red-500 text-xs">{errors.cep}</div>}
                      <button
                        type="button"
                        className="bg-[#5483B3] text-white font-bold py-2 rounded w-full"
                        onClick={handleCepSearch}
                      >
                        Buscar endereço
                      </button>
                    </>
                  )}
                  {address && (
                    <>
                      <input className="w-full border rounded px-3 py-2" value={address.endereco} placeholder="Endereço" onChange={e => setAddress({ ...address, endereco: e.target.value })} />
                      {errors.endereco && <div className="text-red-500 text-xs">{errors.endereco}</div>}
                      <input className="w-full border rounded px-3 py-2" value={address.numero} placeholder="Número" onChange={e => setAddress({ ...address, numero: e.target.value })} />
                      {errors.numero && <div className="text-red-500 text-xs">{errors.numero}</div>}
                      <input className="w-full border rounded px-3 py-2" value={address.complemento} placeholder="Complemento" onChange={e => setAddress({ ...address, complemento: e.target.value })} />
                      <input className="w-full border rounded px-3 py-2" value={address.bairro} placeholder="Bairro" onChange={e => setAddress({ ...address, bairro: e.target.value })} />
                      {errors.bairro && <div className="text-red-500 text-xs">{errors.bairro}</div>}
                      <input className="w-full border rounded px-3 py-2" value={address.cidade} placeholder="Cidade" onChange={e => setAddress({ ...address, cidade: e.target.value })} />
                      {errors.cidade && <div className="text-red-500 text-xs">{errors.cidade}</div>}
                      <input className="w-full border rounded px-3 py-2" value={address.uf} placeholder="UF" onChange={e => setAddress({ ...address, uf: e.target.value })} />
                      {errors.uf && <div className="text-red-500 text-xs">{errors.uf}</div>}
                      <button
                        type="button"
                        className="bg-[#5483B3] text-white font-bold py-2 rounded w-full mt-2"
                        onClick={() => {
                          if (validateAddress()) setStep(3);
                        }}
                      >
                        Ir para pagamento
                      </button>
                    </>
                  )}
                </form>
              )}
              {step > 2 && (
                <div className="px-6 py-4">
                  <div className="h-20">{address.endereco}, {address.numero} - {address.bairro}, {address.cidade} - {address.uf}</div>
                  <div>Em até 7 dias úteis</div>
                </div>
              )}
          </div>
          {/* Bloco 3: Pagamento */}
            <div className="bg-white rounded shadow border">
              <div className="bg-gray-100 border rounded px-6 flex items-center justify-between">
                <h2 className="font-bold text-lg h-20 flex items-center text-[#5483B3] mb-2">3. Pagamento</h2>
                <button
                  type="button"
                  className="text-[#5483b3] hover:text-[#052659] p-2"
                  onClick={() => setStep(3)}
                  title="Editar"
                  >
                  <Pencil size={19} />
                </button>
              </div>
              {step < 3 && (
                <div className="text-gray-400">Preencha os dados de entrega para liberar</div>
              )}
              {step === 3 && (
              <div className="px-6 py-4 space-y-3">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    className={`border rounded px-3 py-2 ${paymentMethod === "credit" ? "bg-[#f3f3fa] border-[#5483B3] font-bold" : ""}`}
                    onClick={() => setPaymentMethod("credit")}
                    >
                    Cartão de crédito
                  </button>
                  <button
                    type="button"
                    className={`border rounded px-3 py-2 ${paymentMethod === "boleto" ? "bg-[#f3f3fa] border-[#5483B3] font-bold" : ""}`}
                    onClick={() => setPaymentMethod("boleto")}
                  >
                    Boleto bancário
                  </button>
                  <button
                    type="button"
                    className={`border rounded px-3 py-2 ${paymentMethod === "pix" ? "bg-[#f3f3fa] border-[#5483B3] font-bold" : ""}`}
                    onClick={() => setPaymentMethod("pix")}
                  >
                    Pix
                  </button>
                </div>

                {/* Cartão de crédito */}
                {paymentMethod === "credit" && (
                  <>
                    <input className="w-full border rounded px-3 py-2" placeholder="Número do cartão" />
                    <input className="w-full border rounded px-3 py-2" placeholder="Nome impresso no cartão" />
                    <div className="flex gap-2">
                      <select className="w-1/2 border rounded px-3 py-2" defaultValue="">
                        <option value="" disabled>Mês/Venc</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select className="w-1/2 border rounded px-3 py-2" defaultValue="">
                        <option value="" disabled>Ano/Venc</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <input className="w-full border rounded px-3 py-2" placeholder="Código de segurança" />
                  </>
                )}

                {/* Boleto bancário */}
                {paymentMethod === "boleto" && (
                  <div className="text-gray-600 py-4">
                    O boleto será gerado após a finalização do pedido. Você poderá pagar em qualquer banco ou lotérica.
                  </div>
                )}

                {/* Pix */}
                {paymentMethod === "pix" && (
                  <div className="text-gray-600 py-4">
                    O QR Code para pagamento Pix será exibido após a finalização do pedido.
                  </div>
                )}
              </div>
            )}
            </div>
          
        </div>

          {/* Coluna direita: Resumo do pedido */}
          <div className="w-full md:w-[400px] md:min-w-[320px] mt-6 md:mt-0">
            <div className="bg-white rounded shadow border p-4 md:p-6 md:sticky md:top-8">
              <h2 className="font-bold text-lg text-[#5483B3] mb-2">Resumo do pedido</h2>
              <p className="text-gray-600 mb-4">Confira abaixo o resumo do seu pedido e finalize sua compra.</p>
              <div className="space-y-4 max-h-[400px]  overflow-y-auto">
                {items.length === 0 ? (
                  <div className="text-gray-400">Seu carrinho está vazio.</div>
                ) : (
                  items.map((item: any) => (
                    <div key={item.id + (item.variant || "")} className="flex items-center gap-4 border rounded p-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-500">Quantidade: {item.quantity}</div>
                      </div>
                      <div className="font-semibold text-[#5483B3]">R$ {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>
              <a href="/cart" className="text-[#5483B3] text-sm font-medium mt-8 hover:underline mb-4 
              block">
                Voltar para o carrinho
              </a>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Entrega</span>
                  <span className="font-bold">Grátis</span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#5483B3] hover:bg-[#052659] text-white font-bold py-3 rounded mt-2 transition"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
        <FooterCheckoutPage />
      </div>
    );
}