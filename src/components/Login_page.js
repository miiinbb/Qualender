//Login_page.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { KakaoLoginButton } from '@react-native-seoul/kakao-login';
import { useRoute, NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import IP from '../data/IP';

const Stack = createStackNavigator();

function LoginPage ({ onLogin, onBack}) {
  const navigation = useNavigation();
  const route = useRoute();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (route.params) {
      const { username, password, email, phoneNumber, nickname } = route.params;
      setUsername(username);
      setPassword(password);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setNickname(nickname);
    }
  }, [route.params]);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('username', value);
    } catch (e) {
      Alert.alert("failed to save username", e);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://${IP}:3000/login`, {
        // http://172.30.1.36:3000/register
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.availableLogin) {
          // 로그인 성공 시 처리할 로직
          // console.log('로그인 성공');
          // if (result.userInfo) {
          //   console.log('사용자 정보:', result.userInfo);
          //   const { username, password, email, phoneNumber, nickname } = result.userInfo;
          //   if (username && password && email && phoneNumber && nickname) {
          //     // AsyncStorage를 사용하여 사용자 정보 저장
          //     try {
          //       const userInfo = {
          //         username: username,
          //         password: password,
          //         email: email,
          //         phoneNumber: phoneNumber,
          //         nickname: nickname
          //       };
          //       await AsyncStorage.setItem('userInfo', JSON.stringify(result.userInfo));

          //     } catch (error) {
          //       console.log('사용자 정보 저장 실패:', error);
          //     }
          //   }
          // } else {
          //   console.log('사용자 정보 없음');
          // }
          storeData(username);
          navigation.navigate('MainCalendar');
        } else {
          // 로그인 실패 시 처리할 로직
          console.log('로그인 실패');
          Alert.alert('로그인 실패', '유효한 아이디와 비밀번호를 입력하세요.');
        }
      } else {
        // 서버에서 응답이 실패한 경우 처리할 로직
        console.log('로그인 실패');
        Alert.alert('로그인 실패', '네트워크 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
      }
    } catch (error) {
      // 로그인 실패 시 처리할 로직
      console.log('로그인 실패:', error);
      Alert.alert('로그인 실패', '네트워크 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
    }
  };

  const clickSignup = () => {
    navigation.navigate('SignupPage', {
      // 회원가입 페이지로 이동 시 회원가입 정보 전달
      username: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      nickname: nickname
    });
  };


  return (
    <View style={styles.pageContainer}>
    <View style={styles.container}>
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
          placeholderTextColor="silver"
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
          placeholderTextColor="silver"
          secureTextEntry={true}
        />
      </View>

      {/* 로그인 버튼 */}
      <View style={[styles.loginButton, {marginTop: 20}]}>
        <Button title="로그인" onPress={handleLogin} color="white"/>
      </View>

      {/* 회원가입하기 버튼 */}
      <View style={[styles.signupButton, {marginTop: 10}]}>
        <Button title="회원가입하기" onPress={clickSignup} color="white"/>
      </View>
    </View>
    </View>
  );
};

//화면 크기에 비례로 디자인 적용하기 위해 실행
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  container: { //하늘색 부분
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 90,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {//'로그인'이라고 적혀있는 부분
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  inputContainer: {////아이디, 비밀번호 글자부분 + 입력 부분 각각(분홍색 부분)
    marginBottom: 20,
  },
  label: { //'아이디''비밀번호'라고 적혀있는 부분분
    fontSize: 16,
    marginBottom: 5,
  },
  input: { //아이디, 비밀번호 입력하는 부분만
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 250,
  },
  loginButton: { //하단 '로그인', '카톡로그인'버튼 같이
    backgroundColor: '#17375E',
    paddingVertical: 1,
    paddingHorizontal: 20,
    padding: 5,
    width: 250,
    alignItems: "center",
  },
  loginButtonText: { //하단 '로그인', '카톡로그인' 텍스트 같이
    fontSize: 16,
    color: 'white',
    fontWeight: 'normal',
  },

  signupButton: {
    backgroundColor: '#17375E',
    paddingVertical: 1,
    paddingHorizontal: 20,
    padding: 5,
    width: 250,
    alignItems: "center",
  },
  signupButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'normal',
  },
  
});

export default LoginPage;