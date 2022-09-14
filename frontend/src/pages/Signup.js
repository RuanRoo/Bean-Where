import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);

  };

  return (
    <div className="fullscreenSignupContainer">
          <Link to={"/"}>
            <Logo />
          </Link>
      <div className="signupContainer">
        <h1 className="loginTitle">Welcome</h1>
        <form className="signupForm" onSubmit={handleSubmit}>
          <h3 className="signupSub">Sign up to spill your beans</h3>
          <div className="inputGroup">
            <label>Name: </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
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
            <button className="loginButton" disabled={isLoading}>
              Let's go!
            </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
