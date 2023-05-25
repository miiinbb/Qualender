//SignupPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignupPage = ({ onSignup, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleBack = () => {
    onBack();
  };

  const handleSignup = () => {
    // 회원가입 버튼이 클릭되었을 때 실행되는 로직을 작성합니다.
    console.log('회원가입 버튼이 클릭되었습니다.');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('PhoneNumber:', phoneNumber);
    console.log('Nickname:', nickname);
    console.log('Email:', email);
    onSignup();
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>회원가입</Text>

      <View style={styles.inputContainer}>
      {/* 아이디 입력 */}
        <Text style={styles.label}>아이디</Text>
        <View style={styles.inputWithButton}>
          <TextInput
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
            placeholder="아이디를 입력하세요"
          />
          <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.smallButtonText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
      {/* 비밀번호 입력 */}
      <Text style={styles.label}>비밀번호</Text>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={true}
        />
        <TextInput
          value={password2}
          onChangeText={text => setPassword2(text)}
          style={styles.input}
          placeholder="비밀번호를 다시 입력하세요"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
      {/* 연락처 입력 */}
        <Text style={styles.label}>연락처</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
          placeholder="연락처를 입력하세요"
        />
      </View>

      <View style={styles.inputContainer}>
      {/* 닉네임 입력 */}
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          value={nickname}
          onChangeText={text => setNickname(text)}
          style={styles.input}
          placeholder="닉네임을 입력하세요"
        />
      </View>

      <View style={styles.inputContainer}>
      {/* 이메일 입력 */}
        <Text style={styles.label}>이메일</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholder="이메일을 입력하세요"
        />
      </View>
      {/* 회원가입 확인 버튼 */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: screenHeight * 0.05,
    bottom: screenWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5bd1d7',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    paddingTop: 80,  // 제목, 뒤로가기 버튼과 ID 입력창 사이에 여백을 추가했습니다.
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    borderColor: '#f0bf4c',
    borderWidth: 2,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderColor: '#c6beee',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 20,
    borderColor: '#eb94cf',
    borderWidth: 2,
    borderRadius: 3,
    padding: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: 250,
  },
  signupButton: {
    backgroundColor: '#9eeb47',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#110746',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,  // ID 입력창과 다른 입력창들의 너비를 동일하게 했습니다.
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    marginLeft: 10,
    borderRadius: 5,
  },
  smallButton: {
    paddingHorizontal: 6,  // Reduced padding
    paddingVertical: 5,   // Reduced padding
    backgroundColor: '#f0f0f0',
    marginLeft: 5,
    borderRadius: 5,
  },
  smallButtonText: {
    fontSize: 12,  // Reduced font size
  },
});

export default SignupPage;