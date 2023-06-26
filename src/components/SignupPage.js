//SignupPage.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, Dimensions, StyleSheet, ScrollView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const SignupPage = ({ onSignup, onBack, navigation }) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [domain, setDomain] = useState([
    { label: "naver.com", value: "naver.com" },
    { label: "gmail.com", value: "gmail.com" },
    { label: "daum.net", value: "daum.net" },
    { label: "직접 입력", value: " " },
  ]);
  const [onlyDomain, setOnlyDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleSignup = async () => {
    registerUser();

    const userInfo = {
      username: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      nickname: nickname,
    };

    // 사용자 정보를 AsyncStorage에 저장
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('사용자 정보 저장 성공');
    } catch (error) {
      console.log('사용자 정보 저장 실패:', error);
    }

    loadUserInfo(); // 수정된 부분

    navigation.navigate('LoginPage', { // params를 객체로 전달
      username: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      nickname: nickname,
    });
  };

  const loadUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        console.log('불러온 사용자 정보:', userInfo);
        // 여기서 userInfo를 활용하여 필요한 작업을 수행합니다.
      } else {
        console.log('저장된 사용자 정보 없음');
      }
    } catch (error) {
      console.log('사용자 정보 불러오기 실패:', error);
    }
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
      const response = await fetch('http://192.168.0.29:3000/register', {
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
              navigation.navigate('LoginPage');
            },
          },
        ]);
        
        const loadUserInfo = async () => {
          try {
            const userInfoString = await AsyncStorage.getItem('userInfo');
            if (userInfoString) {
              const userInfo = JSON.parse(userInfoString);
              console.log('사용자 정보:', result.userInfo);
              // 여기서 userInfo를 활용하여 필요한 작업을 수행합니다.
            } else {
              console.log('저장된 사용자 정보 없음');
            }
          } catch (error) {
            console.log('사용자 정보 불러오기 실패:', error);
          }
        };
        loadUserInfo();
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
      const response = await fetch('http://192.168.0.29:3000/name', {
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
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{marginBottom: 20, marginRight: width*0.3,}}>
          <Text style={styles.title}>회원가입을 위해</Text>
          <Text style={styles.title}>아래 항목들을 채워주세요</Text>
        </View>
      <Text style={styles.label}>아이디</Text>
        <View style={styles.inputWithButton}>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.inputidandnickname}
            placeholder="아이디를 입력하세요"
            placeholderTextColor="silver"
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
            placeholderTextColor="silver"
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
          placeholder="새로운 비밀번호"
          placeholderTextColor="silver"
          secureTextEntry={true}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          style={[styles.input, {marginTop: 10}]}
          placeholder="비밀번호 확인"
          placeholderTextColor="silver"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>연락처</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
          placeholder="형식: 01012341234, 숫자만 입력"
          placeholderTextColor="silver"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <View style={styles.emailInputContainer}>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.emailInput}
            placeholder="이메일을 입력하세요"
            placeholderTextColor="silver"
          />
          <Text style={[styles.atSymbol,{ fontSize: 20 }]}>@</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="도메인 주소"
            placeholderTextColor="silver"
            value={selectedDomain !== '' ? selectedDomain : onlyDomain} // 드롭다운 선택 라벨 또는 직접 입력한 도메인 값을 표시합니다.
            onChangeText={(text) => setNewEmail(text.split('@')[0])}
          />
        </View>
        <Controller
          name="domain"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={{alignSelf: 'center',}}>
              <DropDownPicker
                style={styles.dropbox} //main input field 모양(dropdown컨테이너 모양)
                open={open}
                value={value}
                items={domain}
                setOpen={setOpen}
                setValue={(value) => {
                  setSelectedDomain(value);
                  setOnlyDomain(domain.find((item) => item.value === value)?.label || ""); // 선택한 라벨을 저장합니다.
                  onChange(value);
                }}
                setItems={setDomain}
                placeholder="도메인 선택"
                placeholderStyle={styles.placeholderStyles}
                containerStyle={{ width: '100%'}}
                onChangeItem={(item) => {
                  setSelectedDomain(item.value);
                }}
              />
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={[styles.signupButton, {marginTop: 10}]} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { //이 화면 자체 영역
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 90,
    paddingVertical:50,
    backgroundColor:'white',
  },
  title: { //맨 위 '회원가입을 위해~' 부분
    fontWeight: 'normal',
    padding: 2,
    fontSize: 15,
    color: '#17375E',
  },
  inputContainer: { //각 항목 lable, input박스를 포함하는 영역
    marginBottom: 20,
    width: width*0.8,
    // backgroundColor: 'azure', 
  },
  label: { //아이디, 닉네임, 비밀번호, 연락처, 이메일이라고 적힌 부분
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 5,
    padding: 5,
  },
  inputWithButton: { //input박스와 중복확인을 포함하는 영역
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'chartreuse', 
  },
  inputidandnickname: { //아이디, 닉네임 input 박스 영역
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "70%", 
    // backgroundColor: 'cadetblue', 
  },
  smallButton: { //중복확인 버튼
    paddingHorizontal: 12,
    paddingVertical: 9.5,
    backgroundColor: '#17375E',
    marginLeft: 5,
  },
  smallButtonText: {
    color: 'white',
    fontSize: 12,
  },
  input: { //비밀번호, 연락처 input 박스 영역
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 12,
    // backgroundColor: 'burlywood', 
  },
  emailInputContainer:{ //이메일을 입력하세요, @, 도메인주소를 포함하는 영역
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: "3%",
    // backgroundColor: 'blueviolet', 
  },
  emailInput:{ //이메일 input부분에서 input 박스 두 개 영역
    width: "46%",
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 12,
    // backgroundColor: 'bisque', 
  },
  atSymbol: { //@ 텍스트
    marginBottom:"1.5%",
    alignSelf: "center",
  },
  dropbox: { //'도메인 선택' 칸
    borderRadius: 0,
    alignItems: "center",
    width: "100%",
    // height: 10,
  },  
  placeholderStyles: { //'도메인 선택' 텍스트
    color: "silver",
    paddingHorizontal: 12,
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
});

export default SignupPage