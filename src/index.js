import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "./App";
import { WeatherProvider } from "./context/weather-context";
//import reportWebVitals from "./reportWebVitals";

import { Container } from "react-bootstrap";

import CurrentWeather from "./components/current-weather";
import Menu from "./components/menu";
import DailyForecast from "./components/daily-forecast";
import SearchModal from "./components/search/modal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherProvider>
      <Router>
        <Menu />
        <Container>
          <Routes>
            <Route path="/" element={<CurrentWeather />} />
            <Route path="/daily-forecast" element={<DailyForecast />} />
          </Routes>
        </Container>
      </Router>   
      <SearchModal />   
    </WeatherProvider>
  </React.StrictMode>
);

//reportWebVitals();
