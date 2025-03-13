import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MyTouchableOpacity, Icon} from '../components';
import {COLORS, FONTFAMILY, SIZES} from '../constants';

export default function CustomButton(props) {
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
    containerStyle,
    colors,
    loading,
  } = props;

  return (
    <MyTouchableOpacity
      style={[containerStyle]}
      onPress={onPress}
      disabled={disabled || loading} // Disable button when loading
    >
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={
          colors
            ? colors
            : [
                disabled ? '#D7B3A6' : COLORS.primary,
                disabled ? '#D7B3A6' : COLORS.primary,
              ]
        }
        style={[
          styles.container,
          btnStyle,
          {
            // borderWidth: disabled ? 1 : 0,
            // borderColor: disabled ? COLORS.primary : '',
          },
        ]}>
        {/*           
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

        {title && (
          <Text
            style={[
              styles.titleStyle,
              titleStyle,
              {color: disabled ? COLORS.whiteOpacity : COLORS.white},
            ]}>
            {title}
          </Text>
        )}

        {!showOnlyIcon && <View style={{flex: 0.2}} />}
      </LinearGradient>
    </MyTouchableOpacity> */}

        {loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="small" color={COLORS.white} />
          </View>
        ) : (
          <>
            {hasIcon || showOnlyIcon ? (
              <View
                style={{flex: showOnlyIcon ? 1 : 0.2, alignItems: 'center'}}>
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

            {title && (
              <Text
                style={[
                  styles.titleStyle,
                  titleStyle,
                  {
                    color:
                      disabled || loading ? COLORS.whiteOpacity : COLORS.white,
                  },
                ]}>
                {title}
              </Text>
            )}

            {!showOnlyIcon && <View style={{flex: 0.2}} />}
          </>
        )}
      </LinearGradient>
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.twentyFive * 1.5,
    paddingHorizontal: SIZES.twentyFive,
  },
  titleStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: SIZES.h20,
    fontFamily: FONTFAMILY.SemiBold,
  },
});
