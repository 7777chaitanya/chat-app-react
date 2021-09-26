import React, { createContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const AllRoomsArrayContext = createContext();

export const AllRoomsArrayProvider = ({ children }) => {
  const [allRoomsArray, setAllRoomsArray] = useState([]);

  console.log("all rooms rray => ", allRoomsArray);

  useEffect(() => {
    const q = query(collection(db, "rooms"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.id);
      });
      setAllRoomsArray([...cities]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value ={allRoomsArray, setAllRoomsArray}

  return (
    <AllRoomsArrayContext.Provider value={value}>
      {children}
    </AllRoomsArrayContext.Provider>
  );
};
