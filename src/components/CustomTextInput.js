import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Animated,
  TextInputProps,
} from 'react-native';
import {Icon, IconType, MyTouchableOpacity} from '../components';

import {FONTS, SIZES, COLORS, height} from '../constants/theme';
import utils from '../utils';

export default function CustomTextInput(props: TextInputProps) {
  const {
    email,
    value,
    hasIcon,
    iconType,
    iconName,
    password,
    style,
    label,
    required = true,
    showArrow,
    multiline,
    txtInputStyle,
    containerStyle,
  } = props;

  const [focused, setFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [secureTextIcon, setSecureTextIcon] = useState('eye-off');
  const [iconColor, setIconColor] = useState(COLORS.transparent);
  const [borderColor, setBorderColor] = useState(COLORS.transparent);

  const [errorOpacity] = useState(new Animated.Value(0)); // Initial opacity of error message

  const showPassword = () => {
    if (secureTextIcon === 'eye-off') {
      setSecureTextIcon('eye');
      setSecureText(false);
    } else {
      setSecureTextIcon('eye-off');
      setSecureText(true);
    }
  };

  const validate = () => {
    if (utils.isEmptyOrSpaces(value)) {
      return false;
    } else if (email && !utils.validateEmail(value)) {
      return false;
    } else {
      return true;
    }
  };

  const errorMsg = () => {
    // Check if the field is required and empty
    if (utils.isEmptyOrSpaces(value) && required) {
      return 'This field is required!';
    }

    // Check for email validation if the 'email' prop is passed
    if (email && !utils.validateEmail(value)) {
      return 'Invalid email!';
    }

    // You can add additional validation rules here (e.g., password validation)
    // Example: Check if password is too short
    if (password && value.length < 6) {
      return 'Password must be at least 6 characters!';
    }

    return ''; // If no error, return an empty string
  };

  useEffect(() => {
    // If error is present and field is focused, animate the error message
    if (focused && required && !validate()) {
      Animated.spring(errorOpacity, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      // If no error, hide the error message
      Animated.timing(errorOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [value, focused, required]); // Re-run effect when value, focused, or required changes

  return (
    <View style={[{marginTop: SIZES.fifteen}, containerStyle]}>
      {label && (
        <Text
          style={[
            FONTS.mediumFont12,
            styles.labelStyle,
            props.secondaryLabel && {color: COLORS.white},
          ]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.container,
          {
            borderColor: borderColor,
            height: multiline ? 120 : 55,
          },
          style,
        ]}>
        <View style={styles.flexRow}>
          <View style={[{flex: 1}, styles.flexRow]}>
            {hasIcon ? (
              <View style={{flex: 0.1}}>
                <Icon
                  type={iconType}
                  name={iconName}
                  style={{
                    color: iconColor,
                    fontSize: SIZES.twenty,
                  }}
                />
              </View>
            ) : null}

            <TextInput
              {...props}
              selectionColor={COLORS.primary}
              placeholderTextColor={COLORS.brownGrey}
              secureTextEntry={password ? secureText : false}
              style={[
                FONTS.mediumFont14,
                styles.txtInputStyle,
                {
                  height: multiline ? 110 : 60,
                  textAlignVertical: multiline ? 'top' : 'center',
                },
                txtInputStyle,
              ]}
              onFocus={() => {
                setFocused(true);
                setIconColor(COLORS.primary);
                setBorderColor(COLORS.primary);
              }}
              onBlur={() => {
                setFocused(false);
                setIconColor(COLORS.charcoalGrey);
                setBorderColor(COLORS.transparent);
              }}
            />
          </View>

          {password ? (
            <MyTouchableOpacity
              onPress={showPassword}
              style={{flex: 0.1, alignItems: 'flex-end'}}>
              <Icon
                name={secureTextIcon}
                type={IconType.Feather}
                style={styles.eyeIconStyle}
              />
            </MyTouchableOpacity>
          ) : showArrow ? (
            <Icon
              type={IconType.MaterialIcons}
              name="keyboard-arrow-down"
              style={{
                color: COLORS.gray + 85,
                fontSize: SIZES.twentyFive * 1.2,
              }}
            />
          ) : null}
        </View>
      </View>
      {/* <View style={{height: height * 0.027}}>
        <Animated.View style={{opacity: errorOpacity}}>
          {focused && required && !validate() && (
            <Text style={[FONTS.mediumFont10, styles.errorTextStyle]}>
              {errorMsg()}
            </Text>
          )}
        </Animated.View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.twenty,
    backgroundColor: COLORS.textInput,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtInputStyle: {
    flex: 1,
    color: COLORS.black,
  },
  eyeIconStyle: {
    fontSize: SIZES.twenty,
    marginLeft: SIZES.five,
    color: COLORS.charcoalGrey,
  },
  errorTextStyle: {
    color: COLORS.secondary,
    marginTop: SIZES.five + 2,
    marginHorizontal: SIZES.ten,
  },
  labelStyle: {
    color: COLORS.blackWithOpacity,
    marginBottom: SIZES.fifteen,
  },
});
