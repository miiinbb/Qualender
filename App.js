//App.js
import React, {useState,useEffect,useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import 'react-native-gesture-handler';
import AuthContext from './src/components/AuthContext';
import { UserProvider } from './src/components/UserContext'; // 추가된 부분
import { AuthContextProvider } from './src/components/AuthContext';
import MyCalendar from './src/components/MyCalendar';
import PersonalCalendar from './src/components/PersonalCalendar';
import LoginPage from './src/components/Login_page';
import SignupPage from './src/components/SignupPage';
import MyPage from './src/components/MyPage';
import ObtainedList from './src/components/ObtainedList';
import Favorites from './src/components/Favorites';
import MemberInfoChange from './src/components/MemberInfoChange';
import Passwordchange from './src/components/memberInfoManagement/Passwordchange';
import Phonenumberchange from './src/components/memberInfoManagement/Phonenumberchange';
import Emailchange from './src/components/memberInfoManagement/Emailchange';
import Memberout from './src/components/memberInfoManagement/Memberout';
import Toeic from './src/components/Certificatelist/Toeic';
import ToeicSpeaking from './src/components/Certificatelist/ToeicSpeaking';
import Adsp from './src/components/Certificatelist/Adsp';
import Cos from './src/components/Certificatelist/Cos';
import Cospro from './src/components/Certificatelist/Cospro';
import Credit from './src/components/Certificatelist/Credit';
import Derived from './src/components/Certificatelist/Derived';
import Fund from './src/components/Certificatelist/Fund';
import Lifeinsurance from './src/components/Certificatelist/Lifeinsurance';
import Nonlifeinsurance from './src/components/Certificatelist/Nonlifeinsurance';
import Sqld from './src/components/Certificatelist/Sqld';
import Thirdinsurance from './src/components/Certificatelist/Thirdinsurance';
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 import


const Stack = createStackNavigator();

//기능명은 main, js명은 my
function MainCalendar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, userNickname, updateNickname, signOut } = useContext(AuthContext);
  // const [userNickname, setUserNickname] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setIsLoggedIn(true);
          updateNickname(value); // Use the `updateNickname` function to update the user's nickname
          // console.log("룰루랄라",userNickname)
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [updateNickname]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
      <MyCalendar userNickname={userNickname}/>
    </View>
  );
}

//기능명은 personal1, js명은 personal
function PersonalCalendar1() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PersonalCalendar/>
    </View>
  );
}
 
function MyPage1() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MyPage />
    </View>
  );
}

function LoginPage1({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoginPage />
    </View>
  );
}

function CustomDrawerContent(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState('');
  const navigation = useNavigation();
  const progress = useDrawerProgress();
  const { user,setUser,signOut } = useContext(AuthContext); // AuthContext 추가
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setIsLoggedIn(true);
          setUserNickname(value);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    getData();
  }, []);
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('username');
  //     if (value !== null) {
  //       console.log("getData", value);
  //       setUserNickname(value);
  //       return value;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleLoginPress = () => {
    navigation.navigate(LoginPage);
  };

  const handleLogoutPress = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: handleLogoutConfirm },
      ],
      { cancelable: false }
    );
  };
  

  const handleLogoutConfirm = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      signOut();
      setUserNickname('');
      console.log('로그아웃 되었습니다.');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('로그아웃 에러:', error);
    }
  };

  // getData();

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
          {/* 헤더 부분 */}
          <View style={styles.headerContainer}>
          <Icon name="heart" size={24} color="pink" />
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={{ marginBottom: 8, fontSize: 18, fontWeight: 'bold' }}>
              {isLoggedIn ?  `안녕하세요, ${userNickname}님` : '로그인을 해주세요.'}
            </Text>
          </TouchableOpacity>
          </View>
          <DrawerItemList {...props} />
            { isLoggedIn && (
            <DrawerItem
              label="로그아웃"
              onPress={handleLogoutPress}
              icon={({ color, size }) => (
                <Icon name="sign-out" color={color} size={size} />
              )}
              />
            )}
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='메인캘린더'
      useLegacyImplementation
      //drawer 오른쪽 방향으로 바꾸는 코드..이지만 실행하면 뭔가 충돌나서 일단 멈춤
      //screenOptions={{drawerPosition: 'right'}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="메인퀄린더"
        component={MainCalendar}
        options={{
          headerShown: true,
          headerTitle: '메인퀄린더',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Drawer.Screen name="마이퀄린더" component={PersonalCalendar1} />
      <Drawer.Screen name="마이페이지" component={MyPage1} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [userNickname, setUserNickname] = useState('');
  const [data, setData] = useState(''); // 새로운 useState 추가

  const signIn = async (userInfo) => {
    // 로그인 처리 로직
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const signOut = async () => {
    try {
      // AsyncStorage에서 사용자 정보 제거
      await AsyncStorage.removeItem('userInfo');
      // 사용자 상태를 null로 설정
      setUser(null);
    } catch (error) {
      console.log('로그아웃 에러:', error);
    }
  };

  useEffect(() => {
    // AsyncStorage에서 사용자 정보를 가져와서 로그인 상태를 설정
    const getUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          setUser(userInfo);
        }
      } catch (error) {
        console.log('사용자 정보 가져오기 실패:', error);
      }
    };
    getUserInfo();
  }, []);

  console.log('유저 정보:', userNickname);
  console.log('checking:',userNickname);
  return (
    <AuthContextProvider value={{ user, setUser, signIn, signOut }}>
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainCalendar" component={MainCalendar}>
        <Stack.Screen name="뒤로" component={MyDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="MainCalendar" component={MyDrawer} options={{headerShown: false, title:'뒤로'}}/>
        <Stack.Screen name="LoginPage" component={LoginPage1} options={{title:'로그인'}}/>
        <Stack.Screen name="SignupPage" component={SignupPage} options={{title:'회원가입'}}/>
        <Stack.Screen name="ObtainedList" component={ObtainedList} options={{title:'취득한 자격증'}}/>
        <Stack.Screen name="Favorites" component={Favorites} options={{title:'즐겨찾기'}}/>
        <Stack.Screen name="MemberInfoChange" component={MemberInfoChange} options={{title:'회원정보 변경'}}/>
        <Stack.Screen name="Passwordchange" component={Passwordchange} options={{title:'비밀번호 변경'}}/>
        <Stack.Screen name="Phonenumberchange" component={Phonenumberchange} options={{title:'연락처 변경'}}/>
        <Stack.Screen name="Emailchange" component={Emailchange} options={{title:'이메일 변경'}}/>
        <Stack.Screen name="Memberout" component={Memberout} options={{title:'회원 탈퇴'}}/>
        <Stack.Screen name="Toeic" component={Toeic} options={{title:'토익'}}/>
        <Stack.Screen name="ToeicSpeaking" component={ToeicSpeaking} options={{title:'토익 스피킹'}}/>
        <Stack.Screen name="Adsp" component={Adsp} options={{title:'데이터분석준전문가(ADsP)'}}/>
        <Stack.Screen name="Cos" component={Cos} options={{title:'COS'}}/>
        <Stack.Screen name="Cospro" component={Cospro} options={{title:'COS PRO'}}/>
        <Stack.Screen name="Credit" component={Credit} options={{title:'신용분석사'}}/>
        <Stack.Screen name="Derived" component={Derived} options={{title:'파생상품투자권유자문인력'}}/>
        <Stack.Screen name="Fund" component={Fund} options={{title:'펀드투자권유자문인력'}}/>
        <Stack.Screen name="Lifeinsurance" component={Lifeinsurance} options={{title:'생명보험대리점'}}/>
        <Stack.Screen name="Nonlifeinsurance" component={Nonlifeinsurance} options={{title:'손해보험대리점'}}/>
        <Stack.Screen name="Sqld" component={Sqld} options={{title:'SQLD'}}/>
        <Stack.Screen name="Thirdinsurance" component={Thirdinsurance} options={{title:'제3보험'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});