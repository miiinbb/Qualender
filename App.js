//App.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LoginPage from './src/components/Login_page'; // 파일의 상대 경로로 Login_page를 가져옴
import MyCalendar from './src/components/MyCalendar';
import SignupPage from './src/components/SignupPage';

export default function App() {
  const [loginVisible, setLoginVisible] = useState(false); //로그인 페이지 표시 여부
  const [signupVisible, setSignupVisible] = useState(false); // 회원가입 페이지 표시 여부
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useState(new Animated.Value(-Dimensions.get('window').width))[0];

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

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? -Dimensions.get('window').width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
       {/* "퀄린더" text 표시에 조건 설정*/}
      {!loginVisible && (
        <View>
          <Text style={styles.qualendar}>퀄린더</Text>
        </View>
      )}
      {/* 우측 상단 로그인 버튼 표시에 조건 설정*/}
      {!loginVisible && (
        <View style={styles.loginButtonMain}> {/*메인캘린더화면의 로그인버튼*/}
          <Button title="로그인" onPress={handleLogin} />
        </View>
      )}

      {loginVisible && !signupVisible && <LoginPage onBack={handleBack} onSignup={handleSignup} />}
      {signupVisible && <SignupPage onBack={handleBack} />}

      {!loginVisible && !signupVisible && (
        <MyCalendar />
      )}

      <TouchableOpacity style={styles.menuButton} onPress={handleToggleMenu}>
        <Text style={styles.menuName}>🗓</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
      <Button title="메인캘린더" style={styles.menuItem} textStyle={styles.menuItemText}/>
      <Button title="마이캘린더" style={styles.menuItem} textStyle={styles.menuItemText}/> {/* <Text style={styles.menuItem}>마이캘린더</Text> */}
      <Button title="마이페이지" style={styles.menuItem} textStyle={styles.menuItemText}/>
      </Animated.View>
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
    top: screenHeight * 0.05,
    right: screenWidth * 0.05,
    borderColor: '#566209', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께를 1로 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: `15`, // 테두리와 내부 요소 간의 간격 설정 (옵션) 
  },
  menuButton: {
    position: 'absolute',
    top: screenHeight * 0.05,
    left: screenWidth * 0.05,
    zIndex: 1,
    borderColor: '#566211', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께를 1로 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: `15`, // 테두리와 내부 요소 간의 간격 설정 (옵션) 
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '80%',
    backgroundColor: '#f0f0f0',
    zIndex: 0,
  },
  menuItem: {
    backgroundColor: '#FF4081', // 배경색
    borderRadius: 8, // 테두리 반경
    paddingVertical: 12, // 수직 패딩
    paddingHorizontal: 16, // 수평 패딩
    marginVertical: 8, // 수직 마진
    marginHorizontal: 16, // 수평 마진
    justifyContent: 'center', // 내용 중앙 정렬
    alignItems: 'center', // 내용 중앙 정렬
    elevation: 3, // 그림자 효과
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.3, // 그림자 투명도
    shadowRadius: 4, // 그림자 반경
  },
  menuItemText: {
    color: '#FFF', // 텍스트 색상
    fontSize: 16, // 텍스트 크기
    fontWeight: 'bold', // 텍스트 굵기
  },

  menuName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});