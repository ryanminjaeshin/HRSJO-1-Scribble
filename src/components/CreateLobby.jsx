import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function CreateLobby({ redirect }) {
  const [lobbyName, updateLobbyName] = useState("");

  if (redirect.lobby) {
    console.info(`redirecting to ${redirect.lobby}`);
    return <Redirect to={redirect.lobby} />;
  }
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
          <Link to={"/lobby-" + lobbyName}>
            <input type="submit" value="Create Lobby" />
          </Link>
        </label>
      </form>
    </div>
  );
}

export default CreateLobby;
