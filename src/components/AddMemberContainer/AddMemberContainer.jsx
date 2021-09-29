import React from 'react';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Box, TextField, Button } from "@material-ui/core";
import useStyles from "./styles"



const AddMemberContainer = ({handleAddMemberContainer}) => {
    const classes = useStyles();
    return (
        <div>
            add member container
            <IconButton onClick={handleAddMemberContainer}>
          <ArrowBackIcon />
        </IconButton>
        </div>
    )
}

export default AddMemberContainer
