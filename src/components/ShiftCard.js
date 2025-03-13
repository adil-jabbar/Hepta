import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTS, SCREENS, SIZES, width} from '../constants';
import Icon, {IconType} from './Icons';
import LinearGradient from 'react-native-linear-gradient';

import ActionSheet from 'react-native-custom-actionsheet';
import {useNavigation} from '@react-navigation/native';
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = ['Cancel', 'Edit', 'Delete'];
const title = 'What you wanna do?';

export default function ShiftCard(props) {
  const navigation = useNavigation();
  const getActionSheetRef = React.createRef();
  const showActionSheet = () => getActionSheetRef.current.show();

  const handlePress = index => {
    if (index === 1) {
      navigation.navigate(SCREENS.EditShift);
    }
  };

  const {item, onPress} = props;
  return (
    <MyTouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          marginTop: SIZES.five,
        }}>
        <View style={{flex: 1}}>
          <Text style={[FONTS.boldFont20, {color: COLORS.black}]}>Shift</Text>
          <MyTouchableOpacity
            style={{padding: SIZES.five, position: 'absolute', end: 0}}
            onPress={showActionSheet}>
            <Icon
              type={IconType.Feather}
              name={'more-horizontal'}
              color={COLORS.secondary}
              size={SIZES.twentyFive * 1.05}
            />
          </MyTouchableOpacity>
        </View>
        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.brownGray, marginTop: SIZES.five},
          ]}>
          Time
        </Text>
        <Text style={[FONTS.mediumFont14, {color: COLORS.brownGray}]}>
          11:30 - 12:30
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.fifteen,
          }}>
          {days.map((day, index) => {
            return (
              <View
                style={{
                  width: (width * 0.7) / 7,
                  justifyContent: 'center',
                }}>
                <LinearGradient
                  key={index}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={
                    index > 4
                      ? [COLORS.gray, COLORS.borderColor]
                      : [COLORS.secondary, COLORS.primary]
                  }
                  style={{
                    height: 30,
                    width: '100%',
                  }}
                />
                <Text
                  style={[
                    FONTS.mediumFont12,
                    {
                      textTransform: 'capitalize',
                      textAlign: 'center',
                      color: COLORS.brownGray,
                      marginVertical: SIZES.five,
                    },
                  ]}>
                  {day}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <ActionSheet
        ref={getActionSheetRef}
        title={title}
        // message="custom message custom message custom message custom message custom message custom message "
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={handlePress}
      />
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'flex-start',
    // marginRight: SIZES.twentyFive,
    marginHorizontal: SIZES.twentyFive,

    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: SIZES.ten,
    padding: SIZES.fifteen,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStyle: {
    width: SIZES.fifty * 1.2,
    height: SIZES.fifty * 1.2,
    borderRadius: SIZES.fifty * 1.2,
  },
  bioTextStyle: {
    color: COLORS.gray,
    width: SIZES.fifty * 3,
    marginTop: SIZES.five,
  },
  prescripView: {
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

const days = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'];
