import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  width,
} from '../constants';
import moment from 'moment';
import Icon, {IconType, Icons} from '../components/Icons';
import utils from '../utils';
import PermissionModal from '../components/modals/PermissionModal';
import { logout } from '../redux/slices';
import { useDispatch } from 'react-redux';

export default function DrawerContent(props) {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = React.useState(false);

  const dispatcher = useDispatch();

  // const openLink = async payUrl => {
  //   try {
  //     const url = payUrl;
  //     if (await InAppBrowser.isAvailable()) {
  //       const result = await InAppBrowser.open(url, {
  //         // iOS Properties
  //         dismissButtonStyle: 'cancel',
  //         preferredBarTintColor: COLORS.primary,
  //         preferredControlTintColor: 'white',
  //         readerMode: false,
  //         animated: true,
  //         modalPresentationStyle: 'fullScreen',
  //         modalTransitionStyle: 'coverVertical',
  //         modalEnabled: true,
  //         enableBarCollapsing: false,
  //         // Android Properties
  //         showTitle: true,
  //         toolbarColor: COLORS.blackOpacity,
  //         secondaryToolbarColor: 'black',
  //         navigationBarColor: 'black',
  //         navigationBarDividerColor: 'white',
  //         enableUrlBarHiding: true,
  //         enableDefaultShare: true,
  //         forceCloseOnRedirection: false,
  //         // Specify full animation resource identifier(package:anim/name)
  //         // or only resource name(in case of animation bundled with app).
  //         animations: {
  //           startEnter: 'slide_in_right',
  //           startExit: 'slide_out_left',
  //           endEnter: 'slide_in_left',
  //           endExit: 'slide_out_right',
  //         },
  //         headers: {
  //           'my-custom-header': 'my custom header value',
  //         },
  //       });
  //       await this.sleep(800);
  //       Alert.alert(JSON.stringify(result));
  //     } else Linking.openURL(url);
  //   } catch (error) {
  //     // Alert.alert(error.message);
  //   }
  // };

  const logoutAction = async () => {
    setIsLogoutModalVisible(false);
    // navigateToNextScreen(SCREENS.Login);
    dispatcher(logout(''))
      .unwrap()
      .then(response => {
        // dispatcher(hideLoader());
            // navigateToNextScreen(SCREENS.Login);
            // navigation.navigate(SCREENS.Login)

      })
      .catch(error => {
        // dispatcher(hideLoader());
        console.log('logout error: ', error);
      });
  };

  const SideBarText = ({type, iconColor, title, icon, color, txtcolor}) => {
    return (
      <View
        style={[
          {
            backgroundColor: COLORS.textInput,
            paddingVertical: SIZES.fifteen,
            borderRadius: SIZES.fifteen,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: SIZES.five + 2,
            justifyContent: 'space-between',
          },
          color,
        ]}>
        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.black, marginLeft: SIZES.fifteen},
            txtcolor,
          ]}>
          {title}
        </Text>

        <Icon
          type={type || IconType.Feather}
          name={icon || 'chevron-right'}
          color={iconColor || COLORS.brownGrey}
          size={SIZES.twenty}
          style={{marginRight: SIZES.ten}}
        />
      </View>
    );
  };

  const navigateToNextScreen = screenName => {
    props.navigation.navigate(screenName);
  };

  return (
    <SafeAreaView
      {...props}
      style={{
        flex: 1,
        backgroundColor: COLORS.whiteOpacity,
        paddingTop: SIZES.twentyFiveWidth,
      }}>
      <View
        style={{
          marginTop: SIZES.twentyFive,
          paddingHorizontal: SIZES.fifteen,
          justifyContent: 'flex-start',
        }}>
        <View
          activeOpacity={0.85}
          onPress={() => {
            // navigateToNextScreen(SCREENS.MyProfile);
          }}>
          <View
            style={{
              // flexDirection: 'row',
              borderBottomColor: COLORS.brownGrey,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingBottom: SIZES.ten,
              marginBottom: SIZES.ten,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {'Daniel A'
                    .split(' ')
                    .map(item => item.toUpperCase().substring(0, 1))
                    .join('')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: SIZES.ten,
                  marginTop: SIZES.ten,
                  width: '60%',
                }}>
                <Text
                  lineBreakMode="tail"
                  numberOfLines={1}
                  style={{
                    fontFamily: FONTFAMILY.Medium,
                    fontSize: SIZES.body16,
                    color: COLORS.black,
                    marginBottom: SIZES.five,
                  }}>
                  Daniel A.
                </Text>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.Regular,
                    fontSize: SIZES.body12,
                    color: COLORS.black,
                    marginBottom: SIZES.five,
                  }}>
                  +966 552233445
                </Text>
              </View>
            </View>
          </View>
        </View>


        <TouchableOpacity
          onPress={() => {
            navigateToNextScreen(SCREENS.Tasks);
          }}
          // onPress={() => {
          //   utils.message(
          //     'In Alpha: Limited Features, Thank You for Understanding',
          //   );
          // }}
        >
          <SideBarText title={'Tasks'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigateToNextScreen(SCREENS.History);
          }}>
          <SideBarText title={'Activities'} />
        </TouchableOpacity>

        {/* <TouchableOpacity
          // onPress={() => {
          //   utils.message(
          //     'In Alpha: Limited Features, Thank You for Understanding',
          //   );
          // }}

          onPress={() => {
            // openLink('https://derby-coffee.mytechmaestro.com/privacy-policy');
          }}>
          <SideBarText title={'Privacy Policy'} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => {
            // openLink('https://derby-coffee.mytechmaestro.com/terms-conditions');
          }}>
          <SideBarText title={'Terms & Conditions'} />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginHorizontal: SIZES.fifteen,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.primary,
            padding: SIZES.fifteen,
            borderRadius: SIZES.ten,
          }}>
          <View>
            <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
              Wallet
            </Text>
            <Text style={[FONTS.boldFont24, {color: COLORS.white}]}>0.00</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
              Balance
            </Text>
            <Text style={[FONTS.boldFont24, {color: COLORS.white}]}>0.00</Text>
          </View>
        </View>
      </View>
      {/* 
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginHorizontal: SIZES.fifteen,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsLogoutModalVisible(true);
          }}>
          <SideBarText
            iconColor={COLORS.white}
            icon={'wallet'}
            type={IconType.Entypo}
            title={'Wallet'}
            color={{
              borderRadius: SIZES.fifteen,
              backgroundColor: COLORS.primary,

              // marginBottom: SIZES.twentyFive * 1.5,
            }}
            txtcolor={{color: '#fff'}}
          />
          <SideBarText
            iconColor={COLORS.black}
            icon={'wallet'}
            type={IconType.Entypo}
            title={'Balance'}
            color={{
              borderRadius: SIZES.fifteen,
              backgroundColor: COLORS.primaryTransparent,

              // marginBottom: SIZES.twentyFive * 1.5,
            }}
            txtcolor={{color: '#000'}}
          />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          // flex: 1,
          justifyContent: 'flex-end',
          marginHorizontal: SIZES.fifteen,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsLogoutModalVisible(true);
          }}>
          <SideBarText
            iconColor={COLORS.white}
            icon={'logout'}
            title={'Log out'}
            color={{
              backgroundColor: COLORS.transparent,
              paddingVertical: SIZES.twenty,
              borderRadius: SIZES.fifteen,
              marginBottom: SIZES.twentyFive * 1.5,
            }}
            txtcolor={{color: '#EE4B2B'}}
          />
        </TouchableOpacity>
      </View>

      <PermissionModal
        visible={isLogoutModalVisible}
        setVisible={setIsLogoutModalVisible}
        title="Log out of your account?"
        description="Are you sure you want to log out? We'll miss you! This action cannot be undone."
        onDone={() => {
          logoutAction();
        }}
        onCancel={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AppLogo: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: SIZES.twentyFive + 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: SIZES.ten,
    padding: SIZES.fifteen,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {},
  textStyle: {
    color: COLORS.greensecondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  avatar: {
    width: 88,
    height: 88,
    borderWidth: 4,
    borderRadius: 24,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#517A95',
    backgroundColor: COLORS.primary,
  },
  avatarText: {
    fontSize: SIZES.twentyFive + 5,
    color: COLORS.white,
    // color: '#517A95',
    fontFamily: FONTFAMILY.Medium,
  },
});
