import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import EachChat from "./EachChat/EachChat";
import MenuModal from "./MenuModal/MenuModal";
// import SidebarHeader from "./SidebarHeader";
// import SidebarSearch from "./SidebarSearch";
// import SidebarChats from "./SidebarChats"

const Sidebar = () => {
  const classes = useStyles();
  const [openMenuModal, setOpenMenuModal] = React.useState(false);

  const handleOpenMenuModal = () => {
    setOpenMenuModal(true);
  };

  const handleCloseMenuModal = () => {
    setOpenMenuModal(false);
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
        <input type="text" placeholder="search your friend here" className={classes.inputField}/>
      </div>
      </div>

      <div className={classes.sidebar__chats}>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
        <EachChat/>
      </div>
      {openMenuModal && <MenuModal openMenuModal={openMenuModal} handleOpenMenuModal={handleOpenMenuModal} handleCloseMenuModal={handleCloseMenuModal}/>}
    </div>
  );
};

export default Sidebar;
