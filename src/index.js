import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";

// React Roouter import
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
