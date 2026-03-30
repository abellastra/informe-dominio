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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-slate-100 to-green-50">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg w-full max-w-[380px] overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-8 text-center">
          <div className="w-[52px] h-[52px] bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🔐
          </div>
          <h1 className="text-white text-[1.4rem] font-bold">
            Panel de Gestora
          </h1>
          <p className="text-white/75 text-sm mt-1">
            Acceso exclusivo para administradores
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5 mb-6">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-900"
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
                className="w-full px-3.5 py-2.5 border-[1.5px] border-slate-200 rounded-md text-sm text-slate-900 bg-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 px-5 py-4 rounded-xl border text-sm bg-red-50 border-red-200 text-red-800 mb-5">
                <span className="text-[1.1rem] shrink-0 mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 active:translate-y-px text-white font-semibold rounded-md shadow-md transition-all cursor-pointer border-none text-base"
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
