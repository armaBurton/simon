import React from "react";

const handleGameButton = (e) =>{    
    // setUserPattern([...userPattern, gameButton(e)]);     
}

export const Buttons = () => {
    return (<>
                <div id="yellow" className="game-button yellow" data-tile="yellow" onClick={handleGameButton} />
                <div id="red" className="game-button red" data-tile="red" onClick={handleGameButton} />
                <div id="blue" className="game-button blue" data-tile="blue" onClick={handleGameButton} />
                <div id="green" className="game-button green" data-tile="green" onClick={handleGameButton} />
            </>)
}

