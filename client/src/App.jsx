import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./All_Components/LandingPage/LandingPage";
const App = () => {
  return (
    <>
      <div className="App_container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
