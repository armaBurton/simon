// Authenticate.jsx
import "./Authenticate.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSimon, useAuth } from "../../context/SimonProvider";

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const simon = useSimon();
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

  return (
    <section className="formSection">
      <form action="" className="authForm">
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
        <button
          type="submit"
          className="row"
          aria-disabled={!email || !password}
          onClick={handleClick}
        >
          sign_in
        </button>
        <p className="row">{error}</p>
      </form>
    </section>
  );
};
