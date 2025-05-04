import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MyTouchableOpacity, Icon} from '../components';
import {COLORS, SIZES} from '../constants';

export default function BorderButton(props) {
  const {
    hasIcon,
    iconName,
    iconColor,
    iconType,
    iconSize,
    title,
    onPress,
    btnStyle,
    titleStyle,
    disabled,
    showOnlyIcon,
  } = props;

  return (
    <MyTouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, btnStyle]}>
      {hasIcon || showOnlyIcon ? (
        <View style={{flex: showOnlyIcon ? 1 : 0.2, alignItems: 'center'}}>
          <Icon
            name={iconName}
            type={iconType}
            style={{
              color: iconColor || COLORS.white,
              fontSize: iconSize || SIZES.twentyFive * 1.2,
            }}
          />
        </View>
      ) : (
        <View style={{flex: 0.2}} />
      )}

      {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}

      {!showOnlyIcon && <View style={{flex: 0.2}} />}
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.fifteen,
    borderColor: COLORS.secondary,
    paddingHorizontal: SIZES.twentyFive,
    backgroundColor: COLORS.white,
  },
  titleStyle: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.secondary,
    fontSize: SIZES.h22,
  },
});
