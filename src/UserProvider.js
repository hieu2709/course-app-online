import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState, createContext } from 'react';
import { db } from './firebase/config';
const UserContext = createContext();
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value) {
        const JSONValue = JSON.parse(value);
        const docRef = doc(db, 'users', JSONValue?.username);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap?.data());
        } else {
          setUser(false);
        }
      } else {
        setUser(false);
      }
    } catch (e) {
      console.log('get user storage', e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };
