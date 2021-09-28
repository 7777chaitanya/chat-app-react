import React, { useState } from "react";
import useStyles from "./styles";
import { motion } from "framer-motion";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Box, TextField, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ChatInfo = () => {
  const classes = useStyles();
  const [showUserNamePen, setShowUserNamePen] = useState(false);
  const [username, setusername] = useState("");

  const handleFocusUserNameField = () => {
    console.log("focus user name field");
  };

  const saveUsernameChanges = () => {
    console.log("handle user name changes");
  };

  return (
    <div>
      <div className={classes.profileDrawerHeader}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <p className={classes.profileDrawerHeaderText}>Profile</p>
      </div>

      <div className={classes.avatarBox}>
        <div className={classes.avatar}>
          {true ? (
            <Avatar className={classes.avatarSize} />
          ) : (
            <AccountCircle className={classes?.avatarSize} />
          )}
        </div>
      </div>

      <Box className={classes.usernameBox}>
        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="hello"
          disabled={showUserNamePen}
          // onChange={handleUsernameChange}
        />
        {showUserNamePen && (
          <IconButton onClick={handleFocusUserNameField}>
            <EditIcon />
          </IconButton>
        )}
        {!showUserNamePen && (
          <IconButton onClick={saveUsernameChanges} disabled={!username}>
            <CheckIcon />
          </IconButton>
        )}
      </Box>

      <Box className={classes.usernameBox}>
        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="hello"
          disabled={showUserNamePen}
          // onChange={handleUsernameChange}
        />
        {showUserNamePen && (
          <IconButton onClick={handleFocusUserNameField}>
            <EditIcon />
          </IconButton>
        )}
        {!showUserNamePen && (
          <IconButton onClick={saveUsernameChanges} disabled={!username}>
            <CheckIcon />
          </IconButton>
        )}
      </Box>

      <Box className={classes.MediaBox}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png"
          alt=""
          className={classes.mediaBoxImages}
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteForeverIcon />}
        fullWidth={true}
      >
        Delete Chat
      </Button>

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteForeverIcon />}
        fullWidth={true}
      >
        Clear Chat
      </Button>
    </div>
  );
};

export default ChatInfo;
