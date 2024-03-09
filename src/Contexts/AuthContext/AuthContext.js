import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const val = localStorage.getItem("tkn");

  useEffect(() => {
    if (val != null) {
      setToken(val);
    }
  }, []);

  const authContextValue = {
    token,
    setToken,
  };

  return (
    <>
      <authContext.Provider value={authContextValue}>
        {children}
      </authContext.Provider>
    </>
  );
};
