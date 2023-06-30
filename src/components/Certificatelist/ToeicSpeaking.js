
import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, ScrollView } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
const ToeicSpeakingImage = require("../../../assets/toeicspeakinginfo.jpeg");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function ToeicSpeaking({ navigation }) {
  const link = () => {
    Linking.openURL("https://www.toeicswt.co.kr");
  };

 //줌기능
const [scale, setScale] = useState(1);

const onPinchGestureEvent = event => {
  if (event.nativeEvent.scale !== 0) {
    setScale(event.nativeEvent.scale);
  }
};

const onPinchHandlerStateChange = event => {
  if (event.nativeEvent.oldState === State.ACTIVE) {
    setScale(prevScale => Math.max(1, prevScale));
  }
};

return (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>시험 상세 정보</Text>
        </View>
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
        >
          <Image
            source={ToeicSpeakingImage}
            style={[
              styles.image,
              {
                transform: [
                  {
                    scale: scale,
                  },
                ],
              },
            ]}
            resizeMode="contain"
          />
        </PinchGestureHandler>
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
    height: windowHeight * 3.0,
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
    marginBottom: 0,
  },
  buttonText: {
    alignSelf: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ToeicSpeaking;
