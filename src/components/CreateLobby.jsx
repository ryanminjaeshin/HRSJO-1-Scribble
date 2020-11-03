import React, { useState } from "react";
import { Link } from "react-router-dom";

function CreateLobby() {
  const [lobbyName, updateLobbyName] = useState("");

  return (
    <div>
      <form>
        <label>
          Room Name:
          <input
            type="text"
            value={lobbyName}
            onChange={(e) => updateLobbyName(e.target.value)}
          />
          <Link to={"lobby-" + lobbyName}>
            <input type="submit" value="Create Lobby" />
          </Link>
        </label>
      </form>
    </div>
  );
}

export default CreateLobby;
