import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SimonContext = createContext();

export const SimonProvider = ({ children }) => {
  const [signInOrUp, setSignInOrUp] = useState(true);
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
    [signInOrUp, count, randoPattern, userPattern, index, gameOn, playerTurn]
  );

  const login = async ({ username, pass }) => {
    console.log("hit login from the Simon Provider", username, password);

    console.log(`|| email: ${email}. password: ${password}`);
    const authenticatedUser = await signInUser({ email, password });

    if (authenticatedUser) setUser(authenticatedUser);
  };

  const signUp = async (email, password) => {
    const newUser = await signUpUser({ email, password });

    if (newUser) setUser(newUser);
  };

  const logOut = async (email, password) => {
    const logoutUser = await signOutUser();

    setUser(logoutUser);
  };

  const valuePlus = {
    ...value,
    login,
    signUp,
    logOut,
  };

  return (
    <SimonContext.Provider value={valuePlus}>{children}</SimonContext.Provider>
  );
};

export const useSimon = () => {
  const context = useContext(SimonContext);

  if (context === undefined) {
    throw new Error(`useSimon must be used within a SimonProvider`);
  }

  return context;
};

export const simonContext = () => {
  return useContext(SimonContext);
};
