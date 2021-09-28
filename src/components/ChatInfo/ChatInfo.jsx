import React, { useState, useEffect, useContext} from "react";
import useStyles from "./styles";
import { motion } from "framer-motion";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Box, TextField, Button } from "@material-ui/core";
import { AccountCircle, ContactsOutlined } from "@material-ui/icons";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CurrentRoomContext } from '../../contexts/CurrentRoomContext';
import { db } from "../../firebase";
import { collection, deleteDoc, doc, query } from "@firebase/firestore";

const ChatInfo = ({name, avatarUrl,messages, bio, roomContent,handleShowRightContainer}) => {
  const classes = useStyles();
  const [showUserNamePen, setShowUserNamePen] = useState(false);
  const [username, setusername] = useState("");
  const [userBio, setUserBio] = useState("");
  const {currentRoom} = useContext(CurrentRoomContext);

  useEffect(() => {
    if(roomContent.privateChat){
    setUserBio(bio)}
    else{
      setUserBio(roomContent.desc)
    }
  }, [name])

  const messagesWithMedia = messages.filter(message => message?.imageUrl?.length > 2);
  

  const handleFocusUserNameField = () => {
    console.log("focus user name field");
  };

  const saveUsernameChanges = () => {
    console.log("handle user name changes");
  };
  console.log("biiio=>", roomContent)

  const handleClearMessagesFromChat = async () => {
      messages.forEach(message=>
       deleteDoc(doc(db, "rooms", currentRoom, "messages", message.id))

      );
  }

  return (
    <div>
      <div className={classes.profileDrawerHeader}>
        <IconButton onClick={handleShowRightContainer}>
          <ArrowBackIcon />
        </IconButton>
        <p className={classes.profileDrawerHeaderText}>{name}</p>
      </div>

      <div className={classes.avatarBox}>
        <div className={classes.avatar}>
          {avatarUrl ? (
            <Avatar className={classes.avatarSize} src={avatarUrl}/>
          ) : (
            <AccountCircle className={classes?.avatarSize} />
          )}
        </div>
      </div>

     { !roomContent.privateChat &&

     ( <Box className={classes.usernameBox}>
        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue={roomContent.name}
          disabled={showUserNamePen}
          // onChange={handleUsernameChange}
        />
        {!roomContent.privateChat &&
          (<IconButton onClick={handleFocusUserNameField}>
            <EditIcon />
          </IconButton>)}
          {!roomContent.privateChat &&
          (<IconButton onClick={saveUsernameChanges} disabled={!username}>
            <CheckIcon />
          </IconButton>)}
      </Box>)}


      <Box className={classes.usernameBox}>
        <TextField
          required
          id="standard-required"
          label="Required"
          value={userBio}
          disabled={showUserNamePen}
          // onChange={handleUsernameChange}
        />
         {!roomContent.privateChat &&
          (<IconButton onClick={handleFocusUserNameField}>
            <EditIcon />
          </IconButton>)}
          {!roomContent.privateChat &&
          (<IconButton onClick={saveUsernameChanges} disabled={!username}>
            <CheckIcon />
          </IconButton>)}
      </Box>


      <Box className={classes.MediaBox}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png"
          alt=""
          className={classes.mediaBoxImages}
        />
        
        {messagesWithMedia.map(message => <img src={message.imageUrl} className={classes.mediaBoxImages} />)}
      </Box>
      <Box className={classes.buttonBox}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteForeverIcon />}
        fullWidth={true}
        className={classes.chatInfoButtons}
      >
        Delete Chat
      </Button>
      </Box>
      <Box className={classes.buttonBox}>

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteForeverIcon />}
        fullWidth={true}
        className={classes.chatInfoButtons}
        onClick={handleClearMessagesFromChat}
      >
        Clear Chat
      </Button>
      </Box>

    </div>
  );
};

export default ChatInfo;
