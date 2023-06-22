//Phonenumberchange.js
import React, { useState, } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

function Phonenumberchange({ navigation }) {
  const [newNumber, setNewNumber] = useState("");
    
  const goAlert = () =>
    Alert.alert( //여기서 'ㅎㅎㅎ'지우면 확인 누를 시 어플이 종료됩니다..
      "정말로 변경하시겠습니까?", "어쩔티비", [
        {
          text: "취소",
          onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        { text: "확인",
          onPress: () => console.log("연락처 변경 완료")},
      ],
      { cancelable: false }
    );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>연락처 변경</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="새로운 연락처"
          value={newNumber}
          onChangeText={(text) => setNewNumber(text)}
          secureTextEntry={true}
        />

      </View>
      <View style={styles.buttonContainer}>
        <Button title="돌아가기" onPress={() => navigation.goBack()} />
        <Button title="확인" onPress={goAlert} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
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
    flexDirection: "row",
  },
});

export default Phonenumberchange;