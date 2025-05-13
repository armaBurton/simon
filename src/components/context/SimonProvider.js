import { createContext, useContext, useMemo, useState } from "react";
// import { SimonProvider } from "./components/context/SimonProvider";

const SimonContext = createContext();

export const SimonProvider = ({ children }) => {
  console.log("SimonProvider is rendering");

  const [count, setCount] = useState(0);
  const [randoPattern, setRandoPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [index, setIndex] = useState(0);

  const value = useMemo(
    () => ({
      count,
      setCount,
      randoPattern,
      setRandoPattern,
      userPattern,
      setUserPattern,
      gameOn,
      setGameOn,
      playerTurn,
      setPlayerTurn,
      index,
      setIndex,
    }),
    [count, randoPattern, userPattern, index, gameOn, playerTurn]
  );

  return (
    <SimonContext.Provider value={value}>{children}</SimonContext.Provider>
  );
};

export const useSimon = () => {
  const context = useContext(SimonContext);

  if (context === undefined) {
    throw new Error(`useSimon must be used within a SimonProvider`);
  }

  return context;
};

//   return (
//     <SimonContext.Provider
//       value={{
//         count,
//         setCount,
//         randoPattern,
//         setRandoPattern,
//         userPattern,
//         setUserPattern,
//         index,
//         setIndex,
//         gameOn,
//         setGameOn,
//         playerTurn,
//         setPlayerTurn,
//       }}
//     >
//       {children}
//     </SimonContext.Provider>
//   );
// export const useSimon = () => {
//   const context = useContext(SimonContext);

//   if (context === undefined) {
//     throw new Error("useSimon must be used withing a SimonProvider");
//   }

//   return context;
// };

// export const simonContext = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   return useContext(SimonContext);
// };

//   const simonState = {
//     count,
//     setCount,
//     randoPattern,
//     setRandoPattern,
//     userPattern,
//     setUserPattern,
//     index,
//     setIndex,
//     gameOn,
//     setGameOn,
//     playerTurn,
//     setPlayerTurn,
//   };
