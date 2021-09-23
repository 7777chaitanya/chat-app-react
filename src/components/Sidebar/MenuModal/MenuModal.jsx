import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { ListItem, ListItemIcon, ListItemText, List, ListItemLink, Divider, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';




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
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
   boxShadow : "1px 1px  2px 0px darkgray"
  },
}));

export default function MenuModal({openMenuModal,handleCloseMenuModal, handleCreateNewRoom}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={handleCreateNewRoom}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body2">Create a room</Typography>} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      
      <button onClick={handleCloseMenuModal}>close modal</button>
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
