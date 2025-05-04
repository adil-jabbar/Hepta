import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';

export default function MemberCard(props) {
  const {item, showRemoveBtn} = props;

  return (
    <MyTouchableOpacity style={styles.cardContainer}>
      <Image resizeMode="contain" source={item.image} style={styles.imgStyle} />

      <View style={{flex: 1, marginHorizontal: SIZES.fifteen}}>
        <Text
          numberOfLines={1}
          style={[FONTS.mediumFont18, {color: COLORS.black}]}>
          {item.name}
        </Text>
      </View>

      {showRemoveBtn ? (
        <MyTouchableOpacity style={styles.inviteBtnStyle1} onPress={() => {}}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.secondary}]}>
            Remove
          </Text>
        </MyTouchableOpacity>
      ) : item.invited ? (
        <MyTouchableOpacity onPress={() => {}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.inviteBtnStyle2}
            colors={[COLORS.secondary, COLORS.primary]}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>
              Invited
            </Text>
          </LinearGradient>
        </MyTouchableOpacity>
      ) : (
        <MyTouchableOpacity style={styles.inviteBtnStyle1} onPress={() => {}}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.secondary}]}>
            Invite
          </Text>
        </MyTouchableOpacity>
      )}
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.twentyFive,
  },
  imgStyle: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty,
  },
  inviteBtnStyle1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.twenty,
    paddingVertical: SIZES.ten,
    borderRadius: SIZES.five * 1.4,
    paddingHorizontal: SIZES.fifteen - 1,
    backgroundColor: COLORS.lightestBlue,
  },
  inviteBtnStyle2: {
    padding: SIZES.ten,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.twenty,
    borderRadius: SIZES.five * 1.4,
  },
});
