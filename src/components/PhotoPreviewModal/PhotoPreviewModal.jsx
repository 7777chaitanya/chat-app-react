import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { PhotoPreviewModalContext } from '../../contexts/PhotoPreviewModalContext';
import { motion } from "framer-motion"
import { ClassSharp } from '@material-ui/icons';



function getModalStyle() {
    if (window.innerWidth > 360) {
        return {
          top: "0vh",
          left: "10vw",
        };
      }
      if (window.innerWidth <= 360) {
        return {
          top: "40vh",
          left: "20vw",
        };
      }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100vw",
        // backgroundColor: theme.palette.background.paper,
        // borderRadius: "10px",
        // position: "relative",
        height : "100vh",
        display : "flex",
justifyContent : "center",
alignItems : "center"
      },
      image:{
         margin : "auto",
         width : "100vw",
         height : "auto"
      }
}));

export default function SimpleModal({imageUrl}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
    const {
        openPhotoPreviewModal,
        handleOpenPhotoPreviewModal,
        handleClosePhotoPreviewModal
    } = useContext(PhotoPreviewModalContext)

  const body = (
    <motion.div style={modalStyle} className={classes.paper}
    onClick={handleClosePhotoPreviewModal} 
    animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
    >
      <img src={imageUrl} alt={imageUrl} className={classes.image}/>
    </motion.div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpenPhotoPreviewModal}>
        Open Modal
      </button> */}
      <Modal
        open={openPhotoPreviewModal}
        onClose={handleClosePhotoPreviewModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
