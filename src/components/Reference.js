//MyPage.js
import React, {useState,useEffect,useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, useWindowDimensions, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';
import IP from '../data/IP';

const Stack = createStackNavigator();

function MyPage ({ onLogin, onBack, onSignup }) {
  const navigation = useNavigation();
  const [isSignup, setIsSignup] = useState(false); // Add isSignup state variable
  const { user, updateNickname } = useContext(AuthContext);
  const [userNickname, setUserNickname] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.log("getData", value);
        setUsername(value);
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log('유저 정보:', username);
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

  const handleTogglePage = () => {
    setIsSignup(!isSignup); // Toggle between login and signup pages
  };

  // Render SignupPage if isSignup is true
  if (isSignup) {
    return <SignupPage onSignup={handleTogglePage} onBack={handleBack} />;
  }

  const [counted, setCounted] = useState(0);
  const [counted2, setCounted2] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setUsername(value);
          return value;
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    const getUserInfo = async () => {
      const data = { username: username };
      let count = 0;
      let count2 = 0;
      try {
        const response = await fetch(`http://${IP}:3000/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const result = await response.json();
          count = result.data.selectedFavorites.length;
          count2 = result.data.selectedObtained.length;
          console.log(result.message);
          console.log(result.data);
          // console.log('즐겨찾기 개수: ' +count);
          // console.log('취득자격 개수: ' +count2);
        } else {
          console.error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error occurred while making the request:', error);
      }
      return [count, count2];
    };

    getData();
    getUserInfo().then(counted => {
      setCounted(counted[0]);
      setCounted2(counted[1]);
    });
  },[navigation]);
  console.log('외부에서 사용할 count 값:', counted);

  return (
    <View style={styles.outerContainer}>
      {/*닉네임 버튼 */}
      <View style={styles.iconID}>
        <Icon name="github" size={40} color="purple" style={styles.icon} />
        <TouchableOpacity onPress={() => console.log('ID Pressed')}>
          <Text style={styles.idText}>{isLoggedIn ?  `${userNickname}님 반갑습니다` : '로그인을 해주세요.'}</Text>
        </TouchableOpacity>
      </View> 
      {/* console.log(user) */}
      <View style={styles.innerContainer}>
        {/* 즐겨찾기 메뉴 버튼 */}
        <View style={[styles.favorites, {marginRight: 10}]}>
          <TouchableOpacity onPress={() => {clickFavorites(); console.log('Favorites Pressed');}}>
            <Text style={styles.favText}>즐겨찾기</Text>
            <Text/><Text/>
            <Text style={[styles.favNum, {textDecorationLine: 'underline'}]}>⭐️ {counted}개</Text>
          </TouchableOpacity>
        </View>  

        {/* 취득한자격증 메뉴 버튼 */}
        <View style={styles.ObtainedList}>
          <TouchableOpacity onPress={() => {clickObtained(); console.log('Obtained Pressed');}}>
            <Text style={styles.obtText}>취득한 자격증</Text>
            <Text/><Text/>
            <Text style={[styles.obtNum, {textDecorationLine: 'underline'}]}>❤️ {counted2}개</Text>
          </TouchableOpacity>
        </View>        
      </View>

      {/* 회원정보변경 메뉴 버튼 */}
      <TouchableOpacity style={[styles.memberInfoManagement]} onPress={clickMemberInfoChange}>
        <Text style={styles.gotomainButtonText}>회원정보 변경</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.gotomainButton, {marginTop: 10}]} onPress={goToMain}>
        <Text style={styles.gotomainButtonText}>메인캘린더로 돌아가기</Text>
      </TouchableOpacity>
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
    backgroundColor: 'white',
    alignItems: 'center',
    // borderColor: '#5bd1d7', // 테두리 색상 설정
    // borderWidth: 2, // 테두리 두께 설정
    // borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    // padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  iconID: { //아이콘과 아이디가 들어있는 부분분
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: -60,
    marginVertical: 20,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderRadius: 5,
    borderWidth:1,
    borderColor:'lightgray',
    width: width*0.9,
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
    justifyContent: 'space-evenly',
    height: height*0.2,
    marginBottom: height*0.33,
  },

  favorites:{//즐겨찾기 메뉴 버튼
    width: width*0.44,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'mistyrose',
    borderWidth: 2,
    borderColor: '#17375E',
  },
  favText:{//즐겨찾기텍스트
    fontSize: 23,
    textAlign: 'center',
  },
  favNum:{//즐겨찾기 갯수
    fontSize: 17,
    textAlign: 'center',
  },

  ObtainedList:{//취득한자격증 메뉴 버튼
    width: width*0.44,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'mintcream',
    borderWidth: 2,
    borderColor: '#17375E',
  },
  obtText:{//취득한 텍스트
    fontSize: 23,
    textAlign: 'center',
  },
  obtNum:{//취득한 갯수
    fontSize: 17,
    textAlign: 'center',
  },
  memberInfoManagement: { //'회원가입'버튼
    backgroundColor: '#17375E',
    paddingVertical: 17,
    paddingHorizontal: 20,
    padding: 5,
    width: width*0.9,
    alignItems: "center",
    justifyContent: "center",
  },

  memberInfoManagementText: {
  color: '#000000',
    fontSize: 20,
  },
  
  gotomainButton: {
    backgroundColor: '#17375E',
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

export default MyPage;
