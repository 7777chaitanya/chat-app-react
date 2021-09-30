import { Avatar, Box, CardHeader, IconButton, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import useStyles from "./styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CurrentRoomContext } from '../../contexts/CurrentRoomContext';
import { AllRoomsArrayContext } from '../../contexts/AllRoomsArrayContext';
import { AllRoomsWithDocIdContext } from '../../contexts/AllRoomsWithDocIdContext';
import { AllUsersContext } from "../../contexts/AllUsersContext";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const MembersContainer = ({handleGroupMembersContainer,roomContent}) => {
    const classes = useStyles();
    const {currentRoom} =  useContext(CurrentRoomContext);
    const {rooms} = useContext(AllRoomsWithDocIdContext);
    const {allUsers} = useContext(AllUsersContext);
    const {currentUser} = useAuth();
    const requiredRoom = rooms?.find(room => room.id === currentRoom);
    const members = requiredRoom?.data?.members;

    // console.log("MembersContainer=>",requiredRoom);

    // const roomContent = rooms.find(room => room.id === currentRoom);
    console.log("MembersContainer=>",roomContent);


    const findUserDetails=(email) =>{
            const requiredUser = allUsers?.find(user => user.email === email);
            return {name : requiredUser.name, 
                    email : requiredUser.email,
                    avatarUrl : requiredUser.avatarUrl
            }
    }
    
    const handleRemoveFromRoom = async (email) => {
        const washingtonRef = doc(db, "rooms", currentRoom);
        await updateDoc(washingtonRef, {
            members: arrayRemove(email)
        });
    }

  return (
    <div>
      <Box className={classes.HeaderBox}>
        <IconButton onClick={handleGroupMembersContainer}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Group Members</Typography>
      </Box>

      {members.map(eachMember => 
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={findUserDetails(eachMember).avatarUrl}>
            {findUserDetails(eachMember).name[0].toUpperCase()}
          </Avatar>
        }
        action={
        roomContent?.createdBy !==findUserDetails(eachMember).email && roomContent?.createdBy===currentUser?.email &&

          (<IconButton aria-label="settings" onClick={()=>handleRemoveFromRoom(findUserDetails(eachMember).email)}>
            <RemoveCircleOutlineIcon />
          </IconButton>)
        }
        title={findUserDetails(eachMember).name}
        subheader={roomContent?.createdBy ===findUserDetails(eachMember).email && "Admin"}
      />
        )}

      
    </div>
  );
};

export default MembersContainer;
