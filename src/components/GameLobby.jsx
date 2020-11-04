import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import SetUser from "./SetUser";
import establishIoConnection from "../lib/socket/";
import SocketEvents from "../lib/enums/socketEvents";
import GameBoard from "./GameBoard";

function GameLobby() {
  const [lobbyName] = useState(useParams().lobbyName);
  const [gameStatus, updateGameStatus] = useState();
  const [gameData, updateGameData] = useState();
  const [initialUserState, updateInitialUserState] = useState();
  const [userName, setUserName] = useState();
  const socket = useRef(establishIoConnection(window.location.pathname))
    .current;

  useEffect(() => {
    function startGame(message) {
      updateGameData(message.data);
      updateGameStatus(message.success);
      updateInitialUserState(message.users);
    }
    socket.on(SocketEvents.START_GAME, startGame);

    return () => {
      socket.off(SocketEvents.START_GAME, startGame);
    };
  }, [gameStatus]);

  return (
    <div>
      <h3>LobbName: {lobbyName}</h3>
      {gameStatus ? (
        <GameBoard
          initialGameData={gameData}
          initialUserStates={initialUserState}
          socket={socket}
          userName={userName}
        />
      ) : (
        <SetUser
          socket={socket}
          userName={userName}
          setUserName={setUserName}
        />
      )}
      {<ChatRoom socket={socket} userName={userName} />}
    </div>
  );
}

export default GameLobby;
