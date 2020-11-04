import React from "react";
import { hydrate, render } from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
const renderMethod = module.hot ? render : hydrate;
const redirect = window.PROPS;

renderMethod(
  <BrowserRouter>
    <App redirect={redirect} />
  </BrowserRouter>,
  document.getElementById("app")
);
