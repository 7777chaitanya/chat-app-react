import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { ListItem, ListItemIcon, ListItemText, List, ListItemLink, Divider } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';




function getModalStyle() {
//   const top = 50;
//   const right = 30;

  return {
    top: "5rem",
    left : "11rem"
    // transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: "10rem",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
   
  },
}));

export default function MenuModal({openMenuModal,handleCloseMenuModal}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
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
