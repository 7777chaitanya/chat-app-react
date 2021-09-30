import React, { useState, useContext } from "react";
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
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { CurrentUserDocContext } from "../../contexts/CurrentUserDocContext";
import EachMessage from "../EachMessage/EachMessage";
import useStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";

const SearchMessagesContainer = ({
  messages,
  roomDocId,
  handleSearchMessagesContainer,
}) => {
  const classes = useStyles();
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const { currentUserDoc, setCurrentUserDoc } = useContext(
    CurrentUserDocContext
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const senderName = (email) => {
    const requiredUser = allUsers?.find((doc) => doc.email === email);
    if (requiredUser?.name === currentUserDoc?.name) {
      return "You";
    } else {
      return requiredUser?.name;
    }
  };

  let matchingMessages=[];
  if(searchTerm!=="")
  {
   matchingMessages = messages.filter((message) =>
    message.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  }
 
  return (
    <div>
      <Box className={classes.HeaderBox}>
        <IconButton onClick={handleSearchMessagesContainer}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Search Messages</Typography>
      </Box>

      <div className={classes.sidebar_search__container}>
        <div className={classes.sidebar_search}>
          <div className={classes.sidebar_searchicon_div}>
            <SearchIcon className={classes.searchIcon} />
          </div>
          <input
            type="text"
            placeholder="search your message here"
            className={classes.inputField}
            onChange={handleSearchTermChange}
            value={searchTerm}
          />
        </div>
      </div>

      {matchingMessages.length !== 0 ? (
        matchingMessages.map((eachMessage) => (
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
              starred={eachMessage?.starred}
            />
          </Box>
        ))
      ) : (
        
        <Card className={classes.searchAlertCard}>
          <Typography variant="h6">
            {searchTerm!=="" && "There are no messaeges with the keyword you entered!"}
            {searchTerm==="" && "Enter a word that you remember in the message that you want to search for!"}
          </Typography>
        </Card>
      )}
    </div>
  );
};

export default SearchMessagesContainer;
