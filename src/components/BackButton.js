import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, IconType, MyTouchableOpacity} from '../components';
import {COLORS, SIZES, width} from '../constants';

export default function BackButton(props) {
  const {backArrowColor, backArrowStyle} = props;

  const navigation = useNavigation();

  return (
    <MyTouchableOpacity
      style={[styles.container, backArrowStyle]}
      onPress={() => navigation.goBack()}>
      <Icon
        type={IconType.Ionicons}
        name={'chevron-back'}
        style={{
          color: backArrowColor || COLORS.black,
          fontSize: SIZES.twentyFive,
        }}
      />
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'flex-start',
    // borderRadius: width,
    // borderWidth: 1,
    // borderColor: COLORS.black,
    // height: SIZES.twentyFive * 1.75,
    // width: SIZES.twentyFive * 1.75,
  },
});
