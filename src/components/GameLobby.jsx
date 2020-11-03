import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// import ChatRoom from "./ChatRoom.js";
// import UserName from "./UserName.js";
// import Events from "../../lib/enums/events";
import establishIoConnection from "../lib/socket/index.js";

function GameLobby() {
  const [lobbyName] = useState(useParams().lobbyName);
  const [userName, setUserName] = useState();
  const socket = useRef(establishIoConnection(window.location.hash));

  return (
    <div>
      <h3>ID:, {lobbyName}</h3>
      {/* <UserName
        userName={userName}
        submitUserNameAndConnect={submitUserNameAndConnect}
      /> */}
      {/* {<ChatRoom socket={socket} />} */}
    </div>
  );
}

export default GameLobby;
