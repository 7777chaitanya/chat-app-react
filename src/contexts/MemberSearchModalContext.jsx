import React, { createContext, useEffect, useState } from "react";

export const MemberSearchModalContext = createContext();

export const MemberSearchProvider = ({ children }) => {

    const [openMemberSearch, setOpenMemberSearch] = React.useState(false);

    const handleOpenMemberSearch = () => {
      setOpenMemberSearch(true);
    };
  
    const handleCloseMemberSearch = () => {
      setOpenMemberSearch(false);
    };

    const value = {openMemberSearch,handleOpenMemberSearch,handleCloseMemberSearch }

return (

<MemberSearchModalContext.Provider value={value}>

{children}

</MemberSearchModalContext.Provider>

);

};