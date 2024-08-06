export const playOscillator = (context, freq) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const time = context.currentTime;

  oscillator.connect(gain);
  oscillator.type = 'square';
  oscillator.frequency.value = freq;
  gain.gain.value = 0.125;
  gain.connect(context.destination);
  oscillator.start(time);
  oscillator.stop(time + .42);
}

export const audio = (color) => {
  const context  = new AudioContext();

  const freq = (color === "blue") ? 195.998 :
  (color === "yellow") ? 261.626 : 
    (color === "red") ? 329.628 : 
      (color === "green" ) ? 391.995 : 42;

  playOscillator(context, freq);
}