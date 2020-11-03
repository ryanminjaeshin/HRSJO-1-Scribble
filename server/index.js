import express from "express";
import compression from "compression";

var app = express();
app.use(compression());
app.use(express.static("public"));

const http = require("http").createServer(app);
const socket = require("./socket/index");
const ssr = require("./ssr/index");

const port = process.env.PORT || 3030;
http.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});

export { app, http };
