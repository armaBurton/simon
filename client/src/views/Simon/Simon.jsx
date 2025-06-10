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
import { audio } from "../../components/audio/oscillator";

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

  const skipVerifyRef = useRef(false);
  const yellowRef = useRef(null);
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const greenRef = useRef(null);
  const startRef = useRef(null);
  const resetRef = useRef(null);
  const buttonMouseEvents = useRef(null);
  const { playSequence } = usePlayback();

  useEffect(() => {
    if (playerTurn) return;

    const runGame = async () => {
      if (gameOn) {
        await runGameFunctions();
        console.log("RANDO PATTERN: ", randoPattern);
        console.log("GAME ON");
        setUserPattern([]);
        setPlayerTurn(true);
      } else if (!gameOn) {
        console.log("GAME OFF");
        setRandoPattern([]);
        setUserPattern([]);
        setPlayerTurn(false);
      }
    };

    runGame();
  }, [gameOn, playerTurn]);

  useEffect(() => {
    if (skipVerifyRef.current) {
      skipVerifyRef.current = false;
      return;
    }

    playSequence(
      randoPattern,
      { yellowRef, redRef, blueRef, greenRef },
      { startRef, resetRef },
      buttonMouseEvents
    );
  }, [randoPattern]);

  useEffect(() => {
    if (skipVerifyRef.current) {
      skipVerifyRef.current = false;
      return;
    }
    if (!playerTurn || userPattern.length === 0) return;

    const i = userPattern.length - 1;

    if (userPattern[i] !== randoPattern[i]) {
      console.log("Mismatch");
      audio();
      setGameOn(false);
      setPlayerTurn(false);
      return;
    }

    if (userPattern.length === randoPattern.length) {
      console.log("Pattern complete and correct");
      setTimeout(() => {
        setUserPattern([]);
        setCount((prev) => prev + 1);
        setPlayerTurn(false);
      }, 1000);
    }
  }, [userPattern]);

  const runGameFunctions = async () => {
    await setRandoPattern(randoPatternGenerator(randoPattern));
  };

  const handleStart = () => {
    handleReset();
    setCount(1);
    setGameOn(true);
  };

  const handleReset = () => {
    skipVerifyRef.current = true;
    setGameOn(false);
    setPlayerTurn(false);
    setUserPattern([]);
    setRandoPattern([]);
    setCount(0);
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
      ,
      {gameOn === false && count > 0 ? (
        <>
          <section className="gameOverContainer">
            <h2>GAME OVER!</h2>
            <p>You're Score: {count}</p>
          </section>
        </>
      ) : (
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
      )}
    </section>
  );
};
