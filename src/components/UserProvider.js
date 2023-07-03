// UserProvider.js
import React, { useState } from 'react';
import AuthContext from './AuthContext';

const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState('로그인을 해주세요');

  const updateNickname = (newNickname) => {
    setNickname(newNickname);
  };

  // 이벤트 핸들러를 통해 nickname을 변경하는 예시
  const handleLogin = () => {
    const newNickname = '로그인한 사용자 닉네임'; // 로그인한 사용자의 닉네임을 가져온다면 이 부분을 변경해야 합니다.
    updateNickname(newNickname);
  };

  return (
    <AuthContext.Provider value={{ nickname, updateNickname }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;