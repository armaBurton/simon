import "./Main.css";
import { useEffect, useState } from "react";
import { redButton } from "../../components/buttons/redButton";
import { yellowButton } from "../../components/buttons/yellowButton";
import { blueButton } from "../../components/buttons/blueButton";
import { greenButton } from "../../components/buttons/greenButton";



export const Main = () => {
    const [count, setCount] = useState(0);
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPatter] = useState([]);
    const [gameOn, setGameOn] = useState(0);

    const handleStart = () => {
        setGameOn(1);
        playGame();
    }

    const handleStop = () => {
        setGameOn(0);
    }

    // useEffect(() => {
    //     if (gameOn === 1) {
    //         setCount(0);
    //         playGame();
    //     }
    // }, [gameOn])

    const playGame = () => {
        const hotSwap = [];
        for (let i = 0; i < 10; i++) {
            const randoNumbo = Math.floor(Math.random() * (4) + 1)
            hotSwap.push(randoNumbo);
            setRandoPattern(hotSwap);
        }
        // do {
        //     const randoNumbo = Math.floor(Math.random() * (4) + 1)
        //     hotSwap.push(randoNumbo);
        //     setRandoPattern(hotSwap);
        //     console.log(randoPattern);
        //     // if (hotSwap.length() === 10) setGameOn(0);
        //     setGameOn(gameOn + 1);
        // } while (gameOn < 10);
    }

    const handleYellowClick = () => {
        setCount(yellowButton(count));
    }

    const handleRedClick = () => {
        setCount(redButton(count));
    }

    const handleBlueClick = () => {
        setCount(blueButton(count));
    }

    const handleGreenClick = () => {
        setCount(greenButton(count));
    }

    return <section className="main-section">
        <div className="button-container">
            <button className="start-button control-buttons" onClick={handleStart}>start</button>
            <button className="reset-button control-buttons" onClick={handleStop}>stop</button>
        </div>
        <div className="simon-body">
            <div className="game-button yellow" onClick={handleYellowClick} />
            <div className="game-button red" onClick={handleRedClick} />
            <div className="game-button blue" onClick={handleBlueClick} />
            <div className="game-button green" onClick={handleGreenClick} />
            <div className="center" >
                <h1 className="title">simon</h1>
                <div className="score-container">
                    <h2 className="score-label">SCORE</h2>
                    <div className="score-counter"><p className="count">{count}</p></div>
                </div>
            </div>
        </div>
    </section>;
}