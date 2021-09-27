import React, { createContext, useEffect, useState } from "react";
import {useAuth} from "../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const CurrentUserDocContext = createContext();

export const CurrentUserDocProvider = ({ children }) => {
  const [currentUserDoc, setCurrentUserDoc] = useState([]);
  const {currentUser} = useAuth();


  const value = {
    currentUserDoc,
    setCurrentUserDoc
  };

  useEffect(() => {

    const unsub = onSnapshot(doc(db, "users", currentUser?.email), (doc) => {
        console.log("Current data: ", doc.data());
        setCurrentUserDoc({...doc.data()});
    });      return () => {
        unsub();
      }
  }, [currentUser])

  return (
    <CurrentUserDocContext.Provider value={value}>
      {children}
    </CurrentUserDocContext.Provider>
  );
};
