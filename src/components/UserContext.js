import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userNickname, setUserNickname] = useState('');

  const setUser = (name) => {
    setUsername(name);
  };

  const updateUserNickname = (nickname) => {
    setUserNickname(nickname);
  };

  return (
    <UserContext.Provider value={{ username, userNickname, setUser, updateUserNickname }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
