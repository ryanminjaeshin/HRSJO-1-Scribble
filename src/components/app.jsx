import React from "react";
import { Switch, Route, HashRouter, BrowserRouter } from "react-router-dom";
import CreateLobby from "./CreateLobby";
import GameLobby from "./GameLobby";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={CreateLobby} />
        <Route path="/:lobbyName" children={<GameLobby />} />
      </Switch>
    </div>
  );
}

export default App;
