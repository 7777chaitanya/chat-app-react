import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import React,{useEffect, useState, useContext} from "react";
import useStyles from "./styles";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import EachChat from "./EachChat/EachChat";
import MenuModal from "./MenuModal/MenuModal";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {db} from "../../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import moment from "moment";
import SettingsDrawer from "../SettingsDrawer/SettingsDrawer";


// import SidebarHeader from "./SidebarHeader";
// import SidebarSearch from "./SidebarSearch";
// import SidebarChats from "./SidebarChats"
import { useAuth } from '../../contexts/AuthContext';
import { ShowSearchListContext } from '../../contexts/ShowSearchListContext';
import SearchList from "../SearchList/SearchList";
import { AllRoomsWithDocIdContext } from '../../contexts/AllRoomsWithDocIdContext';
import { AllUsersContext } from "../../contexts/AllUsersContext";

const Sidebar = () => {
  const classes = useStyles();
  const [openMenuModal, setOpenMenuModal] = React.useState(false);
  const {currentUser} = useAuth();

  const {rooms,setRooms} = useContext(AllRoomsWithDocIdContext);

  const handleOpenMenuModal = () => {
    setOpenMenuModal(true);
  };

  const handleCloseMenuModal = () => {
    setOpenMenuModal(false);
  };

  const handleCreateNewRoom = async () => {
    handleCloseMenuModal();
    const roomName = prompt(" Enter a name for the room");
    if(roomName){
      await setDoc(doc(db, "rooms", roomName), {
        name: roomName,
        members : [currentUser.email],
        privateChat : false,
        desc : "",
        avatarUrl : "",
        lastMessageTime : new Date()
      });
      
    }
  }

  const {openSearchList,showSearchList,closeSearchList} = useContext(ShowSearchListContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [showUserNamePen, setShowUserNamePen] = useState(true);
  const [showUserBioPen, setShowUserBioPen] = useState(true);



  const handleSearchTermChange = (e) => {
  openSearchList();
  setSearchTerm(e.target.value);
  }

  const [state1, setState1] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer1 = (anchor, open) => (event) => {
    if(!open){
      setShowUserNamePen(true);
      setShowUserBioPen(true);
    }

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState1({ ...state1, [anchor]: open });
  };

  const {allUsers} = useContext(AllUsersContext);

  const profileBelongsTo = allUsers.find(doc => doc.email === currentUser.email);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if(state.left === true){
      handleCloseMenuModal();
    }

    setState({ ...state, [anchor]: open });


  };
  


  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        {currentUser ? 
        (<Tooltip title={`${profileBelongsTo?.name}`}>
        <Avatar alt="Remy Sharp" src={profileBelongsTo?.avatarUrl} onClick={toggleDrawer1("left", true)}>
          {profileBelongsTo?.name[0]?.toUpperCase()}
        </Avatar>
        </Tooltip>) :
        (<Tooltip title="hi">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Tooltip>)}
        <div className={classes.sidebar__header__icons}>
          <IconButton onClick={toggleDrawer("left", true)}>
            <DonutLargeIcon className={classes.sidebar__header__icon} />
          </IconButton>
          <IconButton onClick={toggleDrawer("left", true)}>
            <ChatIcon className={classes.sidebar__header__icon} />
          </IconButton>
          <IconButton onClick={handleOpenMenuModal} className={classes.vertIcon}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.sidebar_search__container}>
      <div className={classes.sidebar_search}>

        <div className={classes.sidebar_searchicon_div}>
        <SearchIcon className={classes.searchIcon}/>
        </div>
        <input type="text" placeholder="search your friend here" className={classes.inputField} onChange={handleSearchTermChange}/>
      </div>
      </div>

      <div className={classes.sidebar__chats}>
        {rooms.map(eachRoom => <EachChat key={eachRoom.id} roomName={eachRoom.data.name} docId={eachRoom.id} lastMessageTime={eachRoom?.lastMessageTime}/>)}
       
      </div>
      {openMenuModal && <MenuModal openMenuModal={openMenuModal} handleOpenMenuModal={handleOpenMenuModal} handleCloseMenuModal={handleCloseMenuModal}
      handleCreateNewRoom={handleCreateNewRoom}
      toggleDrawer={toggleDrawer} state={state}
      />}

      {showSearchList && <SearchList searchTerm={searchTerm} /> }

      <ProfileDrawer state={state1} toggleDrawer={toggleDrawer1} showUserNamePen={showUserNamePen} setShowUserNamePen={setShowUserNamePen}
      showUserBioPen={showUserBioPen} setShowUserBioPen={setShowUserBioPen}
      />

<SettingsDrawer toggleDrawer={toggleDrawer} state={state} />

    </div>
  );
};

export default Sidebar;
