import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MyTouchableOpacity from './MyTouchableOpacity';
import Icon, {IconType} from './Icons';
import BackButton from './BackButton';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../constants';

export default function CustomHeader(props) {
  const {
    type,
    darkTheme,
    title,
    titleStyle,
    showLogo,
    showBackButton,
    backArrowColor,
    backArrowStyle,
    showMoreIcon,
    showProfilePic,
    showEditIcon,
    profilePicture,
    editIconColor,
    onEditIconPress,
    showGraphIcon,
    showRightBtn,
    rightBtnTitle,
    onRightBtnPress,
    rightBtnTheme = 'normal',
    chatIcon,
    onChatPress,
    otherProfile,
    onGraphIconPress,
  } = props;
  const navigation = useNavigation();
  // const user = useSelector(state => state.profile.profile);

  return (
    <LinearGradient
      start={{x: 0, y: 3}}
      end={{x: 1, y: 0}}
      style={[styles.container]}
      colors={
        // darkTheme
        //   ? [COLORS.secondary, COLORS.primary]
        //   :
        [COLORS.transparent, COLORS.transparent]
      }>
      <View style={{flex: 0.4}}>
        {showBackButton ? (
          <BackButton
            backArrowColor={backArrowColor}
            backArrowStyle={backArrowStyle}
          />
        ) : showMoreIcon ? (
          <MyTouchableOpacity
            style={[styles.moreIconView, STYLES.shadow]}
            onPress={() => navigation.toggleDrawer()}>
            <Image
              resizeMode="contain"
              source={IMAGES.Menu}
              style={styles.moreIconStyle}
            />
          </MyTouchableOpacity>
        ) : null}
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        {title ? (
          <Text
            numberOfLines={1}
            style={[
              title.length > 15 ? FONTS.mediumFont18 : FONTS.mediumFont18,
              {
                color:
                  //  darkTheme ? COLORS.white :
                  COLORS.black,
              },
              titleStyle,
            ]}>
            {title}
          </Text>
        ) : showLogo ? (
          <Image
            resizeMode="contain"
            source={IMAGES.notNewHeaderLogo}
            style={styles.logoStyle}
          />
        ) : null}
      </View>

      <View style={{flex: 0.4, alignItems: 'flex-end'}}>
        {showProfilePic ? (
          <View style={styles.avatar}>
            {profilePicture == 'null' ? (
              <View>
                <Text style={styles.avatarText}>
                  {title
                    ?.split(' ')
                    .map(item => item.charAt(0).toUpperCase())
                    .join('')}
                </Text>
              </View>
            ) : (
              <Image
                source={{uri: CONSTANTS.API_URLS.IMAGE + profilePicture}}
                style={styles.profilePicStyle}
              />
            )}
          </View>
        ) : showEditIcon ? (
          <MyTouchableOpacity onPress={onEditIconPress}>
            <Icon
              type={IconType.Feather}
              name={'edit'}
              style={{
                color: editIconColor || COLORS.black,
                fontSize: SIZES.twentyFive,
              }}
            />
          </MyTouchableOpacity>
        ) : showGraphIcon ? (
          <MyTouchableOpacity onPress={onGraphIconPress}>
            <Icon
              type={IconType.MaterialCommunityIcons}
              name={'export'}
              style={{
                color: COLORS.black,
                fontSize: SIZES.twentyFive * 1.1,
                transform: [{rotate: '180deg'}], // You can adjust the angle as needed
              }}
            />
          </MyTouchableOpacity>
        ) : showRightBtn ? (
          rightBtnTheme === 'dark' ? (
            <MyTouchableOpacity onPress={onRightBtnPress}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.rightBtnStyle}
                colors={[COLORS.primary, COLORS.primary]}>
                <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
                  {rightBtnTitle}
                </Text>
              </LinearGradient>
            </MyTouchableOpacity>
          ) : (
            <MyTouchableOpacity onPress={onRightBtnPress}>
              <Icon
                type={IconType.AntDesign}
                name={'setting'}
                style={{
                  color: COLORS.black,
                  fontSize: SIZES.twentyFive * 1.1,
                }}
              />
            </MyTouchableOpacity>
          )
        ) : otherProfile ? (
          <MyTouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.Chat);
            }}
            style={{
              padding: SIZES.ten,
              borderRadius: width,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: width,
            }}>
            <Icon
              name={'message-square'}
              type={IconType.Feather}
              color={COLORS.white}
            />
          </MyTouchableOpacity>
        ) : chatIcon ? (
          <MyTouchableOpacity
            onPress={() => {
              onChatPress();
            }}
            style={{
              padding: SIZES.ten,
              borderRadius: width,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: width,
            }}>
            <Icon
              name={'ios-chatbubble-ellipses-outline'}
              type={IconType.Ionicons}
              color={COLORS.white}
            />
          </MyTouchableOpacity>
        ) : null}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.fifteen * 1.2,
    paddingHorizontal: SIZES.fifteen,
  },
  logoStyle: {
    width: SIZES.fifty * 3.5,
    height: SIZES.twentyFive * 1.6,
  },
  moreIconStyle: {
    width: SIZES.twentyFive,
    height: SIZES.twentyFive,
    tintColor: COLORS.black,
  },
  profilePicStyle: {
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty * 2,
  },
  moreIconView: {
    // elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty * 2,
    backgroundColor: COLORS.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,

    elevation: 6,
  },
  rightBtnStyle: {
    alignSelf: 'flex-end',
    borderRadius: SIZES.ten,
    paddingVertical: SIZES.ten,
    backgroundColor: COLORS.red,
    paddingHorizontal: SIZES.fifteen,
  },
  avatar: {
    borderRadius: SIZES.fifty,
    borderColor: COLORS.textInput,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
  },
  avatarText: {
    fontSize: SIZES.twentyFive,
    // color: COLORS.secondary,
    color: '#517A95',
    fontFamily: FONTFAMILY.Medium,
  },
});
