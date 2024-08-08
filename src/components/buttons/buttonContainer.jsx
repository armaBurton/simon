import { simonContext } from "../context/SimonProvider";
import { gameButtonAction } from "./GameButton";

const handleGameButton = (e) =>{    
    const {
        userPattern,
        setUserPattern
    } = simonContext();
    
    setUserPattern([...userPattern, gameButtonAction(e)]);     
}

export const Buttons = () => {
    return (<>
                <div id="yellow" className="game-button yellow" data-tile="yellow" onClick={handleGameButton} />
                <div id="red" className="game-button red" data-tile="red" onClick={handleGameButton} />
                <div id="blue" className="game-button blue" data-tile="blue" onClick={handleGameButton} />
                <div id="green" className="game-button green" data-tile="green" onClick={handleGameButton} />
            </>)
}

