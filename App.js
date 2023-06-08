//App.js
import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
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

import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 import

const Stack = createStackNavigator();

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
  const navigation = useNavigation();
  const progress = useDrawerProgress();
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const handleLoginPress = () => {
    navigation.navigate(LoginPage);
  };

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
          {/* 헤더 부분 */}
          <View style={styles.headerContainer}>
          <Icon name="heart" size={24} color="pink" />
            <TouchableOpacity onPress={handleLoginPress}>
              <Text 
                style={{ marginBottom: 8, fontSize: 18, fontWeight: 'bold' }}>
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
      <Drawer.Screen name="마이캘린더" component={PersonalCalendar1} />
      <Drawer.Screen name="마이페이지" component={MyPage1} />
      {/* <Drawer.Screen name="LoginPage" component={LoginPage1}
        options={{ 
          headerShown: true,
          headerTitle: '로그인 페이지',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
          drawerLabel: () => null,
          activeTintColor: 'transparent',
          inactiveTintColor: 'transparent',
           }} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainCalendar" component={MainCalendar}>
        <Stack.Screen name="목록으로" component={MyDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage1} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="ObtainedList" component={ObtainedList} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="MemberInfoChange" component={MemberInfoChange} />
        <Stack.Screen name="Passwordchange" component={Passwordchange} />
        <Stack.Screen name="Phonenumberchange" component={Phonenumberchange} />
        <Stack.Screen name="Emailchange" component={Emailchange} />
        <Stack.Screen name="Memberout" component={Memberout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});