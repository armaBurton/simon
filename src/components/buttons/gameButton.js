import "../../views/Main/Main.css"
import { audio } from "../audio/oscillator";



// export   const yellowButton = () => {
//     const yellow = <div id="yellow" className="game-button yellow" data-tile="yellow" onClick={handleGameButton}></div>
    
//     return yellow;
// }

// export const gameButtonWrapper = () =>{
//     <yellowButton />
// }

export const gameButton = ( e ) => {
    const color = e.target.className.split(" ")[1];
   
    audio(color);

    return color === 'yellow' ? 1 :
            color === 'red' ?  2 : 
                color === 'blue' ? 3 : 4;
        
} 