//SignupPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignupPage = ({ onSignup, onBack, navigation }) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const handleSignup = () => {
    registerUser();
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      console.log('Password and confirm password do not match');
      Alert.alert('오류', '비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!username || !password || !confirmPassword || !phoneNumber || !nickname || !email) {
      console.log('Missing input fields');
      Alert.alert('오류', '투입되지 않은 항목이 있습니다.');
      return;
    }

    try {
      const response = await fetch('http://143.248.253.49:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          nickname: nickname,
          password: password,
          phoneNumber: phoneNumber,
          email: email,
        }),
      });

      if (response.ok) {
        Alert.alert('성공', '회원가입에 성공하셨습니다!', [
          {
            text: 'OK',
            onPress: () => {
              // Clear input fields and navigate to the main calendar screen
              setUsername('');
              setPassword('');
              setConfirmPassword('');
              setPhoneNumber('');
              setNickname('');
              setEmail('');
              navigation.navigate('MyCalendar');
            },
          },
        ]);
      } else {
        Alert.alert('오류', '회원가입에 실패하셨습니다');
      }
    } catch (error) {
      Alert.alert('오류', '네트워크 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
    }
  };

  const checkNameAvailability = async () => {
    console.log('checkname is called');
    try {
      const response = await fetch('http://143.248.253.49:3000/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          nickname: nickname,
        }),
      });
      console.log(response);
      if (response.ok) {
        const { available } = await response.json();
        if (available) {
          Alert.alert('성공', '사용하실 수 있는 이름입니다');
          setIsUsernameValid(true);
        } else {
          Alert.alert('오류', '다른 사용자가 이미 사용중인 이름입니다');
          setUsername('');
          setNickname('');
          setIsUsernameValid(false);
        }
      } else {
        Alert.alert('오류', '확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '네트워크 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
    }
  };

  const handlePasswordChange = (text) => {
    if (!isUsernameValid) {
      setPassword('');
      Alert.alert('에러', '중복 확인을 해주세요.');
    } else {
      setPassword(text);
    }
  };

  return (
    <View style={styles.pageContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>아이디</Text>
        <View style={styles.inputWithButton}>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.inputidandnickname}
            placeholder="아이디를 입력하세요"
          />
          <TouchableOpacity style={styles.smallButton} onPress={checkNameAvailability}>
            <Text style={styles.smallButtonText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>닉네임</Text>
        <View style={styles.inputWithButton}>
          <TextInput
            value={nickname}
            onChangeText={text => setNickname(text)}
            style={styles.inputidandnickname}
            placeholder="닉네임을 입력하세요"
          />
          <TouchableOpacity style={styles.smallButton} onPress={checkNameAvailability}>
            <Text style={styles.smallButtonText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          value={password}
          onChangeText={handlePasswordChange}
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={true}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          style={[styles.input, {marginTop: 10}]}
          placeholder="비밀번호를 다시 입력하세요"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>연락처</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
          placeholder="연락처를 입력하세요"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholder="이메일을 입력하세요"
        />
      </View>

      <TouchableOpacity style={[styles.signupButton, {marginTop: 10}]} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 90,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 20,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 20,
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 5,
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 250,
  },
  inputidandnickname: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 180,    
  },
  signupButton: {
    backgroundColor: '#17375E',
    paddingVertical: 10,
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
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    marginLeft: 10,
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 9.5,
    backgroundColor: '#17375E',
    marginLeft: 5,
  },
  smallButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default SignupPage