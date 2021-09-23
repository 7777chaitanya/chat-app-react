import { Avatar } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import SidebarHeader from "./SidebarHeader";
// import SidebarSearch from "./SidebarSearch";
// import SidebarChats from "./SidebarChats"

const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className={classes.sidebar__header__icons}>
          <DonutLargeIcon className={classes.sidebar__header__icon}/>
          <ChatIcon className={classes.sidebar__header__icon}/>
          <MoreVertIcon />
        </div>
      </div>
      <div className="sidebar_search"></div>
      <div className="sidebar__chats"></div>
    </div>
  );
};

export default Sidebar;
