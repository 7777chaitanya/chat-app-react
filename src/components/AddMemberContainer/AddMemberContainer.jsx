import React, { useContext, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Avatar,
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
  Card,
} from "@material-ui/core";
import useStyles from "./styles";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import SearchIcon from "@material-ui/icons/Search";
import UserCard1 from "../UserCard1/UserCard1";

const AddMemberContainer = ({ handleAddMemberContainer }) => {
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const [searchTerm, setsearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setsearchTerm(e.target.value);
  };

  let mathcingUsers = [];
  if (searchTerm.length !== 0) {
    mathcingUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const classes = useStyles();
  return (
    <div>
      <Box className={classes.HeaderBox}>
        <IconButton onClick={handleAddMemberContainer}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Add Member</Typography>
      </Box>

      <div className={classes.sidebar_search__container}>
        <div className={classes.sidebar_search}>
          <div className={classes.sidebar_searchicon_div}>
            <SearchIcon className={classes.searchIcon} />
          </div>
          <input
            type="text"
            placeholder="search your friend here"
            className={classes.inputField}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
      {mathcingUsers.length === 0 && searchTerm === "" && (
        <Card className={classes.displayMessageCard}>
          <Typography variant="h6">Enter a word to search</Typography>
        </Card>
      )}
      {mathcingUsers.length === 0 && searchTerm !== "" && (
        <Card className={classes.displayMessageCard}>
          <Typography variant="h6">There is no such user!</Typography>
        </Card>
      )}

      {mathcingUsers.map((user) => (
        <UserCard1 user={user} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

export default AddMemberContainer;
