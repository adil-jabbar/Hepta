import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  RefreshControl
} from 'react-native';
import { COLORS, SIZES, FONTS, FONTFAMILY } from '../constants';
import { riderHistoryAction } from '../redux/slices';
import utils from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Calendar } from '../screens/activities/dummyDataCalender';

export default function CalendarComponent({ onRiderHistoryUpdate }) {
  const dispatch = useDispatch();
  const currentDate = moment().date(); // Get the current day of the month (integer, 1-31)
  const { riderHistory } = useSelector(state => state?.orders); // Fetch riderHistory from Redux store
  const [selectedDate, setSelectedDate] = useState(currentDate); // Initialize with the current date
  const [riderHistoryData, setRiderHistoryData] = useState(riderHistory); // Local state to hold rider history
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const flatListRef = useRef(null); // Ref for FlatList to scroll programmatically
  // Format the selected date for the dispatch action
  const formattedDate = moment(selectedDate, 'D').format('YYYY-MM-DD');
  // Scroll to the current date when the component loads
  const scaleAnimations = useRef(
    Calendar.map(() => new Animated.Value(1)), // Initialize animation values for each item
  ).current;

  const screenWidth = Dimensions.get('window').width;
  const ITEM_WIDTH = screenWidth * 0.2;
  const ITEM_HEIGHT = ITEM_WIDTH;

  const currentIndex = Calendar.findIndex(item => item.date === currentDate);

  useEffect(() => {
    // Fetch rider history when the component mounts (or selectedDate changes)
    if (formattedDate) {
      fetchRiderHistory(formattedDate);
    }

    if (currentIndex !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          index: currentIndex, // Scroll to the index for the current date
          animated: true,
        });
      }, 100);
    }

    // Trigger animation for the default selected date
    if (currentIndex !== -1) {
      Animated.spring(scaleAnimations[currentIndex], {
        toValue: 1.3,
        friction: 5,
        tension: 30,
        useNativeDriver: false,
      }).start();
    }
  }, [currentIndex]); // Re-run when currentIndex changes

  // Function to fetch rider history based on selected date
  const fetchRiderHistory = (date) => {
    dispatch(riderHistoryAction({ date }))
      .unwrap()
      .then(response => {
        setRiderHistoryData(response?.data);
        if (onRiderHistoryUpdate) {
          onRiderHistoryUpdate(response?.data); // Pass updated data to parent (if needed)
        }
      })
      .catch(err => {
        utils.errorAlert(err?.message || 'An error occurred');
      });
  };

  // Handle date selection
  const handleSelectDate = date => {
    const index = Calendar.findIndex(item => item.date === date); // Find the index for the clicked date

    // Reset previous animation
    if (
      selectedDate !== null &&
      scaleAnimations[Calendar.findIndex(item => item.date === selectedDate)]
    ) {
      Animated.spring(scaleAnimations[Calendar.findIndex(item => item.date === selectedDate)], {
        toValue: 1,
        friction: 5,
        tension: 30,
        useNativeDriver: false,
      }).start();
    }

    // Apply new animation for the selected date
    Animated.spring(scaleAnimations[index], {
      toValue: 1.3,
      friction: 5,
      tension: 30,
      useNativeDriver: false,
    }).start();

    setSelectedDate(date); // Update the selected date state

    // Re-fetch rider history data for the selected date
    fetchRiderHistory(moment(date, 'D').format('YYYY-MM-DD'));
  };

  const renderItem = ({ item }) => {
    const scale =
      scaleAnimations[
        Calendar.findIndex(calendarItem => calendarItem.date === item.date)
      ];

    return (
      <TouchableOpacity onPress={() => handleSelectDate(item.date)} style={styles.dateContainer}>
        <Animated.View
          style={[
            {
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              transform: [{ scale }],
              backgroundColor: selectedDate === item.date ? COLORS.primary : COLORS.white,
            },
            styles.animatedContainer,
          ]}>
          <Text
            style={[
              styles.dateText,
              selectedDate === item.date && styles.selectedDateText,
            ]}>
            {item.date}
          </Text>
          <Text
            style={[
              styles.monthText,
              selectedDate === item.date && styles.selectedMonthText,
            ]}>
            {item.month}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT, // Height of each item
    offset: ITEM_HEIGHT * index - 25, // Offset based on the item's index
    index, // Index of the item
  });

  // Handle scroll failure (if scrollToIndex fails)
  const onScrollToIndexFailed = error => {
    const { index } = error;
    console.warn('onScrollToIndexFailed:', error);
    // Attempt to scroll to the index after a small delay
    setTimeout(() => {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }, 100);
  };

  // Pull-to-refresh logic
  const onRefresh = () => {
    setRefreshing(true);
    fetchRiderHistory(formattedDate); // Re-fetch rider history on refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        data={Calendar}
        keyExtractor={item => item.date.toString()}
        renderItem={renderItem}
        getItemLayout={getItemLayout} // Provide item layout for scrollToIndex
        onScrollToIndexFailed={onScrollToIndexFailed} // Handle scroll failure
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.white,
  },
  flatListContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  dateContainer: {
    marginHorizontal: SIZES.ten,
  },
  animatedContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    // ...FONTS.bold,
    fontFamily:FONTFAMILY.Medium,
    color: COLORS.borderColor,
    fontSize:SIZES.body18

  },
  selectedDateText: {
    color: COLORS.white,
  },
  monthText: {
    // ...FONTS.medium,
    fontFamily:FONTFAMILY.Medium,
    color: COLORS.borderColor,
    fontSize:SIZES.body12

  },
  selectedMonthText: {
    color: COLORS.white,
  },
  riderHistoryContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  riderHistoryTitle: {
    ...FONTS.bold,
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.primary,
  },
  riderHistoryItem: {
    marginBottom: 10,
  },
});
