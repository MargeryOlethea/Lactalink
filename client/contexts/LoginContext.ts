import React from "react";
import { createContext, useState } from "react";

export const LoginContext = createContext<boolean>(false);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <LoginContext.Provider value={isLoggedIn}>{children}</LoginContext.Provider>
  );
};
