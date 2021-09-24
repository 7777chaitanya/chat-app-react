import { CardHeader, Card, Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import useStyles from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {useHistory} from "react-router-dom";
 





const EachChat = ({roomName}) => {
  const history = useHistory();

  const handleOpenChatRoom = () => {
    history.push(`/app/chat/${roomName}`);
  }
    const classes = useStyles();
    return (
        <div className={classes.root} onClick={handleOpenChatRoom}>
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
