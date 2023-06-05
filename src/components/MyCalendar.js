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

  const handleAddEventPress = () => {
    setAdditionalModalVisible(true);
  };

  const handleConfirmDatePicker = (startDate, endDate) => {
    // 선택한 날짜를 처리합니다.
    setStartDate(startDate);
    setEndDate(endDate);
    setDatePickerVisible(false);
  
    // 선택한 날짜로 일정을 추가하는 로직을 구현합니다.
    console.log('일정 추가:', startDate, endDate);
  
    // 분홍색 선을 그리는 작업을 수행합니다.
    const markedDates = { ...calendarRef.current.state.markedDates };
    const start = moment(startDate).format('YYYY-MM-DD');
    const end = moment(endDate).format('YYYY-MM-DD');
    const datesRange = moment.range(start, end);
  
    for (let date of datesRange.by('day')) {
      const dateString = date.format('YYYY-MM-DD');
      const periods = markedDates[dateString]?.periods || [];
      periods.push({ color: '#FFC0CB' }); // 분홍색 선 추가
      markedDates[dateString] = { periods };
    }
  
    calendarRef.current.setMarkedDates(markedDates);
  
    // 필요한 작업을 수행합니다.
  };

const handleCancelDatePicker = () => {
  // 날짜 선택 취소 시 모달을 닫습니다.
  setDatePickerVisible(false);

  // 선택된 날짜의 분홍색 선을 제거합니다.
  const markedDates = { ...calendarRef.current.state.markedDates };
  const start = moment(selectedStartDate).format('YYYY-MM-DD');
  const end = moment(selectedEndDate).format('YYYY-MM-DD');
  const datesRange = moment.range(start, end);

  for (let date of datesRange.by('day')) {
    const dateString = date.format('YYYY-MM-DD');
    const periods = markedDates[dateString]?.periods || [];
    periods.pop();
    markedDates[dateString] = { periods };
  }

    calendarRef.current.setMarkedDates(markedDates);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleDatePress = (day) => {
    setSelectedDay(day.dateString);
    setAdditionalModalVisible(true);
  };

  <Calendar ref={calendarRef}/>

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
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Calendar
          useNativeDriver={true} 
          monthFormat={'yyyy'+'년 '+'MM'+'월'}
          hideExtraDays={false}
          horizontal={true} //가로로 스와이프
          hideArrows={false}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: Dimensions.get('window').height * 0.8, //화면비율설정
            width: Dimensions.get('window').width * 0.9,
            fontFamily: 'System',
          }}
          onDayPress={handleDayPress} // 팝업 창을 열기 위한 이벤트 핸들러 추가
          markingType="multi-period"
          markedDates={{
            '2023-06-01': {
              periods: [
                { startingDay: true, endingDay: true, color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
              ]
            },
            '2023-06-02': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
              ]
            },
            '2023-06-03': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
                { startingDay: true, endingDay: true, color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-04': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
                { color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-05': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
                { color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-06': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
              ]
            },
            '2023-06-07': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
              ]
            },
            '2023-06-08': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
              ]
            },
            '2023-06-09': {
              periods: [
                { color: '#5f9ea0' }, // 6월 1일부터 15일까지의 period
              ]
            },
            '2023-06-10': {
              periods: [
                { startingDay: true, endingDay: true, color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-11': {
              periods: [
                { color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-12': {
              periods: [
                { color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-13': {
              periods: [
                { color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-14': {
              periods: [
                { color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-15': {
              periods: [
                { startingDay: true, endingDay: true, color: '#ffa500' }, // 6월 3일부터 10일까지의 period
              ]
            },
            '2023-06-16': {
              periods: [
                { color: '#f0e68c' }, // 6월 18일부터 30일까지의 period
              ]
            },
            '2023-06-17': {
              periods: [
                { color: '#f0e68c' }, // 6월 18일부터 30일까지의 period
              ]
            },
            '2023-06-18': {
              periods: [
                { startingDay: true, endingDay: false, color: '#f0e68c' }, // 6월 18일부터 30일까지의 period
              ]
            },
            '2023-06-19': {
              periods: [
                { color: '#f0e68c' }, // 6월 18일부터 30일까지의 period
              ]
            },
            '2023-06-20': {
              periods: [
                { color: '#f0e68c' }, // 6월 18일부터 30일까지의 period
              ]
            },
            '2023-06-21': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-22': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-23': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-24': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-25': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-26': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-27': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-28': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-29': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
            '2023-06-30': {
              periods: [
                { color: '#ffa500' }, 
              ]
            },
          }}
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
      
      {/* 여기 */}

      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); //닫기를 누르면 팝업창이 뜨지 않는 것
        }}
        transparent={true} //팝업창 배경을 투명하게 바꿔주는것
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle} numberOfLines={1}>{selectedDay} 📚 리스트</Text>
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
            <Text style={styles.additionalModalTitle}>추가 모달</Text>
            
            {datePickerVisible && ( // datePickerVisible이 true일 때만 DatePicker 컴포넌트를 표시
              <>
              <DatePicker
                selected={startDate}
                onDateChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholder="시작 날짜"
              />
              <DatePicker
                selected={endDate}
                onDateChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholder="종료 날짜"
              />
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

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});