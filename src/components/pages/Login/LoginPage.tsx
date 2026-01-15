import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedSection } from "../../animations/AnimatedSections";
import { useAuth } from "../../utils/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [imagesOnLeft, setImagesOnLeft] = useState(false);

  const { setIsAuthenticated, redirectPath, setRedirectPath } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate(redirectPath || "/", { replace: true });
    setRedirectPath(null);
  } 
  const FADE_MS = 100;

  const switchToRegister = () => {
    if (isRegister) return;
    setLoginVisible(false);
    window.setTimeout(() => {
      setIsRegister(true);
      if (window.innerWidth >= 768) setImagesOnLeft(true); // só anima em md+
      setRegisterVisible(true);
    }, FADE_MS);
  };

  const switchToLogin = () => {
    if (!isRegister) return;
    setRegisterVisible(false);
    window.setTimeout(() => {
      setIsRegister(false);
      if (window.innerWidth >= 768) setImagesOnLeft(false); // só anima em md+
      setLoginVisible(true);
    }, FADE_MS);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <AnimatedSection className="w-full h-full max-w-5xl px-4">
      <div className="bg-white border rounded-2xl shadow-md flex flex-col mx-auto md:flex-row overflow-hidden max-w-3xl w-full relative">
        {/* Grid de imagens (sempre visível no desktop e sempre acima) */}
        <div
          className={`
            hidden md:block absolute inset-y-0 w-1/2 left-1/2
            transition-transform duration-500 ease-in-out
            ${imagesOnLeft ? "-translate-x-full" : "translate-x-0"}
            z-30 pointer-events-none
          `}
          style={{ willChange: "transform" }}
        >
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2 bg-gray-100">
            <img
              src="/img/IMG_9257-Editar-1024x683.jpg"
              alt=""
              className="object-cover w-full h-full row-span-1 col-span-2 anim"
              style={{ gridRow: "1", gridColumn: "1 / span 2" }}
            />
            <img
              src="/img/thumb-blog-09-1024x683.jpg"
              alt=""
              className="object-cover w-full h-full anim"
              style={{ gridRow: "2", gridColumn: "1" }}
            />
            <img
              src="/img/thumb-blog-17-1.jpg"
              alt=""
              className="object-cover w-full h-full anim"
              style={{ gridRow: "2", gridColumn: "2" }}
            />
          </div>
        </div>

        {/* Lado esquerdo: Login */}
        <div className={`md:w-1/2 w-full p-10 flex flex-col justify-center relative z-10 ${isRegister ? "hidden md:flex" : ""}`}>
          <div
            className={
              `transition-opacity duration-300 ` +
              (loginVisible ? "opacity-100" : "opacity-0 pointer-events-none")
            }
          >
          {/* Logo */}
          <img src="/img/logo.svg" alt="Logo STIK Elásticos" className="h-20 mb-6 mx-auto" />
          <h1 className="text-2xl font-bold mb-6 text-[#181C23]">Bem-vindo de volta</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 font-medium hover:bg-gray-100 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-5 w-5" />
              Entrar com Google
            </button>
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="mx-3 text-gray-400 text-sm">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ou Telefone</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                placeholder="Email ou Telefone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                  placeholder="Digite sua senha"
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
                className="w-full bg-[#5483B3] hover:bg-[#052659] text-white font-bold py-2 mt-4 rounded transition"
              >
                Entrar
              </button>

          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <button
              type="button"
              className="text-[#5483B3] hover:underline font-medium"
              onClick={switchToRegister}
            >
              Cadastre-se agora
          
            </button>
          </div>
        </div>
        </div>

        {/* Lado direito: Cadastro (desktop). No mobile, fica oculto como você pediu. */}
        <div className={`${isRegister ? "flex" : "hidden"} md:flex md:w-1/2 w-full p-10 flex-col justify-center relative z-10`}>
          <div
            className={
              `transition-opacity duration-300 ` +
              (registerVisible ? "opacity-100" : "opacity-0 pointer-events-none")
            }
          >
            <img src="/img/logo.svg" alt="Logo STIK Elásticos" className="h-20 mb-6 mx-auto" />
            <h1 className="text-2xl font-bold mb-6 text-[#181C23]">Crie sua conta</h1>
            <form className="space-y-4">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 font-medium hover:bg-gray-100 transition">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Cadastrar com Google
              </button>
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="mx-3 text-gray-400 text-sm">ou</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                  placeholder="Seu email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                  placeholder="Crie uma senha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirme sua senha</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3]"
                  placeholder="Confirme sua senha"
                />
              </div>
              <Link to="/register/confirmation">
              <button
                type="submit"
                className="w-full bg-[#5483B3] hover:bg-[#052659] text-white font-bold py-2 mt-4 rounded transition"
              >
                Cadastrar
              </button>
              </Link>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button
                type="button"
                className="text-[#5483B3] hover:underline font-medium"
                onClick={switchToLogin}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
      </AnimatedSection>
    </div>
  );
}