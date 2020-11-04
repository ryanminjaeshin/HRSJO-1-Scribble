import { http } from "../index";

const io = require("socket.io")(http);

// io.on("connect", (socket) => {
//   console.log(socket);
// });

const dynamicNsp = io.of(/[\s\S]*/).on("connect", (socket) => {
  console.log("TEST");
  const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
  console.log(newNamespace.name);

  // broadcast to all clients in the given sub-namespace
  newNamespace.emit("hello");
});
