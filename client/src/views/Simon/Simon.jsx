import "./Simon.css";
import "./GameOver.css";
import { useEffect, useRef, useState } from "react";
// import { Navigate } from "react-router";
// import { Link } from "react-router-dom";
import { Buttons } from "../../components/buttons/buttonContainer";
import { useCurrentSimon } from "../../context/SimonProvider";
import { usePlayback } from "../../components/audio/playback";
// import { gameLogic } from "../../components/gameLogic/GameLogic";
import simonLogo from "../../assets/simon_white.png";
import { Header } from "../../components/Layout/Header/Header";
import { SimonStatus } from "../../components/Layout/SimonStatus/SimonStatus";
import { randoPatternGenerator } from "../../utils/sharedFunctions";
import { audio } from "../../components/audio/oscillator";
import { getTopScores } from "../../services/topScores";

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
    setTopScores,
    topScores,

    // index,
    // setIndex,
    // user,
    // setUser,
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
  const [highScore, setHighScore] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("FETCHING FROM MAIN");
    const fetchHighScores = async () => {
      try {
        const res = await getTopScores();

        setTopScores(res);
        console.log("HighScore: ", topScores);
      } catch (error) {}
    };

    fetchHighScores();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkScores = () => {
    if (topScores <= 0 || topScores === undefined) {
      console.log("undefined, or less than or equal to zero");
      return;
    }
    let lowScore = 999;
    topScores.map((score) => {
      if (lowScore > score.score) {
        lowScore = score.score;
      }
    });

    if (count > lowScore) {
      console.log(
        `*** *** *** *** ***\n`,
        `>>>158 >>>lowScore, count-->    `,
        lowScore,
        count,
        `\n*** *** *** *** ***`
      );
      console.log("NEW TOP SCORE");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setError("");

    setError("click");
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
      {gameOn === false && count > 0 ? (
        <>
          {checkScores()}
          <section className="gameOverContainer">
            <img src={simonLogo} alt="simon logo" className="gameOverLogo" />
            <h2 className="gameOver">GAME OVER!</h2>
            <p className="yourScore">Your Score: {count}</p>
            <div className="newHighScore">
              <p className="grats">Congratulations on a new top score!!!</p>
              <form autoComplete="off" className="highScoreForm">
                <label className="highScoreLabel" htmlFor="highScore"></label>
                <input
                  type="text"
                  id="highScore"
                  name="highScore"
                  placeholder="name"
                  value={highScore}
                  onChange={({ target }) => {
                    setHighScore(target.value);
                  }}
                  required
                />
                <button
                  type="submit"
                  onClick={handleClick}
                  className="highScoreFormButton"
                >
                  add_score
                </button>
              </form>
              <p>{error}</p>
              {/* </div> */}
            </div>
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
