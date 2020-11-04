import React, { useState, useEffect, useRef } from "react";
import ScribbleBoard from "./ScribbleBoard";
import SocketEvents from "../lib/enums/socketEvents";

function GameBoard({ initialGameData, initialUserState, socket }) {
  const [gameData, updateGameData] = useState(initialGameData);
  const [users, updateUserData] = useState(initialUserState);
  console.log(initialGameData);
  useEffect(() => {
    function decrementDrawTimer(message) {
      const updatedGameData = { ...gameData };
      updatedGameData.drawTimer = message.data.drawTimer;
      updatedGameData.currentRound = message.data.currentRound;
      updatedGameData.currentDrawerName = message.data.currentDrawerName;
      updateGameData(updatedGameData);
    }
    socket.on(SocketEvents.DECREMENT_DRAW_TIMER, decrementDrawTimer);

    return () => {
      socket.off(SocketEvents.DECREMENT_DRAW_TIMER, decrementDrawTimer);
    };
  }, [gameData]);

  return (
    <div>
      <div>Total Rounds: {gameData.totalRounds}</div>
      <div>Current Round: {gameData.currentRound}</div>
      <div>Draw Timer: {gameData.drawTimer}</div>
      <div>Current Drawer: {gameData.currentDrawerName} </div>
      <ScribbleBoard />
    </div>
  );
}

export default GameBoard;
