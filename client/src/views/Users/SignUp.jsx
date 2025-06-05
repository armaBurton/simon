// SignUp.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useCurrentSimon } from "../../context/SimonProvider";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const simon = useCurrentSimon();
  const { newUser } = useAuth();

  useEffect(() => {
    if (simon?.email) navigate("/simon", { replace: true });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await newUser({ email, password });
      navigate("/hidden", { replace: true });
    } catch (err) {
      setError(err);
      console.error(err);
      navigate("/main", { replace: true });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setError("");

    if (!email && !password && !confirmPassword) {
      setError("Submit credentials to access Simon.");
    } else if (password !== confirmPassword) {
      setError("Passwords must match.");
    } else {
      setError("");
      handleSubmit(e);
    }
  };

  return (
    <section className="formSection">
      <form onSubmit={() => {}} className="autoForm">
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <label htmlFor="password">password</label>
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
        <label htmlFor="confirmPassword">confirm_password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="confirm_password"
          value={confirmPassword}
          onChange={({ target }) => {
            setConfirmPassword(target.value);
          }}
        />
        <button
          type="submit"
          className="row"
          aria-disabled={!email || !password || !confirmPassword}
          onClick={handleClick}
        >
          sign_up
        </button>
        <p className="row">{error}</p>
      </form>
    </section>
  );
};
