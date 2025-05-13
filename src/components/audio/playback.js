import { useSimon } from "../context/SimonProvider";
import { audio } from "./oscillator";

// import { SimonContext } from "../context/SimonProvider";

export const usePlayback = () => {
  const { setIndex } = useSimon();
  const getTime = (length) => {
    if (length > 9) {
      return 500;
    } else if (length > 4) {
      return 750;
    }
    return 1000;
  };

  const playSequence = async (randoPattern) => {
    for (let i = 0; i < randoPattern.length; i++) {
      await timeOut(i, randoPattern, randoPattern.length);
    }
  };

  const timeOut = (i, sequence, length) => {
    return new Promise((resolve) => {
      const timer = getTime(length);
      setIndex(sequence[i]);
      setTimeout(() => {
        sequence[i] === 1
          ? audio("yellow")
          : sequence[i] === 2
          ? audio("red")
          : sequence[i] === 3
          ? audio("blue")
          : audio("green");
        resolve();
      }, timer);
      setIndex(0);
    });
  };

  return { timeOut, getTime, playSequence };
};
