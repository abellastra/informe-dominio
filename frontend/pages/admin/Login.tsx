import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/admin/login",
        { password },
        { withCredentials: true },
      );
      navigate("/admin/solicitudes");
    } catch {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#1E3A5F]">
      <div className="w-full max-w-[360px]">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="11"
                width="18"
                height="12"
                rx="2"
                stroke="#93C5FD"
                strokeWidth="1.8"
              />
              <path
                d="M7 11V7a5 5 0 0110 0v4"
                stroke="#93C5FD"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-[#93C5FD] text-[11px] font-semibold tracking-[0.12em] uppercase mb-1">
            Cadenas Gestoria
          </p>
          <h1 className="text-white text-xl font-bold">Panel de gestión</h1>
          <p className="text-white/50 text-sm mt-1">
            Acceso exclusivo para administradores
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-7 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5 mb-5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#0F172A]"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/15 placeholder:text-[#94A3B8]"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-5">
                <span className="shrink-0">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] text-white font-semibold rounded-xl transition-all cursor-pointer border-none"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
