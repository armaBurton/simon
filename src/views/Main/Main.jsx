import "./Main.css";
import { useEffect, useState } from "react";
import { redButton } from "../../components/buttons/redButton";
import { yellowButton } from "../../components/buttons/yellowButton";
import { blueButton } from "../../components/buttons/blueButton";
import { greenButton } from "../../components/buttons/greenButton";
import { audio } from "../../components/audio/oscillator";


export const Main = () => {
    const [count, setCount] = useState(0);
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    // const [gameOn, setGameOn] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(0)

    const handleStart = () => {
        // setGameOn(1);
        setCount(0);
        setRandoPattern([]);
        console.log(randoPattern);
        setUserPattern([]);
        console.log(userPattern);
        runGameFunctions();
    }

    const handleStop = () => {
        // setGameOn(0);
    }


    const runGameFunctions = () => {

        setRandoPattern(randoNumboGenerato(randoPattern))

        setPlayerTurn(1);
    }

    useEffect(() => {
        console.log(randoPattern);
        playSequence(randoPattern);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [randoPattern])

    const randoNumboGenerato = (arr) => {
        return [...arr, Math.ceil(Math.random() * 4)]
    }

    const playSequence = async (randoPattern) => {
        for (let i = 0; i < randoPattern.length; i++) {
            // console.log(randoPattern[i]);
            await timeOut(i, randoPattern, randoPattern.length);
        }
    }

    const getTime = (length) => { 
        if (length > 10) {
            return 500;
        } else if ( length > 5){
            return 750;
        }
        return 1000;
    }

    const timeOut = (i, sequence, length) => {
        return new Promise((resolve) => {
            const timer = getTime(length); 

            setTimeout(() => {
                sequence[i] === 1 ? audio("yellow") : 
                    sequence[i] === 2 ? audio("red") : 
                        sequence[i] ===3 ? audio("blue") :
                            audio("green");
                resolve();
            }, timer);
        });

    }

    const handleYellowClick = () => {
        audio("yellow");
        setCount(yellowButton(count));
        setUserPattern([...userPattern, 1]);
        console.log(userPattern);
        //playSequence();
    }
    
    const handleRedClick = () => {
        audio("red");
        setCount(redButton(count));
        setUserPattern([...userPattern, 2]);
        console.log(userPattern);
        // playSequence();
    }
    
    const handleBlueClick = () => {
        audio("blue");
        setCount(blueButton(count));
        setUserPattern([...userPattern, 3]);
        console.log(userPattern);
        // playSequence();
    }
    
    const handleGreenClick = () => {
        audio("green");
        setCount(greenButton(count));
        setUserPattern([...userPattern, 4]);
        console.log(userPattern);
        // playSequence();
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