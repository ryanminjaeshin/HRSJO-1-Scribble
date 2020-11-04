import { io } from "../index";
import SocketEvents from "../../src/lib/enums/socketEvents";
import GameLobby from "../../src/lib/gameLogic/GameLobby";

// io.on("connect", (socket) => {
//   console.log(socket);
// });

const lobbies = {};

const dynamicNspLobby = io.of(/[\s\S]*/);

console.log(
  dynamicNspLobby.adapter.clients((_, clients) => {
    chat.emit("connectionChange", { usersOnline: clients });
  })
);

dynamicNspLobby.on("connect", (socket) => {
  const nameSpace = socket.nsp.name;

  if (!lobbies[nameSpace]) {
    console.log(`new namespace lobby created: ${nameSpace}`);
    lobbies[nameSpace] = new GameLobby(dynamicNspLobby, nameSpace);
  }
  const currentLobby = lobbies[nameSpace];

  socket.on(SocketEvents.ADD_USER_TO_LOBBY, (userName) => {
    const userObject = { userId: socket.id, userName };
    currentLobby.addUser(userObject);
  });

  console.log(Object.keys(io.nsps));
});
