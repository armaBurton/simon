import "./Main.css";
import { useState } from "react";



export const Main = () => {
    const [count, setCount] = useState("000");
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPatter] = useState([]);

    const handleClick = () => {
        alert("click");
    }

    return <section className="main-section">
        <div className="simon-body">
            <div className="game-button yellow" onClick={handleClick} />
            <div className="game-button red" />
            <div className="game-button blue" />
            <div className="game-button green" />
            <div className="center" >
                <h1 className="title">simon</h1>
                <div className="score-container">
                    <h2 className="score-label">SCORE</h2>
                    <div className="score-counter"><p className="count">{count}</p></div>
                </div>
            </div>
        </div>
        <div className="button-container">
            <button className="start-button control-buttons">start</button>
            <button className="reset-button control-buttons">reset</button>
        </div>
    </section>;
}