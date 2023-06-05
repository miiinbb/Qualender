//App.js
import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
  const navigation = useNavigation();
  const progress = useDrawerProgress();
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const handleLoginPress = () => {
    navigation.navigate('LoginPage');
  };

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
          {/* 헤더 부분 */}
          <View style={styles.headerContainer}>
          <Icon name="heart" size={24} color="pink" />
          <TouchableOpacity onPress={handleLoginPress}>
          <Text name="LoginPage" component={LoginPage}
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
      <Drawer.Screen name="마이캘린더" component={PersonalCalendar} />
      <Drawer.Screen name="마이페이지" component={Mypage} />
      <Drawer.Screen name="LoginPage" component={LoginPage} 
        options={{ 
          drawerLabel: () => null,
          activeTintColor: 'transparent',
          inactiveTintColor: 'black',
           }} />
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

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});