import User from "./User";
import SocketEvents from "../enums/socketEvents";
import { EventOptions } from "../utils";
import { Socket } from "socket.io-client";
import words from "../utils/dictionary";
import dictionary from "../utils/dictionary";

class GameLobby {
  constructor(nameSpace) {
    this.lobbyName = nameSpace.name;
    this.nameSpace = nameSpace;
    this.users = {};
    this.totalRounds = 3;
    this.currentRound = 1;
    this.timerLength = 60;
    this.drawTimer = this.timerLength;
    this.currentDrawer = 0; //index
    this.currentDrawerName;
    this.selectedWords = [];
    this.currentWord;
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

      this.emitEvent(decrementTimer);
      if (this.drawTimer === 0) {
        clearInterval(countDown);
        this.drawTimer = this.timerLengh;
        this.setUpNextDrawer();
      }
    }, 1000);
  }

  generateWordBank() {
    let usedNumbers = {};
    const requiredWords = Object.keys(this.users).length * this.totalRounds;

    for (let i = 0; i < requiredWords; i++) {
      if (Object.keys(usedNumbers) === dictionary.length) {
        usedNumbers = {};
      }
      let index = Math.floor(Math.random() * dictionary.length);
      while (usedNumbers[index]) {
        index = Math.floor(Math.random() * dictionary.length);
      }
      usedNumbers[index] = true;
      this.selectedWords.push(dictionary[index]);
    }
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
    this.currentDrawerName = Object.keys(this.users)[this.currentDrawer];
    this.setNextWord();
    this.drawTimer = this.timerLength;
    this.decrementdrawTimer();
  }

  setNextWord() {
    this.currentWord = this.selectedWords.pop();
    const currentUserSocket = this.users[this.currentDrawerName].userId;

    console.log(currentUserSocket);
    const userCurrentWord = new EventOptions({
      message: {
        data: this.currentWord,
      },
      event: SocketEvents.START_YOUR_TURN,
      target: currentUserSocket,
    });
    this.emitEvent(userCurrentWord);
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
  }
  checkLobbyReadyStatus() {
    const allUsersReady = Object.values(this.users).every(
      (user) => user.readyStatus
    );

    if (allUsersReady) {
      this.currentDrawerName = Object.keys(this.users)[this.currentDrawer];
      this.generateWordBank();
      const {
        totalRounds,
        currentRound,
        drawTimer,
        currentDrawerName,
        currentWord,
        users,
      } = this;

      const startGame = new EventOptions({
        message: {
          success: true,
          data: {
            totalRounds,
            currentRound,
            drawTimer,
            currentDrawerName,
            currentWord,
          },
          users,
        },
        event: SocketEvents.START_GAME,
      });

      this.emitEvent(startGame);
      this.setNextWord();
      this.decrementdrawTimer();
    }
  }

  evaluateGuess({ guess, userName }) {
    let message = guess.toLowerCase();
    let correctAnswer = this.currentWord.toLowerCase();
    if (message === correctAnswer) {
      let points = this.calculatePoints();

      let newScore = this.users[userName].currentScore + points;

      console.log(this.users[userName].currentScore, "currentScore");
      console.log(points, "points");

      this.updateUser({ userName, property: "currentScore", value: newScore });
      console.log(this.users);
      return true;
    } else {
      //send a message
      return false;
    }
  }

  calculatePoints() {
    return Math.floor((this.drawTimer / this.timerLength) * 100);
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
