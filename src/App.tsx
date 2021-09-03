import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/login";
import Main from "./components/main";
import Register from "./components/auth/register";
import EmailVerified from "./components/auth/email-verified";
import ResetPassword from "./components/auth/reset-password";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={Register} />
          <Route path="/email-verified" component={EmailVerified} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/main" component={Main} />
          <Redirect from="/" exact to="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
