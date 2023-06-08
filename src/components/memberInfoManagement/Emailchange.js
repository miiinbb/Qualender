import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Emailchange({ navigation }) {
  return (
    <View>
      <Text>e-mail 변경!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default Emailchange;