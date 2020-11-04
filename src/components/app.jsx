import React, { useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  HashRouter,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
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
