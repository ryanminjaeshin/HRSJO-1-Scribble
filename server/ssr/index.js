import { app } from "../index";
import url from "url";
import App from "../../src/components/App";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import hbs from "handlebars";

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", function (req, res) {
  const redirect = { lobby: req.query.lobby };
  const context = {};
  const theHtml = `
    <html>
      <head>
        <title>Scribble Test</title>
      </head>
      <body>
      <script>window.PROPS=${JSON.stringify(redirect)}</script>
        <div id="app">NOT RENDERED</div>
        <script type="text/javascript" src="/app.js"></script>
        <script type="text/javascript" src/vendor.js"></script>
      </body>
    </html>
    `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App redirect={"test"} />
    </StaticRouter>
  );
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  res.send(htmlToSend);
});

app.get("*", function (req, res) {
  const endpoint = url.parse(req.url, true).pathname;
  const property = endpoint.replace(/^\//, "");
  res.redirect(`/home?lobby=${property}`);
});
