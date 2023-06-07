import React from "react";
import { View, Text, Button, } from "react-native";
import { NavigationContainer,useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function ObtainedList({ navigation }) {
  return (
    <View>
      <Text>취득한 자격증!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("MyCalendar")}
      />
    </View>
  );
}

export default ObtainedList;