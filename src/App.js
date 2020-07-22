import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import "./styles.css";

export default function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/game" component={Game} />
      </Switch>
    </main>
  );
}
