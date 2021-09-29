import React from 'react';
import useStyles from "./styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Box, TextField, Button } from "@material-ui/core";

const LikedMessagesContainer = ({handleLikedMessagesContainer}) => {
    const classes = useStyles();
    return (
        <div>
            liked messages container
            <IconButton onClick={handleLikedMessagesContainer}>
          <ArrowBackIcon />
        </IconButton>
        </div>
    )
}

export default LikedMessagesContainer
