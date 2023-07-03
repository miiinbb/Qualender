//Favorites
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Favorites() {
  const [selectedFavoritesBoxes, setselectedFavoritesBoxes] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        console.log("getData", value);
        setUsername(value);
        // 즐겨찾기 목록 가져오기
        const response = await fetch('http://172.30.1.44:3000/getFavoritesBoxes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: value }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.selectedFavoritesBoxes);
          setselectedFavoritesBoxes(result.selectedFavoritesBoxes);
        } else {
          console.error('Network response was not ok.');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    const data = { username: username, selectedFavoritesBoxes : selectedFavoritesBoxes };

    try {
      const response = await fetch('http://172.30.1.44:3000/saveFavoritesBoxes', {
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
    const isSelected = selectedFavoritesBoxes.includes(name);
    if (isSelected) {
      // Remove the box from selected boxes
      setselectedFavoritesBoxes(selectedFavoritesBoxes.filter((boxName) => boxName !== name));
    } else {
      // Add the box to selected boxes
      setselectedFavoritesBoxes([...selectedFavoritesBoxes, name]);
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

  const handleSaveButtonPress = () => {
    handleSave();
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
      <Text style={styles.title}>{username}</Text>
        <Text style={styles.title}>🐣 즐겨찾기한 자격증 🐣</Text>
        {boxNames.map((name, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.box,
              selectedFavoritesBoxes.includes(name) ? { backgroundColor: boxColors[index] } : { backgroundColor: "lightgray" },
            ]}
            onPress={() => handleBoxPress(name)}
          >
            <Text
              style={[
                styles.boxText,
                selectedFavoritesBoxes.includes(name) ? styles.selectedBoxText : styles.unselectedBoxText,
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.saveButton, { marginTop: 10 }]} onPress={handleSaveButtonPress}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  boxContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'space-evenly',
  },
  box: {
    width: width * 0.84,
    height: height * 0.047,
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
    marginBottom: height * 0.02,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default Favorites;