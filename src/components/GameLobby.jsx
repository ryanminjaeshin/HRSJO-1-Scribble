import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import SetUser from "./SetUser";
// import Events from "../../lib/enums/events";
import establishIoConnection from "../lib/socket/";

function GameLobby() {
  const [lobbyName] = useState(useParams().lobbyName);
  const socket = useRef(establishIoConnection(window.location.pathname));
  return (
    <div>
      <h3>LobbName: {lobbyName}</h3>
      <SetUser socket={socket.current} />
      {<ChatRoom socket={socket.current} />}
    </div>
  );
}

export default GameLobby;
