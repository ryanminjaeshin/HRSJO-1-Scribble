import React, { useState, useEffect, useRef } from "react";
import ScribbleBoard from "./ScribbleBoard";
import SocketEvents from "../lib/enums/socketEvents";
import { Socket } from "socket.io-client";

function GameBoard({ initialGameData, initialUserState, socket, userName }) {
  const [gameData, updateGameData] = useState(initialGameData);
  const [users, updateUserData] = useState(initialUserState);
  const [myWord, updateMyWord] = useState();

  useEffect(() => {
    function decrementDrawTimer(message) {
      const updatedGameData = { ...gameData };
      updatedGameData.drawTimer = message.data.drawTimer;
      updatedGameData.currentRound = message.data.currentRound;
      updatedGameData.currentDrawerName = message.data.currentDrawerName;
      updateGameData(updatedGameData);
    }

    function updateWord(message) {
      console.log(message);
      updateMyWord(message.data);
    }
    socket.on(SocketEvents.DECREMENT_DRAW_TIMER, decrementDrawTimer);
    socket.on(SocketEvents.START_YOUR_TURN, updateWord);

    return () => {
      socket.off(SocketEvents.DECREMENT_DRAW_TIMER, decrementDrawTimer);
    };
  }, [gameData, myWord]);

  let displayMyWord =
    userName === gameData.currentDrawerName ? <div>{myWord}</div> : <></>;

  return (
    <div>
      {displayMyWord}
      <div>Total Rounds: {gameData.totalRounds}</div>
      <div>Current Round: {gameData.currentRound}</div>
      <div>Draw Timer: {gameData.drawTimer}</div>
      <div>Current Drawer: {gameData.currentDrawerName} </div>
      <ScribbleBoard />
    </div>
  );
}

export default GameBoard;
