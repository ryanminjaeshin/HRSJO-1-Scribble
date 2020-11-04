import User from "./User";
import SocketEvents from "../enums/socketEvents";

class GameLobby {
  constructor(dynamicNspLobby, nameSpace) {
    this.lobbyName = nameSpace;
    this.dynamicNspLobby = dynamicNspLobby;
    this.users = {};
    this.totalRounds = 3;
    this.currentRound = 1;
    this.roundTimer = 30;
    this.currentDrawer = 0; //index
  }

  //reducing timer
  roundTimer() {
    setInterval(() => {
      this.roundTimer -= 1;
      let target = this.lobbyName;
      let message = { timeLeft: this.roundTimer };
      let event = Events.ROUND_TIMER;
      this.emitEvent(target, message, event);
    }, 1000);
  }

  addUser(userData) {
    const { userName, userId } = userData;
    let message, target, event;

    if (!this.users[userName]) {
      console.log("user doesn't exist");
      this.users[userName] = new User(userName, userId);
      message = true;
      event = SocketEvents.LOBBY_MESSAGE;
    } else {
      console.log("user exist");
      message = false;
      target = userId;
      event = SocketEvents.USER_MESSAGE;
    }
    this.emitEvent(target, message, event);
  }

  emitEvent(target, message, event) {
    if (!target) {
      this.dynamicNspLobby.emit(event, message);
    } else {
      this.dynamicNspLobby.to(target).emit(event, message);
    }
  }
}

export default GameLobby;
