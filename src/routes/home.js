import express from "express";
import App from "../components/app";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import hbs from "handlebars";

const router = express.Router();

router.get("", async (req, res) => {
  const context = {};
  const theHtml = `
  <html>
    <head>
      <title>Scribble Test</title>
    </head>
    <body>
      
      <div id="app">NOT RENDERED</div>
      <script type="text/javascript" src="/app.js"></script>
      <script type="text/javascript" src/vendor.js"></script>
    </body>
  </html>
  `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  res.send(htmlToSend);
});

export default router;
