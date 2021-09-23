import React from 'react';
import useStyles from "./appStyles";
import {Sidebar, Chat} from "./components";

const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.app}>
            <div className={classes.app__body}>
                {/* sidebar with people list */}
                <Sidebar/>

                {/* messages */}
                <Chat/>
            </div>
        </div>
    )
}

export default App
