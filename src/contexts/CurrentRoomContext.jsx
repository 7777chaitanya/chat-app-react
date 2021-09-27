import React, { createContext, useEffect, useState } from "react";

export const CurrentRoomContext = createContext();

export const CurrentRoomProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState("");

  const value = { currentRoom, setCurrentRoom };

  console.log("currentRoom ->", currentRoom)
  return (
    <CurrentRoomContext.Provider value={value}>
      {children}
    </CurrentRoomContext.Provider>
  );
};
