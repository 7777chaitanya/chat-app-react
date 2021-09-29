import { Avatar, IconButton, Tooltip, Card } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import useStyles from "./styles";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import EachChat from "./EachChat/EachChat";
import MenuModal from "./MenuModal/MenuModal";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import moment from "moment";
import SettingsDrawer from "../SettingsDrawer/SettingsDrawer";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


// import SidebarHeader from "./SidebarHeader";
// import SidebarSearch from "./SidebarSearch";
// import SidebarChats from "./SidebarChats"
import { useAuth } from "../../contexts/AuthContext";
import { ShowSearchListContext } from "../../contexts/ShowSearchListContext";
import SearchList from "../SearchList/SearchList";
import { AllRoomsWithDocIdContext } from "../../contexts/AllRoomsWithDocIdContext";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { ChatSettingsModalContext } from "../../contexts/ChatSettingsModalContext";
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
  const classes = useStyles();
  const [openMenuModal, setOpenMenuModal] = React.useState(false);
  const { currentUser } = useAuth();

  const { rooms, setRooms } = useContext(AllRoomsWithDocIdContext);
  const [roomNameValue, setRoomNameValue] = useState("");

  const handleRoomNameValueChange = (e) => {
    setRoomNameValue(e.target.value);
  };

  console.log("rooms", rooms);

  const handleOpenMenuModal = () => {
    setOpenMenuModal(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCloseMenuModal = () => {
    setOpenMenuModal(false);
  };

  const handleRoomNameSubmit = async (e) =>{
    e.preventDefault();
    handleClose();
    if (roomNameValue) {
      await setDoc(doc(db, "rooms", roomNameValue), {
        name: roomNameValue,
        members: [currentUser.email],
        privateChat: false,
        desc: "",
        avatarUrl: "",
        lastMessageTime: new Date(),
      });
    }
    setRoomNameValue("")
  }

  const handleCreateNewRoom = async () => {
    handleCloseMenuModal();
    handleClick();
    // const roomName = prompt(" Enter a name for the room");
   
  };


  const { openSearchList, showSearchList, closeSearchList } = useContext(
    ShowSearchListContext
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showUserNamePen, setShowUserNamePen] = useState(true);
  const [showUserBioPen, setShowUserBioPen] = useState(true);
  const [roomNameSearchTerm, setRoomNameSearchTerm] = useState("");

  const handlesetRoomNameSearchTermToEmpty = () => {
    setRoomNameSearchTerm("");
  };

  const handleRoomNameSearchTermChange = (e) => {
    setRoomNameSearchTerm(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    openSearchList();
    setSearchTerm(e.target.value);
  };

  const [state1, setState1] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer1 = (anchor, open) => (event) => {
    if (!open) {
      setShowUserNamePen(true);
      setShowUserBioPen(true);
    }

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState1({ ...state1, [anchor]: open });
  };

  const { allUsers } = useContext(AllUsersContext);

  const profileBelongsTo = allUsers?.find(
    (doc) => doc.email === currentUser?.email
  );

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (state.left === true) {
      handleCloseMenuModal();
    }

    setState({ ...state, [anchor]: open });
  };

  const handleToggleDrawerClose = () => {
    const toggle= toggleDrawer("left", false);
    toggle("left",false);
    
  };

  const generateRoomName = (docId) => {
    const roomContent1 = rooms?.find((room) => room?.id === docId);
    const roomContent = roomContent1.data;
    if (roomContent?.privateChat) {
      let friend = roomContent?.members?.find(
        (member) => member !== currentUser?.email
      );
      let friendName = friend;
      if (!friendName) {
        return { name: "Your Saved Messages", avatarUrl: null };
      }
      const docOfFriend = allUsers?.find((doc) => doc?.email === friendName);
      return { name: docOfFriend?.name, avatarUrl: docOfFriend?.avatarUrl };
    } else {
      return { name: roomContent.name, avatarUrl: null };
    }
  };

  const chatToShow = rooms.filter((room) =>
    generateRoomName(room.id).name?.toLowerCase().includes(roomNameSearchTerm)
  );
  console.log("cts", chatToShow);

  const history = useHistory();
  const showFirstChat = () => {
    history.push(`/app/chat/${chatToShow[0]?.data?.name}`)
  }

 
  useEffect(() => {
    history.push(`/app/chat/${chatToShow[0]?.data?.name}`)

  }, []);

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        {currentUser ? (
          <Tooltip title={`${profileBelongsTo?.name}`}>
            <Avatar
              alt="Remy Sharp"
              src={profileBelongsTo?.avatarUrl}
              onClick={toggleDrawer1("left", true)}
            >
              {profileBelongsTo?.name[0]?.toUpperCase()}
            </Avatar>
          </Tooltip>
        ) : (
          <Tooltip title="hi">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        )}
        <div className={classes.sidebar__header__icons}>
          <IconButton onClick={toggleDrawer("left", true)}>
            <DonutLargeIcon className={classes.sidebar__header__icon} />
          </IconButton>
          <IconButton onClick={toggleDrawer("left", true)}>
            <ChatIcon className={classes.sidebar__header__icon} />
          </IconButton>
          <IconButton
            onClick={handleOpenMenuModal}
            className={classes.vertIcon}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.sidebar_search__container}>
        <div className={classes.sidebar_search}>
          <div className={classes.sidebar_searchicon_div}>
            <SearchIcon className={classes.searchIcon} />
          </div>
          <input
            type="text"
            placeholder="search your chat here"
            className={classes.inputField}
            onChange={handleRoomNameSearchTermChange}
            value={roomNameSearchTerm}
          />
        </div>
      </div>

      <div className={classes.sidebar__chats}>
        {chatToShow.map((eachRoom) => (
          <EachChat
            key={eachRoom.id}
            roomName={eachRoom.data.name}
            docId={eachRoom.id}
            lastMessageTime={eachRoom?.lastMessageTime}
            handlesetRoomNameSearchTermToEmpty={
              handlesetRoomNameSearchTermToEmpty
            }
            showFirstChat={showFirstChat}
          />
        ))}
      </div>
      {openMenuModal && (
        <MenuModal
          openMenuModal={openMenuModal}
          handleOpenMenuModal={handleOpenMenuModal}
          handleCloseMenuModal={handleCloseMenuModal}
          handleCreateNewRoom={handleCreateNewRoom}
          toggleDrawer={toggleDrawer}
          state={state}
          handleClick={handleClick}
        />
      )}

      {showSearchList && <SearchList searchTerm={searchTerm} />}

      <ProfileDrawer
        state={state1}
        toggleDrawer={toggleDrawer1}
        showUserNamePen={showUserNamePen}
        setShowUserNamePen={setShowUserNamePen}
        showUserBioPen={showUserBioPen}
        setShowUserBioPen={setShowUserBioPen}
      />

      <SettingsDrawer
        toggleDrawer={toggleDrawer}
        state={state}
        handleToggleDrawerClose={handleToggleDrawerClose}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card>
          <Typography className={classes.typography}>
            Enter the room name
          </Typography>
          <form action="submit" onSubmit={handleRoomNameSubmit}>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue="Your room name here"
              variant="filled"
              value={roomNameValue}
              onChange={handleRoomNameValueChange}
            />
            <Button color="primary" type="submit">
              Create room!
            </Button>
            <Button color="secondary" onClick={handleClose}>Cancel</Button>
          </form>
        </Card>
      </Popover>
    </div>
  );
};

export default Sidebar;
