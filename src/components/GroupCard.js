import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import MyTouchableOpacity from './MyTouchableOpacity';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  SCREENS,
  SIZES,
  height,
  width,
} from '../constants';
import {useNavigation} from '@react-navigation/native';

export default function MyGroupCard(props) {
  const {isAdmin} = props;
  const navigation = useNavigation();
  let item = props.item;

  return (
    <MyTouchableOpacity
      style={styles.separator}
      onPress={() =>
        navigation.navigate(SCREENS.SingleGroup, {
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

        <View style={{justifyContent: 'flex-end'}}>
          <MyTouchableOpacity
            activeOpacity={0.75}
            style={styles.membersView}
            onPress={() => navigation.navigate(SCREENS.GroupMembers)}>
            {item?.group_members.slice(0, 4).map((item, index) => (
              <Image
                key={index}
                source={{
                  uri: CONSTANTS.API_URLS.IMAGE + item?.group_member?.image,
                }}
                style={styles.memberImgStyle}
              />
            ))}
            {item?.group_members?.length > 4 && (
              <View style={[styles.memberImgStyle, , styles.moreMembersView]}>
                <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
                  +{item?.group_members?.length - 4}
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
  btn: {
    width: width * 0.25,
    height: height * 0.035,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.twenty,
  },
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
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: SIZES.five,
  },
  separator: {
    paddingVertical: SIZES.ten,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.brownGrey,
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
  emptyBox: {
    borderWidth: 1,
    borderColor: COLORS.textInput,
    borderRadius: SIZES.five,
    alignItems: 'center',
    paddingVertical: SIZES.fifteen,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: width * 1,
    height: width * 0.5,
  },
});
