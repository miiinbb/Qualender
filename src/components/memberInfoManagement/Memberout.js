import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions, } from "react-native";
import { NavigationContainer,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Memberout({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const goAlert = () =>
    Alert.alert( //여기서 'ㅎㅎㅎ'지우면 확인 누를 시 어플이 종료됩니다..
      "정말로 탈퇴하실 것입니까?", "제발", [
        {
          text: "취소",
          onPress: () => console.log('회원탈퇴 취소'),
          style: "cancel",
        },
        { text: "탈퇴하기",
          onPress: () => console.log("회원탈퇴 완료")},
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 탈퇴</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          placeholder="기존 비밀번호"
          placeholderTextColor="silver"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor="silver"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button title="돌아가기" onPress={() => navigation.goBack()} /> */}
        <Button title="탈퇴하기" onPress={goAlert} color="silver" />
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
    // flexDirection: "row",
    backgroundColor: '#17375E',
    paddingVertical: 3,
    paddingHorizontal: 20,
    padding: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Memberout;