import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCurrentUser, signIn, signOut, signUp } from "../services/simon";
import { renderView } from "../utils/renderView";

const SimonContext = createContext();

export const SimonProvider = ({ children }) => {
  // USER
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // SIMON
  const [count, setCount] = useState(0);
  const [randoPattern, setRandoPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [index, setIndex] = useState(0);

  // USER AUTH FUNCTIONS
  const login = useCallback(async ({ email, password }) => {
    try {
      const user = await signIn({ email, password });
      setUser(user);
    } catch (err) {
      throw err;
    }
  }, []);

  const newUser = useCallback(async ({ email, password }) => {
    try {
      const user = await signUp(email, password);
      setUser(user);
    } catch (err) {
      throw err;
    }
  }, []);

  const setUserNull = useCallback(() => {
    setUser(null);
  }, []);

  const logout = useCallback(() => {
    signOut().then(() => setUser(null));
  }, []);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      // USER
      loading,
      setLoading,
      user,
      setUser,
      //SIMON
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
      //AUTH
      login,
      newUser,
      setUserNull,
      logout,
    }),
    [
      // USER
      loading,
      user,
      //SIMON
      count,
      randoPattern,
      userPattern,
      gameOn,
      playerTurn,
      index,
    ]
  );

  return (
    <SimonContext.Provider value={value}>
      {renderView({ ...value, children })}
    </SimonContext.Provider>
  );
};

export const useSimon = () => {
  const context = useContext(SimonContext);

  if (context === undefined) {
    throw new Error(`useSimon must be used within a SimonProvider`);
  }

  return context;
};

export const useAuth = () => {
  const context = useContext(SimonContext);

  if (context == undefined)
    throw new Error("useAuth, must be used withing a UserProvider");

  return {
    logout: context.logout,
    login: context.login,
    newUser: context.newUser,
  };
};
