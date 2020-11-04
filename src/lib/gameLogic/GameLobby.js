import User from "./User";
import SocketEvents from "../enums/socketEvents";
import { emitEvent } from "../utils";

class GameLobby {
  constructor(lobbyName) {
    this.lobbyName = lobbyName;
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
      emitEvent(target, message, event);
    }, 1000);
  }

  addUser(userData) {
    const { userName, userId } = userData;
    console.log(userId);
    let message,
      target,
      event = SocketEvents.MESSAGES;

    if (!this.users[userName]) {
      console.log("user doesn't exist");
      this.users[userName] = new User(userName, userId);
      console.log(this.users);
      message = `${userName} has joined the lobby yo`;
      target = this.lobbyName;
    } else {
      console.log("user exist");
      message = `${userName} already taken buddy, try again`;
      target = userId;
    }
    emitEvent(target, message, event);
  }
}

export default GameLobby;
