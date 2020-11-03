import express from "express";
import compression from "compression";
import url from "url";
import App from "../src/components/app";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import hbs from "handlebars";

// import ssr from "./routes/home";
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(compression());
app.use(express.static("public"));

const dynamicNsp = io.of(/^\/lobby-$/).on("connect", (socket) => {
  const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
  console.log(newNamespace);
  // broadcast to all clients in the given sub-namespace
  newNamespace.emit("hello");
});

//Express Routing

app.get("/", function (req, res) {
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

//Socket Connections

const port = process.env.PORT || 3030;
http.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
