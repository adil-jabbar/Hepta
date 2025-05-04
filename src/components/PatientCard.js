import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTS, SIZES, width} from '../constants';
import Icon, {IconType} from './Icons';
import LinearGradient from 'react-native-linear-gradient';

export default function PatientCard(props) {
  const {item, onPress} = props;

  return (
    <MyTouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.flexRow}>
        <Image
          resizeMode="contain"
          source={item.image}
          style={styles.imgStyle}
        />

        <View style={{marginLeft: SIZES.twenty}}>
          <Text
            numberOfLines={1}
            style={[FONTS.boldFont18, {color: COLORS.black}]}>
            {item.name}
          </Text>

          <Text
            numberOfLines={2}
            style={[FONTS.mediumFont14, styles.bioTextStyle]}>
            {'MBBS,DOMS,MS'}
          </Text>

          <Text
            numberOfLines={2}
            style={[FONTS.mediumFont14, styles.bioTextStyle]}>
            {'Ophthalmologist'}
          </Text>
          <Text
            numberOfLines={2}
            style={[FONTS.mediumFont14, styles.bioTextStyle]}>
            {'General Practitionor'}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: width * 0.83,
          backgroundColor: COLORS.lightGray,
          alignSelf: 'center',
          marginVertical: SIZES.ten,
        }}
      />

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.five,
          }}>
          <View style={styles.prescripView}>
            <Icon
              type={IconType.MaterialIcons}
              name="star-rate"
              style={{
                color: COLORS.golden,
                fontSize: SIZES.twentyFive,
              }}
            />
            <Icon
              type={IconType.MaterialIcons}
              name="star-rate"
              style={{
                color: COLORS.golden,
                fontSize: SIZES.twentyFive,
              }}
            />
            <Icon
              type={IconType.MaterialIcons}
              name="star-rate"
              style={{
                color: COLORS.golden,
                fontSize: SIZES.twentyFive,
              }}
            />
            <Icon
              type={IconType.MaterialIcons}
              name="star-rate"
              style={{
                color: COLORS.golden,
                fontSize: SIZES.twentyFive,
              }}
            />
            <Text
              style={[
                FONTS.mediumFont18,
                {color: COLORS.secondary, marginHorizontal: SIZES.five},
              ]}>
              30
            </Text>
          </View>
          <Text style={[FONTS.boldFont20, {color: COLORS.black}]}>
            Fee : $130
          </Text>
        </View>
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
                  width: (width * 0.78) / 7,
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
                    FONTS.mediumFont14,
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
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'flex-start',
    marginRight: SIZES.twenty,
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
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

const days = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'];
