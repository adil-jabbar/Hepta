import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {CustomHeader} from '../../components';
import CalendarComponent from '../../components/CalenderComponent';
import AnimatedFlatList from '../../components/AnimatedFlatList';
import OneColumnCardStatus from '../../components/OneColumnCardStatus';
import { useSelector } from 'react-redux';

export default function HistoryScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {riderHistory} = useSelector(state => state?.orders);
const [RiderHistory, setRiderHistory] = useState(riderHistory)


const handleRiderHistoryUpdate = (data) => {
  setRiderHistory(data);
};


  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate network request, set to false after data is loaded.
    setTimeout(() => setRefreshing(false), 2000);
  };

  const renderEmptyComponent = () => {
    return (
      <View style={[styles.emptyState,{alignItems:'center'}]}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>
          No Acitivity Yet
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {
              color: COLORS.brownGrey,
              maxWidth: SIZES.fifty * 3,
              textAlign: 'center',
              marginTop: 10,
            },
          ]}>
          Looks like there are no activity yet.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader showBackButton title={'Activities'} />
      {/* <CalendarComponent /> */}
      <CalendarComponent onRiderHistoryUpdate={handleRiderHistoryUpdate} />

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.textInput,
          marginVertical: SIZES.ten,
        }}
      />
      <AnimatedFlatList
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={RiderHistory}
        renderItem={({item, index}) => {
          return <OneColumnCardStatus item={item} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
