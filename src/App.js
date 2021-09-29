import React, { useContext } from "react";
import useStyles from "./appStyles";
import { Sidebar, Chat, HomePage, Login, FullApp } from "./components";

import { createTheme, ThemeProvider } from "@material-ui/core";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Login2 from "./components/Login2.jsx/Login2";
import Signup from "./components/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const theme = createTheme({
  breakpoints: {
    values: {
      // sm : 400
    },
  },
});

const App = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(CurrentUserContext);

  console.log("user in app comp => ", user);

  return (
    // <ThemeProvider theme={theme}>
    <Router>
      <div className={classes.app}>
        <div className={classes.app__body}>
          <Switch>
            <Route path="/login" component={Login2} />

            <Route path="/signup" component={Signup} />

            {/* <Route path="/" exact>
              <Sidebar/>
              <Chat/>
            </Route> */}
            <PrivateRoute path="/" exact component={FullApp} />

            <Route
              path="/app/chat/:roomId"
              render={(props) => (
                <>
                  <Sidebar />

                  <Chat {...props} />
                </>
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
    // </ThemeProvider>
  );
};

export default App;
