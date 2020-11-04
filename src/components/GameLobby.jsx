import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import SetUser from "./SetUser";
// import Events from "../../lib/enums/events";
import establishIoConnection from "../lib/socket/";
import SocketEvents from "../lib/enums/socketEvents";

function GameLobby() {
  const [lobbyName] = useState(useParams().lobbyName);
  const [gameStatus, updateGameStatus] = useState();
  const [gameData, updateGameData] = useState();
  const socket = useRef(establishIoConnection(window.location.pathname))
    .current;

  useEffect(() => {
    function startGame(message) {
      updateGameData(message.data);
      updateGameStatus(message.success);
    }
    socket.on(SocketEvents.START_GAME, startGame);

    return () => {
      socket.off(SocketEvents.START_GAME, startGame);
    };
  }, [gameStatus]);

  return (
    <div>
      <h3>LobbName: {lobbyName}</h3>
      {gameStatus ? <DrawingBoard /> : <SetUser socket={socket} />}
      {<ChatRoom socket={socket} />}
    </div>
  );
}

export default GameLobby;
