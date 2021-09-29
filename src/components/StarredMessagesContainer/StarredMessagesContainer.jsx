import React from 'react';
import useStyles from "./styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Box, TextField, Button } from "@material-ui/core";

const StarredMessagesContainer = ({handleStarredMessagesContainer}) => {
    const classes = useStyles();
    return (
        <div>
            starred messages container
            <IconButton onClick={handleStarredMessagesContainer}>
          <ArrowBackIcon />
        </IconButton>
        </div>
    )
}

export default StarredMessagesContainer
