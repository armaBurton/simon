import { audio } from "./Oscillator";

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
