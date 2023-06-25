//Passwordchange.js

function Passwordchange({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 변경</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          style={styles.input}
          placeholder="새로운 비밀번호"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="돌아가기" onPress={() => navigation.goBack()} />
        <Button title="확인" onPress={goAlert} />
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default Passwordchange;