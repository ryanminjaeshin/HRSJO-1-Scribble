import React, { useState, useEffect } from "react";
import SocketEvents from "../lib/enums/socketEvents";

function SetUser({ socket }) {
  const [userNameInput, updateUserName] = useState("");
  const [userName, setUserName] = useState();

  function addUserName(userName) {
    socket.emit(SocketEvents.ADD_USER_TO_LOBBY, userName);
  }

  useEffect(() => {
    socket.on(SocketEvents.USER_MESSAGE, (success) => {
      console.log("private", success);
      if (!success) {
        window.alert(`${userNameInput} is already taken, try again plz`);
      }
    });

    socket.on(SocketEvents.LOBBY_MESSAGE, (success) => {
      if (success) {
        console.log("lobby", success);
        setUserName(userName);
      }
    });
  }, []);

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
    return <h2>{userName}</h2>;
  }
}

export default SetUser;
