import { gameButtonAction } from "./gameButton";
import { useSimon } from "../context/SimonProvider";

export const Buttons = () => {
  const { userPattern, setUserPattern } = useSimon();

  const handleGameButton = (e) => {
    setUserPattern([...userPattern, gameButtonAction(e)]);
  };

  return (
    <>
      <div
        id="yellow"
        className="game-button yellow"
        data-tile="yellow"
        onClick={handleGameButton}
      />
      <div
        id="red"
        className="game-button red"
        data-tile="red"
        onClick={handleGameButton}
      />
      <div
        id="blue"
        className="game-button blue"
        data-tile="blue"
        onClick={handleGameButton}
      />
      <div
        id="green"
        className="game-button green"
        data-tile="green"
        onClick={handleGameButton}
      />
    </>
  );
};
