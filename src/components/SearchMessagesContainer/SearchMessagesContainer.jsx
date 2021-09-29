import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar, IconButton, Box, TextField, Button, Card, Typography } from "@material-ui/core";
import { AllUsersContext } from '../../contexts/AllUsersContext';
import { CurrentUserDocContext } from '../../contexts/CurrentUserDocContext';

const SearchMessagesContainer = ({ messages, roomDocId,handleSearchMessagesContainer}) => {
  return (
    <div>
      <IconButton onClick={handleSearchMessagesContainer} >
        <ArrowBackIcon />
      </IconButton>{" "}
      searchMessaegescontainer
    </div>
  );
};

export default SearchMessagesContainer;
