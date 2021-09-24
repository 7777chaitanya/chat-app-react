import React, { useContext } from "react";
import useStyles from "./appStyles";
import { Sidebar, Chat, HomePage, Login } from "./components";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

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

  console.log("user in app comp => ",user)
 

  return (
    // <ThemeProvider theme={theme}>
    <Router>
      <div className={classes.app}>
        <div className={classes.app__body}>
          <Switch>
              
            <Route path="/login">
              <Login />
            </Route>

            <Route
              path="/app/chat/:roomId"
              render={(props) => (
                <>
                  <Sidebar />

                  <Chat {...props} />
                </>
              )}
            />
            {user ?
            (<Route path="/">
              <HomePage />
            </Route>) : (
                <Redirect to="/login"/>
            )}
          </Switch>
        </div>
      </div>
    </Router>
    // </ThemeProvider>
  );
};

export default App;
