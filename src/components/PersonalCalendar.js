import _ from 'lodash';
import React from 'react';
import {Platform, Dimensions, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import {add, sub, isSameMonth, eachDayOfInterval} from 'date-fns';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ITEMS from './Items';

const Stack = createStackNavigator();
const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#17375E';
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

const getTheme = () => {
  const disabledColor = 'grey';

  return {
    // arrows
    arrowColor: 'black',
    arrowStyle: { padding: 0 },
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontFamily: 'HelveticaNeue',
    textMonthFontWeight: 'bold',
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: 'HelveticaNeue',
    textDayHeaderFontWeight: 'normal',
    // dates
    todayTextColor: 'black',
    dayTextColor: 'black',
    textDayFontSize: 18,
    textDayFontFamily: 'HelveticaNeue',
    textDayFontWeight: 'normal', // 굵은 글씨 대신 일반 글씨로 설정
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    selectedDayStyle: { borderRadius: 5 },
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: 'black',
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: 0 },

    dayContainerStyle: ({ date }) => {
      const isCurrentMonth = isSameMonth(new Date(), date);
      const dotOpacity = isCurrentMonth ? 1 : 0; // 현재 월에 해당하는 날짜의 dot 투명도
    
      // 아이템 배열에서 해당 날짜에 매치되는 아이템들을 찾아서 색상을 가져옴
      const matchedItems = ITEMS.filter(item => item.title === date.dateString);
      const dotColors = matchedItems.map(item => boxColors[boxNames.indexOf(item.data[0].title) % boxColors.length]);
    
      return {
        opacity: dotOpacity,
        backgroundColor: dotColors.length > 0 ? dotColors[0] : 'transparent', // 첫 번째 매치되는 아이템의 색상 사용
      };
    },
  };
};

const boxNames = [ //자격증 리스트
"펀드투자권유자문인력",
"파생상품투자권유자문인력",
"생명보험대리점",
"제3보험",
"손해보험대리점",
"신용분석사",
"ADsP",
"SQLD",
"COS",
"COS PRO",
"토익",
"토스",
];

const boxColors = [  // 색상 리스트
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
const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

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
      marginTop: 0,}}
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
        sections={ITEMS}
        extraData={selectedIndex}
        renderItem={item => renderItem(item)}
      />
    </CalendarProvider>
  );
}
console.log(dates[0]);

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemtestatus: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
  },
  itemEndTime: {
    color: 'grey',
    fontSize: 12,
    // marginTop: 4,
    marginLeft: 4,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'navy', // 동그라미의 색상 설정
    marginRight: 10,
  },
  itemTitleText: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'grey',
    fontSize: 14,
    alignSelf: 'center',
  },
  todayButton: {
    padding: 10,
    height: 45,
    width: 100,
    backgroundColor: '#e85a19d6',
  },
});