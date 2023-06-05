//Mypage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KakaoLoginButton } from '@react-native-seoul/kakao-login';


const MyPage = ({ onLogin, onBack, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Add isSignup state variable


  const handleBack = () => {
    onBack(); // 뒤로가기 버튼이 눌렸을 때 onBack 함수 호출
  };

  const handleLogin = () => {
    // 로그인 버튼이 클릭되었을 때 실행되는 로직을 작성합니다.
    console.log('로그인 버튼이 클릭되었습니다.');
    console.log('Username:', username);
    console.log('Password:', password);
    // 여기에서 실제로 로그인 처리를 진행하면 됩니다.
    // 예를 들어, 서버로 요청을 보내고 응답을 처리하는 등의 로직을 수행합니다.
    onLogin(); // 로그인 성공 시 상위 컴포넌트로 알림
  };

  const handleSignup = () => {
    onSignup(); // 회원가입 버튼이 눌렸을 때 onSignup 함수 호출
  };

  const handleTogglePage = () => {
    setIsSignup(!isSignup); // Toggle between login and signup pages
  };

  const handleKakaoLogin = async () => {
    try {
      const token = await KakaoLoginButton.login();
      // 로그인 성공 시 처리할 로직
      console.log('카카오톡으로 로그인 성공:', token.accessToken);
    } catch (error) {
      // 로그인 실패 시 처리할 로직
      console.log('카카오톡 로그인 실패:', error);
    }};

  // Render SignupPage if isSignup is true
  if (isSignup) {
    return <SignupPage onSignup={handleTogglePage} onBack={handleBack} />;
  }

  return (
    <View style={styles.outerContainer}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* 제목 */}
      <Text style={styles.title}>마이페이지</Text>

      <View style={styles.innerContainer}>
        {/* 즐겨찾기 메뉴 버튼 */}
        <TouchableOpacity style={styles.favorites} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>즐겨찾기</Text>
        </TouchableOpacity>

        {/* 취득한자격증 메뉴 버튼 */}
        <TouchableOpacity style={styles.ObtainedList} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>취득한 자격증</Text>
        </TouchableOpacity>
      </View>

      {/* 회원정보관리 버튼 */}
      <TouchableOpacity style={[styles.memberInfoManagement, {backgroundColor: 'lightgrey'}]} onPress={handleSignup}>
        <Text style={styles.memberInfoManagementText}>회원정보관리</Text>
      </TouchableOpacity>
    </View>
  );
};

//화면 크기에 비례로 디자인 적용하기 위해 실행
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  outerContainer: { //하늘색 부분
    flex: 1,
    //position: 'absolute',
    //margintop: screenHeight*0.5,
    //marginbottom: screenHeight*0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5bd1d7', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    borderColor: '#f0bf4c', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
  },
  title: {//'마이페이지'이라고 적혀있는 부분
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderColor: '#c6beee', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  innerContainer:{
    flexDirection: 'row',
  },

  favorites:{//즐겨찾기 메뉴 버튼
    backgroundColor: '#c6beee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#9eeb47', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  ObtainedList:{//취득한자격증 메뉴 버튼
    backgroundColor: '#ADD8E6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#9eeb47', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  
  memberInfoManagement: { //'회원가입'버튼
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#110746', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  memberInfoManagementText: {
  color: '#000000', //검은색으로 바꿈
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default MyPage;