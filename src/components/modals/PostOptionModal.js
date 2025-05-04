import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, FONTS, SCREENS, SIZES, width} from '../../constants';
import Icon, {IconType} from '../Icons';
import Card from '../Card';
import MyTouchableOpacity from '../MyTouchableOpacity';
import PermissionModal from './PermissionModal';
import {useNavigation} from '@react-navigation/native';
import {deletePostAction, postAction} from '../../redux/slices';
import {useDispatch, useSelector} from 'react-redux';
import utils from '../../utils';

export default function PostOptionModal({
  item,
  visibility,
  setVisibility,
  onDeleteSuccess,
  isgroup,
  isevent,
}) {
  const navigation = useNavigation();
  const dispatcher = useDispatch();
  const {profile} = useSelector(state => state.profile);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = React.useState(false);
  const SideBarText = ({iconColor, title, icon, color, txtcolor, type}) => {
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
          },
          color,
        ]}>
        <Icon
          type={type || IconType.Ionicons}
          name={icon}
          color={iconColor || COLORS.black}
          size={SIZES.twenty}
          style={{marginLeft: SIZES.ten}}
        />
        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.black, marginLeft: SIZES.fifteen},
            txtcolor,
          ]}>
          {title}
        </Text>
      </View>
    );
  };

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    const deleteAction = async () => {
      let deletePostData = {
        post_id: item?.id,
      };

      dispatcher(deletePostAction(deletePostData))
        .unwrap()
        .then(response => {
          console.log('response', response);
          utils.successAlert(response.message);
          dispatcher(postAction());
          // navigation.goBack();
          onDeleteSuccess(true);
        })
        .catch(error => {
          utils.errorAlert(error?.message);
          console.log('login error: ', error);
        });
    };
    return (
      <View style={styles.bottomSheetBody}>
        <View style={styles.notch} />

        {profile?.id !== item?.user?.id ? (
          <View>
            <MyTouchableOpacity
              onPress={() => {
                setVisibility(false);
                setTimeout(() => {
                  navigation.navigate(SCREENS.AboutAccount, {
                    item: item,
                  });
                }, 200);
              }}>
              <SideBarText
                type={IconType.Feather}
                // icon={'user'}
                title={'About this Account'}
              />
            </MyTouchableOpacity>
          </View>
        ) : (
          <View>
            <MyTouchableOpacity
              onPress={() => {
                setVisibility(false);
                setTimeout(() => {
                  navigation.navigate(SCREENS.PostScreen, {
                    edit: true,
                    item: item,
                    isgroup,
                    isevent,
                  });
                }, 200);
              }}>
              <SideBarText
                type={IconType.Feather}
                // icon={'user'}
                title={'Edit Post'}
              />
            </MyTouchableOpacity>
            <MyTouchableOpacity onPress={() => setIsLogoutModalVisible(true)}>
              <SideBarText
                iconColor={'#EE4B2B'}
                title={'Delete Post'}
                // icon={'warning-outline'}
                color={{}}
                txtcolor={{color: '#EE4B2B'}}
              />
            </MyTouchableOpacity>
          </View>
        )}

        <View style={{height: SIZES.twentyFive}} />
        <PermissionModal
          ActionText={'Delete'}
          visible={isLogoutModalVisible}
          setVisible={setIsLogoutModalVisible}
          title="Are you sure you want to delete this post?"
          onDone={() => {
            setIsLogoutModalVisible(false);

            setTimeout(() => {
              setVisibility(false);

              deleteAction();
            }, 300);
          }}
          onCancel={() => {}}
        />
      </View>
    );
  };

  return (
    <Modal
      statusBarTranslucent
      backdropTransitionOutTiming={0}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      isVisible={visibility}
      style={styles.modal}
      onBackdropPress={() => setVisibility(false)}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    borderTopStartRadius: SIZES.ten,
    borderTopEndRadius: SIZES.ten,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  notch: {
    height: width * 0.01,
    width: width * 0.1,
    alignSelf: 'center',
    borderRadius: SIZES.twenty,
    marginBottom: SIZES.twenty,
    backgroundColor: COLORS.textInput,
  },
});
