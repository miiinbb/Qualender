import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, ScrollView } from "react-native";
const ToeicSpeakingImage = require("../../../assets/toeicspeakinginfo.jpeg");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function ToeicSpeaking({ navigation }) {
  const link = () => {
    Linking.openURL("https://www.toeicswt.co.kr");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>시험 상세 정보</Text>
          </View>
          <Image source={ToeicSpeakingImage} style={styles.image} resizeMode="contain" />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={link}>
          <Text style={styles.buttonText}>시험 접수</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 50,
  },
  image: {
    width: windowWidth * 1.2, // 이미지 너비를 화면 너비의 90%로 설정
    height: windowHeight * 2.6,
    aspectRatio: 0.8, // 이미지의 가로 세로 비율
    maxWidth: "100%",
    maxHeight: "200%",
  },
  titleContainer: {
    backgroundColor: "#000000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: -20,
    // marginBottom: 10,
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: '#17375E',
    paddingVertical: 17,
    paddingHorizontal: 20,
    padding: 5,
    width: windowWidth*0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default ToeicSpeaking;
