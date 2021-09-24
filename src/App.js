import React from "react";
import useStyles from "./appStyles";
import { Sidebar, Chat, HomePage, Login} from "./components";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = createTheme({
  breakpoints: {
    values: {
      // sm : 400
    },
  },
});

const App = () => {
  const classes = useStyles();
  return (
    // <ThemeProvider theme={theme}>
    <Router>
      <div className={classes.app}>
        <div className={classes.app__body}>
          
          <Switch>
          <Route path="/login">
                    <Login/>
                </Route>
          <Route path="/app/chat/:roomId" render={(props) => (
    // <DetailsPage id={props.match.params.id}/>
    <>
    <Sidebar />

    <Chat {...props}/>
    </>
)} />
             
       
        
              <Route path="/">
                  <HomePage/>
              </Route>
            
          </Switch>
        </div>
      </div>
    </Router>
    // </ThemeProvider>
  );
};

export default App;
