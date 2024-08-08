import "../../views/Main/Main.css"
import { audio } from "../audio/Oscillator";


export const gameButtonAction = ( e ) => {
    const color = e.target.className.split(" ")[1];
   
    audio(color);

    return color === 'yellow' ? 1 :
            color === 'red' ?  2 : 
                color === 'blue' ? 3 : 4;
        
} 