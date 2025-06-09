import "./Simon.css";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router";
// import { Link } from "react-router-dom";
import { Buttons } from "../../components/buttons/buttonContainer";
import { useCurrentSimon } from "../../context/SimonProvider";
import { usePlayback } from "../../components/audio/playback";
import { gameLogic } from "../../components/gameLogic/GameLogic";
import simonLogo from "../../assets/simon_white.png";
import { Header } from "../../components/Layout/Header/Header";
import { SimonStatus } from "../../components/Layout/SimonStatus/SimonStatus";
import { randoPatternGenerator } from "../../utils/sharedFunctions";

export const Simon = () => {
  const {
    count,
    setCount,
    randoPattern,
    setRandoPattern,
    userPattern,
    setUserPattern,
    gameOn,
    setGameOn,
    playerTurn,
    setPlayerTurn,
    // index,
    setIndex,
    user,
    setUser,
  } = useCurrentSimon();

  useEffect(() => {
    if (count === 0) setRandoPattern([]);
  }, []);

  const yellowRef = useRef(null);
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const greenRef = useRef(null);
  const startRef = useRef(null);
  const resetRef = useRef(null);
  const buttonMouseEvents = useRef(null);

  const { playSequence } = usePlayback();

  useEffect(() => {
    console.log("USERPATTERN: ", userPattern);
    console.log("RANDOPATTERN: ", randoPattern);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPattern]);

  useEffect(() => {
    playSequence(
      randoPattern,
      { yellowRef, redRef, blueRef, greenRef },
      { startRef, resetRef },
      buttonMouseEvents
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randoPattern]);

  // useEffect(() => {
  //   if (playerTurn && userPattern.length > 0) {
  //     if (userPattern.length === randoPattern.length) {
  //       const isCorrect = userPattern.every(
  //         (val, i) => val === randoPattern[i]
  //       );
  //       if (isCorrect) {
  //         setCount(count + 1);
  //         setUserPattern([]);
  //         // setPlayerTurn(false);
  //         // runGameFunctions();
  //       } else {
  //         console.log("Game Over!");
  //         handleReset();
  //       }
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userPattern, randoPattern, count]);

  useEffect(() => {
    const checkPattern = async () => {
      if (playerTurn) {
        for (let i = 0; i < randoPattern.length; i++) {
          console.log(
            "CHECK PATTERN: ",
            userPattern[i],
            "RANDOPATTERN: ",
            randoPattern[i]
          );
          if (userPattern[i] !== randoPattern[i] && userPattern.length > 0)
            console.log("FAIL");
        }
        // await userPattern.map((i, p) => {
        //   console.log(
        //     "CHECK PATTERN: ",
        //     userPattern[p],
        //     "RANDOPATTERN: ",
        //     randoPattern[i]
        //   );
        //   if (userPattern[i] != randoPattern[i]) console.log("FAIL");
        // });
      }
    };

    checkPattern();
  }, [userPattern]);

  if (!user) return <Navigate to="/signin" />;

  const handleStart = () => {
    setCount(count + 1);
    setGameOn(true);
    setPlayerTurn(false);
    gameLogic(randoPattern);
    setUserPattern([]);
    runGameFunctions();
    setPlayerTurn(true);
    if (playerTurn) handlePlayerTurn();
  };

  const handleGameButton = () => {
    console.log("HANDLE GAME BUTTON");
  };

  const handlePlayerTurn = () => {};

  const handleReset = () => {
    setCount(0);
    setRandoPattern([]);
    setUserPattern([]);
    setPlayerTurn(false);
    setIndex(0);
  };

  const runGameFunctions = () => {
    setRandoPattern(randoPatternGenerator(randoPattern));
  };

  return (
    <section className={"mainSection"}>
      <Header>
        <SimonStatus />
      </Header>
      <div className="button-container">
        <button
          className="start-button control-buttons"
          onClick={handleStart}
          ref={startRef}
        >
          start
        </button>
        <button
          className="reset-button control-buttons"
          onClick={handleReset}
          ref={resetRef}
        >
          reset
        </button>
      </div>
      <div className="simon-body" ref={buttonMouseEvents}>
        <Buttons
          yellowRef={yellowRef}
          redRef={redRef}
          blueRef={blueRef}
          greenRef={greenRef}
          startRef={startRef}
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
