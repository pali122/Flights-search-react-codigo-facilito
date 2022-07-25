import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import IndexForm from "./components/MainForm/IndexForm";
import PageNotFound from "./utility_components/NotFoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import FlightsTable from "./components/FlightsPage/FlightsTable";
import SegmentsTable from "./components/ReviewFlight/SegmentsTable";
import initializeThree from "./assets/treejs";

const propsTree = initializeThree();
console.log(propsTree);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<IndexForm propsTree={propsTree} />} />
        <Route
          path="date/:from/:to/:dateFrom/:dateTill/:nAdults/:nChildren"
          element={<FlightsTable />}
        />
        <Route path="ticket/:flightID" element={<SegmentsTable />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
