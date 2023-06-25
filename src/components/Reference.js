//Mypage.js

function MyPage ({ onLogin, onBack, onSignup }) {



  return (
    <View style={styles.outerContainer}>
      {/* 아이디 버튼 */}
      <View style={styles.iconID}>
        <Icon name="github" size={40} color="purple" style={styles.icon} />
        <TouchableOpacity onPress={() => console.log('ID Pressed')}>
          <Text style={styles.idText}>아이디</Text>
        </TouchableOpacity>
      </View> </View>

  );
};

//화면 크기에 비례로 디자인 적용하기 위해 실행
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  outerContainer: { //하늘색 부분
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'center',
    //alignItems: 'center',
    borderColor: '#5bd1d7', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5, // 테두리와 내부 요소 간의 간격 설정 (옵션)
  },

  iconID: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#9eeb47',
    borderWidth: 2,
    marginTop: 1,
    marginBottom: 10, // 아이디 박스와 다른 버튼 간의 간격 조정
  },
  icon: {
    marginRight: 10, // 아이콘과 텍스트 사이 간격을 조정
  },
  idText: {
    fontSize: 20,
    textAlign: 'left',
    alignItems: 'center'
  },
  
});

export default MyPage;