import { CardHeader, Card, Avatar, IconButton } from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import useStyles from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {useHistory} from "react-router-dom";
import { MessageSharp } from '@material-ui/icons';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import {db} from "../../../firebase";

 





const EachChat = ({roomName, docId}) => {
  const history = useHistory();
  const [lastMessage, setLastMessage] = useState("")
  
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
    return (
        <div className={classes.root} onClick={handleOpenChatRoom}>
        <CardHeader
        className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
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
          title={roomName}
          subheader={lastMessage}
        />
        </div>
    )
}

export default EachChat
