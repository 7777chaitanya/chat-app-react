import React, { createContext, useEffect, useState } from "react";

export const ShowSearchListContext = createContext();

export const ShowSearchListProvider = ({ children }) => {
  const [showSearchList, setShowSearchList] = useState(false);

  const closeSearchList = () => {
    setShowSearchList(false);
  };

  const openSearchList = () => {
    setShowSearchList(true);
  };

  const value = {
    showSearchList,setShowSearchList,closeSearchList,openSearchList
  }
  return (

    <ShowSearchListContext.Provider value={value}>
    
    {children}
    
    </ShowSearchListContext.Provider>
    
    );
};

