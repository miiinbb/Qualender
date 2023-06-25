//Emailchange.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions, } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';

function Emailchange({ navigation }) {
  const [newEmail, setNewEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [domain, setDomain] = useState([
    { label: "naver.com", value: "@naver.com" },
    { label: "gmail.com", value: "@gmail.com" },
    { label: "daum.net", value: "@daum.net" },
  ]);

  const goAlert = () =>
    Alert.alert( //여기서 'ㅎㅎㅎ'지우면 확인 누를 시 어플이 종료됩니다..
      "정말로 변경하시겠습니까?", "저쩔냉장고", [
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
    <View style={styles.container}>
      <Text style={styles.title}>이메일 변경</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="새로운 이메일"
          placeholderTextColor="silver"
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
          secureTextEntry={true}
        />
        <Text style={[styles.atSymbol,{ fontSize: 20 }]}>@</Text>
        <Controller
        name="domain"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownDomain}>
            <DropDownPicker
              style={styles.dropbox} //main input field 모양
              open={open}
              value={value}
              items={domain}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setDomain}
              placeholder="도메인 선택"
              placeholderStyle={styles.placeholderStyles}
              onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="돌아가기" onPress={() => navigation.goBack()} />
        <Button title="확인" onPress={goAlert} />
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
    paddingBottom: height * 0.53,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  input: { //새로운 이메일 칸
    width: "43%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  atSymbol: { //@ 텍스트
    marginBottom:10,
    alignSelf: "center",
  },
  placeholderStyles: {
    color: "silver",
  },
  dropdownDomain: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropbox: {
    width: "43%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dropboxItem: {
    justifyContent: "flex-start"
  },
  dropboxDropdown: {
    borderColor: "gray",
    borderWidth: 1
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default Emailchange;