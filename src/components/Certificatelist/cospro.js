import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, ScrollView } from "react-native";
const cosproImage1 = require("../../../assets/cospro1.png");
const cosproImage2 = require("../../../assets/cospro2.png");
const cosproImage3 = require("../../../assets/cospro3.png");
const cosproImage4 = require("../../../assets/cospro4.png");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Cospro({ navigation }) {
  const link = () => {
    Linking.openURL("https://www.ybmit.com/cos_pro/cos_pro_info.jsp");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>시험 상세 정보</Text>
          </View>
          <Image source={cosproImage1} style={styles.image} resizeMode="contain" />
          <Image source={cosproImage2} style={styles.image} resizeMode="contain" />
          <Image source={cosproImage3} style={styles.image} resizeMode="contain" />
          <Image source={cosproImage4} style={styles.image} resizeMode="contain" />
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
    height: windowHeight * 0.6,
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

export default Cospro;
