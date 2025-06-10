import "../../views/Main/Main.css";
import { useCurrentSimon } from "../../context/SimonProvider";
import { audio } from "./oscillator";

export const usePlayback = () => {
  const { setIndex } = useCurrentSimon();

  const getTime = (length) => {
    return length > 9 ? 500 : length > 4 ? 750 : 1000;
  };

  const getButtonTime = (length) => {
    return length > 9 ? 300 : length > 4 ? 550 : 800;
  };

  const addHighlight = async (button) => {
    switch (button.current.id) {
      case "yellow":
        await button.current.classList.add("yellowHighlight");
        break;
      case "red":
        await button.current.classList.add("redHighlight");
        break;
      case "blue":
        await button.current.classList.add("blueHighlight");
        break;
      case "green":
        await button.current.classList.add("greenHighlight");
        break;
      default:
        break;
    }
  };

  const removeHighlight = async (button) => {
    switch (button.current.id) {
      case "yellow":
        await button.current.classList.remove("yellowHighlight");
        break;
      case "red":
        await button.current.classList.remove("redHighlight");
        break;
      case "blue":
        await button.current.classList.remove("blueHighlight");
        break;
      case "green":
        await button.current.classList.remove("greenHighlight");
        break;
      default:
        break;
    }
  };

  const timeout = async (i, sequence, length, setIndex, buttonRef) => {
    return new Promise((resolve) => {
      const timer = getTime(length);
      const highlightDuration = getButtonTime(length);

      setIndex(sequence[i]);

      if (buttonRef.current) {
        addHighlight(buttonRef);
      }

      sequence[i] === 1
        ? audio("yellow")
        : sequence[i] === 2
        ? audio("red")
        : sequence[i] === 3
        ? audio("blue")
        : audio("green");

      setTimeout(() => {
        if (buttonRef.current) {
          removeHighlight(buttonRef);
        }
        setIndex(0);
      }, highlightDuration);

      setTimeout(() => {
        resolve();
      }, timer);
    });
  };

  const playSequence = async (randoPattern, refs, cRefs, buttonMouseEvents) => {
    for (let i = 0; i < randoPattern.length; i++) {
      const buttonRef = {
        1: refs.yellowRef,
        2: refs.redRef,
        3: refs.blueRef,
        4: refs.greenRef,
      }[randoPattern[i]];

      if (buttonMouseEvents?.current) {
        buttonMouseEvents.current.style.pointerEvents = "none";
      }

      Object.values(cRefs).forEach((ref) => {
        if (ref?.current) {
          ref.current.style.pointerEvents = "none";
        }
      });

      await timeout(i, randoPattern, randoPattern.length, setIndex, buttonRef);
      if (buttonMouseEvents?.current) {
        buttonMouseEvents.current.style.pointerEvents = "auto";
      }

      // buttonMouseEvents.current.style.pointerEvents = "auto";
      Object.values(cRefs).forEach((ref) => {
        if (ref?.current) {
          ref.current.style.pointerEvents = "auto";
        }
      });
    }
  };

  return { timeout, getTime, playSequence };
};
