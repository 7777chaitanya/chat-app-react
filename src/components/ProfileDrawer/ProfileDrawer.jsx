import React,{useContext} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useStyles from "./styles";
import { AccountCircle } from "@material-ui/icons";
import { useAuth } from '../../contexts/AuthContext';
import { AllUsersContext } from '../../contexts/AllUsersContext';
import {Avatar, TextField, IconButton} from '@material-ui/core';



export default function TemporaryDrawer({ state, toggleDrawer }) {
  const classes = useStyles();
  const {currentUser} = useAuth();
  const {allUsers} = useContext(AllUsersContext);

//   console.log("allUser docs bbooo=> ", allUsers);
  const profileBelongsTo = allUsers.find(doc => doc.email === currentUser.email)

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
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
                />
              ) : (
                <AccountCircle className={classes?.avatarSize} />
               )} 
            </div>
            </div>
            

        <div className={classes.yourNameBox}>
                    <div><p className={classes.yourNameHeading}>Your Name</p></div>
                    <TextField required id="standard-required" label="Required" defaultValue={profileBelongsTo?.name} />

        </div>

        <div className={classes.pBox}>
            <p>This is not your username or pin. People can search for you with this name.</p>
        </div>

        <div className={classes.yourNameBox}>
                    <div><p className={classes.yourNameHeading}>Bio</p></div>
                    <TextField required id="standard-required" defaultValue={profileBelongsTo?.bio} />

        </div>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
