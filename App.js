//App.js
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import LoginPage from './src/components/Login_page'; // 파일의 상대 경로로 Login_page를 가져옴
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 import

function MainCalendar() {  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MyCalendar />
    </View>
  );
}

function MyCalendar2() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MyCalendar Screen</Text>
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

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
          {/* 헤더 부분 */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Icon name="heart" size={24} color="pink" />
          <Text
            style={{ marginBottom: 8, fontSize: 18, fontWeight: 'bold' }}
            onPress={() => navigation.navigate('LoginPage')} // 스크린 이름으로 수정
          >
            로그인을 해주세요.
          </Text>
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
      <Drawer.Screen name="마이캘린더" component={MyCalendar2} />
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