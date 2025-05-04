import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  COLORS,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';
import CustomHeader from './CustomHeader';
import Icon, { IconType } from './Icons';

export default function ProfileHeader(props) {
  const { otherProfile, selectedTab, onTabPress } = props;
  const navigation = useNavigation();

  return (
    <>
      {/* {!otherProfile ? <View style={styles.headerView} /> : null} */}

      <CustomHeader
        title={otherProfile ? 'Doctor' : 'Profile'}
        showBackButton={true}
        showEditIcon={!otherProfile}
        light
        backArrowStyle={{
          borderColor: otherProfile ? COLORS.black : COLORS.black,
        }}
        backArrowColor={otherProfile ? COLORS.black : COLORS.black}
        editIconColor={otherProfile ? COLORS.black : COLORS.black}
        titleStyle={{ color: otherProfile ? COLORS.black : COLORS.black }}
        onEditIconPress={() =>
          otherProfile ? {} : navigation.navigate(SCREENS.EditProfile)
        }
      />

      {/* <View style={[styles.headerSubView, STYLES.shadow]}>
        <View style={styles.flexRow}>
          <View style={{flex: 1, marginLeft: SIZES.fifteen}}>
            <Text style={[FONTS.boldFont22, {color: COLORS.black}]}>
              Lehieuds
            </Text>
            <Text
              style={[
                FONTS.mediumFont14,
                {color: COLORS.gray, marginTop: SIZES.ten},
              ]}>
              Lorem Ipsum dicolora amit sed, eluit
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: SIZES.twentyFive * 1.5}}>
          <View style={{flex: 0.5}}>
            <Icon
              type={IconType.Feather}
              name="phone-call"
              style={{
                color: COLORS.secondary,
                fontSize: SIZES.twentyFive - 1,
              }}
            />
            <Text
              style={[
                FONTS.mediumFont16,
                {
                  color: COLORS.black,
                  marginTop: SIZES.ten + 1,
                },
              ]}>
              419-325-9154
            </Text>
          </View>

          <View style={{flex: 0.5}}>
            <Icon
              type={IconType.Feather}
              name="mail"
              style={{
                color: COLORS.secondary,
                fontSize: SIZES.twentyFive + 2,
              }}
            />
            <Text
              style={[
                FONTS.mediumFont16,
                {
                  color: COLORS.black,
                  marginTop: SIZES.ten - 2,
                },
              ]}>
              johndeen@gmail.com
            </Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <MyTouchableOpacity onPress={() => onTabPress('bio')}>
            <Text
              style={[
                FONTS.mediumFont14,
                {color: selectedTab === 'bio' ? COLORS.black : COLORS.gray},
              ]}>
              Bio
            </Text>

            {selectedTab === 'bio' && <View style={styles.lineStyle} />}
          </MyTouchableOpacity>

          {otherProfile && (
            <MyTouchableOpacity onPress={() => onTabPress('medical')}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {
                    color:
                      selectedTab === 'medical' ? COLORS.black : COLORS.gray,
                  },
                ]}>
                Medical Records
              </Text>

              {selectedTab === 'medical' && <View style={styles.lineStyle} />}
            </MyTouchableOpacity>
          )}
        </View>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  headerView: {
    // top: 0,
    // left: 0,
    // right: 0,
    // position: 'absolute',
    // height: height * 0.3,
    // backgroundColor: COLORS.primary,
    // borderBottomLeftRadius: SIZES.twentyFive * 1.5,
    // borderBottomRightRadius: SIZES.twentyFive * 1.5,
  },
  headerSubView: {
    padding: SIZES.twenty,
    marginTop: SIZES.twentyFive,
    marginHorizontal: SIZES.twenty,
    borderRadius: SIZES.fifteen,
    backgroundColor: COLORS.white,
  },
  headerImgStyle: {
    width: SIZES.fifty * 2,
    height: SIZES.fifty * 2,
    borderRadius: SIZES.fifteen,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.twenty,
  },
  lineStyle: {
    borderWidth: 1.5,
    borderRadius: 2,
    borderColor: COLORS.secondary,
    marginTop: SIZES.five * 1.6,
  },
});
