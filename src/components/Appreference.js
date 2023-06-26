//Emailchange.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions, } from "react-native";
import { Picker, } from "@react-native-picker/picker";
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';

function Emailchange() {
  const [newEmail, setNewEmail] = useState("");
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [domain, setDomain] = useState([
    { label: "naver.com", value: "@naver.com" },
    { label: "gmail.com", value: "@gmail.com" },
    { label: "daum.net", value: "@daum.net" },
    { label: "직접 입력", value: " " },
  ]);

  const goAlert = () =>
    Alert.alert( //여기서 ""지우면 확인 누를 시 어플이 종료됩니다..
      "정말로 변경하시겠습니까?", "", [
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
        <TextInput
          style={styles.input}
          placeholder="도메인 주소"
          placeholderTextColor="silver"
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
          secureTextEntry={true}
        />
      </View>
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
              setValue={onChange}
              setItems={setDomain}
              placeholder="도메인 선택"
              placeholderStyle={styles.placeholderStyles}
              // zIndex={3000}
              // zIndexInverse={1000}
              // containerStyle={styles.dropbox} //dropdown 컨테이너 모양
              itemStyle={styles.dropboxItem} //dropdown list의 내용의 모양
              dropDownStyle={styles.dropboxDropdown} //dropdown list가 열렸을 때의 모양
              onChangeItem={(item) => setSelectedDomain(item.value)}
            />
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        {/* <Button title="돌아가기" onPress={() => navigation.goBack()} /> */}
        <Button title="확인" onPress={goAlert} color="white"/>
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
    backgroundColor: 'white',
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
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  atSymbol: { //@ 텍스트
    marginBottom:10,
    alignSelf: "center",
  },
  placeholderStyles: {
    color: "silver",
    marginHorizontal: 10,
    zIndex: 3000,
  },
  dropdownDomain: { //도메인 선택 칸과 드롭박스가 함께 포함
    marginHorizontal: 10,
    width: "80%",
    marginBottom: 25,
  },
  dropbox: { //'도메인 선택' 칸
    width: "100%",
    height: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 0,
    alignItems: "center",
  },
  dropboxItem: {
    justifyContent: "flex-start",
    zIndex: 3,
  },
  dropboxDropdown: {
    borderColor: "gray",
    borderWidth: 1
  },
  buttonContainer: {
    // flexDirection: "row",
    backgroundColor: '#17375E',
    paddingVertical: 5,
    paddingHorizontal: 20,
    padding: 5,
    width: 200,
    alignItems: "center",
    zIndex: -1,
  },
  
});

export default Emailchange;