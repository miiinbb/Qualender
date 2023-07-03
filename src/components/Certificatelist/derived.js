import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, ScrollView } from "react-native";
const derivedImage1 = require("../../../assets/derived1.jpeg");
const derivedImage2 = require("../../../assets/derived2.jpeg");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Derived({ navigation }) {
  const link = () => {
    Linking.openURL("https://license.kofia.or.kr/examInfo/examYearly.do");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>시험 상세 정보</Text>
          </View>
          <Image source={derivedImage1} style={styles.image} resizeMode="contain" />
          <Image source={derivedImage2} style={styles.image} resizeMode="contain" />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={link}>
          <Text style={styles.buttonText}>자격증 사이트로 이동</Text>
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
    width: windowWidth, // 이미지 너비를 화면 너비의 90%로 설정
    height: windowHeight * 1.8,
    aspectRatio: 0.8, // 이미지의 가로 세로 비율
    maxWidth: "100%",
    maxHeight: "200%",
  },
  titleContainer: {
    backgroundColor: "#17375E",
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
    marginTop: 20,
    width: windowWidth * 0.9,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: '#17375E',
    paddingVertical: 17,
    paddingHorizontal: 20,
    padding: 5,
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 17,
    color: 'white',
    fontWeight: 'normal',
  },
});

export default Derived;
