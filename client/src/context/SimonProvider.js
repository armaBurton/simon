import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCurrentUser, signIn, signOut, signUp } from "../services/simon";
import { getTopScores } from "../services/topScores";
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
  const [topScores, setTopScores] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        const tops = await getTopScores();
        if (isMounted) setUser(user);
        if (isMounted) setTopScores(tops);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // USER AUTH FUNCTIONS
  const login = async ({ email, password }) => {
    try {
      const user = await signIn(email, password);
      console.log(`*** *** *** *** ***`);
      console.log(` `);
      console.log(`>>>50 >>>user-->    `, user);
      console.log(` `);
      console.log(`*** *** *** *** ***`);
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  const newUser = async ({ email, password }) => {
    try {
      const user = await signUp(email, password);
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  const setUserNull = useCallback(() => {
    setUser(null);
  });

  const logout = useCallback(() => {
    signOut.then(() => setUser(null));
  });

  const value = useMemo(
    () => ({
      // TOP SCORES
      topScores,
      setTopScores,
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
      //TOP SCORES
      topScores,
      // USER
      loading,
      user,
      // SIMON
      count,
      randoPattern,
      userPattern,
      gameOn,
      playerTurn,
      index,
      // AUTH
      login,
      newUser,
      setUserNull,
      logout,
    ]
  );

  return (
    <SimonContext.Provider value={value}>
      {renderView({ ...value, children })}
    </SimonContext.Provider>
  );
};

export const getCurrentSimon = async () => {
  const res = await fetch("http://localhost:7890/api/v1/users/me", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });

  const text = await res.text();
  console.log("getCurrentSimon Raw response text: ", text);

  if (!res.ok) throw new Error(JSON.parse(text).error || "Error fetching user");
  // const data = await res.json();
  // return data;

  return JSON.parse(text);
};

export const useCurrentSimon = () => {
  const context = useContext(SimonContext);

  if (!context) {
    throw new Error(`useCurrentSimon must be used within a SimonProvider`);
  }

  return context;
};

export const useAuth = () => {
  const context = useContext(SimonContext);

  if (context === undefined)
    throw new Error("useAuth, must be used withing a SimonProvider");

  return {
    logout: context.logout,
    login: context.login,
    newUser: context.newUser,
  };
};
