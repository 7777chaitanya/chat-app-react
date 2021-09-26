import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { ListItem, ListItemIcon, ListItemText, List, ListItemLink, Divider, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import { useAuth } from '../../../contexts/AuthContext';
import {auth} from "../../../firebase";
import {useHistory} from 'react-router-dom';
import SettingsDrawer from "../../SettingsDrawer/SettingsDrawer";




function getModalStyle() {
//   const top = 50;
//   const right = 30;
console.log("window.idth => ", window.innerWidth);
if(window.innerWidth>660){
  return {
    
    top: "5rem",
    left : "9rem"
    }
    // transform: `translate(-${top}%, -${left}%)`,
  }
  if(window.innerWidth<660){
    return {
    
        top: "5rem",
        left : "7rem"
        }
        // transform: `translate(-${top}%, -${left}%)`,
      };
  }


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: "12rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius : "10px"
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  //  boxShadow : "1px 1px  2px 0px darkgray"
  },
}));




export default function MenuModal({openMenuModal,handleCloseMenuModal, handleCreateNewRoom}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const {logout} = useAuth();
  const history = useHistory();


  const handleLogout = async () => {
    // setError("");
    try {
        await logout(auth);
        history.push('/login');
      }
    catch(error){
        // setError("Log out Failed!");
        console.log(error)
    }
  };

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
  
  const body = (
<div style={modalStyle} className={classes.paper}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={handleCreateNewRoom}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Create room" />
        </ListItem>

        <ListItem button onClick={toggleDrawer("left", true)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
      <Divider />
      
      <SettingsDrawer toggleDrawer={toggleDrawer} state={state} />
    </div>
  );


  return (
    <div>
      {/* <button type="button" onClick={handleOpenMenuModal}>
        Open Modal
      </button> */}
      <Modal
        open={openMenuModal}
        onClose={handleCloseMenuModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body} 
      </Modal>
    </div>
  );
}
