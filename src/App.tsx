import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/login";
import Main from "./components/main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/main" component={Main} />
          <Redirect from="/" exact to="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
