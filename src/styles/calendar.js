import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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


const themeColor = '#17375E';

export const getTheme = () => {
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
