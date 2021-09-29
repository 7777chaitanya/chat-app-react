import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({

    app__body : {
        height : "100vh",
        width : "100vw",
        display : "flex",
        backgroundColor : "rgb(235,235,235)",
        boxShadow : "3px 3px 2px 2px rgba(0, 0, 0, 0.2)",
        



    }
})

const FullApp = () => {
    const classes = useStyles();
    return (
        <div className={classes.app__body}>
             <Sidebar/>
              <Chat/>
        </div>
    )
}

export default FullApp
