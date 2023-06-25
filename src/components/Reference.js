//MyCalendar.js => 메인캘린더 담당
import _ from 'lodash';
import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Platform, Button, TextInput,Dimensions, View, Text,   Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar, LocaleConfig, CalendarList, Agenda} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import Calendar from '../react-native-calendars/src/calendar/index'
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 라이브러리 import

const boxNames = [ //자격증 리스트
{ label: "펀드투자권유자문인력", value: "펀드투자권유자문인력" },
{ label: "파생상품투자권유자문인력", value: "파생상품투자권유자문인력" },
{ label: "생명보험대리점", value: "생명보험대리점" },
{ label: "제3보험", value: "제3보험" },
{ label: "손해보험대리점", value: "손해보험대리점" },
{ label: "신용분석사", value: "신용분석사" },
{ label: "ADsP", value: "ADsP" },
{ label: "SQLD", value: "SQLD" },
{ label: "COS", value: "COS" },
{ label: "COS PRO", value: "COS PRO" },
{ label: "토익", value: "토익" },
{ label: "토스", value: "토스" },
];
const COLORS = [
    "#B8A6DF", // Pale Purple
    "#F791B6", // Soft Pink
    "#89CDD9", // Pale Aqua
    "#FBA58D", // Coral
    "#9ED6A1", // Pale Green
    "#FFB884", // Apricot
    "#FAC98A", // Peach
    "#CDA2D9", // Lavender
    "#9BCBF6", // Powder Blue
    "#FFCFA6", // Pale Orange
    "#FFC107", // Amber
    "#C4E9B5", // Pale Greenish
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedCertificates, setSelectedCertificates] = useState([]); // 선택한 자격증 이름들을 저장할 상태 변수
  const handleCertificateSelect = (selectedValue) => {
    setEventTitle(selectedValue); // 선택한 자격증명을 eventTitle 상태로 설정
  
    if (selectedDay) {
      const updatedCertificateEvents = { ...certificateEvents };
  
      if (!updatedCertificateEvents[selectedDay]) {
        updatedCertificateEvents[selectedDay] = [];
      }
  
      // 선택한 자격증 명을 해당 날짜의 일정에 추가
      updatedCertificateEvents[selectedDay].push(selectedValue);
  
      setCertificateEvents(updatedCertificateEvents);
    }
  };
  const [certificateEvents, setCertificateEvents] = useState({});
  
  
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

  const colorPosition = Object.values(updatedMarkedDates).length > 0
    ? Object.values(updatedMarkedDates)[0].periods.length
    : 0;


  // 사이의 날짜를 표시
  datesRange.forEach((date) => {
    const dateString = formatDate(date);
    if (!updatedMarkedDates[dateString]) {
      updatedMarkedDates[dateString] = { periods: [] };
    }
    
    for (let i = updatedMarkedDates[dateString].periods.length; i < colorPosition; i++) {
      updatedMarkedDates[dateString].periods.push({ color: 'transparent' });
    }

    updatedMarkedDates[dateString].periods.push({ color: COLORS[colorIndex] });
  });

  setMarkedDates(updatedMarkedDates);
  setStartDate(null);
  setEndDate(null);
  setAdditionalModalVisible(false);
  // 다음 색상 인덱스로 업데이트
  setColorIndex((colorIndex + 1) % COLORS.length);
};


  return (
      <View style={{ height: 600, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            setModalVisible(false);
        }}
        transparent={true}
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle} numberOfLines={1}>
                {selectedDay}
            </Text>
            {markedDates[selectedDay] && eventTitle ? (
                <>
                {Object.keys(markedDates[selectedDay]).map((key, index) => (
                    <Text key={index} style={styles.modalItem}>
                    {markedDates[selectedDay][key].map((period, periodIndex) => (
                        <Text
                        key={periodIndex}
                        style={{ backgroundColor: period.color, padding: 2 }}
                        >
                        {period.title}
                        </Text>
                    ))}
                    </Text>
                ))}
                </>
            ) : null}
            
            {selectedDay && certificateEvents[selectedDay] ? (
                <View style={styles.modalCertificateList}>
                <Text style={styles.modalCertificateListTitle}>자격증 목록</Text>
                {certificateEvents[selectedDay].map((certificate, index) => (
                    <Text key={index} style={styles.modalCertificateListItem}>
                    {certificate}
                    </Text>
                ))}
                </View>
            ) : null}
            
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

            <View style={[styles.inputTitleContainer, { marginTop: 10, zIndex: 100 }]}>
            <DropDownPicker
            open={open}
            value={eventTitle} // eventTitle 상태 값을 value prop에 설정
            setValue={(selectedValue) => handleCertificateSelect(selectedValue)}
            items={boxNames.map((name, index) => ({
                label: name.label,
                value: name.value,
            }))}
            setOpen={setOpen}
            placeholder="자격증 선택"
            containerStyle={{ height: 40, width: '100%', zIndex: 100 }}
            style={{ backgroundColor: '#fafafa' }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            />
            </View>

            {datePickerVisible && ( // datePickerVisible이 true일 때만 DatePicker 컴포넌트를 표시
              <>
            <View style={[styles.inputContainer, { marginBottom: 10 }]}>
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
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    padding: 5,
    width: 290, // 원하는 너비 설정
    height: 50,
  },
  inputTitleContainer: {
    height: 60, // 적절한 높이로 설정
    // 추가적인 스타일 속성들
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});