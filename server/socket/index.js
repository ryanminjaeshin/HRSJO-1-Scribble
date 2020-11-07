import { io } from "../index";
import SocketEvents from "../../src/lib/enums/socketEvents";
import GameLobby from "../../src/lib/gameLogic/GameLobby";

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

  socket.on(SocketEvents.UPDATE_USER, (options) => {
    currentLobby.updateUser(options);
    currentLobby.checkLobbyReadyStatus();
  });

  socket.on(SocketEvents.SUBMIT_CHAT_MESSAGE, (data, callback) => {
    let isCorrect = currentLobby.evaluateGuess(data);
    // socket.to(currentLobby).emit(SocketEvents.USER_MESSAGE, {message: data.guess});
    console.log('DATA : ', data);
    // callback([data, isCorrect]);

    currentLobby.updateMessage(data);
    // karin theory
    // dynamicNspLobby.to(currentLobby).emit(/*IDK*/SocketEvents.SUBMIT_CHAT_MESSAGE, { user: data.user, text: data.message });
    // callback();
  });

  socket.on(SocketEvents.DRAW, function (data) {
    console.log("Received: 'mouse' " + data.x + " " + data.y);
    socket.broadcast.emit(SocketEvents.DRAW, data);
  });
});
