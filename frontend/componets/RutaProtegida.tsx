import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RutaProtegida = ({ children }: { children: React.ReactNode }) => {
  const [verificando, setVerificando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verificar = async () => {
      try {
        await axios.get("/api/admin/verificar", { withCredentials: true });
        setAutorizado(true);
      } catch {
        navigate("/admin");
      } finally {
        setVerificando(false);
      }
    };
    verificar();
  }, []);

  if (verificando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-[#3D2B2B] rounded-full animate-spin" />
      </div>
    );
  }

  return autorizado ? <>{children}</> : null;
};

export default RutaProtegida;