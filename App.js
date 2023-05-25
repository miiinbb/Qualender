//App.js
import {
  StyleSheet,
  Text,
  View,
  Button, Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import LoginPage from './src/components/Login_page'; // 파일의 상대 경로로 Login_page를 가져옴
import MyCalendar from './src/components/MyCalendar';
import SignupPage from './src/components/SignupPage';

export default function App() {
  // Declare and initialize selectedDay state variable
  const [loginVisible, setLoginVisible] = useState(false); //로그인 페이지 표시 여부
  const [signupVisible, setSignupVisible] = useState(false); // 회원가입 페이지 표시 여부

  const handleLogin = () => {
    setLoginVisible(true); // 로그인 버튼 클릭 시 로그인 페이지 표시
  };

  const handleBack = () => {
    if (signupVisible) {
      setSignupVisible(false);
      setLoginVisible(true);
    } else {
      setLoginVisible(false);
    }
  };

  const handleSignup = () => {
    setSignupVisible(true); // 회원가입 버튼 클릭 시 회원가입 페이지 표시
  };

  return (
    <View style={styles.container}>
      {/* "퀄린더" text 표시에 조건 설정*/}
      {!loginVisible && (
      <View>
        <Text style={styles.qualendar}>
          퀄린더
        </Text>
      </View>
      )}

      {/* 우측 상단 로그인 버튼 표시에 조건 설정*/}
      {!loginVisible && (
      <View style={styles.loginButtonMain}> {/*메인캘린더화면의 로그인버튼*/}
          <Button title="로그인" onPress={handleLogin} />
        </View>
      )}

      {loginVisible && !signupVisible && (
              <LoginPage onBack={handleBack} onSignup={handleSignup} />
            )}
            {signupVisible && (
              <SignupPage onBack={handleBack} />
            )}
                  
      {!loginVisible && !signupVisible && (
        <MyCalendar />
      )}
    </View>
  );
}

//화면 크기에 비례로 디자인 적용하기 위해 실행
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: screenHeight * 0.005,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d4ed31', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께를 1로 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  qualendar: { //'퀄린더' 부분
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    borderColor: '#263064', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께를 1로 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  loginButtonMain: { //로그인버튼 부분
    position: 'absolute',
    top: screenHeight*0.05,
    right: screenWidth*0.05,
    borderColor: '#566209', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께를 1로 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: `15`, // 테두리와 내부 요소 간의 간격 설정 (옵션) 
  },
});