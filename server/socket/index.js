import { http } from "../index";

const io = require("socket.io")(http);

const dynamicNsp = io.of(/^\/lobby-$/).on("connect", (socket) => {
  const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
  console.log(newNamespace);
  // broadcast to all clients in the given sub-namespace
  newNamespace.emit("hello");
});
