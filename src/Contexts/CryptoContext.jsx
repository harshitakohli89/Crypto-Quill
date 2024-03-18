import React, { createContext, useContext, useEffect, useState } from "react";

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
    setType: () => {}
  }
});

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
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
        setAlert
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  return useContext(CryptoContext);
};
