//Mypage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, useWindowDimensions, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KakaoLoginButton } from '@react-native-seoul/kakao-login';
import { NavigationContainer,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator();

function MyPage ({ onLogin, onBack, onSignup }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Add isSignup state variable

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
      {/* 아이디 버튼 */}
      <View style={styles.iconID}>
        <Icon name="github" size={40} color="purple" style={styles.icon} />
        <TouchableOpacity onPress={() => console.log('ID Pressed')}>
          <Text style={styles.idText}>팀퀄린더_아이디</Text>
        </TouchableOpacity>
      </View> 
      <View style={styles.innerContainer}>
        {/* 즐겨찾기 메뉴 버튼 */}
        <View style={styles.favorites}>
          <TouchableOpacity onPress={() => {clickFavorites(); console.log('Favorites Pressed');}}>
            <Text style={styles.favText}>즐겨찾기</Text>
            <Text/><Text/>
            <Text style={styles.favNum}>⭐️  3개</Text>
          </TouchableOpacity>
        </View>  

        {/* 취득한자격증 메뉴 버튼 */}
        <View style={styles.ObtainedList}>
          <TouchableOpacity onPress={() => {clickObtained(); console.log('Obtained Pressed');}}>
            <Text style={styles.obtText}>취득한 자격증</Text>
            <Text/><Text/>
            <Text style={styles.obtNum}>❤️  5개</Text>
          </TouchableOpacity>
        </View>        
      </View>

      {/* 회원정보변경 메뉴 버튼 */}
      <View style={styles.memberInfoManagement}>
        <Button title="회원정보 변경" onPress={clickMemberInfoChange} />
      </View> 

      <View style={styles.backToMain}>
        <Button
          title="메인캘린더로 돌아가기"
          onPress={() => goToMain()}
        />
      </View> 
    </View>
  );
};

//화면 크기에 비례로 디자인 적용하기 위해 실행
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  outerContainer: { //하늘색 부분
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'center',
    //alignItems: 'center',
    borderColor: '#5bd1d7', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  iconID: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#9eeb47',
    borderWidth: 2,
    marginTop: 1,
    marginBottom: 10, // 아이디 박스와 다른 버튼 간의 간격 조정
  },
  icon: {
    marginRight: 10, // 아이콘과 텍스트 사이 간격을 조정
  },
  idText: {
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 10,
  },

  innerContainer:{ //즐겨찾기랑 취득한자격증 버튼을 포함하는 영역
    flexDirection: 'row',
    height: height*0.2,
    borderRadius: 5,
    borderColor: '#FFDAB9', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 2, // 테두리와 내부 요소 간의 간격 설정 (옵션)
    marginBottom: 10,
  },

  favorites:{//즐겨찾기 메뉴 버튼
    width: width*0.44,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#c6beee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  favText:{//즐겨찾기텍스트
    fontSize: 23,
    backgroundColor: '#E0FFFF',
    textAlign: 'center',
  },
  favNum:{//즐겨찾기 갯수
    fontSize: 17,
    backgroundColor: '#FDEDEC',
    textAlign: 'center',
  },

  ObtainedList:{//취득한자격증 메뉴 버튼
    width: width*0.44,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#ADD8E6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  obtText:{//취득한 텍스트
    fontSize: 23,
    backgroundColor: '#E0FFFF',
    textAlign: 'center',
  },
  obtNum:{//취득한 갯수
    fontSize: 17,
    backgroundColor: '#FDEDEC',
    textAlign: 'center',
  },
  memberInfoManagement: { //'회원정보변경'버튼
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#F0FFF0',
    marginBottom: 10,
  },

  memberInfoManagementText: {
    color: '#000000', //검은색으로 바꿈
    fontSize: 16,
    fontWeight: 'bold',
  },

  backToMain:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FDEDEC',
    marginBottom: 300,
  }
  
});

export default MyPage;