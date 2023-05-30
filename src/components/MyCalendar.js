//MyCalendar.js miiinbb branch code
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Calendar, LocaleConfig, CalendarList, Agenda } from 'react-native-calendars';
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';

LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
  };
LocaleConfig.defaultLocale = 'ko';

export default function MyCalendar() {
  // Declare and initialize selectedDay state variable
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // 오늘 날짜를 구하는 함수
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;


  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Calendar
          monthFormat={'yyyy'+'년 '+'MM'+'월'}
          horizontal={true} //가로로 스와이프
          hideArrows={false}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: Dimensions.get('window').height * 0.8, //화면비율설정
            width: Dimensions.get('window').width * 0.9,
            fontFamily: 'System',
          }}
          dayComponent={({ date, state }) => (
            //날짜를 선택하면 팝업창이 뜨고, 날짜를 선택하지 않으면 기본 캘린더가 보임
            <TouchableOpacity
              onPress={() => {
                if (state === 'disabled') {
                    // 전, 후 월의 날짜를 선택한 경우 해당 월로 이동
                    //selectedDay는 상태함수
                    const pressedDate = selectedDay || new Date();
                    const selectedMonth = date.month - 1; // 선택한 날짜의 전월로 이동
                    pressedDate.setMonth(selectedMonth);
                    setSelectedDay(pressedDate);
                } else {
                    setSelectedDay(date.dateString);
                }
                setModalVisible(true);

              }}
            >
              <View style={styles.dayContainer}>
              <View style={styles.dayTextContainer}>
              <Text
                style={[
                  styles.dayText,
                  state === 'disabled' && styles.disabledDayText,
                  date.dateString === dateString && styles.currentDate,
                ]}
              >
                {date.day}
              </Text>
              </View>
              </View>
            </TouchableOpacity>
          )}

          onDayPress={(day) => {
            console.log('selected day', day);
          }}
        />
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} //누르지 않았을 때는 팝업창이 뜨지 않는 것
        transparent={true} //팝업창 배경을 투명하게 바꿔주는것
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedDay} 📚 리스트</Text>
            <Text style={styles.modalItem}>{'펀드투자권유자문인력'}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

//화면 크기에 비례로 디자인 적용하기 위해 실행
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  //달력 맨 윗줄(sun mon...)과 첫 주 칸 조정
  headerContainer: {
    marginTop: -10, // 맨 윗줄과 첫 주 칸 간의 간격 조정
  },
  week: {
    marginBottom: -10, // 맨 윗줄과 첫 주 칸 간의 간격 조정
  },
  //일자 컨테이너 스타일 조정
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //칸 크기 조정하는 부분 padding
    paddingBottom: 40,
    paddingHorizontal: screenWidth*0.01,
    marginTop : 0,
    marginBottom: 0,
    borderColor: '#000', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께를 1로 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
  },
  dayTextContainer: {
    width: 30, // Adjust these values as per your design
    height: 30, // Adjust these values as per your design
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d094ea', // 테두리 색상 설정
    borderWidth: 2, // 테두리 두께를 1로 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
  },
  dayText: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'black',
  },
  disabledDayText: {
    color: 'lightgray',
  },
  currentDate: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'purple', // 테두리 색상 설정
    borderRadius: 5, // 테두리의 둥근 정도를 설정 (옵션)
    padding: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});