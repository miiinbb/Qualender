import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Phonenumberchange({ navigation }) {
  return (
    <View>
      <Text>전화번호 변경!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default Phonenumberchange;