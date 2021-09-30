import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import { motion } from "framer-motion";
import { PhotoPreviewModalContext } from "../../contexts/PhotoPreviewModalContext";
import PhotoPreviewModal from "../PhotoPreviewModal/PhotoPreviewModal";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { useAuth } from "../../contexts/AuthContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../firebase";
import { PhotoCamera } from "@material-ui/icons";
import { doc, updateDoc } from "@firebase/firestore";
import VignetteIcon from "@material-ui/icons/Vignette";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
  input: {
    display: "none",
  },
  photoIcon: {
    // marginRight : "2rem"
    position: "absolute",
    bottom: "0.1rem",
    left: "0.4rem",
  },
}));

export default function SimpleModal({
  openProfilePictureModal,
  handleOpenProfilePictureModal,
  handleCloseProfilePictureModal,
  progressBar,
  setProgressBar,
  showProgressBar,
  setshowProgressBar,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const {
    openPhotoPreviewModal,
    handleOpenPhotoPreviewModal,
    handleClosePhotoPreviewModal,
  } = useContext(PhotoPreviewModalContext);

  // const handleOpenPhotoPreviewModalAndCloseProfilePictureModal = async () => {
  //   await handleCloseProfilePictureModal();
  //   handleOpenPhotoPreviewModal();

  // }

  const { currentUser } = useAuth();
  const { allUsers } = useContext(AllUsersContext);

  const profileBelongsTo = allUsers.find(
    (doc) => doc.email === currentUser.email
  );

  const [wassupImage, setWassupImage] = useState(null);
  console.log("44444444444444444444444444=>", wassupImage?.name);

  const handleWassupImageChange = (e) => {
    e.target.files[0] && setWassupImage(e.target.files[0]);
    console.log("camera clicked");
    // postToFireStorage();
  };

  const postToFireStorage = async () => {
    const file = wassupImage;
    setWassupImage(null);
    handleCloseProfilePictureModal();

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setshowProgressBar(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressBar(progress);

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

          const washingtonRef = doc(db, "users", currentUser.email);

          // Set the "capital" field of the city 'DC'
          updateDoc(washingtonRef, {
            avatarUrl: downloadURL,
          });

          setshowProgressBar(false);
        });
      }
    );
  };
  {
    wassupImage !== null && postToFireStorage();
  }

  const handleDeleteAvatar = async () => {
    const userDocRef = doc(db, "users", currentUser.email);

    await updateDoc(userDocRef, {
      avatarUrl: "",
    });
  };

  const body = (
    <motion.div
      style={modalStyle}
      className={classes.paper}
      animate={{ y: 20 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <List component="nav" aria-label="main mailbox folders">
        {profileBelongsTo?.avatarUrl && (
          <ListItem button onClick={handleOpenPhotoPreviewModal}>
            <ListItemIcon>
              <VisibilityIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="View photo" />
          </ListItem>
        )}

        {profileBelongsTo?.avatarUrl && (
          <ListItem button onClick={handleDeleteAvatar}>
            <ListItemIcon>
              <DeleteForeverIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Remove photo" />
          </ListItem>
        )}
        <label>
          <ListItem button>
            <ListItemIcon>
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
                className={classes.photoIcon}
              >
                <PhotoCamera />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Change dp" />
          </ListItem>
        </label>
      </List>
      <Divider />
      {openPhotoPreviewModal && (
        <PhotoPreviewModal imageUrl={profileBelongsTo?.avatarUrl} />
      )}
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
