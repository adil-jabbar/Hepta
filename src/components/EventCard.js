import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MyTouchableOpacity from './MyTouchableOpacity';
import {Image} from 'react-native-animatable';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  height,
  width,
} from '../constants';
import {useNavigation} from '@react-navigation/native';

export default function EventCard(props) {
  const navigation = useNavigation();

  let item = props.item;
  const {isAdmin} = props;

  return (
    <MyTouchableOpacity
      onPress={() =>
        navigation.navigate(SCREENS.SingleEvent, {
          type: isAdmin ? 'admin' : 'user',
        })
      }>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: CONSTANTS.API_URLS.IMAGE + item?.image}}
            style={[styles.groupImage]}
            resizeMode="cover"
          />
          <View style={{flexDirection: 'column', marginLeft: SIZES.ten}}>
            <Text style={FONTS.mediumFont14}>{item?.title}</Text>
            <Text
              numberOfLines={2}
              style={[
                FONTS.mediumFont12,
                {
                  color: COLORS.brownGrey,
                  maxWidth: SIZES.fifty * 3,
                  marginTop: SIZES.five,
                  textTransform: 'capitalize',
                },
              ]}>
              {item?.description}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            alignContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
            {item?.event_date}
          </Text>

          <MyTouchableOpacity
            activeOpacity={0.75}
            style={styles.membersView}
            onPress={() => navigation.navigate(SCREENS.GroupMembers)}>
            {members.slice(0, 4).map((item, index) => (
              <Image
                key={index}
                source={item.image}
                style={styles.memberImgStyle}
              />
            ))}
            {members.length > 4 && (
              <View style={[styles.memberImgStyle, , styles.moreMembersView]}>
                <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
                  +{members.length - 4}
                </Text>
              </View>
            )}
          </MyTouchableOpacity>
        </View>
      </View>
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  groupImage: {
    width: width * 0.19,
    height: height * 0.08,
    backgroundColor: COLORS.textInput,
    borderRadius: SIZES.ten,
  },
  groupMembers: {
    borderRadius: SIZES.twenty,
    width: width * 0.08,
    height: width * 0.08,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.five,
  },

  membersView: {
    flexDirection: 'row',
  },
  memberImgStyle: {
    borderWidth: 2,
    borderColor: COLORS.white,
    marginLeft: -SIZES.twenty * 0.9,
    width: SIZES.twentyFive * 1.2,
    height: SIZES.twentyFive * 1.2,
    borderRadius: SIZES.twentyFive,
  },
  moreMembersView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});

const members = [
  {
    image: IMAGES.Aesthetic,
  },
  {
    image: IMAGES.profilePicture,
  },
  {
    image: IMAGES.Aesthetic,
  },
  {
    image: IMAGES.profilePicture,
  },
  {
    image: IMAGES.Aesthetic,
  },
  {
    image: IMAGES.profilePicture,
  },
];
