import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "./App";
//import reportWebVitals from "./reportWebVitals";

import { Container } from "react-bootstrap";

import Menu from "./components/menu";
import Test from "./components/test";
import DailyForecast from "./components/daily-forecast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<Test />} />
          <Route path="/daily-forecast" element={<DailyForecast />} />
        </Routes>
      </Container>
    </Router>    
  </React.StrictMode>
);

//reportWebVitals();
