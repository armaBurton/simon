import { gameButtonAction } from "./gameButton";
import { useSimon } from "../../context/SimonProvider";

export const Buttons = ({ yellowRef, redRef, blueRef, greenRef }) => {
  const { userPattern, setUserPattern } = useSimon();

  const handleGameButton = (e) => {
    const action = gameButtonAction(e);
    setUserPattern([...userPattern, action]);
  };

  const buttons = [
    { id: 1, color: "yellow", ref: yellowRef },
    { id: 2, color: "red", ref: redRef },
    { id: 3, color: "blue", ref: blueRef },
    { id: 4, color: "green", ref: greenRef },
  ];

  return (
    <>
      {buttons.map(({ id, color, ref }) => (
        <div
          key={id}
          id={color}
          className={`game-button ${color}`}
          data-tile={color}
          ref={ref}
          onClick={handleGameButton}
        />
      ))}
    </>
  );
};
