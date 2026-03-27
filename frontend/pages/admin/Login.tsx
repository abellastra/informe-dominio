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
        "http://localhost:3000/api/admin/login",
        { password },
        { withCredentials: true },
      );
      navigate("/admin/solicitudes");
    } catch (error) {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div>
      <h1>Pane de la gestora </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        {error && <p>{error}</p>}
        <button type="submit"> ingresar </button>
      </form>
    </div>
  );
};

export default Login;
