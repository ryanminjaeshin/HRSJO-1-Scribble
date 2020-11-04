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
    this.timerLength = 5;
    this.drawTimer = 5;
    this.currentDrawer = 0; //index
    this.currentDrawerName;
    this.currentWord;
    this.wordsDrawn = new Set();
  }

  //reducing timer
  decrementdrawTimer() {
    const countDown = setInterval(() => {
      this.drawTimer -= 1;
      const decrementTimer = new EventOptions({
        message: {
          data: {
            drawTimer: this.drawTimer,
            currentRound: this.currentRound,
            currentDrawerName: this.currentDrawerName,
          },
        },
        event: SocketEvents.DECREMENT_DRAW_TIMER,
      });
      console.log(this.currentDrawerName);
      this.emitEvent(decrementTimer);
      if (this.drawTimer === 0) {
        clearInterval(countDown);
        this.drawTimer = this.timerLengh;
        this.setUpNextDrawer();
      }
    }, 1000);
  }

  setUpNextDrawer() {
    if (Object.keys(this.users).length - 1 === this.currentDrawer) {
      this.currentDrawer = 0;

      if (this.currentRound === this.totalRounds) {
        const gameOver = new EventOptions({
          message: {
            data: "WINNER",
          },
          event: SocketEvents.GAME_OVER,
        });
        this.emitEvent(gameOver);
        return;
      } else {
        this.currentRound += 1;
      }
    } else {
      this.currentDrawer += 1;
    }
    console.log(this.currentDrawer);
    this.currentDrawerName = Object.keys(this.users)[this.currentDrawer];
    console.log(this.currentDrawerName);
    this.drawTimer = this.timerLength;
    this.decrementdrawTimer();
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

    this.currentDrawerName = Object.keys(this.users)[this.currentDrawer];
    const {
      totalRounds,
      currentRound,
      drawTimer,
      currentDrawerName,
      users,
    } = this;

    const startGame = new EventOptions({
      message: {
        success: true,
        data: { totalRounds, currentRound, drawTimer, currentDrawerName },
        users,
      },
      event: SocketEvents.START_GAME,
    });

    if (allUsersReady) {
      this.emitEvent(startGame);
      this.decrementdrawTimer();
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
