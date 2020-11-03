import React from "react";
import { hydrate, render } from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
const renderMethod = module.hot ? render : hydrate;

renderMethod(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
