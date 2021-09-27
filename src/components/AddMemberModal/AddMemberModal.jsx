import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { MemberSearchModalContext } from '../../contexts/MemberSearchModalContext';



function getModalStyle() {
  const top = 35;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: "12rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius : "10px"
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
 const {openMemberSearch,handleOpenMemberSearch,handleCloseMemberSearch} = useContext(MemberSearchModalContext);

  const body = (
    <div style={modalStyle} className={classes.paper}>
    <input type="text" />
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpenMemberSearch}>
        Open Modal
      </button> */}
      <Modal
        open={openMemberSearch}
        onClose={handleCloseMemberSearch}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
