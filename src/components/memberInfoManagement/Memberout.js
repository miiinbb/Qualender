import React, { useState,useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions, } from "react-native";
import { NavigationContainer,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function Memberout({ navigation }) {
  const [userPassword, setuserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.log("getData", value);
        setUsername(value);

        // 비밀번호를 가져오는 부분 추가
        const passwordValue = await AsyncStorage.getItem('userPassword');
        if (passwordValue !== null) {
          setuserPassword(passwordValue);
        }
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 회원 탈퇴 이후에는 getData() 함수를 호출하지 않도록 변경
    // 회원 탈퇴 후에는 이미 AsyncStorage에서 사용자 정보가 삭제된 상태이기 때문입니다.
    // getData();

    // 사용자 정보 초기화
    setUsername('');
    setuserPassword('');
    setConfirmPassword('');
  }, []);
  

  const goToMain = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'MainCalendar' },
        ],
      })
    );
  }

  const confirmDeleteAccount = () => {
    if (userPassword !== confirmPassword) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    Alert.alert(
      "정말로 탈퇴하실 것입니까?", "제발", [
        {
          text: "취소",
          onPress: () => console.log('회원탈퇴 취소'),
          style: "cancel",
        },
        { text: "탈퇴하기", onPress: () => deleteAccount() },
      ],
      { cancelable: false }
    );
  };
  

    const deleteAccount = async () => {
      try {
        // 비밀번호 확인
        if (userPassword !== confirmPassword) {
          Alert.alert("비밀번호가 일치하지 않습니다.");
          return;
        }
    
        const response = await fetch('http://172.30.1.35:3000/delete-account', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, password: userPassword }),
        });
    
        if (!response.ok) {
          const result = await response.json();
          console.error(result.message);
        } else {
          const result = await response.json();
          console.log(result.message);
          setuserPassword('');
          setConfirmPassword('');
          setUsername('');
          goToMain();}
        // } else {
        //   console.error('Network response was not ok.');
        // }
      } catch (error) {
        console.error('Error occurred while making the request:', error);
      }
    };
    

    useEffect(() => {
      getData();
    }, []);

    return (
    <View style={styles.container}>
      <View style={{marginBottom: 20, marginRight: width*0.25,}}>
        <Text style={styles.title}>회원 탈퇴를 위해</Text>
        <Text style={styles.title}>기존 비밀번호를 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userPassword}
          onChangeText={(text) => setuserPassword(text)}
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="silver"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="비밀번호를 한 번 더 입력해주세요"
          placeholderTextColor="silver"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button title="돌아가기" onPress={() => navigation.goBack()} /> */}
        <Button title="탈퇴하기" onPress={() => confirmDeleteAccount()} color="silver" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="메인캘린더로 돌아가기" color="white"
          onPress={() => goToMain()}
        />
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.45,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 17,
    textAlign:'left',
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    // flexDirection: "row",
    backgroundColor: '#141B38',
    paddingVertical: 3,
    paddingHorizontal: 20,
    padding: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Memberout;