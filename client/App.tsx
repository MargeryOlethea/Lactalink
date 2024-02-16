import React from "react";
import { LoginProvider } from "./contexts/LoginContext";
import StacksHolder from "./navigations/StacksHolder";

export default function App() {
  return (
    <>
      <LoginProvider>
        <StacksHolder />
      </LoginProvider>
    </>
  );
}
