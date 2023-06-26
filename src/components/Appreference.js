//Emailchange.js
function Emailchange() {
  const [newEmail, setNewEmail] = useState("");
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [domain, setDomain] = useState([
    { label: "naver.com", value: "@naver.com" },
    { label: "gmail.com", value: "@gmail.com" },
    { label: "daum.net", value: "@daum.net" },
    { label: "직접 입력", value: " " },
  ]);

  const goAlert = () =>
    Alert.alert(...);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이메일 변경</Text>
      <View style={styles.inputContainer}>
        <TextInput
        />
        <Text style={[styles.atSymbol,{ fontSize: 20 }]}>@</Text>
        <TextInput
        />
      </View>
      <Controller
        name="domain"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownDomain}>
            <DropDownPicker
              style={styles.dropbox} //main input field 모양
              open={open}
              value={value}
              items={domain}
              setOpen={setOpen}
              setValue={onChange}
              setItems={setDomain}
              placeholder="도메인 선택"
              placeholderStyle={styles.placeholderStyles}
              // zIndex={3000}
              // zIndexInverse={1000}
              // containerStyle={styles.dropbox} //dropdown 컨테이너 모양
              itemStyle={styles.dropboxItem} //dropdown list의 내용의 모양
              dropDownStyle={styles.dropboxDropdown} //dropdown list가 열렸을 때의 모양
              onChangeItem={(item) => setSelectedDomain(item.value)}
            />
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        {/* <Button title="돌아가기" onPress={() => navigation.goBack()} /> */}
        <Button title="확인" onPress={goAlert} color="white"/>
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
    paddingBottom: height * 0.53,
    backgroundColor: 'white',
  },
  title: {...},
  inputContainer: {...  },
  input:{...},
  atSymbol: {...},
  placeholderStyles: {
    color: "silver",
    marginHorizontal: 10,
    zIndex: 3000,
  },
  dropdownDomain: { //도메인 선택 칸과 드롭박스가 함께 포함
    marginHorizontal: 10,
    width: "80%",
    marginBottom: 25,
    bordercolor: "salmon",
  },
  dropbox: { //'도메인 선택' 칸
    width: "100%",
    height: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 0,
    // textAlign: 'center',
  },
  dropboxItem: {
    justifyContent: "flex-start",
    zIndex: 3,
  },
  dropboxDropdown: {
    borderColor: "gray",
    borderWidth: 1
  },
  buttonContainer: {...},
  
});

export default Emailchange;