import React, { useContext } from "react";
import useStyles from "./styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Avatar,
  IconButton,
  Box,
  TextField,
  Button,
  Card,
  Typography,
} from "@material-ui/core";
import EachMessage from "../EachMessage/EachMessage";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { CurrentUserDocContext } from "../../contexts/CurrentUserDocContext";

const StarredMessagesContainer = ({
  handleStarredMessagesContainer,
  messages,
  roomDocId,
}) => {
  const classes = useStyles();
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const { currentUserDoc, setCurrentUserDoc } = useContext(
    CurrentUserDocContext
  );
  const starredMessages = messages.filter(
    (message) => message.starred === true
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
        <IconButton onClick={handleStarredMessagesContainer}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Starred Messages</Typography>
      </Box>
      {starredMessages.length !== 0 ? (
        starredMessages.map((eachMessage) => (
          <Box className={classes.messageBox}>
            <EachMessage
              name={senderName(eachMessage.name)}
              time={eachMessage.time.toDate().toString()}
              message={eachMessage.message}
              imageUrl={eachMessage?.imageUrl}
              email={eachMessage.name}
              id={eachMessage.id}
              roomDocId={roomDocId}
              starred={eachMessage?.starred}
              liked={eachMessage?.liked}
            />
          </Box>
        ))
      ) : (
        <Card className={classes.starredAlertCard}>
          <Typography>
            There are no starred messages. Star a message to display here!
          </Typography>
        </Card>
      )}
    </div>
  );
};

export default StarredMessagesContainer;
