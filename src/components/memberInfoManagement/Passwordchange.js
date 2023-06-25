//Passwordchange.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

function Passwordchange({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      // 여기에서 비밀번호 변경 로직을 구현합니다.
      console.log("비밀번호 변경 완료");
      // 비밀번호 변경 후 다른 화면으로 이동하거나 알림 메시지를 보여줄 수 있습니다.
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
      // 비밀번호가 일치하지 않을 경우 알림 메시지를 보여줄 수 있습니다.
    }
  };

  const goAlert = () =>
    Alert.alert( //여기서 'ㅎㅎㅎ'지우면 확인 누를 시 어플이 종료됩니다..
      "정말로 변경하시겠습니까?", "깔깔마녀", [
        {
          text: "취소",
          onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        { text: "확인",
          onPress: () => console.log("비밀번호 변경 완료")},
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 변경</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="새로운 비밀번호"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
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

export default Passwordchange;