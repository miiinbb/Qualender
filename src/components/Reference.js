// MyCalendar.js(copy본. 이전버전)
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'ko';

export default function MyCalendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month + '-' + day;

  const eventDates = {
    '2023-05-03': { events: ['fund event', 'coding event'], color: 'blue' },
    '2023-05-04': { events: ['fund event', 'coding event'], color: 'blue' },
    '2023-05-05': { events: ['fund event', 'coding event'], color: 'blue' },
    '2023-05-06': { events: ['fund event', 'coding event'], color: 'blue' },
    '2023-05-07': { events: ['coding event'], color: 'red' },
  };

  const renderEventLine = (date) => {
    const isFundEventDay = date.dateString >= '2023-05-03' && date.dateString <= '2023-05-06';
    const isCodingEventDay = date.dateString >= '2023-05-03' && date.dateString <= '2023-05-07';
  
    if (isFundEventDay && isCodingEventDay) {
      return (
        <View style={styles.eventContainer}>
          <Text style={[styles.eventText, styles.fundEventText]}>Fund</Text>
          <Text style={[styles.eventText, styles.codingEventText]}>Coding</Text>
          <View style={[styles.eventLine, styles.fundEventLine]} />
          <View style={[styles.eventLine, styles.codingEventLine]} />
        </View>
      );
    } else if (isFundEventDay) {
      return (
        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>Fund</Text>
          <View style={[styles.eventLine, styles.fundEventLine]} />
        </View>
      );
    } else if (isCodingEventDay) {
      return (
        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>Coding</Text>
          <View style={[styles.eventLine, styles.codingEventLine]} />
        </View>
      );
    }
  
    return null;
  };
  const handleSaveEvent = () => {
    // 여기에 일정 추가 또는 수정하는 코드를 작성합니다.
    // 예시로 선택한 일자와 입력한 내용을 콘솔에 출력하는 코드를 작성했습니다.
    console.log('Selected Day:', selectedDay);
    console.log('Event Text:', eventText);
    
    setModalVisible(false); // 모달 창을 닫습니다.
  };
  
  const onDayPress = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setModalVisible(false);
    setStartDate(null);
    setEndDate(null);
    setSelectedEvent(null);
  };

  const onSave = () => {
    // 이 부분은 저장 버튼을 눌렀을 때 동작할 코드입니다.
    console.log('Save button is pressed.');
    console.log('Selected day:', selectedDay);
    console.log('Start date:', startDate);
    console.log('End date:', endDate);
    console.log('Selected event:', selectedEvent);
    closeModal();
  };

  const handleAddEvent = () => {
    setModalVisible(true);
    setSelectedDay(null);
    setStartDate(null);
    setEndDate(null);
    setSelectedEvent(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        
        <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      {selectedDay && (
        <Text style={styles.selectedDate}>{selectedDay?.dateString || ''}</Text>
      )}

      {!selectedDay && (
        <View style={styles.datePickerContainer}>
          <Text style={styles.pickerLabel}>Start Date:</Text>
          <DatePicker
            date={startDate}
            mode='date'
            format='YYYY-MM-DD'
            minDate={dateString}
            maxDate='2023-12-31'
            onDateChange={(date) => setStartDate(date)}
            style={styles.datePicker}
          />
        </View>
      )}

      {!selectedDay && (
        <View style={styles.datePickerContainer}>
          <Text style={styles.pickerLabel}>End Date:</Text>
          <DatePicker
            date={endDate}
            mode='date'
            format='YYYY-MM-DD'
            minDate={startDate}
            maxDate='2023-12-31'
            onDateChange={(date) => setEndDate(date)}
            style={styles.datePicker}
          />
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      <Calendar
        monthFormat={'yyyy' + '년 ' + 'MM' + '월'}
        horizontal={true}
        hideArrows={true}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: Dimensions.get('window').height * 0.8,
          width: Dimensions.get('window').width * 0.9,
          fontFamily: 'monospace',
        }}
        dayComponent={({ date, state }) => (
          <TouchableOpacity
            onPress={() => {
              state === 'disabled' ? null : setSelectedDay(date.dateString);
              setModalVisible(true);
            }}
          >
            <View style={styles.dayContainer}>
              <View style={styles.dayTextContainer}>
                <Text
                  style={[
                    styles.dayText,
                    state === 'disabled' && styles.disabledDayText,
                    state === 'selected' && styles.selectedDayText,
                    date.dateString === dateString && styles.currentDate,
                  ]}
                >
                  {date.day}
                </Text>
                {renderEventLine(date)} {/* 일정 선 표시 */}
              </View>
            </View>
          </TouchableOpacity>
        )}
        markedDates={{
          '2023-05-03': { marked: true, dotColor: 'transparent', selectedColor: 'transparent' },
          '2023-05-04': { marked: true, dotColor: 'transparent', selectedColor: 'transparent' },
          '2023-05-05': { marked: true, dotColor: 'transparent', selectedColor: 'transparent' },
          '2023-05-06': { marked: true, dotColor: 'transparent', selectedColor: 'transparent' },
          '2023-05-07': { marked: true, dotColor: 'transparent', selectedColor: 'transparent' },
        }}
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
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

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: screenWidth * 0.01,
    marginTop: 0,
    marginBottom: 0,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  dayTextContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d094ea',
    borderWidth: 2,
    borderRadius: 5,
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
    backgroundColor: 'purple',
    borderRadius: 5,
    padding: 5,
  },
  eventContainer: {
    position: 'absolute',
    top: 30,
    bottom: -30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventLine: {
    flex: 1,
    height: 10,
    width: 110,
  },
  fundEventLine: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: '50%',
    backgroundColor: 'green',
  },
  codingEventLine: {
    position: 'absolute',
    flex: 1,
    top: '50%',
    bottom: 0,
    backgroundColor: 'pink',
  },
  eventText: {
    marginLeft: 10,
    fontSize: 10,
    position: 'absolute',
    zIndex: 1,
  },

  fundEventText: {
    bottom: '50%', // 필요한 위치 조정값을 설정해주세요.
  },
  codingEventText: {
    top: '50%', // 필요한 위치 조정값
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
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'purple',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },
  eventPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
  },
  pickerDropdown: {
    marginTop: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  pickerDropdownText: {
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePicker: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  saveButton: {
    backgroundColor: 'blue',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
