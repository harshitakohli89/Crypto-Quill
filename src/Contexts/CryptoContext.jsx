import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import { CoinList } from "../components/config/api";

const CryptoContext = createContext({
  currency: "INR",
  setCurrency: () => {},
  symbol: "₹",
  alert: {
    open: false,
    message: "",
    type: "success",
    setOpen: () => {},
    setMessage: () => {},
    setType: () => {},
  },
});

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist!!");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log(user);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    fetchCoins();
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        user,
        setUser,
        alert,
        setAlert,
        watchlist,
        coins,
        loading,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  return useContext(CryptoContext);
};
