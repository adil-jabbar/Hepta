import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, height, IMAGES, SCREENS, SIZES} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';
import CustomHeader from './CustomHeader';

export default function GroupHeader(props) {
  const {members} = props;
  const navigation = useNavigation();

  return (
    <View>
      <ImageBackground
        source={IMAGES.groupPhoto}
        borderBottomLeftRadius={SIZES.twentyFive * 1.2}
        borderBottomRightRadius={SIZES.twentyFive * 1.2}
        style={{height: height * 0.2}}>
        <View style={styles.shadowStyle} />

        <CustomHeader showBackButton backArrowColor={COLORS.white} />
      </ImageBackground>

      <View style={styles.viewStyle}>
        <Image source={IMAGES.groupLogo1} style={styles.imgStyle} />

        <MyTouchableOpacity activeOpacity={0.95} style={styles.membersView}>
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
  );
}

const styles = StyleSheet.create({
  shadowStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: COLORS.black + 85,
    borderBottomLeftRadius: SIZES.twentyFive * 1.2,
    borderBottomRightRadius: SIZES.twentyFive * 1.2,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: -SIZES.twentyFive * 1.5,
    paddingHorizontal: SIZES.twenty,
  },
  imgStyle: {
    borderWidth: 2,
    borderColor: COLORS.white,
    height: SIZES.fifty * 1.6,
    width: SIZES.fifty * 1.6,
    borderRadius: SIZES.fifty * 1.6,
  },
  membersView: {
    flexDirection: 'row',
  },
  memberImgStyle: {
    borderWidth: 1,
    borderColor: COLORS.white,
    marginLeft: -SIZES.twenty * 1.2,
    width: SIZES.twentyFive * 1.9,
    height: SIZES.twentyFive * 1.9,
    borderRadius: SIZES.twentyFive * 1.9,
  },
  moreMembersView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
});
