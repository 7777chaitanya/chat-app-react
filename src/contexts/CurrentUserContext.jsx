import React, { createContext, useEffect, useState } from "react";


export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <CurrentUserContext.Provider value={[user, setUser]}>
      {children}
    </CurrentUserContext.Provider>
    )
}

