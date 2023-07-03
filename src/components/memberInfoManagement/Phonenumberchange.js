//Phonenumberchange.js
import React, { useState, } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions,TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../../data/IP';

function Phonenumberchange({ navigation }) {
  const [newNumber, setNewNumber] = useState("");
  const [username, setUsername] = useState('');
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.log("getData", value);
        setUsername(value);
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePhonenumberChange = async () => {
    const data = { username: username, newPhonenumber: newNumber };
  
    try {
      const response = await fetch(`http://${IP}:3000/phonenumber-change`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        // 비밀번호 변경 성공 후 다른 화면으로 이동하거나 알림 메시지를 보여줄 수 있습니다.
      } else {
        console.error('Network response was not ok.');
        // 비밀번호 변경 실패 시 알림 메시지를 보여줄 수 있습니다.
      }
    } catch (error) {
      console.error('Error occurred while making the request:', error);
    }
  };

  const goAlert = () =>
    Alert.alert( //여기서 'ㅎㅎㅎ'지우면 확인 누를 시 어플이 종료됩니다..
      "정말로 변경하시겠습니까?", "어쩔티비", [
        {
          text: "취소",
          onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        { text: "확인",
          onPress: handlePhonenumberChange, 
        },
      ],
      { cancelable: false }
    );

  getData();

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20, marginRight: width*0.25,}}>
        <Text style={styles.title}>앞으로 사용하실</Text>
        <Text style={styles.title}>새로운 연락처를 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="새로운 연락처(ex: 01012341234, 숫자만 입력)"
          placeholderTextColor="silver"
          value={newNumber}
          onChangeText={(text) => setNewNumber(text)}
          keyboardType="numeric"
        />

      </View>
        <TouchableOpacity style={[styles.buttonContainer, {marginTop: 10}]} onPress={goAlert}>
          <Text style={styles.buttonContainerText}>확인</Text>
        </TouchableOpacity>
    </View>
  );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.5,
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
    backgroundColor: '#141B38',
    paddingVertical: 17,
    paddingHorizontal: 20,
    padding: 5,
    width: width*0.8,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainerText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default Phonenumberchange;