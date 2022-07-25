import { useState, useEffect } from "react";
import "./App.css";
import { useMousePosition } from "./hooks/useMouseAnimation";
import { Outlet } from "react-router-dom";
import StoreProvider from "./store/StoreProvider";
import FlightIcon from "@mui/icons-material/Flight";

const App = () => {
  return (
    <div className="App ">
      <div></div>
      <h1 className="text-center">
        Search <FlightIcon className="main-icon-center" /> Flights
      </h1>
      <div id="mouseAnimated" className="card radial-gradient">
        <StoreProvider>
          <Outlet />
        </StoreProvider>
      </div>
    </div>
  );
};

export default App;
