import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  height,
  width,
} from '../constants';
import {Icon, IconType, MyTouchableOpacity} from '../components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function DashboardHeader(props) {
  const navigation = useNavigation(); // Access the navigation object using useNavigation()
  const {profile} = useSelector(state => state.profile);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <MyTouchableOpacity
        onPress={() => navigation.navigate(SCREENS.MyProfile)}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.avatar}>
          {profile?.image == null ? (
            <View>
              <Text style={styles.avatarText}>
                {profile?.name
                  ?.split(' ')
                  .map(item => item.charAt(0).toUpperCase())
                  .join('')}
              </Text>
            </View>
          ) : (
            <Image
              source={{uri: CONSTANTS.API_URLS.IMAGE + profile?.image}}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          )}
        </View>

        {/* <Image
          // source={IMAGES.profilePicture}
          source={{uri: CONSTANTS.API_URLS.IMAGE + profile?.image}}
          style={[styles.dp, {width: width * 0.13, height: width * 0.13}]}
          resizeMode="center"
        /> */}

        <Text
          style={[
            FONTS.mediumFont16,
            {color: COLORS.blackWithOpacity, marginLeft: SIZES.ten},
          ]}>
          {profile?.name}
        </Text>
      </MyTouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <MyTouchableOpacity
          style={styles.headerIcons}
          onPress={() => {
            navigation.navigate(SCREENS.Search);
          }}>
          <Icon
            type={IconType.Feather}
            name="search"
            style={{
              color: COLORS.white,
              fontSize: SIZES.twenty,
            }}
          />
        </MyTouchableOpacity>
        <MyTouchableOpacity
          style={styles.headerIcons}
          onPress={() => navigation.navigate(SCREENS.Notification)}>
          <Icon
            type={IconType.Feather}
            name="bell"
            style={{
              color: COLORS.white,
              fontSize: SIZES.twenty,
            }}
          />
        </MyTouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dp: {
    borderRadius: SIZES.fifty,
    borderColor: COLORS.brownGrey,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
  },
  headerIcons: {
    backgroundColor: COLORS.primary,
    padding: SIZES.ten,
    borderRadius: SIZES.fifty,
    marginLeft: SIZES.ten,
  },
  avatar: {
    borderRadius: SIZES.fifty,
    borderColor: COLORS.textInput,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.13,
    height: width * 0.13,
  },
  avatarText: {
    fontSize: SIZES.twenty,
    // color: COLORS.secondary,
    color: '#517A95',
    fontFamily: FONTFAMILY.Medium,
  },
  avatarImage: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: SIZES.fifty,
    borderColor: COLORS.brownGrey,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
  },
});
