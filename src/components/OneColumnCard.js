import {View, Text} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SCREENS, SIZES, width} from '../constants';
import Icon, {IconType} from './Icons';
import MyTouchableOpacity from './MyTouchableOpacity';
import {useNavigation} from '@react-navigation/native';

export default function OneColumnCard(props) {
  const { item, isDelivered, isCancel } = props;

  console.log('====================================');
  console.log(isDelivered);
  console.log('====================================');

  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
          {item?.order?.reference_number}
        </Text>
        <Text style={[FONTS.boldFont18, {color: COLORS.primary, textTransform:'capitalize'}]}>
          {item?.order?.receiver_name}
        </Text>

        <View style={styles.locationContainer}>
          <Icon
            name="location-sharp"
            type={IconType.Ionicons}
            style={{
              color: COLORS.black,
              fontSize: SIZES.twentyFive,
            }}
          />
          <Text style={[FONTS.mediumFont12, styles.addressText]}>{item?.order?.receiver_address}
          </Text>
        </View>
      </View>
      <MyTouchableOpacity
      // onPress={() => navigation.navigate(SCREENS.DrawerNavigator)}
      onPress={() =>
        navigation.navigate(SCREENS.DrawerNavigator, {sendTrue: true})
      }
      style={[styles.startButton,{
        backgroundColor: !isDelivered ? COLORS.primary : COLORS.white,
      borderColor:COLORS.primary,
      borderWidth:isDelivered ? 1 : 0
      }
      ]}>
        <Text style={[FONTS.mediumFont14, {
          color: !isDelivered ? COLORS.white : COLORS.primaryTransparent
          }]}>
  {isDelivered ? 'Delivered' : (isCancel ? 'Reattempt' : 'Start')}

          </Text>
      </MyTouchableOpacity>
      
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
    textTransform: 'capitalize',
  },
  startButton: {
    backgroundColor: COLORS.primary,
    width: width * 0.23,
    alignItems: 'center',
    padding:SIZES.five + 2,
    paddingVertical:SIZES.ten,
    borderRadius: SIZES.ten,
  },
};
