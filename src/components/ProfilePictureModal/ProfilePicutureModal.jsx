import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import { motion } from "framer-motion";
import { PhotoPreviewModalContext } from "../../contexts/PhotoPreviewModalContext";
import PhotoPreviewModal from "../PhotoPreviewModal/PhotoPreviewModal";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { useAuth } from "../../contexts/AuthContext";

function getModalStyle() {
  if (window.innerWidth > 360) {
    return {
      top: "50vh",
      left: "10vw",
    };
  }
  if (window.innerWidth <= 360) {
    return {
      top: "40vh",
      left: "20vw",
    };
  }

  // return {
  //   top: `${top}%`,
  //   left: `${left}%`,
  //   transform: `translate(-${top}%, -${left}%)`,
  // };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "12rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    position: "relative",
  },
}));

export default function SimpleModal({
  openProfilePictureModal,
  handleOpenProfilePictureModal,
  handleCloseProfilePictureModal,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const {
    openPhotoPreviewModal,
    handleOpenPhotoPreviewModal,
    handleClosePhotoPreviewModal
} = useContext(PhotoPreviewModalContext);

const { currentUser } = useAuth();
const { allUsers } = useContext(AllUsersContext);

const profileBelongsTo = allUsers.find(
  (doc) => doc.email === currentUser.email
);

  const body = (
    <motion.div style={modalStyle} className={classes.paper}
    animate={{ x: 100 }}
        transition={{ type: "spring", stiffness: 100 }}
    >
     
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={handleOpenPhotoPreviewModal}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="View photo" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Take photo" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Upload photo" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Remove photo" />
        </ListItem>
      </List>
      <Divider />
      {openPhotoPreviewModal && <PhotoPreviewModal imageUrl={profileBelongsTo?.avatarUrl}/>}
    </motion.div>
    
  );

  return (
    <div>
      <Modal
        open={openProfilePictureModal}
        onClose={handleCloseProfilePictureModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
