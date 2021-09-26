import React, { createContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


export const AllUsersContext = createContext();

export const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  console.log("allUsers => ",allUsers)

  useEffect(() => {
   

    const unsubscribe = onSnapshot(query(collection(db, "users")), (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
          
          users.push(doc.data());
      });
      setAllUsers([...users]);

    });
    
      return () => {
          unsubscribe();
      }
  }, [])

  const value = { allUsers, setAllUsers };

  return (
    <AllUsersContext.Provider value={value}>
      {children}
    </AllUsersContext.Provider>
  );
};
