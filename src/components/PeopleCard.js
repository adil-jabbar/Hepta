import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  width,
} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';
import {
  hideLoader,
  sendEventAction,
  sendGroupAction,
  showLoader,
  viewProfile,
} from '../redux/slices';
import utils from '../utils';
import {LoaderModal} from './modals';

export default function PeopleCard(props) {
  const {seeProfile, isMember, id, type} = props;
  const navigation = useNavigation();
  const dispatcher = useDispatch();
  const [sent, setSent] = useState();

  let item = props.item;

  const getOtherUserProfile = data => {
    dispatcher(viewProfile(data))
      .unwrap()
      .then(response => {
        navigation.navigate(SCREENS.OtherProfile, {
          data: response?.data?.records,
        });
      })
      .catch(err => {
        console.log(err?.message);
        utils.errorAlert(err?.message);
      });
  };

  const handlePress = data => {
    if (type === 'event') {
      dispatcher(showLoader());
      let body = {
        event_invites: [
          {
            event_id: id,
            receiver_id: data.id,
          },
        ],
      };
      dispatcher(sendEventAction(body))
        .unwrap()
        .then(response => {
          dispatcher(hideLoader());
          console.log('response: ', response);
          setSent('Sent');

          utils.successAlert(data?.name + ' has been added to Event');

          // setmembersList(response?.data?.records);
        })
        .catch(error => {
          dispatcher(hideLoader());

          console.log('logout error: ', error);
        });

      console.log(body);
      return;
    }

    dispatcher(showLoader());
    let body = {
      group_invites: [
        {
          group_id: id,
          receiver_id: data.id,
        },
      ],
    };

    dispatcher(sendGroupAction(body))
      .unwrap()
      .then(response => {
        dispatcher(hideLoader());
        console.log('response: ', response);
        setSent('Sent');
        utils.successAlert(data?.name + ' has been added to Group');
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('logout error: ', error);
      });

    console.log(body);
  };

  return (
    <MyTouchableOpacity
      style={styles.headerContainer}
      onPress={() => {
        getOtherUserProfile(item?.id);
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Image
          resizeMode="contain"
          style={styles.dpStyle}
          // source={item.image}
          source={{uri: CONSTANTS.API_URLS.IMAGE + item?.image}}
        /> */}

        <View style={styles.avatar}>
          {item?.image == null ? (
            <View>
              <Text style={styles.avatarText}>
                {item?.name
                  ?.split(' ')
                  .map(item => item.charAt(0).toUpperCase())
                  .join('')}
              </Text>
            </View>
          ) : (
            <Image
              source={{uri: CONSTANTS.API_URLS.IMAGE + item?.image}}
              style={[styles.avatarImage]}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={{marginHorizontal: SIZES.fifteen}}>
          <Text style={[FONTS.mediumFont16, {color: COLORS.black}]}>
            {item?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              FONTS.mediumFont12,
              {color: COLORS.blackWithOpacity, marginTop: SIZES.five},
            ]}>
            DOB: {item?.date_of_birth || 'Invalid DOB'}
          </Text>
        </View>
      </View>
      {seeProfile ? (
        <View style={{flexDirection: 'column'}}>
          <View
            style={[
              styles.btn,
              {
                backgroundColor: COLORS.primary,
              },
            ]}>
            <Text
              style={[
                FONTS.mediumFont12,
                {
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.five,
                  paddingVertical: SIZES.five - 2,
                  color: COLORS.white,
                },
              ]}>
              See Profile
            </Text>
          </View>
        </View>
      ) : null}
      {isMember ? (
        <MyTouchableOpacity
          onPress={() => (!item?.isRequestAccepted ? handlePress(item) : null)}
          style={{flexDirection: 'column'}}>
          <View
            style={[
              styles.btn,
              {
                width: width * 0.2,
                height: width * 0.07,
                justifyContent: 'center',
                backgroundColor:
                  item?.isRequestAccepted || sent
                    ? COLORS.white
                    : COLORS.primary,
                borderWidth:
                  item?.isRequestAccepted || sent
                    ? StyleSheet.hairlineWidth
                    : 0,
              },
            ]}>
            <Text
              style={[
                FONTS.mediumFont12,
                {
                  color:
                    item?.isRequestAccepted || sent
                      ? COLORS.blackWithOpacity
                      : COLORS.white,
                },
              ]}>
              {/* {!item?.isRequestAccepted ? 'Invite' : 'Member'} */}

              {sent ? 'Sent' : !item?.isRequestAccepted ? 'Invite' : 'Member'}
            </Text>
          </View>
        </MyTouchableOpacity>
      ) : null}
      <LoaderModal />
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dpStyle: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    borderRadius: SIZES.twentyFive,
    justifyContent: 'space-between',
  },

  btn: {
    alignItems: 'center',
    paddingHorizontal: SIZES.five,
    paddingVertical: SIZES.five - 3,
    margin: SIZES.five,
    borderRadius: SIZES.fifteen,
    color: COLORS.white,
  },
  avatar: {
    borderRadius: SIZES.fifty,
    borderColor: COLORS.textInput,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.fifty,
    width: SIZES.fifty,
  },
  avatarText: {
    fontSize: SIZES.twentyFive,
    // color: COLORS.secondary,
    color: '#517A95',
    fontFamily: FONTFAMILY.Medium,
  },
  avatarImage: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty,
    borderColor: COLORS.brownGrey,
    borderWidth: SIZES.five - 3,
    backgroundColor: COLORS.textInput,
  },
});
