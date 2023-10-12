import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import ToastMessages from "./Components/ToastMessages/ToastMessages";

axios.defaults.baseURL = "http://localhost:7000/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastMessages />
    <App />
  </BrowserRouter>
);

reportWebVitals();
