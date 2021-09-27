import React, { createContext, useEffect, useState } from "react";

export const ChatSettingsModalContext = createContext();

export const ChatSettingsModalProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


const value={open, handleOpen, handleClose}

  return (
    <ChatSettingsModalContext.Provider value={value}>
      {children}
    </ChatSettingsModalContext.Provider>
  );
};
