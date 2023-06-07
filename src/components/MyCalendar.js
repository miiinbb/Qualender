//MyCalendar.js => 메인캘린더 담당
import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import { Calendar, LocaleConfig, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 import

LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
  };
LocaleConfig.defaultLocale = 'ko';

const COLORS = [
  '#FFC0CB', '#FFD700', '#00FFFF', '#008000', '#FF4500', '#8A2BE2',
  '#00BFFF', '#FF1493', '#FFA500', '#808080', '#008080', '#800080',
];

export default function MyCalendar() {
  // Declare and initialize selectedDay state variable
  //selectedDay는 상태함수
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [additionalModalVisible, setAdditionalModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const calendarRef = useRef(null); // Ref to access the Calendar component
  const [markedDates, setMarkedDates] = useState({});
  const [eventTitle, setEventTitle] = useState({}); // 일정 제목 상태 변수 추가
  const [colorIndex, setColorIndex] = useState(0); // 현재 색상 인덱스 상태 변수 추가
  
  const handleAddEventPress = () => {
    setAdditionalModalVisible(true);
    setDatePickerVisible(true);
  };

// DatePicker에서 선택한 시작 날짜와 종료 날짜를 처리하는 함수
const handleConfirmDatePicker = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const datesRange = getDatesRange(start, end);

  const updatedMarkedDates = { ...markedDates };

  // 기존에 설정된 marking을 유지한 채로 시작 날짜와 종료 날짜를 표시
  updatedMarkedDates[startDate] = { ...updatedMarkedDates[startDate], startingDay: true };
  updatedMarkedDates[endDate] = { ...updatedMarkedDates[endDate], endingDay: true };
  
  // 기존에 설정된 marking 초기화
  Object.keys(updatedMarkedDates).forEach((date) => {
    if (updatedMarkedDates[date].startingDay || updatedMarkedDates[date].endingDay) {
      delete updatedMarkedDates[date];
    }
  });

  // 시작 날짜와 종료 날짜를 표시
  updatedMarkedDates[startDate] = { 
    startingDay: true, endingDay: true, color: COLORS[colorIndex],
   };

  // 사이의 날짜를 표시
  datesRange.forEach((date) => {
    const dateString = formatDate(date);
    updatedMarkedDates[dateString] = { periods: [{ color: COLORS[colorIndex] }] };
  });

  setMarkedDates(updatedMarkedDates);
  setStartDate(null);
  setEndDate(null);
  setAdditionalModalVisible(false);
  // 다음 색상 인덱스로 업데이트
  setColorIndex((colorIndex + 1) % COLORS.length);
};

  // 시작 날짜부터 종료 날짜까지의 모든 날짜를 배열로 반환하는 함수
  const getDatesRange = (startDate, endDate) => {
    const datesRange = [];
    const currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      datesRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return datesRange;
  };

  // 날짜를 'yyyy-MM-dd' 형식의 문자열로 변환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 선택한 날짜
  const selectedDate = selectedDay ? new Date(selectedDay) : null;
  const selectedMonth = selectedDate ? selectedDate.getMonth() : null;

  // 오늘 날짜
  const DATE = new Date(); //오늘 날짜
  const YEAR = DATE.getFullYear();  //오늘 날짜의 연도
  const MONTH = DATE.getMonth() + 1;  //오늘 날짜의 월
  const DAY = DATE.getDate();  //오늘 날짜의 일
  const today = { year: YEAR, month: MONTH, date: DAY };
  const dateString = YEAR + '-' + MONTH  + '-' + DAY;

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setModalVisible(true);
  };
  const [currentMonth, setCurrentMonth] = useState('');

  // 현재 보이는 달(months)이 변경될 때 호출되는 콜백 함수
  const handleVisibleMonthsChange = (months) => {
    setCurrentMonth(months[0]);
  };
  return (
      <View style={{ height: 600, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Calendar
          ref={calendarRef}
          useNativeDriver={true} 
          monthFormat={'yyyy'+'년 '+'MM'+'월'}
          hideExtraDays={false}
          horizontal={true} //가로로 스와이프
          hideArrows={false}
          pagingEnabled={true} // 가로로 페이지 단위로 스와이프
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: Dimensions.get('window').height * 0.9, //화면비율설정
            width: Dimensions.get('window').width,
            fontFamily: 'System',
          }}
          onDayPress={handleDayPress} // 팝업 창을 열기 위한 이벤트 핸들러 추가
          markingType="multi-period"
          markedDates={markedDates}
          onVisibleMonthsChange={handleVisibleMonthsChange} // 현재 보이는 달(months)이 변경될 때 호출되는 콜백 함수
        />

      {/* 일정 추가 버튼 */}
      <TouchableOpacity
        onPress={handleAddEventPress}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'pink',
          padding: 10,
          borderRadius: 30,
          elevation: 5,
        }}
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); //닫기를 누르면 팝업창이 뜨지 않는 것
        }}
        transparent={true} //팝업창 배경을 투명하게 바꿔주는것
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {markedDates[selectedDay] && eventTitle ? ( // 수정: markedDates[selectedDay] 존재 여부를 확인하여 제목 표시 여부 결정
        <>
          <Text style={styles.modalTitle} numberOfLines={1}>
            {selectedDay}
          </Text>
          <Text style={styles.modalTitle} numberOfLines={1}>
            {eventTitle}
          </Text>
        </>
      ) : (
        <Text style={styles.modalTitle} numberOfLines={1}>
          {selectedDay}
        </Text>
      )}
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

      {/* 추가 모달 */}
      <Modal
        visible={additionalModalVisible}
        onRequestClose={() => {
          setAdditionalModalVisible(false);
        }}
        transparent={true}
      >
        {/* 추가 모달의 컨텐츠를 구현하세요 */}
        <View style={styles.additionalModalContainer}>
          <View style={styles.additionalModalContent}>
            <Text style={styles.additionalModalTitle}>일정 추가</Text>

          <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="일정 제목"
            value={eventTitle}
            onChangeText={setEventTitle}
            multiline={false}
            numberOfLines={1}
            maxLength={20}
          />
          </View>

            {datePickerVisible && ( // datePickerVisible이 true일 때만 DatePicker 컴포넌트를 표시
              <>
            <View style={styles.inputContainer}>
            <DatePicker
              style={[styles.datePicker, { marginTop: 0 }]} // marginTop 값을 0으로 설정
              date={startDate}
              mode="date"
              placeholder="시작 날짜"
              format="YYYY-MM-DD"
              minDate={dateString}
              maxDate="2024-06-30"
              confirmBtnText="확인"
              cancelBtnText="취소"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                dateInput: {
                  borderWidth: 0, // DatePicker 내부의 border 제거
                  padding: 0, // DatePicker 내부의 padding 제거
                  width: '100%', // DatePicker가 전체 너비를 차지하도록 설정
                  height: 40,
                  textAlign: 'left', // 텍스트를 왼쪽으로 정렬
                },  
              }}
              onDateChange={(date) => setStartDate(date)}
            />
            </View>

            <View style={styles.inputContainer}>
            <DatePicker
              style={[styles.datePicker, { marginTop: 0 }]} // marginTop 값을 0으로 설정
              date={endDate}
              mode="date"
              placeholder="종료 날짜"
              format="YYYY-MM-DD"
              minDate={startDate}
              maxDate="2024-06-30"
              confirmBtnText="확인"
              cancelBtnText="취소"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                dateInput: {
                  borderWidth: 0, // DatePicker 내부의 border 제거
                  padding: 0, // DatePicker 내부의 padding 제거
                  width: '100%', // DatePicker가 전체 너비를 차지하도록 설정
                  height: 40,
                  textAlign: 'left', // 텍스트를 왼쪽으로 정렬
                },
                confirmBtnContainer: {
                  position: 'absolute',
                  right: 70, // 확인 버튼 위치 조정
                },
                cancelBtnContainer: {
                  position: 'absolute',
                  right: 0, // 취소 버튼 위치 조정
                },
                btnTextConfirm: {
                  color: 'blue', // 확인 버튼 텍스트 색상 설정
                },
                btnTextCancel: {
                  color: 'red', // 취소 버튼 텍스트 색상 설정
                },
              }}
              onDateChange={(date) => setEndDate(date)}
            />
            </View>

          <TouchableOpacity
            onPress={() => handleConfirmDatePicker(startDate, endDate)}
            style={styles.additionalModalButton}
          >
            <Text style={styles.additionalModalButtonText}>확인</Text>
          </TouchableOpacity>
          </>
          )}

            <TouchableOpacity
              onPress={() => setAdditionalModalVisible(false)}
              style={styles.additionalModalButton}
            >
              <Text style={styles.additionalModalButtonText}>닫기</Text>
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
    maxHeight: '80%', // 추가된 속성
    maxWidth: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    maxHeight: '80%',
    maxWidth: '90%', // 추가된 속성
  },
  modalItem: {
    fontSize: 15,
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

  additionalModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  additionalModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxHeight: '80%', // 추가된 속성
    maxWidth: '90%',
    alignItems: 'center', // 버튼들을 수직 중앙 정렬
  },
  
  additionalModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    maxHeight: '80%',
    maxWidth: '90%', // 추가된 속성
  },
  additionalModalItem: {
    fontSize: 15,
    marginBottom: 10,
  },
  additionalModalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  additionalModalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 200, // 원하는 너비 설정
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});