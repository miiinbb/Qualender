// UserProvider.js
import React, { useState } from 'react';
import AuthContext from './AuthContext';

const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState('로그인을 해주세요');

  const updateNickname = (newNickname) => {
    setNickname(newNickname);
  };

  return (
    <AuthContext.Provider value={{ nickname, updateNickname }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;