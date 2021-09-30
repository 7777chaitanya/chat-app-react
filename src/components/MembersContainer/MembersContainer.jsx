import { Box, IconButton, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const MembersContainer = ({handleGroupMembersContainer}) => {
    const classes = useStyles();
  return (
    <div>
      <Box className={classes.HeaderBox}>
        <IconButton onClick={handleGroupMembersContainer}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Group Members</Typography>
      </Box>
    </div>
  );
};

export default MembersContainer;
