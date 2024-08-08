import { createContext, useContext, useState } from "react";

const SimonContext = createContext();

export const SimonProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [randoPattern, setRandoPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [index, setIndex] = useState(0);
    const [gameOn, setGameOn] = useState(0);
    const [playerTurn, setPlayerTurn] = useState(0)

    const simonState = {
        count,
        setCount, 
        randoPattern,
        setRandoPattern,
        userPattern, 
        setUserPattern,
        index, 
        setIndex,
        gameOn, 
        setGameOn,
        playerTurn,
        setPlayerTurn
    }

    return (
        <SimonContext.Provider
            value={{
                simonState,
                count,
                setCount, 
                randoPattern,
                setRandoPattern,
                userPattern, 
                setUserPattern,
                index, 
                setIndex,
                gameOn, 
                setGameOn,
                playerTurn,
                setPlayerTurn
            }}
        >
            { children }
        </SimonContext.Provider>
    )
}

export const useSimon = () => {
    const context = useContext(SimonContext);

    if (context === undefined) { 
        throw new Error('useSimon must be used withing a SimonProvider');
    }
    
    return context;
}

export const simonContext = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(SimonContext);
}