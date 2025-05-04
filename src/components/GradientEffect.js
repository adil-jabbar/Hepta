import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '../constants';

export default function GradientEffect(props) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.gradientView}
      colors={[COLORS.transparent, COLORS.white]}
    />
  );
}

const styles = StyleSheet.create({
  gradientView: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    height: SIZES.fifty * 1.2,
  },
});
