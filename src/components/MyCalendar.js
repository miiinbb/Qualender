import _ from 'lodash';
import React from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import {add, sub } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ITEMS from './Items';
import styles, { getTheme } from '../styles/calendar'
import { boxNames, boxColors, months, day, shortday } from '../data/data';


import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: months,
  monthNamesShort: months,
  dayNames: day,
  dayNamesShort: shortday,
  today: "오늘"
};

LocaleConfig.defaultLocale = 'fr';


const Stack = createStackNavigator();
// const today = new Date().toISOString().split('T')[0];
const today = new Date();
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

const renderItem = ({ item }) => {
  const navigation = useNavigation(); // navigation 객체 얻기

  if (_.isEmpty(item)) {
    return renderEmptyItem();
  }

  const itemPressed = (item) => {
    // 아이템 선택 시 동작 처리
    // 아이템마다 다른 JavaScript 파일로 페이지 전환을 수행합니다.
    switch (item.title) {
      case '토익':
        navigation.navigate('Toeic');
        break;
      case '토스':
        navigation.navigate('ToeicSpeaking');
        break;
      case '펀드투자권유자문인력':
        navigation.navigate('Fund');
        break;
      case '파생상품투자권유자문인력':
        navigation.navigate('Derived');
        break;
      case '생명보험대리점':
        navigation.navigate('Lifeinsurance');
        break;
      case '제3보험':
        navigation.navigate('Thirdinsurance');
        break;
      case '손해보험대리점':
        navigation.navigate('Nonlifeinsurance');
        break;     
      case '신용분석사':
        navigation.navigate('Credit');
        break;
      case 'ADsP':
        navigation.navigate('Adsp');
        break;
      case 'SQLD':
        navigation.navigate('Sqld');
        break;
      case 'COS':
        navigation.navigate('Cos');
        break; 
      case 'COS PRO':
        navigation.navigate('Cospro');
        break;
      default:
        // 처리할 아이템이 없을 경우에 대한 동작
        break;
    }
  };

  const circleColor = boxColors[boxNames.indexOf(item.title) % boxColors.length]; // 변경된 부분

  return (
    <TouchableOpacity
      onPress={() => itemPressed(item)}
      style={[styles.item, { backgroundColor: 'white' }]}
    >
      <View style={[styles.circle, { backgroundColor: circleColor }]} />
      <View>
        <Text style={styles.itemtestatus}>{item.teststatus}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const renderEmptyItem = () => {
  return (
    <View style={styles.emptyItem}>
      <Text style={styles.emptyItemText}>No Events Planned 😴</Text>
    </View>
  );
};
// const getDatesInRange = (startDate, endDate) => {
//   const dates = [];
//   const currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// };

const getMarkedDates = () => {
  const marked = {};

  ITEMS.forEach((item) => {
    if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
      const dots = item.data.map((dataItem, index) => ({
        key: index.toString(),
        color: boxColors[boxNames.indexOf(dataItem.title) % boxColors.length],
      }));
      const periods = item.data.map((dataItem, index) => ({
        key: index.toString(),
        startingDay: dataItem.startingDay,
        endingDay: dataItem.endingDay,
        color: boxColors[boxNames.indexOf(dataItem.title) % boxColors.length],
      }));

      marked[item.title] = { marked: true, dots, periods };
    } else {
      marked[item.title] = { disabled: true };
    }
  });

  marked[today] = { marked: true, dots: [{ key: 'today', color: 'white' }] };

  return marked;
};


const onDateChanged = (/* date, updateSource */) => {
};

const onMonthChange = (/* month, updateSource */) => {
};

export default function MyCalendar(props) {
  const [selectedIndex, updateIndex] = React.useState(0);

  return (
    <CalendarProvider
      date={today}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: 'white',
      }}
      style={{
      marginTop: 20,}}
      todayButtonStyle={styles.todayButton}
      todayBottomMargin={16}>
      {props.weekView ? (
        <WeekCalendar firstDay={1} markedDates={getMarkedDates()} />
      ) : (
        <ExpandableCalendar
        
          minDate={sub(new Date(), {years: 5})}
          maxDate={add(new Date(), {years: 5})}
          pastScrollRange={60}
          futureScrollRange={60}
          displayLoadingIndicator={false}
          calendarStyle={[styles.calendar, { paddingHorizontal: screenWidth * 0.01, justifyContent: 'center' }]} // Add paddingHorizontal here
          theme={getTheme()}
          disableAllTouchEventsForDisabledDays
          markingType={'multi-period'}
          markedDates={getMarkedDates()} 
        />
      )}
      <AgendaList
        dayFormat='MMMM dd dddd'
        sections={ITEMS}
        extraData={selectedIndex}
        renderItem={item => renderItem(item)}
      />
    </CalendarProvider>
  );
}
console.log(dates[0]);
