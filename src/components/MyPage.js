//Mypage.js 
//자동업데이트 가능 구현 중. 일단 코드 하나로 합침
import React, {useState,useEffect,useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Button, useWindowDimensions, } from 'react-native';
import { useFocusEffect,useNavigation, CommonActions, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';
import IP from '../data/IP';
import { imagePaths } from '../data/imagePaths';
import { imagePaths2 } from '../data/imagePaths2';

const Stack = createStackNavigator();

function MyPage ({ onLogin, onBack, onSignup }) {
  const navigation = useNavigation();
  const [isSignup, setIsSignup] = useState(false); // Add isSignup state variable
  const { user, updateNickname } = useContext(AuthContext);
  const [userNickname, setUserNickname] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [counted, setCounted] = useState(0);
  const [counted2, setCounted2] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const getData = async () => {
    // const data = { username: username };
    let count = 0;
    let count2 = 0;
    try {
      const usernameValue = await AsyncStorage.getItem('username');
      if (usernameValue !== null) {
        const data = { username: username };
        setIsLoggedIn(true);
        setUsername(usernameValue); // username 값 설정
        // 사용자 정보 요청
        const response = await fetch(`http://${IP}:3000/userinfo`, {
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
          setUserNickname(result.data.nickname); // userNickname 상태를 업데이트합니다.
        } else {
          console.error('네트워크 오류');
        }
      } else {
        setIsLoggedIn(false);
        setUserNickname('');
        console.error('사용자 정보 없음');
      }
    } catch (e) {
      console.log(e);
    }
    return [count, count2];
  };

  // const getUserInfo = async () => {
  //   const data = { username: username };
  //   let count = 0;
  //   let count2 = 0;
  //   try {
  //     const response = await fetch(`http://${IP}:3000/favorites`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       count = result.data.selectedFavorites.length;
  //       count2 = result.data.selectedObtained.length;
  //       console.log(result.message);
  //       console.log(result.data);
  //       // console.log('즐겨찾기 개수: ' +count);
  //       // console.log('취득자격 개수: ' +count2);
  //       setUserNickname(result.data.nickname);

  //     } else {
  //       console.error('Network response was not ok.');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred while making the request:', error);
  //   }
  //   return [count, count2];
  // };

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const [count, count2] = await getData();
        setCounted(count);
        setCounted2(count2);
        const { width, height } = Dimensions.get('window');
        const maxWidth = width * 0.08;
        const maxHeight = height * 0.04;
        setImageSize({ width: maxWidth, height: maxHeight });
      };
      fetchData();
    }, [navigation])
  );
  
  console.log('외부에서 사용할 count 값:', counted);

  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const randomPath = imagePaths[randomIndex];

  const randomIndex2 = Math.floor(Math.random() * imagePaths2.length);
  const randomPath2 = imagePaths2[randomIndex2];

  return (
    <View style={styles.outerContainer}>
      {/*닉네임 버튼 */}
      <View style={styles.iconID}>
        <Image source={randomPath} style={[styles.image, imageSize]} resizeMode="contain" />
        <TouchableOpacity onPress={() => console.log(userNickname,'ID Pressed')}>
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
            <Text style={[styles.favNum]}><Icon name="star" size={24} color="orange" /> {counted}개</Text>
            
          </TouchableOpacity>
        </View>  

        {/* 취득한자격증 메뉴 버튼 */}
        <View style={styles.ObtainedList}>
          <TouchableOpacity onPress={() => {clickObtained(); console.log('Obtained Pressed');}}>
            <Text style={styles.obtText}>취득한 자격증</Text>
            <Text/><Text/>
            <Text style={[styles.obtNum]}><Icon name="heart" size={24} color="red" /> {counted2}개</Text>
          </TouchableOpacity>
        </View>        
      </View>

      <View>
        <Image source={randomPath2} style={[styles.image2]} resizeMode="contain" />
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

  iconID: { //아이콘과 아이디가 들어있는 부분
    flexDirection: 'row',
    backgroundColor:  '#FFF6B5',
    marginTop: -30,
    marginVertical: 20,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth:2,
    borderColor:'#17375E',
    width: width*0.9,
  },
  image: {
    marginRight: 10, // 아이콘과 텍스트 사이 간격을 조정
  },
  idText: {
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 10,
    // color : '#17375E',
    fontWeight: 'bold',
  },

  innerContainer:{ //즐겨찾기랑 취득한자격증 버튼을 포함하는 영역
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: height*0.2,
    marginBottom: height*0.14,
  },

  favorites:{//즐겨찾기 메뉴 버튼
    width: width*0.44,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'mistyrose',
    borderWidth: 2,
    borderColor: '#17375E',
    borderRadius: 5,
  },
  favText:{//즐겨찾기텍스트
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  favNum:{//즐겨찾기 갯수
    fontSize: 19,
    textAlign: 'center',
    color : '#17375E',
    fontWeight: 'bold',
  },

  ObtainedList:{//취득한자격증 메뉴 버튼
    width: width*0.44,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'mintcream',
    borderWidth: 2,
    borderColor: '#17375E',
    borderRadius: 5,
  },
  obtText:{//취득한 텍스트
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  obtNum:{//취득한 갯수
    fontSize: 19,
    textAlign: 'center',
    color : '#17375E',
    fontWeight: 'bold',
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
  color: '#000000', //검은색으로 바꿈
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
  image2: {
    width: width * 0.9, // 이미지의 가로 크기 조정
    height: height * 0.2, // 이미지의 세로 크기 조정
    marginLeft: width * 0.03,
    marginBottom: height * 0.01,
  },
  
});

export default MyPage;