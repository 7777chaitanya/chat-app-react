import React, { createContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { db } from "../firebase";



export const AllRoomsWithDocIdContext = createContext();

export const AllRoomsWithDocIdProvider = ({ children }) => {
    const {currentUser} = useAuth();
    const [rooms, setRooms] = useState([]);
  
    useEffect(() => {
      const q = query(collection(db, "rooms"),orderBy("lastMessageTime", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let rooms = [];
    querySnapshot.forEach((doc) => {
        rooms.push({id : doc.id, data : doc.data()});
    });
    rooms = rooms.filter(rooms => rooms.data?.members?.includes(currentUser?.email))
    setRooms([...rooms])
    // console.log("Current cities in CA: ", cities.join(", "));
    console.log("rooms => ",rooms)
  });
  
  return () => {
    unsubscribe();
  }
    }, [currentUser])

    const value ={rooms,setRooms}
  
  return (
    <AllRoomsWithDocIdContext.Provider value={value}>
      {children}
    </AllRoomsWithDocIdContext.Provider>
  );
};
