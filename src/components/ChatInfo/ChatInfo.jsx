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
import { AllRoomsWithDocIdContext } from "../../contexts/AllRoomsWithDocIdContext";
import {useHistory} from "react-router-dom";
import { PhotoPreviewModalContext } from "../../contexts/PhotoPreviewModalContext";
import PhotoPreviewModal from "../PhotoPreviewModal/PhotoPreviewModal"
import { useAuth } from '../../contexts/AuthContext';


const ChatInfo = ({name, avatarUrl,messages, bio, roomContent,handleShowRightContainer}) => {
  const classes = useStyles();
  const [showUserNamePen, setShowUserNamePen] = useState(false);
  const [username, setusername] = useState("");
  const [userBio, setUserBio] = useState("");
  const {currentRoom} = useContext(CurrentRoomContext);
  const {rooms,setRooms} = useContext(AllRoomsWithDocIdContext);
  const {currentUser} = useAuth();
  const history = useHistory();
  const {
    openPhotoPreviewModal,
    handleOpenPhotoPreviewModal,
    handleClosePhotoPreviewModal,
  } = useContext(PhotoPreviewModalContext);


  useEffect(() => {
    if(roomContent?.privateChat){
    setUserBio(bio)}
    else{
      setUserBio(roomContent?.desc)
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

  const handleDeleteAChat = async () => {
    await handleClearMessagesFromChat()
    await deleteDoc(doc(db,"rooms",currentRoom));
    handleShowRightContainer();
    if(rooms.length>0){
    // history.push(`/app/chat/${rooms[0].data.name}`);
    }
    else{
      history.push("/")
    }
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

      <div className={classes.pBox}>
        <p>
          Groups and their details cannot be modified once they are created!
        </p>
      </div>

     {/* { !roomContent?.privateChat &&

     ( <Box className={classes.usernameBox}>
        <TextField
          required
          id="standard-required"
          label={roomContent?.privateChat ? "Username" : "GroupName"}
          defaultValue={roomContent?.name}
          disabled={showUserNamePen}
          // onChange={handleUsernameChange}
        />
        {!roomContent?.privateChat &&
          (<IconButton onClick={handleFocusUserNameField}>
            <EditIcon />
          </IconButton>)}
          {!roomContent?.privateChat &&
          (<IconButton onClick={saveUsernameChanges} disabled={!username}>
            <CheckIcon />
          </IconButton>)}
      </Box>)} */}


      <Box className={classes.usernameBox}>
        {roomContent?.privateChat &&(
        <TextField
          // required
          id="standard-required"
          label="Bio"
          value={userBio}
          disabled={showUserNamePen}
          multiline
          maxRows={4}
          InputProps={{
            readOnly: true,
          }}
          // onChange={handleUsernameChange}
        />)}
         {/* {!roomContent?.privateChat &&
          (<IconButton onClick={handleFocusUserNameField}>
            <EditIcon />
          </IconButton>)}
          {!roomContent?.privateChat &&
          (<IconButton onClick={saveUsernameChanges} disabled={!username}>
            <CheckIcon />
          </IconButton>)} */}
      </Box>

      {messagesWithMedia.length!==0 &&
      (<div className={classes.profileDrawerHeader}>
       
        <p className={classes.profileDrawerHeaderText}>Media</p>
      </div>)}

      <Box className={classes.MediaBox}>
       
        
        {messagesWithMedia.map(message => <>
        <img src={message.imageUrl} className={classes.mediaBoxImages} onClick={handleOpenPhotoPreviewModal}/>
        {openPhotoPreviewModal && (
        <PhotoPreviewModal imageUrl={message.imageUrl} />
      )}
        </>)}
      </Box>
      {roomContent?.createdBy===currentUser?.email && 

     ( <Box className={classes.buttonBox}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteForeverIcon />}
        fullWidth={true}
        className={classes.chatInfoButtons}
        onClick={handleDeleteAChat}
      >
        Delete Chat
      </Button>
      </Box>)}

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
