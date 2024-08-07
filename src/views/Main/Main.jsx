import "./Main.css";
// import style from "./Main.css";
import React from "react";
import { useEffect } from "react";
import { audio } from "../../components/audio/Oscillator";
import { Buttons } from "../../components/buttons/ButtonContainer";
import { simonContext } from '../../components/context/SimonProvider'


export const Main = () => {
    // const [count, setCount] = useState(0);
    // const [randoPattern, setRandoPattern] = useState([]);
    // const [userPattern, setUserPattern] = useState([]);
    // const [index, setIndex] = useState(0);
    // // const [gameOn, setGameOn] = useState(0);
    // const [playerTurn, setPlayerTurn] = useState(0)
    const { 
        count, 
        setCount, 
        randoPattern, 
        setRandoPattern, 
        userPattern, 
        setUserPattern, 
        setPlayerTurn, 
        setIndex 
    } = simonContext();

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
                sequence[i] === 1 ? audio("yellow") : 
                    sequence[i] === 2 ? audio("red") : 
                        sequence[i] ===3 ? audio("blue") :
                            audio("green");
                resolve();
            }, timer);
            setIndex(0);
        });

    }

    // const handleGameButton = (e) =>{    
    //     setUserPattern([...userPattern, gameButtonAction(e)]);     
    // }


    return <section className={'mainSection'}>
        <div className="button-container">
            <button className="start-button control-buttons" onClick={handleStart}>start</button>
            <button className="reset-button control-buttons" onClick={handleStop}>stop</button>
        </div>
        <div className="simon-body">
            <Buttons />
            
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