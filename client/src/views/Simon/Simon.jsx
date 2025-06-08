import "./Simon.css";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router";
// import { Link } from "react-router-dom";
import { Buttons } from "../../components/buttons/buttonContainer";
import { useCurrentSimon } from "../../context/SimonProvider";
import { usePlayback } from "../../components/audio/playback";
import simonLogo from "../../assets/simon_white.png";
import { Nav } from "../Nav/Nav";

export const Simon = () => {
  const {
    count,
    setCount,
    randoPattern,
    setRandoPattern,
    userPattern,
    setUserPattern,
    // gameOn,
    // setGameOn,
    playerTurn,
    setPlayerTurn,
    // index,
    setIndex,
    user,
    setUser,
  } = useCurrentSimon();

  const yellowRef = useRef(null);
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const greenRef = useRef(null);
  const buttonMouseEvents = useRef(null);

  const { playSequence } = usePlayback();

  useEffect(() => {
    console.log(userPattern);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPattern]);

  useEffect(() => {
    console.log(randoPattern);
    playSequence(
      randoPattern,
      { yellowRef, redRef, blueRef, greenRef },
      buttonMouseEvents
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randoPattern]);

  useEffect(() => {
    if (playerTurn && userPattern.length > 0) {
      if (userPattern.length === randoPattern.length) {
        const isCorrect = userPattern.every(
          (val, i) => val === randoPattern[i]
        );
        if (isCorrect) {
          setCount(count + 1);
          setUserPattern([]);
          setPlayerTurn(false);
          runGameFunctions();
        } else {
          console.log("Game Over!");
          handleStop();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPattern, randoPattern, count]);
  if (!user?.email) return <Navigate to="/signin" />;
  const handleStart = () => {
    setCount(1);
    setRandoPattern([]);
    setUserPattern([]);
    console.log("handleStart: " + randoPattern);
    runGameFunctions();
  };

  const handleStop = () => {
    setCount(0);
    setRandoPattern([]);
    setUserPattern([]);
    setPlayerTurn(false);
    setIndex(0);
  };

  const runGameFunctions = () => {
    setRandoPattern(randoNumboGenerator(randoPattern));

    // setPlayerTurn(!playerTurn);
  };

  const randoNumboGenerator = (arr) => {
    return [...arr, Math.ceil(Math.random() * 4)];
  };

  return (
    <section className={"mainSection"}>
      <Nav />
      <div className="button-container">
        <button className="start-button control-buttons" onClick={handleStart}>
          start
        </button>
        <button className="reset-button control-buttons" onClick={handleStop}>
          stop
        </button>
      </div>
      <div className="simon-body" ref={buttonMouseEvents}>
        <Buttons
          yellowRef={yellowRef}
          redRef={redRef}
          blueRef={blueRef}
          greenRef={greenRef}
        />
        <div className="center">
          <img src={simonLogo} alt="simon logo" className="simon_logo" />
          <div className="score-container">
            <h2 className="score-label">SCORE</h2>
            <div className="score-counter">
              <p className="count">{count}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// export default Simon;
