import {View, Text} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, width} from '../constants';
import Icon, {IconType} from './Icons';
import MyTouchableOpacity from './MyTouchableOpacity';
import moment from 'moment';

export default function OneColumnCardStatus(props) {

  const { item } = props;

  const getStatusDetails = (status) => {
    switch (status) {
      case 'Order Received':
        return { description: 'Order Confirmed', color: COLORS.primary }; // Green for confirmed orders
      case 'Order Cancelled':
        return { description: 'Order Terminated', color: COLORS.google }; // Red for cancelled orders
      case 'Order Cash Collected':
        return { description: 'Payment Received', color: 'green' }; // Blue for payment received
      case 'Order Dispatched':
        return { description: 'Order Dispatched for Delivery', color: COLORS.orange }; // Orange for dispatched orders
      case 'Order Completed':
        return { description: 'Order Delivered', color: COLORS.darkGreen }; // Dark green for delivered orders
      case 'Order Pending':
        return { description: 'Order Pending Confirmation', color: COLORS.yellow }; // Yellow for pending orders
      case 'Order Failed':
        return { description: 'Order Failed', color: COLORS.grey }; // Grey for failed orders
      default:
        return { description: 'Unknown Status', color: COLORS.black }; // Black for unknown statuses
    }
  };

  const statusDetails = getStatusDetails(item?.trip_status?.description);


  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
          {item?.order?.reference_number}
        </Text>
        <Text
          style={[
            FONTS.boldFont18,
            {color: COLORS.primary, marginVertical: 3, textTransform:'capitalize'},
          ]}>
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
          <Text style={[FONTS.mediumFont12, styles.addressText, {textTransform:'capitalize'}]}>
            {item?.order?.receiver_address}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.primary}]}>
          PKR {item?.order?.cod}
        </Text>
        <Text style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
        {moment(item?.updated_at).format('MMM DD, YYYY')}
        </Text>
        <Text style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
{moment(item?.updatedAt).format('hh:mm A')}
        </Text>
        <MyTouchableOpacity style={[styles.startButton,{backgroundColor: statusDetails.color}]}>
          <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
{
  item?.trip_status?.description === 'Order Received' 
    ? 'Order Confirmed' 
    : item?.trip_status?.description === 'Order Cancelled'
    ? 'Order Terminated' 
    : item?.trip_status?.description === 'Order Cash Collected' 
    ? 'Payment Received' 
    : item?.trip_status?.description === 'Order Dispatched' 
    ? 'Order Dispatched for Delivery' 
    : item?.trip_status?.description === 'Order Completed'
    ? 'Order Delivered' 
    : item?.trip_status?.description === 'Order Pending'
    ? 'Order Pending Confirmation' 
    : item?.trip_status?.description === 'Order Failed'
    ? 'Order Failed'
    : 'Unknown Status' // Default for unknown statuses
}

          </Text>
        </MyTouchableOpacity>
      </View>
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
    // backgroundColor: COLORS.primary,
    width: width * 0.4,
    alignItems: 'center',
    paddingVertical: SIZES.five,
    padding:SIZES.five,
    borderRadius: SIZES.five,
    marginTop: SIZES.five,
  },
};
