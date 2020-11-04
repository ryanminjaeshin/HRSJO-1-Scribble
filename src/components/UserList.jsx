import React, { useState, useEffect } from "react";
import SocketEvents from "../lib/enums/socketEvents";

function UserList({ socket, userName }) {
  const [users, updateUsers] = useState({});

  useEffect(() => {
    function updateUserData(usersData) {
      console.log("updated");
      updateUsers(usersData.data);
    }
    socket.on(SocketEvents.USERS_UPDATED, updateUserData);

    return () => {
      socket.off(SocketEvents.USERS_UPDATED, updateUserData);
    };
  }, [users]);

  function updateUserReady(status) {
    const options = {
      property: "readyStatus",
      value: status,
      userName,
    };
    socket.emit(SocketEvents.UPDATE_USER, options);
  }

  return (
    <ul>
      {Object.values(users).map((user, i) => {
        return (
          <li key={user.userId}>
            <h2>
              Player {i + 1}: {user.userName + " is "}
              <span>{user.readyStatus ? "ready" : "not ready"}</span>
            </h2>
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;
