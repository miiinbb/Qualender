import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { NavigationContainer,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Memberout({ navigation }) {
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
          onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        { text: "확인",
          onPress: () => console.log("이메일 변경 완료")},
      ],
      { cancelable: false }
    );

  return (
    <View>
      <Text>탈퇴하지 마세용....</Text>
      <View style={styles.buttonContainer}>
        <Button title="뒤로" onPress={() => navigation.goBack()} />
        <Button title="확인" onPress={goAlert} />
      </View>
      <Button
        title="메인캘린더로 돌아가기"
        onPress={() => goToMain()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
});

export default Memberout;