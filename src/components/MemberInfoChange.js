//MemberInfoChange.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, } from 'react-native';
import { NavigationContainer,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function MemberInfoChange() {
  const navigation = useNavigation();

  const goToMain = () => {
    //navigation.navigate('MainCalendar');
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
    <View>
      {/* 비밀번호 변경 버튼 */}
      <TouchableOpacity
        style={[styles.memberInfoManagement, { backgroundColor: 'lightgrey' }]}
        onPress={handlePasswordchange}
      >
        <Text style={styles.memberInfoManagementText}>비밀번호 변경</Text>
      </TouchableOpacity>

      {/* 연락처 변경 버튼 */}
      <TouchableOpacity
        style={[styles.memberInfoManagement, { backgroundColor: 'lightgrey' }]}
        onPress={handlePhonenumberchange}
      >
        <Text style={styles.memberInfoManagementText}>연락처 변경</Text>
      </TouchableOpacity>

      {/* 이메일 변경 버튼 */}
      <TouchableOpacity
        style={[styles.memberInfoManagement, { backgroundColor: 'lightgrey' }]}
        onPress={handleEmailchange}
      >
        <Text style={styles.memberInfoManagementText}>이메일 변경</Text>
      </TouchableOpacity>

      {/* 회원 탈퇴 버튼 */}
      <TouchableOpacity
        style={[styles.memberInfoManagement, { backgroundColor: 'lightgrey' }]}
        onPress={handleMemberout}
      >
        <Text style={styles.memberInfoManagementText}>회원 탈퇴</Text>
      </TouchableOpacity>
      <Button
        title="메인캘린더로 돌아가기"
        onPress={() => goToMain()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    memberInfoManagement: { //'회원가입'버튼
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      borderColor: '#110746', // 테두리 색상 설정
      borderWidth: 2, // 테두리 두께 설정
      borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
      padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
    },
  
    memberInfoManagementText: {
    color: '#000000', //검은색으로 바꿈
      fontSize: 16,
      fontWeight: 'bold',
    },
    
  });

export default MemberInfoChange;