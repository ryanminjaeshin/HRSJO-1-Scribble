import { io } from "../index";
import SocketEvents from "../../src/lib/enums/socketEvents";
import GameLobby from "../../src/lib/gameLogic/GameLobby";

// io.on("connect", (socket) => {
//   console.log(socket);
// });

const lobbies = {};

const dynamicNspLobby = io.of(/[\s\S]*/);

dynamicNspLobby.on("connect", (socket) => {
  const nameSpace = socket.nsp;
  const nameSpaceName = socket.nsp.name;

  if (!lobbies[nameSpaceName]) {
    console.log(`new nameSpaceName lobby created: ${nameSpaceName}`);
    lobbies[nameSpaceName] = new GameLobby(nameSpace);
  }
  const currentLobby = lobbies[nameSpaceName];

  socket.on(SocketEvents.ADD_USER_TO_LOBBY, (userName) => {
    const userObject = { userId: socket.id, userName };
    currentLobby.addUser(userObject);
  });
});
