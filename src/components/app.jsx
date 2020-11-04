import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateLobby from "./CreateLobby";
import GameLobby from "./GameLobby";

function App({ redirect }) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/home"
          children={<CreateLobby redirect={redirect} />}
        />
        <Route path="/:lobbyName" children={<GameLobby />} />
      </Switch>
    </div>
  );
}

export default App;
