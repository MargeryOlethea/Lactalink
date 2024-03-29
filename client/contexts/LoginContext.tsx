import React from "react";
import { createContext, useState } from "react";
import { LoginContextType } from "../types/all.types";

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isDonor: false,
  setIsDonor: () => {},
});

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDonor, setIsDonor] = useState<boolean>(false);

  const contextValue: LoginContextType = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    isDonor: isDonor,
    setIsDonor: setIsDonor,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
