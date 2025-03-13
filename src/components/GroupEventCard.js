import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import MyTouchableOpacity from './MyTouchableOpacity';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  height,
  width,
} from '../constants';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {viewEvent, viewGroup} from '../redux/slices';
import {useDispatch} from 'react-redux';
import GroupEventHandler from '../screens/group/GroupEventHandler';

export default function GroupEventCard(props) {
  const {isAdmin, isGroup} = props;

  const {
    post,
    isLoading,
    setRefreshing,
    refreshing,
    getPosts,
    getGroupDetails,
    groupDetails,
  } = GroupEventHandler(props);
  const navigation = useNavigation();
  const dispatcher = useDispatch();

  let item = props.item;

  const onPressHandler = async id => {
    if (isGroup) {
      navigation.navigate(SCREENS.SingleGroup, {
        data: id,
        type: isAdmin ? 'admin' : 'user',
      });
    } else {
      navigation.navigate(SCREENS.SingleEvent, {
        data: id,
        type: isAdmin ? 'admin' : 'user',
      });
    }
  };

  return (
    <MyTouchableOpacity
      style={styles.separator}
      onPress={() => {
        onPressHandler(item?.id);
      }}>
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

        <View style={{alignItems: 'flex-end'}}>
          <View style={{justifyContent: 'flex-end'}}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
              {isGroup ? null : moment(item?.event_date).format('DD MMM, YYYY')}
            </Text>
          </View>

          {isGroup ? (
            <View style={{justifyContent: 'flex-end'}}>
              <MyTouchableOpacity
                activeOpacity={0.75}
                style={styles.membersView}
                onPress={() => navigation.navigate(SCREENS.GroupMembers)}>
                {item?.group_members?.slice(0, 4).map((item, index) => (
                  <View style={styles.avatar}>
                    {item?.group_member?.image == null ? (
                      <View>
                        <Text style={styles.avatarText}>
                          {item?.group_member?.name
                            ?.split(' ')
                            .map(item => item.charAt(0).toUpperCase())
                            .join('')}
                        </Text>
                      </View>
                    ) : (
                      <Image
                        key={index}
                        source={{
                          uri:
                            CONSTANTS.API_URLS.IMAGE +
                            item?.group_member?.image,
                        }}
                        style={styles.memberImgStyle}
                      />
                    )}
                  </View>
                ))}
                {item?.group_members?.length > 4 && (
                  <View
                    style={[styles.memberImgStyle, , styles.moreMembersView]}>
                    <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
                      +{item?.group_members.length - 4}
                    </Text>
                  </View>
                )}
              </MyTouchableOpacity>
            </View>
          ) : (
            <View style={{justifyContent: 'flex-end'}}>
              <MyTouchableOpacity
                activeOpacity={0.75}
                style={styles.membersView}
                onPress={() => navigation.navigate(SCREENS.GroupMembers)}>
                {item?.event_members?.slice(0, 4).map((item, index) => (
                  <View style={styles.avatar}>
                    {item?.event_member?.image == null ? (
                      <View>
                        <Text style={styles.avatarText}>
                          {item?.event_member?.name
                            ?.split(' ')
                            .map(item => item.charAt(0).toUpperCase())
                            .join('')}
                        </Text>
                      </View>
                    ) : (
                      <Image
                        key={index}
                        source={{
                          uri:
                            CONSTANTS.API_URLS.IMAGE +
                            item?.event_member?.image,
                        }}
                        style={styles.memberImgStyle}
                      />
                    )}
                  </View>
                ))}
                {item?.event_members?.length > 4 && (
                  <View
                    style={[styles.memberImgStyle, , styles.moreMembersView]}>
                    <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
                      +{item?.event_members.length - 4}
                    </Text>
                  </View>
                )}
              </MyTouchableOpacity>
            </View>
          )}
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
    // backgroundColor: 'red',
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
  avatar: {
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textInput,
    width: SIZES.twentyFive * 1.2,
    height: SIZES.twentyFive * 1.2,
    borderWidth: 2,
    marginLeft: -SIZES.twenty,
    borderRadius: SIZES.twentyFive,
  },
  avatarText: {
    fontSize: SIZES.body14,
    color: '#517A95',
    fontFamily: FONTFAMILY.Medium,
  },
});
