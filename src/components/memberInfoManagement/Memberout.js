import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Memberout({ navigation }) {
  return (
    <View>
      <Text>탈퇴하지 마세용....</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default Memberout;