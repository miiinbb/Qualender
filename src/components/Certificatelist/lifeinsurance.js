import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Linking, ScrollView } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
const insuranceImage1 = require("../../../assets/insurance4.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function Lifeinsurance({ navigation }) {
  const link = () => {
    Linking.openURL("https://www.in.or.kr/main/certification/agent/outline/outline.do");
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
            source={insuranceImage1}
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
    height: windowHeight * 1.3,
    aspectRatio: 0.8, // 이미지의 가로 세로 비율
    maxWidth: "100%",
    maxHeight: "200%",
    marginTop : -40, //보험대리점 이거랑 동일하게하자 
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

export default Lifeinsurance;
