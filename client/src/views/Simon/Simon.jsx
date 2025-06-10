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

  const yellowRef = useRef(null);
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const greenRef = useRef(null);
  const startRef = useRef(null);
  const resetRef = useRef(null);
  const buttonMouseEvents = useRef(null);

  useEffect(() => {
    setCount(0);
    setPlayerTurn(false);
    setGameOn(true);
  }, []);

  useEffect(() => {
    runGameFunctions();
    console.log("GAME ON");
  }, [gameOn]);

  const runGameFunctions = async () => {
    await setRandoPattern(randoPatternGenerator(randoPattern));
  };

  const handleStart = () => {
    setCount(0);
    setPlayerTurn(false);
    setGameOn(true);
  };

  const handleReset = () => {};

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
        <></>
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

// useEffect(() => {
//   if (count === 0) setRandoPattern([]);
// }, []);

// const yellowRef = useRef(null);
// const redRef = useRef(null);
// const blueRef = useRef(null);
// const greenRef = useRef(null);
// const startRef = useRef(null);
// const resetRef = useRef(null);
// const buttonMouseEvents = useRef(null);

// const { playSequence } = usePlayback();

// useEffect(() => {
//   // console.log("USER PATTERN: ", userPattern);
//   // console.log("RANDO PATTERN: ", randoPattern);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [userPattern]);

// useEffect(() => {
//   playSequence(
//     randoPattern,
//     { yellowRef, redRef, blueRef, greenRef },
//     { startRef, resetRef },
//     buttonMouseEvents
//   );

//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [randoPattern]);

// // useEffect(() => {
// //   if (playerTurn && userPattern.length > 0) {
// //     if (userPattern.length === randoPattern.length) {
// //       const isCorrect = userPattern.every(
// //         (val, i) => val === randoPattern[i]
// //       );
// //       if (isCorrect) {
// //         setCount(count + 1);
// //         setUserPattern([]);
// //         // setPlayerTurn(false);
// //         // runGameFunctions();
// //       } else {
// //         console.log("Game Over!");
// //         handleReset();
// //       }
// //     }
// //   }
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // }, [userPattern, randoPattern, count]);

// // useEffect(() => {
// //   const checkPattern = async () => {
// //     if (playerTurn) {
// //       for (let i = 0; i < randoPattern.length; i++) {
// //         // console.log(
// //         //   "CHECK PATTERN: ",
// //         //   userPattern[i],
// //         //   "RANDO PATTERN: ",
// //         //   randoPattern[i]
// //         // );
// //         if (
// //           userPattern[i] !== randoPattern[i] &&
// //           userPattern.length > 0 &&
// //           userPattern[i] !== undefined
// //         ) {
// //           setGameOn(false);
// //           setTimeout(() => {
// //             audio(null);
// //             console.log("timeout");
// //           }, 150);
// //         }
// //         if (i === randoPattern.length) {
// //         }
// //       }
// //       setUserPattern([]);
// //       setPlayerTurn(true);
// //     }
// //     setPlayerTurn(false);
// //   };
// //   checkPattern();
// // }, [userPattern]);

// // useEffect(() => {
// //   if (gameOn && !playerTurn) {
// //     handleTurn();
// //     setPlayerTurn(true);
// //   }
// // }, [gameOn, playerTurn]);

// // if (!user) return <Navigate to="/signin" />;

// // const handleTurn = async () => {
// //   console.log("HANDLE TURN");
// //   // const game = true;
// //   // let player = false
// //   await runGameFunctions();
// //   // gameLogic(randoPattern);
// //   // player = true;
// //   setPlayerTurn(false);
// // };

// // const handleStart = async () => {
// //   setCount(0);
// //   setGameOn(true);
// //   // handleTurn();
// //   // setPlayerTurn(false);
// //   // await runGameFunctions();
// //   // gameLogic(randoPattern);
// //   // setPlayerTurn(true);
// //   // handleTurn();
// //   // count > 0 ? setCount(0) : setCount(count + 1);
// //   // setGameOn(true);
// //   // setPlayerTurn(false);
// //   // if (gameOn === true) handleTurn();
// //   // gameLogic(randoPattern);
// //   // setUserPattern([]);
// //   // runGameFunctions();
// //   // setPlayerTurn(true);
// //   // gameLogic(randoPattern);
// //   // setUserPattern([]);
// //   // runGameFunctions();
// //   // setPlayerTurn(true);
// //   // if (gameOn === true) handleTurn();
// //   // if (playerTurn) handlePlayerTurn();
// // };

// // const handleReset = () => {
// //   setCount(0);
// //   setRandoPattern([]);
// //   setUserPattern([]);
// //   setPlayerTurn(false);
// //   setGameOn(false);
// //   setIndex(0);
// // };
