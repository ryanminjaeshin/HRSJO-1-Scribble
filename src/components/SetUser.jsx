import React, { useState, useEffect } from "react";
import SocketEvents from "../lib/enums/socketEvents";

function SetUser({ socket }) {
  const [userNameInput, updateUserName] = useState("");
  const [userName, setUserName] = useState();

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
    return <h2>UserName: {userName}</h2>;
  }
}

export default SetUser;
