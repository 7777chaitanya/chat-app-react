import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { ChatSettingsModalContext } from "../../contexts/ChatSettingsModalContext";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import List from "@material-ui/core/List";
import { MemberSearchModalContext } from "../../contexts/MemberSearchModalContext";
import { AllRoomsWithDocIdContext } from "../../contexts/AllRoomsWithDocIdContext";
import { CurrentRoomContext } from "../../contexts/CurrentRoomContext";

function getModalStyle() {
  const top = 35;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: "12rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { open, handleOpen, handleClose } = useContext(
    ChatSettingsModalContext
  );
  const { openMemberSearch, handleOpenMemberSearch, handleCloseMemberSearch } =
    useContext(MemberSearchModalContext);
  const { rooms, setRooms } = useContext(AllRoomsWithDocIdContext);
  const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);

  const showAddMemberOption = () => {
    if(currentRoom && rooms){
    let roomFinder = rooms.find(room => room.id === currentRoom);

      console.log("roomFinder=>",roomFinder) ;
    return roomFinder?.data?.privateChat;
    }
    
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <List component="nav" aria-label="main mailbox folders">
        {!showAddMemberOption() && (
          <ListItem button onClick={handleOpenMemberSearch}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Add member" />
          </ListItem>
        )}

        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Delete Chat" />
        </ListItem>
      </List>
      <Divider />
      {console.log("roomsroomsrooms, ", rooms)}
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
