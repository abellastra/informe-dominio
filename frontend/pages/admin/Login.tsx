import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
console.log(password)
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
    <div className="page-center">
      <div className="public-card" style={{ maxWidth: 380 }}>
        <div className="public-card-header">
          <div className="public-card-icon">🔐</div>
          <h1>Panel de Gestora</h1>
          <p>Acceso exclusivo para administradores</p>
        </div>

        <div className="public-card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div
                className="alert alert-danger"
                style={{ marginBottom: "1.25rem" }}
              >
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
