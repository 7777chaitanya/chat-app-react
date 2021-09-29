import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { PhotoPreviewModalContext } from "../../contexts/PhotoPreviewModalContext";
import { motion } from "framer-motion";
import { ClassSharp } from "@material-ui/icons";

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
    // backgroundColor: 
    // borderRadius: "10px",
    // position: "relative",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    margin: "auto",

   

    [theme.breakpoints.down('sm')]: {
      width: "100vw",
      height: "auto",    },
    [theme.breakpoints.up('md')]: {
      height : "100vh",
      width : "auto"
    },
  },
}));

export default function SimpleModal({ imageUrl }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const {
    openPhotoPreviewModal,
    handleOpenPhotoPreviewModal,
    handleClosePhotoPreviewModal,
  } = useContext(PhotoPreviewModalContext);

  const body = (
    <motion.div
      style={modalStyle}
      className={classes.paper}
      onClick={handleClosePhotoPreviewModal}
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <img src={imageUrl} alt={imageUrl} className={classes.image} />
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
