import React, { useContext } from "react";
import { CardHeader, Avatar, IconButton } from "@material-ui/core";
import { Card } from "@material-ui/core";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { ShowSearchListContext } from "../../contexts/ShowSearchListContext";
import { doc } from "@firebase/firestore";
import { setDoc } from 'firebase/firestore';
import { db } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {useHistory} from "react-router-dom";
import { AllRoomsArrayContext } from "../../contexts/AllRoomsArrayContext.jsx";


const UserCard = ({ item }) => {
const history = useHistory();
  const classes = useStyles();
  const {currentUser} = useAuth();
  const { showSearchList, setShowSearchList, closeSearchList, openSearchList } =
    useContext(ShowSearchListContext);

const {allRoomsArray, setAllRoomsArray} = useContext(AllRoomsArrayContext);

console.log("all rooooooooooms array => ", allRoomsArray)

  const createPersonalRoom = async () => {
      console.log(allRoomsArray.includes(`${item.email}${currentUser.email}`));
      console.log(`${item.email}${currentUser.email}`);
      if(!(allRoomsArray.includes(`${item.email}${currentUser.email}`))){
    await setDoc(doc(db, "rooms", `${item.email}${currentUser.email}`), {
        name: `${item.email}${currentUser.email}`,
        members : [item.email, currentUser.email]
        
      });
      history.push(`/app/chat/${`${item.email}${currentUser.email}`}`)
    }
    else{
        history.push(`/app/chat/${`${item.email}${currentUser.email}`}`);
    }
  };

  const handleCardClick = () => {
    createPersonalRoom();
    closeSearchList();
  };

  return item.name === "No results found!" ||
    item.name === "Enter a word to Search!" ? (
    <Card className={classes.typographyRoot}>
      <Typography className={classes.typography} variant="body1">
        {item.name}
      </Typography>
    </Card>
  ) : (
    <Card className={classes.root}>
      <CardHeader
        className={classes.usercard}
        // component={Link}
        // to={`/profile/${item.name}`}
        onClick={handleCardClick}
        avatar={
          item?.avatarUrl !== null &&
          (item?.avatarUrl ? (
            <Avatar
              alt={item?.name}
              src={item?.avatarUrl}
              className={classes.avatarSize}
            />
          ) : (
            <Avatar
              aria-label="recipe"
              className={classes.avatarSize}
              src={item?.avatarUrl}
            >
              {item.name[0].toUpperCase()}
            </Avatar>
          ))
        }
        title={item.name}
      />
    </Card>
  );
};

export default UserCard;
