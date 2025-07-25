// SignUp.jsx
import "./Authenticate.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useCurrentSimon } from "../../context/SimonProvider";
import simonLogo from "../../assets/simon_black.png";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const simon = useCurrentSimon();
  const { newUser } = useAuth();

  useEffect(() => {
    if (simon?.email) navigate("/main", { replace: true });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await newUser({ email, password });
      navigate("/main", { replace: true });
    } catch (err) {
      setError(err.message);
      console.error(err);

      navigate("/signup", { replace: true });
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

  const handleReturnUser = (e) => {
    e.preventDefault();
    setError("");
    navigate("/signin", { replace: true });
  };

  return (
    <section className="formSection">
      <img src={simonLogo} alt="simon logo" className="simonLogo" />
      <form autoComplete="off" onSubmit={() => {}} className="autoForm">
        <div className="formItem small">
          {/* <label htmlFor="email">email</label> */}
          <input
            type="email"
            id="email"
            className="inputGreen"
            name="email"
            placeholder="email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </div>
        <div className="formItem small">
          {/* <label htmlFor="password">password</label> */}
          <input
            type="password"
            id="password"
            name="password"
            className="inputRed"
            placeholder="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <div className="formItem medium">
          {/* <label htmlFor="confirmPassword">password</label> */}
          <input
            type="password"
            id="confirmPassword"
            className="inputBlue"
            name="confirmPassword"
            placeholder="password"
            value={confirmPassword}
            onChange={({ target }) => {
              setConfirmPassword(target.value);
            }}
          />
        </div>
        <div className="formItem buttonContainer">
          <button
            type="button"
            className="row return_user"
            aria-disabled={!email || !password || !confirmPassword}
            onClick={handleReturnUser}
          >
            return_user
          </button>
          <button
            type="submit"
            className="row create_player"
            aria-disabled={!email || !password || !confirmPassword}
            onClick={handleClick}
          >
            create_player
          </button>
        </div>
      </form>
      <p className="row errMsg">{error}</p>
    </section>
  );
};
