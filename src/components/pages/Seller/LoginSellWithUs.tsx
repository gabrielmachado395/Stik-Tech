import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginSellWithUs() {
  const [isRegister, setIsRegister] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [input, setInput] = useState("");
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const FADE_MS = 20;

  const switchToRegister = () => {
    if (isRegister) return;
    setLoginVisible(false);
    setTimeout(() => {
      setIsRegister(true);
      setRegisterVisible(true);
    }, FADE_MS);
  };

  const switchToLogin = () => {
    if (!isRegister) return;
    setRegisterVisible(false);
    setTimeout(() => {
      setIsRegister(false);
      setLoginVisible(true);
    }, FADE_MS);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center">
      {/* Logo */}
      <Link to="/venda-com-a-gente" className="mb-8">
        <img
          src="/img/logo.png"
          alt="Stik Tech Seller Central"
          className="h-32 mb-6"
        />
      </Link>

      {/* Login */}
      <div
        className={
          "bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col items-center absolute transition-opacity duration-200 " +
          (loginVisible ? "opacity-100 relative z-10" : "opacity-0 pointer-events-none absolute z-0")
        }
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
          Vender com uma conta existente
        </h1>
        <p className="text-center text-gray-800 mb-4 text-base">
          Se você já é cliente da Stik Tech, pode se inscrever para vender com as mesmas informações de login.
        </p>
        <label className="block text-gray-900 font-semibold mb-1 text-sm text-left w-full" htmlFor="login">
          Insira um número de celular ou um endereço de e-mail
        </label>
        <input
          id="login"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#5483B3] transition"
        />
        <button
          className="w-full bg-[#5483B3] hover:bg-[#1E3A8A] text-white font-bold rounded-full py-3 text-lg transition mb-2"
        >
          Continuar
        </button>
        <button className="text-[#5483B3] text-sm underline mb-2">
          Precisa de ajuda?
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          Novo na Stik Tech?{" "}
          <button
            type="button"
            className="text-[#5483B3] hover:underline font-medium"
            onClick={switchToRegister}
          >
            Criar sua conta
          </button>
        </div>
      </div>

      {/* Cadastro */}
      <div
        className={
          "bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col items-center absolute transition-opacity duration-200 " +
          (registerVisible ? "opacity-100 relative z-10" : "opacity-0 pointer-events-none absolute z-0")
        }
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
          Vender com uma nova conta
        </h1>
        <p className="text-center text-gray-800 mb-4 text-base">
          Inscreva-se para começar a vender.
        </p>
        <form className="w-full">
          <label className="block text-gray-900 font-semibold mb-1 text-sm" htmlFor="name">
            Seu nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nome e sobrenome"
            value={register.name}
            onChange={e => setRegister(r => ({ ...r, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5483B3] transition"
          />
          <label className="block text-gray-900 font-semibold mb-1 text-sm" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            value={register.email}
            onChange={e => setRegister(r => ({ ...r, email: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5483B3] transition"
          />
          <label className="block text-gray-900 font-semibold mb-1 text-sm" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Pelo menos 6 caracteres"
            value={register.password}
            onChange={e => setRegister(r => ({ ...r, password: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#5483B3] transition"
          />
          <div className="flex items-center text-xs text-gray-600 mb-2">
            <svg className="w-4 h-4 mr-1 text-[#5483B3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg>
            As senhas devem ter pelo menos 6 caracteres.
          </div>
          <label className="block text-gray-900 font-semibold mb-1 text-sm" htmlFor="confirm">
            Insira a senha nova mais uma vez
          </label>
          <input
            id="confirm"
            type="password"
            placeholder="Confirme sua senha"
            value={register.confirm}
            onChange={e => setRegister(r => ({ ...r, confirm: e.target.value }))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#5483B3] transition"
          />
          <button
            type="submit"
            className="w-full bg-[#5483B3] hover:bg-[#466a8c] text-white font-bold rounded-full py-3 text-lg transition mb-2"
          >
            Avançar
          </button>
        </form>
        <div className="mt-2 text-center text-sm text-gray-600">
          Você já tem uma conta?{" "}
          <button
            type="button"
            className="text-[#5483B3] hover:underline font-medium"
            onClick={switchToLogin}
          >
            Avançar
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="mt-12 text-xs text-gray-500 text-center">
        © 2021-2026 Stik Tech, Inc. ou suas afiliadas
      </footer>
    </div>
  );
}