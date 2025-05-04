import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES, STYLES} from '../constants';
import {CustomButton, MyTouchableOpacity} from '.';

export default function DoctorCard(props) {
  const {item} = props;

  return (
    <MyTouchableOpacity style={[styles.container, STYLES.shadow]}>
      <View style={styles.flexRow}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>
          {item.name}
        </Text>

        <View style={styles.typeView}>
          <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
            {item.type}
          </Text>
        </View>
      </View>

      <Text
        style={[
          FONTS.mediumFont14,
          {color: COLORS.black, marginTop: SIZES.five},
        ]}>
        {item.bio}
      </Text>

      <CustomButton
        title="Call"
        onPress={() => {}}
        titleStyle={{fontSize: SIZES.h20}}
        btnStyle={{
          height: SIZES.twentyFive * 2,
          marginTop: SIZES.twentyFive * 1.1,
        }}
      />
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.twenty,
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    backgroundColor: COLORS.white,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeView: {
    paddingVertical: SIZES.five,
    paddingHorizontal: SIZES.ten,
    marginLeft: SIZES.fifteen,
    borderRadius: SIZES.five,
    backgroundColor: COLORS.secondary,
  },
});
