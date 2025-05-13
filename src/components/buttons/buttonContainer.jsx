import { gameButtonAction } from "./gameButton";
import { useSimon } from "../context/SimonProvider";

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

//   <div
//     id="yellow"
//     className="game-button yellow"
//     data-tile="yellow"
//     ref={yellowRef}
//     onClick={handleGameButton}
//   />,
//   <div
//     id="red"
//     className="game-button red"
//     data-tile="red"
//     ref={redRef}
//     onClick={handleGameButton}
//   />,
//   <div
//     id="blue"
//     className="game-button blue"
//     data-tile="blue"
//     ref={blueRef}
//     onClick={handleGameButton}
//   />,
//   <div
//     id="green"
//     className="game-button green"
//     data-tile="green"
//     ref={greenRef}
//     onClick={handleGameButton}
//   />,
