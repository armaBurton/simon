export const audio = (color) => {
    const context  = new AudioContext();

    const freq = (color === "blue") ? 195.998 :
    (color === "yellow") ? 261.626 : 
      (color === "red") ? 329.628 : 
        (color === "green" ) ? 391.995 : 42;

    const playOscillator = (startTime, endTime, freq) => {
        const oscillator = context.createOscillator();
        const 
    }

  playOscillator(context.currentTime, context.currentTime + .42, freq)


}