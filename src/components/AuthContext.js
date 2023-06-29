import React, { useState } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userNickname, setUserNickname] = useState('');

  const signIn = (userInfo) => {
    setUser(userInfo);
    setUserNickname(userInfo.nickname);
  };

  const signOut = () => {
    setUser(null);
    setUserNickname('');
  };

  const updateNickname = (newNickname) => {
    setUserNickname(newNickname);
    console.log("룰루랄라", userNickname); // Move the `console.log` here
  };

  return (
    <AuthContext.Provider value={{ user, userNickname, signIn, signOut, updateNickname }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
