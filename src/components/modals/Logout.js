import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {COLORS, FONTS, height, SIZES} from '../../constants';
import CustomModal from '../CustomModal';
import MyTouchableOpacity from '../MyTouchableOpacity';

export default function Logout(props) {
  const {isVisible, text, onConfirm, onCancel} = props;

  return (
    <CustomModal
      isVisible={isVisible}
      statusBarTranslucent
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      deviceHeight={height * height}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.container}>
        <Text style={[FONTS.boldFont22, {color: COLORS.black}]}>
          {props.title}
        </Text>

        <Text
          style={[
            FONTS.mediumFont16,
            {color: COLORS.black, marginVertical: SIZES.fifteen},
          ]}>
          {props.desc}
        </Text>

        <View style={styles.btnContainer}>
          <MyTouchableOpacity
            onPress={onCancel}
            style={[
              styles.btnStyle,
              {
                marginRight: SIZES.ten,
                backgroundColor: COLORS.brownGrey,
              },
            ]}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
              Cancel
            </Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity
            onPress={onConfirm}
            style={[styles.btnStyle, {backgroundColor: COLORS.secondary}]}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
              Confirm
            </Text>
          </MyTouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    padding: SIZES.ten * 2,
    borderRadius: SIZES.ten,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  headingStyle: {
    // textAlign: 'center',
    marginTop: SIZES.five,
    color: COLORS.white,
  },
  textStyle: {
    // textAlign: 'center',
    marginVertical: SIZES.twenty,
    color: COLORS.white,
  },
  btnContainer: {
    marginVertical: SIZES.twentyFive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.five,
    paddingVertical: SIZES.fifteen,
    paddingHorizontal: SIZES.twentyFive * 1.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
