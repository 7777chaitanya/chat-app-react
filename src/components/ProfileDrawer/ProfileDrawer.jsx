import React, { useContext, useRef, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useStyles from "./styles";
import { AccountCircle } from "@material-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { Avatar, TextField, IconButton, Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ProfilePictureModal from "../ProfilePictureModal/ProfilePicutureModal"

export default function TemporaryDrawer({ state, toggleDrawer, showUserNamePen,  setShowUserNamePen, setShowUserBioPen, showUserBioPen}) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { allUsers } = useContext(AllUsersContext);
  const usernameRef = useRef(null);
  const userBioRef = useRef(null);


  //   console.log("allUser docs bbooo=> ", allUsers);
  const profileBelongsTo = allUsers.find(
    (doc) => doc.email === currentUser.email
  );

  const [username, setUsername] = useState(profileBelongsTo?.name);
  const [userBio, setUserBio] = useState(profileBelongsTo?.bio);


  const handleFocusUserNameField = () => {
    usernameRef?.current?.focus();
    setShowUserNamePen((p) => !p);
  };

  const saveUsernameChanges = async () => {
    const userDocRef = doc(db, "users", currentUser.email);
    setShowUserNamePen((p) => !p);

    await updateDoc(userDocRef, {
      name: usernameRef.current.value,
    });

  };

  const handleUsernameChange = (e) => {
  setUsername(e.target.value);
  }


  const handleFocusUserBioField = () => {
    userBioRef?.current?.focus();
    setShowUserBioPen((p) => !p);
  };

  const saveUserBioChanges = async () => {
    const userDocRef = doc(db, "users", currentUser.email);
    setShowUserBioPen((p) => !p);

    await updateDoc(userDocRef, {
      bio: userBioRef.current.value,
    });

  };

  const handleUserBioChange = (e) => {
  setUserBio(e.target.value);
  }

  const [openProfilePictureModal, setOpenProfilePictureModal] = React.useState(false);

  const handleOpenProfilePictureModal = () => {
    setOpenProfilePictureModal(true);
  };

  const handleCloseProfilePictureModal = () => {
    setOpenProfilePictureModal(false);
  };

  const list = (anchor) => (
    <div
      //   className={clsx(classes.list, {
      //     [classes.fullList]: anchor === "top" || anchor === "bottom",
      //   })}
      className={classes.list}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.profileDrawerHeader}>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <ArrowBackIcon />
        </IconButton>
        <p className={classes.profileDrawerHeaderText}>Profile</p>
      </div>
      <div className={classes.avatarBox}>
        <div className={classes.avatar}>
          {profileBelongsTo?.avatarUrl ? (
            <Avatar
              alt={profileBelongsTo?.username}
              src={profileBelongsTo?.avatarUrl}
              className={classes.avatarSize}
              onClick={handleOpenProfilePictureModal}
            />
          ) : (
            <AccountCircle className={classes?.avatarSize} />
          )}
          {openProfilePictureModal && <ProfilePictureModal openProfilePictureModal={openProfilePictureModal}
            handleCloseProfilePictureModal={handleCloseProfilePictureModal}
          />}

        </div>
      </div>

      <div className={classes.yourNameBox}>
        <div>
          <p className={classes.yourNameHeading}>Your Name</p>
        </div>
        <Box className={classes.usernameBox}>
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue={profileBelongsTo?.name}
            inputRef={usernameRef}
            disabled={showUserNamePen}
            onChange={handleUsernameChange}
          />
          {showUserNamePen && (
            <IconButton onClick={handleFocusUserNameField}>
              <EditIcon />
            </IconButton>
          )}
          {!showUserNamePen && (
            <IconButton onClick={saveUsernameChanges} disabled={!username}>
              <CheckIcon />
            </IconButton>
          )}
        </Box>
      </div>

      <div className={classes.pBox}>
        <p>
          This is not your username or pin. People can search for you with this
          name.
        </p>
      </div>

      <div className={classes.yourNameBox}>
        <div>
          <p className={classes.yourNameHeading}>Bio</p>
        </div>
        {/* <TextField
          required
          id="standard-required"
          defaultValue={profileBelongsTo?.bio}
        /> */}

<Box className={classes.usernameBox}>
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue={profileBelongsTo?.bio}
            inputRef={userBioRef}
            disabled={showUserBioPen}
            onChange={handleUserBioChange}
          />
          {showUserBioPen && (
            <IconButton onClick={handleFocusUserBioField}>
              <EditIcon />
            </IconButton>
          )}
          {!showUserBioPen && (
            <IconButton onClick={saveUserBioChanges} disabled={!userBio}>
              <CheckIcon />
            </IconButton>
          )}
        </Box>
      </div>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
