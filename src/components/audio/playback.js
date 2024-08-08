import { audio } from "./Oscillator";
import { simonContext } from "../context/SimonProvider";

const getTime = (length) => { 
    if (length > 9) {
        return 500;
    } else if ( length > 4){
        return 750;
    }
    return 1000;
}

export const timeOut = (i, sequence, length) => {
    const {
        setIndex
    } = simonContext();

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
