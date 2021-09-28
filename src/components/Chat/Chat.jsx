import { IconButton, CardHeader, Avatar, Box, Typography } from "@material-ui/core";
import React, { useRef, useState, useEffect, useContext } from "react";
import useStyles from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { doc, setDoc, orderBy } from "firebase/firestore";
import Picker from "emoji-picker-react";
import MicIcon from "@material-ui/icons/Mic";
import ChatSettingsModal from "../ChatSettingsModal/ChatSettingsModal";
import { ChatSettingsModalContext } from "../../contexts/ChatSettingsModalContext";
import AddMemberModal from "../AddMemberModal/AddMemberModal";
import { CurrentRoomContext } from "../../contexts/CurrentRoomContext";
import { useAuth } from "../../contexts/AuthContext";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import SendIcon from "@material-ui/icons/Send";
import { CurrentUserDocContext } from "../../contexts/CurrentUserDocContext";
import EachMessage from "../EachMessage/EachMessage";
import { PhotoCamera } from "@material-ui/icons";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import moment from 'moment';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Chat = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const messageRef = useRef();
  const { roomId } = useParams();
  const [roomContent, setRoomContent] = useState({});
  const [messages, setMessages] = useState([]);
  const [roomDocId, setRoomDocId] = useState("");
  const { open, handleOpen, handleClose } = useContext(
    ChatSettingsModalContext
  );
  const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const { currentUserDoc, setCurrentUserDoc } = useContext(
    CurrentUserDocContext
  );
  const { currentUser } = useAuth();
  const chatBodyRef = useRef();
  const [wassupImage, setWassupImage] = useState(null);

  const [progressBar, setProgressBar] = useState(null);
  const [showProgressBar, setshowProgressBar] = useState(false);

  const handleMessageChange = (e) =>{
    setMessage(e.target.value)
  }

  console.log("match => ", currentUserDoc);
  console.log("messages => ", messages);

  const checkIfImageOrTextBoxIsEmpty = () => {
    if(messageRef){
    if (message === "" && wassupImage === null) {
      return true;
    }
    return false;
  }
  };


  const handleWassupImageChange = (e) => {
    e.target.files[0] && setWassupImage(e.target.files[0]);
  };

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      where("name", "==", roomId || "E6mkZUadkZGElsFo0YZC")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      const messages = [];

      querySnapshot.forEach((doc) => {
        setRoomDocId(doc.id);
        rooms.push(doc.data());
      });
      setRoomContent(rooms[0]);
    });

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    if (roomDocId) {
      setCurrentRoom(roomDocId);
      const messageQuery = query(
        collection(db, "rooms", roomDocId, "messages"),
        orderBy("time")
      );
      const messagesUnsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
        const messages = [];

        querySnapshot.forEach((doc) => {
          console.log("messagesquerySnapshot => ", doc.data());
          const docObject   = {...doc.data(), id : doc.id}

          messages.push(docObject);
        });
        setMessages([...messages]);
      });
      return () => {
        messagesUnsubscribe();
      };
    }
  }, [roomDocId]);

  useEffect(() => {
    const objDiv = document.getElementById("chatBodyRef");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages.length]);

  const handleVoiceRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  };

  const [showEmojiPanel, setShowEmojiPanel] = useState(false);

  const handleEmojiPanel = () => {
    setShowEmojiPanel((p) => !p);
  };
  const closeEmojiPanel = () => {
    setShowEmojiPanel(false);
  };

  const postToFireStorage = async () => {
    const file = wassupImage;

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setshowProgressBar(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressBar(progress)
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("error occured while trying to upload image");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const newCityRef = doc(
            collection(
              db,
              "rooms",
              roomDocId || "E6mkZUadkZGElsFo0YZC",
              "messages"
            )
          );

          setDoc(newCityRef, {
            name: currentUser.email,
            message: messageRef.current.value,
            time: new Date(),
            imageUrl: downloadURL,
            starred : false,
            liked : false
          });
          messageRef.current.value = "";
          setWassupImage(null);
          setshowProgressBar(false);

        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);
    setShowEmojiPanel(false);

    if (wassupImage !== null) {
      postToFireStorage();
      return;
    }
    const newCityRef = doc(
      collection(db, "rooms", roomDocId || "E6mkZUadkZGElsFo0YZC", "messages")
    );

    await setDoc(newCityRef, {
      name: currentUser.email,
      message: messageRef.current.value,
      time: new Date(),
      imageUrl: null,
      starred : false,
      liked : false
    });
    messageRef.current.value = "";
  };

  const lastSeenDateAndTime = () => {
    return messages[messages.length - 1]?.time.toDate();
  };

  const clickCheck = () => {
    handleOpen();
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    messageRef.current.value += emojiObject.emoji;
    messageRef?.current?.focus();
    //   console.log(event)
  };

  const generateRoomName = () => {
    if (roomContent?.privateChat) {
      let friend = roomContent?.members?.find(
        (member) => member !== currentUser.email
      );
      let friendName = friend;
      if (!friendName) {
        return { name: "Your Saved Messages", avatarUrl: null };
      }
      // return friendName
      const docOfFriend = allUsers.find((doc) => doc.email === friendName);
      return { name: docOfFriend?.name, avatarUrl: docOfFriend?.avatarUrl };
    }

    return { name: roomContent?.name, avatarUrl: null };
  };

 
 
  const senderName = (email) => {
    const requiredUser = allUsers?.find((doc) => doc.email === email);
    if (requiredUser?.name === currentUserDoc?.name) {
      return "You";
      
    } else {
      return requiredUser?.name;

    }
  };

  return (
    <div className={classes.chat}>
      <div className={classes.chat__header}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={generateRoomName()?.avatarUrl}
            >
              {generateRoomName().name &&
                generateRoomName()?.name[0]?.toUpperCase()}
            </Avatar>
          }
          action={
            <>
              {/* <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton> */}
              <IconButton aria-label="settings">
                <SearchIcon />
              </IconButton>
              <IconButton aria-label="settings" onClick={clickCheck}>
                <MoreVertIcon />
              </IconButton>
            </>
          }
          title={generateRoomName()?.name}
          subheader={`Last seen on ${moment(lastSeenDateAndTime()).format('MMM Do YYYY, h:mm:ss a')}`}
        />
      </div>

      <div className={classes.chat__body} id="chatBodyRef">
        <div className={classes.chat__message}>
          <span className={classes.chat__user}>Chaitanya</span>
          hello
          <span className={classes.chat__timestamp}>03:52</span>
        </div>

        {messages.map((eachMessage) => (
          <div className={classes.chat__receiver}>
            <span className={classes.chat__user}>
              {senderName(eachMessage.name)}
            </span>
            {eachMessage.message}
            <span className={classes.chat__timestamp}>
              {eachMessage.time.toDate().toString()}
            </span>
          </div>
        ))}

        {messages.map((eachMessage) => (
          <Box >
          <EachMessage
            name={senderName(eachMessage.name)}
            time={eachMessage.time.toDate().toString()}
            message={eachMessage.message}
            imageUrl={eachMessage?.imageUrl}
            email={eachMessage.name}
            id={eachMessage.id}
            roomDocId={roomDocId}
            starred = {eachMessage?.starred}
            liked={eachMessage?.liked}
            
          />
          </Box>
        ))}
      </div>

      {showEmojiPanel && (
        <Picker
          onEmojiClick={onEmojiClick}
          native={true}
          pickerStyle={{ width: "100%" }}
        />
      )}

      {showProgressBar && (
        <Box className={classes.progressBar}>
          <LinearProgressWithLabel value={progressBar} />
        </Box>
      )}

      <div className={classes.chat__footer}>
        <SentimentVerySatisfiedIcon
          className={classes.footerIcons}
          onClick={handleEmojiPanel}
        />
        <form
          action="submit"
          className={classes.chat__footer__messageform}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter your message here!"
            className={classes.messageInput}
            onChange={handleMessageChange}
            ref={messageRef}
          />
          <button type="submit" className={classes.submitButton}>
            submit
          </button>
          {message &&
          <IconButton type="submit" disabled={checkIfImageOrTextBoxIsEmpty()}>
            <SendIcon />
          </IconButton>}
        </form>
        {!message &&
        <IconButton           onClick={handleVoiceRecording}
        >
        <MicIcon
          className={classes.footerIcons}
        />
        </IconButton>
        }
       
        <label>
        <input
          type="file"
          id="icon-button-file"
          className={classes.input}
          onChange={handleWassupImageChange}
        />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            className={classes.footerIcons}
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {/* <IconButton>
          <AttachmentIcon className={classes.footerIcons} />
        </IconButton> */}

       
      </div>
      <ChatSettingsModal />
      <AddMemberModal />
    </div>
  );
};

export default Chat;
