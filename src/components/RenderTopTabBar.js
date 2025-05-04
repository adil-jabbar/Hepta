import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import React, { useState } from 'react';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  width,
} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';
import { useNavigation } from '@react-navigation/native';
import TltleDecroption from './TltleDecroption';

export default function RenderTopTabBar(props) {
  const navigation = useNavigation();
  let item = props.item;
  // console.log('item', CONSTANTS.API_URLS.IMAGE + item?.user?.image);

  const ButtonCom = ({ color, title, onPress }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={{
          backgroundColor: color,
          width: width * 0.25,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: SIZES.fifteen,
          borderRadius: SIZES.fifteen,
        }}>
        <Text style={[FONTS.mediumFont12, { color: COLORS.white }]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginVertical: SIZES.ten }}>
      <MyTouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate(SCREENS.ApointmentDetails, {
            type: 'pending',
            data: item,
          });
          // props.Reschedule();
        }}>
        <View style={styles.flexRow}>
          <Image
            resizeMode="contain"
            source={{ uri: CONSTANTS.API_URLS.IMAGE + item?.user?.image }}
            style={styles.imgStyle}
          />

          <View style={{ marginLeft: SIZES.twenty }}>
            <Text
              numberOfLines={1}
              style={[FONTS.boldFont18, { color: COLORS.black }]}>
              {item.user?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[FONTS.boldFont18, { color: COLORS.black }]}>
              {item.reason}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <TltleDecroption title={'Date'} dec={item?.date} />
          <TltleDecroption title={'Time'} dec={item?.time} />
          <TltleDecroption title={'Subject'} dec={item?.subject} />
        </View>

        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: SIZES.ten,
            borderColor: '#C1C1C1',
          }}
        />

        {item?.status !== 'completed' && item?.status !== 'cancelled' && (
          <View style={styles.row}>
            {item?.status !== 'accepted' ? (
              <ButtonCom
                color={!props.pending ? COLORS.trueGreen : COLORS.trueGreen}
                title="Accept"
                onPress={() => {
                  props.OnAccept();
                }}
              />
            ) : null}
            <ButtonCom
              color={COLORS.appBlue}
              title="Reschedule"
              onPress={() => {
                props.Reschedule();
              }}
            />
            <ButtonCom
              color={COLORS.orange}
              title="Cancel"
              onPress={() => {
                props.Cancel();
              }}
            />
          </View>
        )}
      </MyTouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.ten,
    // alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',

    borderRadius: SIZES.ten,
    padding: SIZES.fifteen,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStyle: {
    width: SIZES.fifty * 1.1,
    height: SIZES.fifty * 1.1,
    borderRadius: SIZES.fifty * 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.fifteen,
  },
  text: {
    color: COLORS.primary,
    fontSize: SIZES.h18,
    fontFamily: FONTFAMILY.Bold,
    fontWeight: 'bold',
  },
});
