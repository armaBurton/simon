// Authenticate.jsx
import "./Authenticate.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentSimon, useAuth } from "../../context/SimonProvider";
import simonLogo from "../../assets/simon_black.png";

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const simon = useCurrentSimon();
  const { login } = useAuth();

  useEffect(() => {
    if (simon?.email) navigate("/simon", { replace: true });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login({ email, password });
      navigate("/hidden", { replace: true });
    } catch (err) {
      setError(err);
      navigate("/simon", { replace: true });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!email && !password) {
      setError("Please enter an email and password.");
    } else if (!email && password) {
      setError("Please enter an email.");
    } else if (email && !password) {
      setError("Please enter a password");
    } else {
      setError("");
      handleSubmit(e);
    }
  };

  const handleNewPlayer = (e) => {
    e.preventDefault();

    navigate("/signup", { replace: true });
  };

  return (
    <section className="formSection">
      <img src={simonLogo} alt="simon logo" className="simonLogo" />

      <form action="" className="authForm">
        <div className="formItem small">
          <label htmlFor="email"> email </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </div>
        <div className="formItem big">
          <label htmlFor="password"> password </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <div className="formItem buttonContainer">
          <button
            type="button"
            className="row new_player"
            aria-disabled={!email || !password}
            onClick={handleNewPlayer}
          >
            new_player
          </button>
          <button
            type="submit"
            className="row sign_in"
            aria-disabled={!email || !password}
            onClick={handleClick}
          >
            sign_in
          </button>
        </div>
        <p className="row errMsg">{error}</p>
      </form>
    </section>
  );
};
