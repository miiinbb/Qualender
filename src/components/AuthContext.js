import React, { useState } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userNickname, setUserNickname] = useState('');

  const signIn = (userInfo) => {
    setUser(userInfo);
    setUserNickname(userInfo.nickname); // 사용자의 닉네임 설정
  };

  const signOut = () => {
    setUser(null);
    setUserNickname(''); // 닉네임 초기화
  };

  return (
    <AuthContext.Provider value={{ user, userNickname, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
