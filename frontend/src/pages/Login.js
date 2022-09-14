import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div>
      <div className="fullscreenLoginContainer">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="loginContainer">
          <h1 className="loginTitle">Welcome</h1>
          <form className="loginForm" onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label>Email: </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="inputGroup">
              <label>Password: </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button disabled={isLoading} className="loginButton">
              Login
            </button>
            {error && <div className="error">{error}</div>}
            <p>
              Not registered? <a href="/signup">Signup here!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
