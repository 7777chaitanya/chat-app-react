import React,{useContext} from 'react';
import useStyles from "./styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Box, TextField, Button, Card, Typography } from "@material-ui/core";
import { AllUsersContext } from '../../contexts/AllUsersContext';
import { CurrentUserDocContext } from '../../contexts/CurrentUserDocContext';
import EachMessage from "../EachMessage/EachMessage";


const LikedMessagesContainer = ({handleLikedMessagesContainer, messages, roomDocId}) => {
    const classes = useStyles();
    const likedMessages = messages.filter(message => message.liked===true);

    const { allUsers, setAllUsers } = useContext(AllUsersContext);
    const { currentUserDoc, setCurrentUserDoc } = useContext(
      CurrentUserDocContext
    );


  const senderName = (email) => {
    const requiredUser = allUsers?.find((doc) => doc.email === email);
    if (requiredUser?.name === currentUserDoc?.name) {
      return "You";
    } else {
      return requiredUser?.name;
    }
  };
    return (
        <div>
           <Box className={classes.HeaderBox}>
        <IconButton onClick={handleLikedMessagesContainer}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Liked Messages</Typography>
      </Box>
      {likedMessages.length !== 0 ? (
        likedMessages.map((eachMessage) => (
          <Box className={classes.messageBox}>
            <EachMessage
              name={senderName(eachMessage.name)}
              time={eachMessage.time.toDate().toString()}
              message={eachMessage.message}
              imageUrl={eachMessage?.imageUrl}
              email={eachMessage.name}
              id={eachMessage.id}
              roomDocId={roomDocId}
              liked={eachMessage?.liked}
              liked={eachMessage?.liked}
            />
          </Box>
        ))
      ) : (
        <Card>
          <Typography>
            There are no liked messages. Star a message to display here!
          </Typography>
        </Card>
      )}
       </div>
    )
}

export default LikedMessagesContainer
