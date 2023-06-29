//MemberInfoChange.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, } from 'react-native';
import { NavigationContainer,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 import

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

    <View style={styles.container}>
      <View style={styles.outerBox}>
        {/* 비밀번호 변경 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handlePasswordchange}
        >
        <View style={styles.memberInfoManagementContainer}>
          <Icon name="lock" size={23} color="black" />
          <Text style={[styles.memberInfoManagementText, { marginLeft: 20 }]}>비밀번호 변경</Text>
        </View>
        </TouchableOpacity>

        {/* 연락처 변경 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handlePhonenumberchange}
        >
        <View style={styles.memberInfoManagementContainer}>
          <Icon name="phone" size={23} color="black" />
          <Text style={[styles.memberInfoManagementText, { marginLeft: 20 }]}>연락처 변경</Text>
        </View>
        </TouchableOpacity>

        {/* 이메일 변경 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handleEmailchange}
        >
        <View style={styles.memberInfoManagementContainer}>
          <Icon name="envelope" size={23} color="black" />
          <Text style={[styles.memberInfoManagementText, { marginLeft: 20 }]}>이메일 변경</Text>
        </View>
        </TouchableOpacity>

        {/* 회원 탈퇴 버튼 */}
        <TouchableOpacity
          style={[styles.memberInfoManagement,]}
          onPress={handleMemberout}
        >
        <View style={styles.memberInfoManagementContainer}>
          <Icon name="user-circle" size={23} color="black" />
          <Text style={[styles.memberInfoManagementText, { marginLeft: 20 }]}>회원 탈퇴</Text>
        </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.gotomainButton, {marginTop: 10}]} onPress={goToMain}>
        <Text style={styles.gotomainButtonText}>메인캘린더로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}



const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  memberInfoManagementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    height: height,
  },

  outerBox: { //변경 버튼 4개 들어있는 박스
    height: height*0.25,
    marginTop: height*0.01,
    marginBottom: height*0.5,
    width:"100%",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  memberInfoManagement: { //각 변경 버튼
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  memberInfoManagementText: {
    color: '#000000', //검은색으로 바꿈
    fontSize: 20,
  },
  
  gotomainButton: {
    backgroundColor: '#141B38',
    paddingVertical: 17,
    paddingHorizontal: 20,
    padding: 5,
    width: width*0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  gotomainButtonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'normal',
  },

  });

export default MemberInfoChange;