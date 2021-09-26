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


// import SidebarHeader from "./SidebarHeader";
// import SidebarSearch from "./SidebarSearch";
// import SidebarChats from "./SidebarChats"
import { useAuth } from '../../contexts/AuthContext';
import { ShowSearchListContext } from '../../contexts/ShowSearchListContext';
import SearchList from "../SearchList/SearchList";

const Sidebar = () => {
  const classes = useStyles();
  const [openMenuModal, setOpenMenuModal] = React.useState(false);
  const [rooms, setRooms] = useState([]);
  const {currentUser} = useAuth();

  useEffect(() => {
    const q = query(collection(db, "rooms"), where("name", "!=", ""));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const rooms = [];
  querySnapshot.forEach((doc) => {
      rooms.push({id : doc.id, data : doc.data()});
  });
  setRooms([...rooms])
  // console.log("Current cities in CA: ", cities.join(", "));
  console.log("rooms => ",rooms)
});

return () => {
  unsubscribe();
}
  }, [])

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
        name: roomName
        
      });
      
    }
  }

  const {openSearchList,showSearchList,closeSearchList} = useContext(ShowSearchListContext);

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchTermChange = (e) => {
  openSearchList();
  setSearchTerm(e.target.value);
  }

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        {currentUser ? 
        (<Tooltip title={`${currentUser.email}`}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Tooltip>) :
        (<Tooltip title="hi">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Tooltip>)}
        <div className={classes.sidebar__header__icons}>
          <IconButton>
            <DonutLargeIcon className={classes.sidebar__header__icon} />
          </IconButton>
          <IconButton>
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
        {rooms.map(eachRoom => <EachChat key={eachRoom.id} roomName={eachRoom.data.name} docId={eachRoom.id}/>)}
       
      </div>
      {openMenuModal && <MenuModal openMenuModal={openMenuModal} handleOpenMenuModal={handleOpenMenuModal} handleCloseMenuModal={handleCloseMenuModal}
      handleCreateNewRoom={handleCreateNewRoom}
      />}

      {showSearchList && <SearchList searchTerm={searchTerm} /> }
    </div>
  );
};

export default Sidebar;
