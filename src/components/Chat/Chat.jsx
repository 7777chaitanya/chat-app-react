import { IconButton, CardHeader, Avatar } from "@material-ui/core";
import React, { useRef, useState, useEffect, useContext } from "react";
import useStyles from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
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
  const { currentUser } = useAuth();
  console.log("match => ", roomContent);
  console.log("messages => ", messages);

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

          messages.push(doc.data());
        });
        setMessages([...messages]);
      });
      return () => {
        messagesUnsubscribe();
      };
    }
  }, [roomDocId]);

  const handleVoiceRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  };

  const [showEmojiPanel, setShowEmojiPanel] = useState(false);

  const handleEmojiPanel = () => {
    setShowEmojiPanel((p) => !p);
  };
  const closeEmojiPanel = () => {
    setShowEmojiPanel(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);
    setShowEmojiPanel(false)

    // const messageQuery = query(
    //   collection(db, "rooms", roomDocId, "messages",), orderBy("time")

    // );
    const newCityRef = doc(
      collection(db, "rooms", roomDocId || "E6mkZUadkZGElsFo0YZC", "messages")
    );
    await setDoc(newCityRef, {
      name: "LosAngeles",
      message: messageRef.current.value,
      time: new Date(),
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
          subheader={`Last seen on ${lastSeenDateAndTime()}`}
        />
      </div>

      <div className={classes.chat__body}>
        <div className={classes.chat__message}>
          <span className={classes.chat__user}>Chaitanya</span>
          hello
          <span className={classes.chat__timestamp}>03:52</span>
        </div>

        {messages.map((eachMessage) => (
          <div className={classes.chat__receiver}>
            <span className={classes.chat__user}>{eachMessage.name}</span>
            {eachMessage.message}
            <span className={classes.chat__timestamp}>
              {eachMessage.time.toDate}
            </span>
          </div>
        ))}
      </div>

      {showEmojiPanel && (
        <Picker
          onEmojiClick={onEmojiClick}
          native={true}
          pickerStyle={{ width: "100%" }}
        />
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
            ref={messageRef}
          />
          <button type="submit" className={classes.submitButton}>
            submit
          </button>
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </form>
        <AttachmentIcon className={classes.footerIcons} />
        <MicIcon
          className={classes.footerIcons}
          onClick={handleVoiceRecording}
        />
      </div>
      <ChatSettingsModal />
      <AddMemberModal />
    </div>
  );
};

export default Chat;
