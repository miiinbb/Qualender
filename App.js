//App.js
import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import 'react-native-gesture-handler';
import MyCalendar from './src/components/MyCalendar';
import PersonalCalendar from './src/components/PersonalCalendar';
import LoginPage from './src/components/Login_page'; // 파일의 상대 경로로 Login_page를 가져옴
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 import

//기능명은 main, js명은 my
function MainCalendar() {  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MyCalendar />
    </View>
  );
}

//기능명은 personal1, js명은 personal
function PersonalCalendar1() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PersonalCalendar />
    </View>
  );
}

function Mypage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mypage Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const progress = useDrawerProgress();
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

function AddEventScreen() {
  const [eventTitle, setEventTitle] = useState('');
  const handleAddEvent = () => {
    // 이곳에서 일정을 추가하는 로직을 구현합니다.
    // 예를 들어, 서버에 일정을 저장하거나 상태를 업데이트하는 등의 작업을 수행합니다.
    console.log('일정 추가:', eventTitle);
    setEventTitle('');
  }};
  
const navigation = useNavigation();

const handleLoginPress = () => {
  navigation.navigate('LoginPage'); // Replace 'Login' with the actual screen name for the login page
};

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
          {/* 헤더 부분 */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Icon name="heart" size={24} color="pink" />
          <TouchableOpacity onPress={handleLoginPress}>
          <Text
            style={{ marginBottom: 8, fontSize: 18, fontWeight: 'bold' }}
          >
            로그인을 해주세요.
          </Text>
          </TouchableOpacity>
          </View>
        <DrawerItemList {...props} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="메인캘린더"
        component={MainCalendar}
        options={{
          headerShown: true,
          headerTitle: '메인캘린더',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Drawer.Screen name="마이캘린더" component={PersonalCalendar} />
      <Drawer.Screen name="마이페이지" component={Mypage} />
      <Drawer.Screen name="로그인페이지" component={LoginPage} options={{ drawerLabel: () => null }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}