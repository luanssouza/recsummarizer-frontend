import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";

// React Roouter import
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
