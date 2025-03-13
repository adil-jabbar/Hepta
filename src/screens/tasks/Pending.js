import {View, Text, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import AnimatedFlatList from '../../components/AnimatedFlatList';
import {
  CustomButton,
  Icon,
  IconType,
  MyTouchableOpacity,
} from '../../components';
import {COLORS, FONTS, SIZES, width} from '../../constants';
import OneColumnCard from '../../components/OneColumnCard';
import { useSelector } from 'react-redux';

export default function Pending({route}) {
  const { item } = route || {}; 
  const [refreshing, setRefreshing] = useState(false);
  const {pending} = useSelector(state => state.orders);


  const onRefresh = () => {
    setRefreshing(true);
    // Simulate network request, set to false after data is loaded.
    setTimeout(() => setRefreshing(false), 2000);
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyState}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>
          No Pending Tasks Yet
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
          Looks like there are no pendings yet.
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <AnimatedFlatList
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={pending} // Example data
        renderItem={({item, index}) => {
          return <OneColumnCard item={item}  />;
        }}
      />
    </View>
  );
}

const styles = {
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: SIZES.ten,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.brownGrey,
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.five,
  },
  addressText: {
    width: width * 0.5,
    color: COLORS.darkGrey,
    fontSize: SIZES.fourteen,
    marginLeft: SIZES.five,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    width: width * 0.2,
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    borderRadius: SIZES.twenty,
  },
};
