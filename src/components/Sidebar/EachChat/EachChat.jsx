import { CardHeader, Card, Avatar, IconButton } from '@material-ui/core';
import React ,{useState,useEffect, useContext} from 'react';
import useStyles from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {useHistory} from "react-router-dom";
import { MessageSharp } from '@material-ui/icons';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import {db} from "../../../firebase";
import { AllRoomsWithDocIdContext } from '../../../contexts/AllRoomsWithDocIdContext';
import { CurrentRoomContext } from '../../../contexts/CurrentRoomContext';
import { useAuth } from '../../../contexts/AuthContext';
import { AllUsersContext } from '../../../contexts/AllUsersContext';

 





const EachChat = ({roomName, docId}) => {
  const history = useHistory();
  const [lastMessage, setLastMessage] = useState("");
  const {rooms,setRooms} = useContext(AllRoomsWithDocIdContext);
  const {currentRoom} = useContext(CurrentRoomContext);
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const {currentUser} = useAuth();
  
  useEffect(() => {
    if (docId) {
      const messageQuery = query(
        collection(db, "rooms", docId, "messages"), orderBy("time")
        
      );
      const messagesUnsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
        const messages = [];

        querySnapshot.forEach((doc) => {
          console.log("messagesquerySnapshot => ", doc.data());

          messages.push(doc.data());
        });

        let lastMessage = messages[messages.length-1]?.message;
        
        setLastMessage((lastMessage?.length > 30 && lastMessage!=="") ? 
          
          (lastMessage?.substring(0,28)+"...") :
          lastMessage 
          )
      });
      return () => {
        messagesUnsubscribe();
      };
    }
  }, [docId]);

  const handleOpenChatRoom = () => {
    history.push(`/app/chat/${roomName}`);
  }
    const classes = useStyles();


    const generateRoomName = () => {
      const roomContent1 = rooms?.find(room => room?.id === docId);
      const roomContent = roomContent1.data;
      if(roomContent?.privateChat){
        let friend = roomContent?.members?.find(member => member !== currentUser?.email);
        let friendName= friend;
        if(!friendName){
          return {name : "Your Saved Messages", avatarUrl : null}
        }
        const docOfFriend = allUsers?.find(doc => doc?.email === friendName);
        return {name : docOfFriend?.name,avatarUrl : docOfFriend?.avatarUrl}
      }

      else{
        return {name : roomName, avatarUrl : null};
      }
      
      

    }
    return (
        <div className={classes.root} onClick={handleOpenChatRoom}>
        <CardHeader
        className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={generateRoomName()?.avatarUrl}>
              {generateRoomName().name && generateRoomName()?.name[0]?.toUpperCase()}
            </Avatar>
          }
          action={
              <>
            {/* <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton> */}
            <h6>07:30</h6>
            </>
          }
          title={generateRoomName()?.name }
          subheader={lastMessage}
        />
        </div>
    )
}

export default EachChat
