import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/authPage";
import "./App.css";
import InfoProvider from "./context/infoProvider";
import HomePage from "./pages/homePage";
import GamePage from "./pages/gamePage";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ChakraProvider>

        <InfoProvider>
          <Routes>
            <Route path="/" element={<AuthPage />} exact />
            <Route path="/home" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </InfoProvider>
      </ChakraProvider>
      </BrowserRouter>
    </div>
    
  );
}
