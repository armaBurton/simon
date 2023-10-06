import "./Main.css";
import { useEffect, useState } from "react";
import { redButton } from "../../components/buttons/redButton";



export const Main = () => {
    const [count, setCount] = useState(0);
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPatter] = useState([]);
    const [gameOn, setGameOn] = useState(0);

    const handleStart = () => {
        if (gameOn === 0) {
            setGameOn(1);
        } else {
            setGameOn(0);
        }
    }

    useEffect(() => {
        if (gameOn === 1) {
            alert("game on");
        }
    }, [gameOn])

    const handleYellowClick = () => {
        setCount(count + 1);
    }

    const handleRedClick = () => {
        setCount(count + 1);
    }

    const handleBlueClick = () => {
        setCount(count + 1);
    }

    const handleGreenClick = () => {
        setCount(count + 1);
    }

    return <section className="main-section">
        <div className="button-container">
            <button className="start-button control-buttons" onClick={handleStart}>start</button>
            <button className="reset-button control-buttons">reset</button>
        </div>
        <div className="simon-body">
            <div className="game-button yellow" onClick={handleYellowClick} />
            <div className="game-button red" onClick={() => setCount(redButton(count))} />
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