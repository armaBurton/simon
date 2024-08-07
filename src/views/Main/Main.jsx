import "./Main.css";
import { useEffect, useState } from "react";
import { audio } from "../../components/audio/oscillator";
import { yellowButton } from "../../components/buttons/yellowButton";
import { gameButton } from "../../components/buttons/gameButton";


export const Main = () => {
    const [count, setCount] = useState(0);
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [index, setIndex] = useState(0);
    // const [gameOn, setGameOn] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(0)

    const handleStart = () => {
        // setGameOn(1);
        setCount(1);
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
    
    useEffect(() => {
        // console.log(userPattern);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPattern])

    const randoNumboGenerato = (arr) => {
        return [...arr, Math.ceil(Math.random() * 4)]
    }

    const playSequence = async (randoPattern) => {
        for (let i = 0; i < randoPattern.length; i++) {            
            await timeOut(i, randoPattern, randoPattern.length);
        }
    }

    const getTime = (length) => { 
        if (length > 9) {
            return 500;
        } else if ( length > 4){
            return 750;
        }
        return 1000;
    }

    const timeOut = (i, sequence, length) => {
        return new Promise((resolve) => {
            const timer = getTime(length); 
            setIndex(sequence[i]);
            setTimeout(() => {
                // sequence[i] === 1 ? audio("yellow") : 
                //     sequence[i] === 2 ? audio("red") : 
                //         sequence[i] ===3 ? audio("blue") :
                //             audio("green");
                resolve();
            }, timer);
            setIndex(0);
        });

    }

    const handleGameButton = (e) =>{    
        setUserPattern([...userPattern, gameButton(e)]);     
    }

    return <section className="main-section">
        <div className="button-container">
            <button className="start-button control-buttons" onClick={handleStart}>start</button>
            <button className="reset-button control-buttons" onClick={handleStop}>stop</button>
        </div>
        <div className="simon-body">
            <div className="game-button yellow">
                { yellowButton }
            </div>
            {/* <div id="yellow" className="game-button yellow" data-tile="yellow" onClick={handleGameButton} /> */}
            <div id="red" className="game-button red" data-tile="red" onClick={handleGameButton} />
            <div id="blue" className="game-button blue" data-tile="blue" onClick={handleGameButton} />
            <div id="green" className="game-button green" data-tile="green" onClick={handleGameButton} />
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