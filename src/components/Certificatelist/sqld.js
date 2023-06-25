import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, ScrollView } from "react-native";
const sqldImage1 = require("../../../assets/sqld1.jpeg");
const sqldImage2 = require("../../../assets/sqld2.jpeg");
const sqldImage3 = require("../../../assets/sqld3.jpeg");
const sqldImage4 = require("../../../assets/sqld4.jpeg");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Sqld({ navigation }) {
  const link = () => {
    Linking.openURL("https://www.dataq.or.kr/www/sub/a_04.do");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>시험 상세 정보</Text>
          </View>
          <Image source={sqldImage1} style={styles.image} resizeMode="contain" />
          <Image source={sqldImage2} style={styles.image} resizeMode="contain" />
          <Image source={sqldImage3} style={styles.image} resizeMode="contain" />
          <Image source={sqldImage4} style={styles.image} resizeMode="contain" />
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
    width: windowWidth, // 이미지 너비를 화면 너비의 90%로 설정
    height: windowHeight * 2,
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
    marginTop: 20,
    width: windowWidth * 0.8,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Sqld;
