import User from "./User";
import SocketEvents from "../enums/socketEvents";
import { EventOptions } from "../utils";
import { Socket } from "socket.io-client";

class GameLobby {
  constructor(nameSpace) {
    this.lobbyName = nameSpace.name;
    this.nameSpace = nameSpace;
    this.users = {};
    this.totalRounds = 3;
    this.currentRound = 1;
    this.roundTimer = 30;
    this.currentDrawer = 0; //index
  }

  //reducing timer
  decrementRoundTimer() {
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
    let message,
      target,
      event,
      options = [];

    if (!this.users[userName]) {
      console.log(`${userName} doesn't exist`);

      this.users[userName] = new User(userName, userId);

      const newUserSuccessMsg = new EventOptions({
        message: {
          success: true,
          message: `${userName} has joined the lobby!`,
          time: new Date(),
        },
        event: SocketEvents.LOBBY_MESSAGE,
      });

      const newUserUpdateMsg = new EventOptions({
        message: {
          data: this.users,
        },
        event: SocketEvents.USERS_UPDATED,
      });

      options.push(newUserSuccessMsg, newUserUpdateMsg);
    } else {
      const userAlreadyExistsMsg = new EventOptions({
        message: {
          success: true,
          message: "User Exists already homie",
          time: new Date(),
        },
        target: userId,
        event: SocketEvents.USER_MESSAGE,
      });
      options.push(userAlreadyExistsMsg);
    }
    this.emitEvent(options);
  }

  updateUser(options) {
    console.log(options);
    this.users[options.userName].updateProperty(
      options.property,
      options.value
    );
    const newUserUpdateMsg = new EventOptions({
      message: {
        data: this.users,
      },
      event: SocketEvents.USERS_UPDATED,
    });

    this.emitEvent(newUserUpdateMsg);
    this.checkLobbyReadyStatus();
  }
  checkLobbyReadyStatus() {
    const allUsersReady = Object.values(this.users).every(
      (user) => user.readyStatus
    );
    const { totalRounds, currentRound, roundTimer, currentDrawer } = this;

    const newUserUpdateMsg = new EventOptions({
      message: {
        success: true,
        data: { totalRounds, currentRound, roundTimer, currentDrawer },
      },
      event: SocketEvents.START_GAME,
    });

    if (allUsersReady) {
      this.emitEvent(newUserUpdateMsg);
    }
  }
  emitEvent(options) {
    if (Array.isArray(options)) {
      options.forEach((option) => this.emitEvent(option));
    } else {
      if (!options.target) {
        this.nameSpace.emit(options.event, options.message);
      } else {
        this.nameSpace.to(options.target).emit(options.event, options.message);
      }
    }
  }
}

export default GameLobby;
