import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { useState, createContext } from 'react';
const UserContext = createContext();
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value) {
        const JSONValue = JSON.parse(value);
        setUser(JSONValue);
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
