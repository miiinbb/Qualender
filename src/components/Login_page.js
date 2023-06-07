//Login_page.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KakaoLoginButton } from '@react-native-seoul/kakao-login';


const LoginPage = ({ onLogin, onBack, onSignup, navigation }) => {
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
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} 
        onPress={() => navigation.navigate("MyCalendar")}
        >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* 제목 */}
      <Text style={styles.title}>로그인</Text>

      <View style={styles.inputContainer}>
        {/* 아이디 입력란 */}
        <Text style={styles.label}>아이디</Text>
        <TextInput
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
          placeholder="아이디를 입력하세요"
        />
      </View>

      <View style={styles.inputContainer}>
        {/* 비밀번호 입력란 */}
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={true}
        />
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 카카오톡으로 로그인하기 버튼 */}
      <TouchableOpacity style={[styles.kakaologinButton, { backgroundColor: 'yellow' }]}>
        <Text style={styles.kakaologinButtonText}>카카오톡으로 로그인하기</Text>
      </TouchableOpacity>

      {/* 회원가입하기 버튼 */}
      <TouchableOpacity style={[styles.signupButton, {backgroundColor: 'lightgrey'}]} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};

//화면 크기에 비례로 디자인 적용하기 위해 실행
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { //하늘색 부분
    flex: 1,
    //position: 'absolute',
    top: screenHeight*0.05,
    bottom: screenWidth*0.05,
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
  title: {//'로그인'이라고 적혀있는 부분
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderColor: '#c6beee', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  inputContainer: {////아이디, 비밀번호 글자부분 + 입력 부분 각각(분홍색 부분)
    marginBottom: 20,
    borderColor: '#eb94cf', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  label: { //'아이디''비밀번호'라고 적혀있는 부분분
    fontSize: 16,
    marginBottom: 5,
    borderColor: 'red', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  input: { //아이디, 비밀번호 입력하는 부분만
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: 250,
  },
  loginButton: { //하단 '로그인', '카톡로그인'버튼 같이
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#9eeb47', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  loginButtonText: { //하단 '로그인', '카톡로그인' 텍스트 같이
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  kakaologinButton: { //하단 '카톡로그인'버튼 
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#ADD8E6', // 블루로 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  kakaologinButtonText: { //하단 '카톡로그인' 텍스트 같이
      color: '#000000', //검은색으로 바꿈 
      fontSize: 16,
      fontWeight: 'bold',
  },
  
  signupButton: { //'회원가입'버튼
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#110746', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  }

  // signupButtonText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  
});

export default LoginPage;