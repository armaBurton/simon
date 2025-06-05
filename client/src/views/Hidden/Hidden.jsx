// Hidden.jsx
import "./Hidden.css";
import { useCurrentSimon } from "../../context/SimonProvider";

export const Hidden = () => {
  const simon = useCurrentSimon();

  return (
    <section className="hidden-section">
      <p>
        welcome_to_the_hidden_page<span>{simon.email}</span>
      </p>
    </section>
  );
};
