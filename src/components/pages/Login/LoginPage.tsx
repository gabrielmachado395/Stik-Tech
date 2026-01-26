import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { AnimatedSection } from "../../animations/AnimatedSections";
import { useAuth } from "../../utils/AuthContext";
import { fetchAddressByCep } from "../../utils/fetchAddressByCep";

type GridSide = "left" | "right";

function GridLateral({ side }: { side: GridSide }) {
  return (
    <motion.div
      className="hidden md:block md:w-1/2 bg-gray-100 p-2"
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
        <img
          src="/img/IMG_9257-Editar-1024x683.jpg"
          alt=""
          className="object-cover w-full h-full"
          style={{ gridRow: "1", gridColumn: "1 / span 2" }}
        />
        <img
          src="/img/thumb-blog-09-1024x683.jpg"
          alt=""
          className="object-cover w-full h-full"
          style={{ gridRow: "2", gridColumn: "1" }}
        />
        <img
          src="/img/thumb-blog-17-1.jpg"
          alt=""
          className="object-cover w-full h-full"
          style={{ gridRow: "2", gridColumn: "2" }}
        />
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const [isRegister, setIsRegister] = useState(false);

  const { setIsAuthenticated, redirectPath, setRedirectPath } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailOrPhone,
          password,
        }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate(redirectPath || "/", { replace: true });
        setRedirectPath(null);
      } else {
        setErro(data.error || "Falha ao autenticar.");
      }
    } catch {
      setErro("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const [registerData, setRegisterData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [registerErro, setRegisterErro] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [cepMsg, setCepMsg] = useState("");

  const handleCepSearch = async () => {
    setCepMsg("");
    const result = await fetchAddressByCep(registerData.cep);

    if (!result) {
      setCepMsg("CEP não encontrado.");
      return;
    }

    setRegisterData({
      ...registerData,
      rua: result.endereco,
      bairro: result.bairro,
      cidade: result.cidade,
      estado: result.uf,
    });
  };
  
  const isEmpty = (str: string) => !str || str.trim() === "";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterErro("");
    setRegisterLoading(true);

    // Validação especial para número: não pode ser vazio e tem que ser número positivo
    if (
      isEmpty(registerData.nome) ||
      isEmpty(registerData.email) ||
      isEmpty(registerData.senha) ||
      isEmpty(registerData.confirmaSenha) ||
      isEmpty(registerData.telefone) ||
      isEmpty(registerData.cep) ||
      isEmpty(registerData.rua) ||
      isEmpty(registerData.bairro) ||
      isEmpty(registerData.cidade) ||
      isEmpty(registerData.estado) ||
      isEmpty(registerData.numero) ||
      isNaN(Number(registerData.numero)) ||
      Number(registerData.numero) <= 0
    ) {
      setRegisterErro("Preencha todos os campos corretamente.");
      setRegisterLoading(false);
      return;
    }

    if (registerData.senha !== registerData.confirmaSenha) {
      setRegisterErro("As senhas não coincidem.");
      setRegisterLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.senha,
          nome: registerData.nome,
          telefone: registerData.telefone,
          cep: registerData.cep,
          rua: registerData.rua,
          numero: Number(registerData.numero),
          bairro: registerData.bairro,
          cidade: registerData.cidade,
          estado: registerData.estado,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsRegister(false);
        setRegisterErro("");
      } else {
        setRegisterErro(data.error || "Erro ao cadastrar.");
      }
    } catch {
      setRegisterErro("Erro de conexão com o servidor.");
    } finally {
      setRegisterLoading(false);
    }
  };

  const layoutTransition: Transition = {
    type: "spring",
    stiffness: 260,
    damping: 26,
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <AnimatedSection className="w-full h-full max-w-5xl px-4">
        {/* wrapper fixo que anima o tamanho do card (cresce/encolhe) */}
        <motion.div layout transition={layoutTransition} className="mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            {!isRegister ? (
              <motion.div
                key="login"
                layout
                initial={{ opacity: 0, x: -48, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 48, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white border rounded-2xl shadow-2xl flex flex-col mx-auto md:flex-row overflow-hidden max-w-3xl w-full"
              >
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                  <img
                    src="/img/logo.svg"
                    alt="Logo STIK Elásticos"
                    className="h-20 mb-6 mx-auto"
                  />

                  <h1 className="text-2xl font-bold mb-6 text-[#181C23]">
                    Bem-vindo de volta
                  </h1>

                  <form className="space-y-4" onSubmit={handleLogin}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 font-medium hover:bg-gray-100 transition"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                        alt="Google"
                        className="h-5 w-5"
                      />
                      Entrar com Google
                    </button>

                    <div className="my-6 flex items-center">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="mx-3 text-gray-400 text-sm">ou</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email ou Telefone
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                        placeholder="Seu email"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                          placeholder="Digite sua senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2 text-gray-400"
                          onClick={() => setShowPassword((v) => !v)}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="accent-[#5483B3]" />
                        Lembrar-me
                      </label>
                      <a href="#" className="text-[#5483B3] hover:underline">
                        Esqueceu a senha?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#5483B3] hover-btn text-white font-bold py-2 mt-4 rounded transition"
                      disabled={loading}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </button>

                    {erro && (
                      <div className="mt-4 text-red-600 text-sm text-center">
                        {erro}
                      </div>
                    )}
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600">
                    Não tem uma conta?{" "}
                    <button
                      type="button"
                      className="text-[#5483B3] hover:underline font-medium"
                      onClick={() => setIsRegister(true)}
                    >
                      Cadastre-se agora
                    </button>
                  </div>
                </div>

                <GridLateral side="right" />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                layout
                initial={{ opacity: 0, x: 48, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -48, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white border rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden mx-auto my-12 max-w-4xl w-full"
              >
                <GridLateral side="left" />

                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                  <img
                    src="/img/logo.svg"
                    alt="Logo STIK Elásticos"
                    className="h-20 mb-6 mx-auto"
                  />

                  <h1 className="text-2xl font-bold mb-6 text-[#181C23]">
                    Crie sua conta
                  </h1>

                  <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Nome completo"
                      value={registerData.nome}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          nome: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Seu email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Crie uma senha"
                      value={registerData.senha}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          senha: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Confirme sua senha"
                      value={registerData.confirmaSenha}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmaSenha: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Telefone"
                      value={registerData.telefone}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          telefone: e.target.value,
                        })
                      }
                      required
                    />

                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="CEP"
                        value={registerData.cep}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            cep: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        className="bg-[#5483B3] text-white font-bold px-4 rounded hover-btn"
                        onClick={handleCepSearch}
                      >
                        Buscar CEP
                      </button>
                    </div>

                    {cepMsg && (
                      <div className="text-red-500 text-sm">{cepMsg}</div>
                    )}

                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Rua"
                      value={registerData.rua}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          rua: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Número"
                      value={registerData.numero}
                      onChange={e =>
                        setRegisterData({
                          ...registerData,
                          numero: e.target.value.replace(/\D/, ""), // só números
                        })
                      }
                      required
                    />

                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Bairro"
                      value={registerData.bairro}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          bairro: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Cidade"
                      value={registerData.cidade}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          cidade: e.target.value,
                        })
                      }
                      required
                    />

                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Estado"
                      value={registerData.estado}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          estado: e.target.value,
                        })
                      }
                      required
                    />

                    <button
                      type="submit"
                      className="w-full bg-[#5483B3] hover-btn text-white font-bold py-2 mt-4 rounded transition"
                      disabled={registerLoading}
                    >
                      {registerLoading ? "Cadastrando..." : "Cadastrar"}
                    </button>

                    {registerErro && (
                      <div className="mt-4 text-red-600 text-sm text-center">
                        {registerErro}
                      </div>
                    )}
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600">
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      className="text-[#5483B3] hover:underline font-medium"
                      onClick={() => setIsRegister(false)}
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}
