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

function App(props) {
  console.log(props);
  return (
    <div>
      <Switch>
        <Route exact path="/home" children={<CreateLobby />} />
        <Route path="/:lobbyName" children={<GameLobby />} />
      </Switch>
    </div>
  );
}

export default App;
