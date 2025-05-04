import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTS, SIZES, height} from '../constants';
import Icon, {IconType} from './Icons';

export default function UploadPhotoBtn(props) {
  const {label, title, titleStyle, btnStyle, onPress, isVideo} = props;

  return (
    <View style={{marginTop: SIZES.twentyFive}}>
      {label && (
        <Text style={[FONTS.mediumFont14, styles.labelStyle]}>{label}</Text>
      )}

      <MyTouchableOpacity onPress={onPress} style={styles.btnView}>
        {/* <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.secondary, COLORS.primary]}
          style={[styles.container, btnStyle]}> */}
        <View style={[styles.container, btnStyle]}>
          <Icon
            name={isVideo ? 'video' : 'camera'}
            type={IconType.Feather}
            style={{
              color: COLORS.brownGrey,
              fontSize: SIZES.twenty,
            }}
          />

          <Text style={[FONTS.mediumFont14, styles.titleStyle, titleStyle]}>
            {title}
          </Text>
        </View>
        {/* </LinearGradient> */}
      </MyTouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    color: COLORS.primary,
    marginBottom: SIZES.fifteen,
  },
  btnView: {
    height: height * 0.075,
    borderWidth: 2,
    borderColor: COLORS.brownGrey,
    borderRadius: SIZES.twentyFiveWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  container: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.ten - 2,
    paddingHorizontal: SIZES.ten,
    justifyContent: 'center',
  },
  titleStyle: {
    color: COLORS.brownGrey,
    marginLeft: SIZES.ten - 3,
  },
});
