import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, height, SIZES, width} from '../../constants';
import MyTouchableOpacity from '../MyTouchableOpacity';
import Icon, {IconType} from '../Icons';

export default function ImageModal(props) {
  const {image, visible, setVisible} = props;

  return (
    <Modal
      // statusBarTranslucent
      backdropTransitionOutTiming={0}
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={500}
      animationOutTiming={500}
      deviceHeight={height * height}
      onBackdropPress={() => setVisible(false)}
      style={{margin: 0}}>
      <View style={styles.mainView}>
        <MyTouchableOpacity
          style={styles.backIconView}
          onPress={() => setVisible(false)}>
          <Icon
            type={IconType.FontAwesome5}
            name="arrow-left"
            style={{
              color: COLORS.white,
              fontSize: SIZES.twentyFive,
            }}
          />
        </MyTouchableOpacity>

        <Image
          resizeMode="contain"
          source={image.startsWith('http') ? {uri: image} : image}
          style={styles.imgStyle}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  imgStyle: {
    width: width,
    height: height,
  },
  mainView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: COLORS.black,
  },
  backIconView: {
    zIndex: 10,
    left: SIZES.fifteen,
    top: SIZES.twenty,
    position: 'absolute',
  },
});
