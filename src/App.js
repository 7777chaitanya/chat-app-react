import React from 'react';
import useStyles from "./appStyles";
import {Sidebar, Chat} from "./components";

import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
    breakpoints: {
        values : {
            // sm : 400
        }
    }})

const App = () => {
    const classes = useStyles();
    return (
        // <ThemeProvider theme={theme}>

        <div className={classes.app}>
            <div className={classes.app__body}>
                {/* sidebar with people list */}
                <Sidebar/>

                {/* messages */}
                <Chat/>
            </div>
        </div>
        // </ThemeProvider>

    )
}

export default App
