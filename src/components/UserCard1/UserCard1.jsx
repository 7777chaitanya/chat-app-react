import { Avatar, Card, CardHeader } from "@material-ui/core";
import React, {useContext} from "react";
import useStyles from "./styles";
import { CurrentRoomContext } from '../../contexts/CurrentRoomContext';
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase";


const UserCard1 = ({ user, searchTerm, handleAddMemberContainer }) => {
 const classes = useStyles();
 const {currentRoom} = useContext(CurrentRoomContext);

 const handleAddMemberToGroup = async () => {
     console.log("handleAddMemberToGroup => ",currentRoom);
     console.log("handleAddMemberToGroup => ", user);
     handleAddMemberContainer();

     await updateDoc(doc(db, "rooms", currentRoom), {
        
        members: arrayUnion(user.email)
       
      });

      
 }

  return (
    <Card className={classes.root} onClick={handleAddMemberToGroup}>
      <CardHeader
        className={classes.usercard}
        
        avatar={
          <Avatar
            alt={user?.name}
            src={user?.avatarUrl}
            className={classes.avatarSize}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
        }
        title={user.name}
      />
    </Card>
  );
};

export default UserCard1;
