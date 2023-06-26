//Favorites.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Favorites({ navigation }) {
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const handleSave = async () => {
    // const username = '제발요'; // 실제 사용자명 값으로 변경
    const data = { username, selectedBoxes };
  
    try {
      const response = await fetch('http://192.168.0.29:3000/saveBoxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error occurred while making the request:', error);
    }
  };

  const handleBoxPress = (name) => {
    const isSelected = selectedBoxes.includes(name);
    if (isSelected) {
      // Remove the box from selected boxes
      setSelectedBoxes(selectedBoxes.filter((boxName) => boxName !== name));
    } else {
      // Add the box to selected boxes
      setSelectedBoxes([...selectedBoxes, name]);
    }
  };

  const boxNames = [ //자격증 리스트
    "펀드투자권유자문인력",
    "파생상품투자권유자문인력",
    "생명보험대리점",
    "제3보험",
    "손해보험대리점",
    "신용분석사",
    "ADsP",
    "SQLD",
    "COS",
    "COS PRO",
    "토익",
    "토스",
  ];

  const boxColors = [  // 색상 리스트
    "#B8A6DF", // Pale Purple
    "#F791B6", // Soft Pink
    "#89CDD9", // Pale Aqua
    "#FBA58D", // Coral
    "#9ED6A1", // Pale Green
    "#FFB884", // Apricot
    "#FAC98A", // Peach
    "#CDA2D9", // Lavender
    "#9BCBF6", // Powder Blue
    "#FFCFA6", // Pale Orange
    "#FFC107", // Amber
    "#C4E9B5", // Pale Greenish
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐣 즐겨찾기한 자격증 🐣</Text>
      <View style={styles.boxContainer}>
        {boxNames.map((name, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.box,
              selectedBoxes.includes(name) ? { backgroundColor: boxColors[index] } : { backgroundColor: "lightgray" },
            ]}
            onPress={() => handleBoxPress(name)}
          >
            <Text
              style={[
                styles.boxText,
                selectedBoxes.includes(name) ? styles.selectedBoxText : styles.unselectedBoxText,
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>

        ))}
      </View>
      <TouchableOpacity style={[styles.saveButton, {marginTop: 10}]} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: -20,
  },
  boxContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 40,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    fontSize: 16,
  },
  selectedBoxText: {
    color: "black",
  },
  unselectedBoxText: {
    color: "white",
  },
  saveButton: {
    backgroundColor: '#17375E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 5,
    width: 100,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default Favorites;