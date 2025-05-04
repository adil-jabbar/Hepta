import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {COLORS, FONTFAMILY, FONTS, height, SIZES, width} from '../../constants';
import Icon, {IconType} from '../Icons';
import MyTouchableOpacity from '../MyTouchableOpacity';

export default function PermissionModal(props) {
  const {
    visible,
    setVisible,
    title,
    onDone,
    onCancel,
    ActionText,
    description,
  } = props;

  return (
    <Modal
      statusBarTranslucent
      backdropTransitionOutTiming={0}
      isVisible={visible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      deviceHeight={height * height}
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.mainView}>
        <Text style={[FONTS.mediumFont16, styles.titleStyle]}>{title}</Text>
        {description ? (
          <Text style={[FONTS.mediumFont12, styles.descStyle]}>
            {description}
          </Text>
        ) : null}

        {/* <View style={styles.btnContainer}>
          <MyTouchableOpacity
            onPress={() => {
              setVisible(false);
              onCancel();
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[styles.btnStyle]}
              colors={[COLORS.primary, COLORS.primary]}>
              <Icon
                name="x"
                type={IconType.Feather}
                style={{
                  alignSelf: 'center',
                  color: COLORS.white,
                  marginRight: SIZES.ten,
                  fontSize: SIZES.twentyFive * 1.2,
                }}
              />

              <Text style={[FONTS.mediumFont16, {color: COLORS.white}]}>
                No
              </Text>
            </LinearGradient>
          </MyTouchableOpacity>

          <MyTouchableOpacity
            onPress={() => {
              setVisible(false);
              onDone();
            }}
            style={styles.btnStyle2}>
            <Icon
              name="check"
              type={IconType.AntDesign}
              style={{
                alignSelf: 'center',
                color: COLORS.black,
                marginRight: SIZES.ten,
                fontSize: SIZES.twentyFive * 1.2,
              }}
            />

            <Text style={[FONTS.mediumFont16, {color: COLORS.black}]}>Yes</Text>
          </MyTouchableOpacity>
        </View> */}

        <MyTouchableOpacity
          onPress={() => {
            setVisible(false);
            onDone();
          }}
          style={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: COLORS.brownGrey,
            borderBottomWidth: StyleSheet.hairlineWidth,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.Bold,
              fontSize: SIZES.body16,
              color: '#EE4B2B',
              paddingVertical: SIZES.ten + 3,
            }}>
            {ActionText ? ActionText : 'Log out'}
          </Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity
          onPress={() => {
            setVisible(false);
            onCancel();
          }}
          style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: FONTFAMILY.Medium,
              fontSize: SIZES.body16,
              color: COLORS.red,
              paddingVertical: SIZES.ten + 3,
            }}>
            Cancel
          </Text>
        </MyTouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: width * 0.8,
    alignSelf: 'center',
    padding: SIZES.twenty,
    borderRadius: SIZES.ten,
    backgroundColor: COLORS.white,
  },
  headingStyle: {
    color: COLORS.black,
    marginTop: SIZES.five,
    textAlign: 'center',
  },
  titleStyle: {
    color: COLORS.gray,
    textAlign: 'center',
    marginVertical: SIZES.twenty,
  },
  descStyle: {
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.twenty,
  },
  btnContainer: {
    marginTop: SIZES.ten,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.ten,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.ten,
    paddingHorizontal: SIZES.twentyFive,
  },
  btnStyle2: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.gray,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.ten,
    paddingVertical: SIZES.ten,
    paddingHorizontal: SIZES.twentyFive,
  },
});
