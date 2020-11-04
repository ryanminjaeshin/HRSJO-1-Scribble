import React, { useState, useEffect } from "react";
import SocketEvents from "../lib/enums/socketEvents";

function SetUser({ socket }) {
  const [userNameInput, updateUserName] = useState("");
  const [userName, setUserName] = useState();

  function addUserName(userName) {
    socket.emit(SocketEvents.ADD_USER_TO_LOBBY, userName);
  }

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
}

export default SetUser;
