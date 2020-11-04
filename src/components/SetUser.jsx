import React, { useState, useEffect } from "react";
import SocketEvents from "../lib/enums/socketEvents";
import UserList from "./UserList";

function SetUser({ socket, setUserName, userName }) {
  const [userNameInput, updateUserName] = useState("");
  const [readyStatus, setReadySatus] = useState(false);

  function addUserName(userNameInput) {
    socket.emit(SocketEvents.ADD_USER_TO_LOBBY, userNameInput);
  }

  useEffect(() => {
    function validateUserName(message) {
      console.log("private", message.success);
      if (!message.success) {
        window.alert(`${userNameInput} is already taken, try again plz`);
      } else {
        console.log("lobby", message.success, userNameInput);
        setUserName(userNameInput);
      }
    }

    socket.on(SocketEvents.USER_MESSAGE, validateUserName);
    socket.on(SocketEvents.LOBBY_MESSAGE, validateUserName);

    return () => {
      socket.off(SocketEvents.LOBBY_MESSAGE, validateUserName);
      socket.off(SocketEvents.USER_MESSAGE, validateUserName);
    };
  }, [userNameInput]);

  function updateUserReady(status) {
    const options = {
      property: "readyStatus",
      value: status,
      userName,
    };
    socket.emit(SocketEvents.UPDATE_USER, options);
    setReadySatus(status);
  }

  if (!userName) {
    return (
      <div>
        <form>
          <input
            type="text"
            value={userNameInput}
            onChange={(e) => updateUserName(e.target.value)}
          />
          <input
            type="submit"
            value="Set User Name"
            onClick={(e) => {
              e.preventDefault();
              addUserName(userNameInput);
            }}
          />
        </form>
      </div>
    );
  } else {
    return (
      <div>
        Click this when everyone is in the room!
        <input
          type="checkbox"
          checked={readyStatus}
          onChange={(e) => {
            updateUserReady(true);
          }}
        />
        <UserList socket={socket} />
        <span>
          GAME AUTOMATICALLY STARTS WHEN ALL PRESENT PLAYERS CLICK READY
        </span>
      </div>
    );
  }
}

export default SetUser;
