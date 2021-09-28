import React, { createContext, useEffect, useState } from "react";

export const PhotoPreviewModalContext = createContext();

export const PhotoPreviewModalProvider = ({ children }) => {

    const [openPhotoPreviewModal, setOpenPhotoPreviewModal] = React.useState(false);

    const handleOpenPhotoPreviewModal = () => {
      setOpenPhotoPreviewModal(true);
    };
  
    const handleClosePhotoPreviewModal = () => {
      setOpenPhotoPreviewModal(false);
    };

    const value={
        openPhotoPreviewModal,
        handleOpenPhotoPreviewModal,
        handleClosePhotoPreviewModal
    }

return (

<PhotoPreviewModalContext.Provider value={value}>

{children}

</PhotoPreviewModalContext.Provider>

);

};