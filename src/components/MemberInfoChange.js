//MemberInfoChange.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, } from 'react-native';
import { NavigationContainer,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function MemberInfoChange() {
  const navigation = useNavigation();

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

  const handlePasswordchange = () => {
    navigation.navigate('Passwordchange');
  };

  const handlePhonenumberchange = () => {
    navigation.navigate('Phonenumberchange');
  };

  const handleEmailchange = () => {
  navigation.navigate('Emailchange');
  };

  const handleMemberout = () => {
    navigation.navigate('Memberout');
    };
  
  return (
    <View >
      <View style={styles.outerBox}>
        {/* 비밀번호 변경 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handlePasswordchange}
        >
          <Text style={styles.memberInfoManagementText}>- 비밀번호 변경</Text>
        </TouchableOpacity>

        {/* 연락처 변경 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handlePhonenumberchange}
        >
          <Text style={styles.memberInfoManagementText}>- 연락처 변경</Text>
        </TouchableOpacity>

        {/* 이메일 변경 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handleEmailchange}
        >
          <Text style={styles.memberInfoManagementText}>- 이메일 변경</Text>
        </TouchableOpacity>

        {/* 회원 탈퇴 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handleMemberout}
        >
          <Text style={styles.memberInfoManagementText}>- 회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="메인캘린더로 돌아가기" color='black'
        onPress={() => goToMain()}
      />
    </View>
  );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  outerBox: { //변경 버튼 4개 들어있는 박스
    height: height*0.25,
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: 5,
  },

  memberInfoManagement: { //'회원가입'버튼
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  memberInfoManagementText: {
  color: '#000000', //검은색으로 바꿈
    fontSize: 17,
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
    
  });

export default MemberInfoChange;