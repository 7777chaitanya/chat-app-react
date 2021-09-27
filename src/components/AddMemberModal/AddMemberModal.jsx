import React,{useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { MemberSearchModalContext } from '../../contexts/MemberSearchModalContext';
import { ShowSearchListContext } from '../../contexts/ShowSearchListContext';
import SearchList from "../SearchList/SearchList";



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
    width: "20rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius : "50px",
    
  },

  inputField: {
    width: "100%",
    border: "none",
    height : "2rem",
    borderRadius : "5px",
    "&:focus": {
       outlineWidth : "0rem"
      }
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
 const {openMemberSearch,handleOpenMemberSearch,handleCloseMemberSearch} = useContext(MemberSearchModalContext);
 const { showSearchList, setShowSearchList, closeSearchList, openSearchList } =
 useContext(ShowSearchListContext);

 const [searchTerm, setSearchTerm] = useState("");

 const handleSearchTermChange = (event) => {
   setSearchTerm(event.target.value);
   openSearchList();
 }

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <input type="text" placeholder="search your friend here" className={classes.inputField} onChange={handleSearchTermChange}/>
    {showSearchList && <SearchList searchTerm={searchTerm} usedInAddMemberModal={true}/>}
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
