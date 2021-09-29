import { Card } from "@material-ui/core";
import React, { useContext } from "react";
import useStyles from "./styles";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { ShowSearchListContext } from "../../contexts/ShowSearchListContext";
import UserCard from "../UserCard/UserCard";

const SearchList = ({ searchTerm , usedInAddMemberModal, toggleDrawer, state, setSearchTerm, handleToggleDrawerClose}) => {
  const classes = useStyles();

  const { allUsers } = useContext(AllUsersContext);
  const { showSearchList, setShowSearchList, closeSearchList, openSearchList } =
    useContext(ShowSearchListContext);
  console.log("SearchList => ", allUsers);

  let filteredArray = [];

  if (searchTerm !== "") {
    filteredArray = allUsers.filter(
      (doc) =>
        doc?.name?.toLowerCase().indexOf(searchTerm?.toLowerCase().trim()) !==
        -1
    );
  }

  console.log("filtered Array =>", filteredArray);
  if (filteredArray.length === 0 && searchTerm !== "") {
    filteredArray = [{ name: "No results found!", avatarUrl: null }];
  }
  if (filteredArray.length === 0 && searchTerm === "") {
    filteredArray = [{ name: "Enter a word to Search!", avatarUrl: null }];
  }
  return (
    <Card className={classes.root}>
      {filteredArray.map((eachUser) => (
        
        <UserCard item={eachUser} usedInAddMemberModal={usedInAddMemberModal} toggleDrawer={toggleDrawer} state={state} setSearchTerm={setSearchTerm}
        handleToggleDrawerClose={handleToggleDrawerClose}
        /> 
      ))}
    </Card>
  );
};

export default SearchList;
