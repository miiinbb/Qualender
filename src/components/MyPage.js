//Mypage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KakaoLoginButton } from '@react-native-seoul/kakao-login';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyPage ({ onLogin, onBack, onSignup }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Add isSignup state variable


  const handleBack = () => {
    onBack(); // 뒤로가기 버튼이 눌렸을 때 onBack 함수 호출
  };

  const clickObtained = () => {
    navigation.navigate('ObtainedList'); // 회원가입 페이지로 이동
  };

  const clickFavorites = () => {
    navigation.navigate('Favorites'); // 즐겨찾기로 이동
  };

  const clickMemberInfoChange = () => {
    navigation.navigate('MemberInfoChange'); // 회원정보변경으로 이동
  };

  const handleSignup = () => {
    onSignup(); // 회원가입 버튼이 눌렸을 때 onSignup 함수 호출
  };

  const handleTogglePage = () => {
    setIsSignup(!isSignup); // Toggle between login and signup pages
  };

  // Render SignupPage if isSignup is true
  if (isSignup) {
    return <SignupPage onSignup={handleTogglePage} onBack={handleBack} />;
  }

  return (
    <View style={styles.outerContainer}>
      {/* 제목 */}
      <Text style={styles.title}>마이페이지</Text>

      <View style={styles.innerContainer}>
        {/* 즐겨찾기 메뉴 버튼 */}
        <View style={styles.favorites}>
          <Button title="즐겨찾기" onPress={clickFavorites} />
        </View>  

        {/* 취득한자격증 메뉴 버튼 */}
        <View style={styles.ObtainedList}>
          <Button title="취득한 자격증" onPress={clickObtained} />
        </View>        
      </View>

      {/* 회원정보변경 메뉴 버튼 */}
      <View style={styles.ObtainedList}>
        <Button title="회원정보 변경" onPress={clickMemberInfoChange} />
      </View> 
    </View>
  );
};

//화면 크기에 비례로 디자인 적용하기 위해 실행
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  outerContainer: { //하늘색 부분
    flex: 1,
    //position: 'absolute',
    //margintop: screenHeight*0.5,
    //marginbottom: screenHeight*0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5bd1d7', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  title: {//'마이페이지'이라고 적혀있는 부분
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderColor: '#c6beee', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  innerContainer:{ //즐겨찾기랑 취득한자격증 버튼을 포함하는 영역
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: '#FFDAB9', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  favorites:{//즐겨찾기 메뉴 버튼
    backgroundColor: '#c6beee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#9eeb47', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  ObtainedList:{//취득한자격증 메뉴 버튼
    backgroundColor: '#ADD8E6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#9eeb47', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },
  
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

export default MyPage;