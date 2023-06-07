import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Favorites({ navigation }) {
  return (
    <View>
      <Text>즐겨찾기!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default Favorites;