import "./Main.css";
import { useState } from "react";
import { redButton } from "../../components/buttons/redButton";
import { yellowButton } from "../../components/buttons/yellowButton";
import { blueButton } from "../../components/buttons/blueButton";
import { greenButton } from "../../components/buttons/greenButton";



export const Main = () => {
    const [count, setCount] = useState(0);
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    // const [gameOn, setGameOn] = useState(0);
    // const [playerTurn, setPlayerTurn] = useState(0)

    const handleStart = () => {
        // setGameOn(1);
        setCount(0);
        setRandoPattern([]);
        setUserPattern([]);
        runGameFunctions();
    }

    const handleStop = () => {
        // setGameOn(0);
    }


    const runGameFunctions = () => {
        randoNumboGenerato(randoPattern);
        playSequence(randoPattern);
    }

    const randoNumboGenerato = (arr) => {
        setRandoPattern([...arr, Math.ceil(Math.random() * 4)])
    }

    const playSequence = async (randoPattern) => {
        for (let i = 0; i < randoPattern.length; i++) {
            // console.log(randoPattern[i]);
            await timeOut(i, randoPattern);
        }
    }

    const timeOut = (i, sequence) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`${i}, ${sequence[i]}`);
                resolve();
            }, 1000);
        });

    }

    const handleYellowClick = () => {
        setCount(yellowButton(count));
        setUserPattern([...userPattern, 1]);
    }

    const handleRedClick = () => {
        setCount(redButton(count));
        setUserPattern([...userPattern, 2]);
    }

    const handleBlueClick = () => {
        setCount(blueButton(count));
        setUserPattern([...userPattern, 3]);
    }

    const handleGreenClick = () => {
        setCount(greenButton(count));
        setUserPattern([...userPattern, 4]);
    }

    return <section className="main-section">
        <div className="button-container">
            <button className="start-button control-buttons" onClick={handleStart}>start</button>
            <button className="reset-button control-buttons" onClick={handleStop}>stop</button>
        </div>
        <div className="simon-body">
            <div className="game-button yellow" data-tile="yellow" onClick={handleYellowClick} />
            <div className="game-button red" data-tile="red" onClick={handleRedClick} />
            <div className="game-button blue" data-tile="blue" onClick={handleBlueClick} />
            <div className="game-button green" data-tile="green" onClick={handleGreenClick} />
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