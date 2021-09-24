import { CardHeader, Card, Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import useStyles from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";



const EachChat = ({roomName}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <CardHeader
        className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
              <>
            {/* <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton> */}
            <h6>07:30</h6>
            </>
          }
          title={roomName}
          subheader="September 14, 2016"
        />
        </div>
    )
}

export default EachChat
