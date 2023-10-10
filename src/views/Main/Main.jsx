import "./Main.css";
import { useEffect, useState } from "react";
import { redButton } from "../../components/buttons/redButton";
import { yellowButton } from "../../components/buttons/yellowButton";
import { blueButton } from "../../components/buttons/blueButton";
import { greenButton } from "../../components/buttons/greenButton";



export const Main = () => {
    const [count, setCount] = useState(0);
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [gameOn, setGameOn] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(0)

    const handleStart = () => {
        setGameOn(1);
    }

    const handleStop = () => {
        setGameOn(0);
    }

    useEffect(() => {
        if (gameOn === 1) {
            setRandoPattern([]);
            setUserPattern([]);
            setCount(0);
            randoNumboGenerato(randoPattern);
            playSequence(randoPattern);
        }
    }, [gameOn])

    // useEffect(() => {
    // }, [userPattern])

    // useEffect(() => {
    // }, [randoPattern])

    const randoNumboGenerato = (arr) => {
        setRandoPattern([...arr, Math.ceil(Math.random() * 4)])
    }

    const playSequence = (sequence) => {
        for (let i = 0; i < sequence.length; i++) {
            const temp = i;
            setTimeout(() => console.log(randoPattern[temp]), 5000);
            // timeOut(i);
        }
    }

    // const timeOut = (i) => {
    // }

    // const playGame = () => {
    //     if (playerTurn === 0) {
    //         const randoNumbo = Math.floor(Math.random() * (4) + 1)
    //         setRandoPattern([...randoPattern, randoNumbo]);
    //     } else if (playerTurn === 1 && userPattern < randoPattern) {

    //     }

    // }

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