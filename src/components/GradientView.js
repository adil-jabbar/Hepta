import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '../constants';

export default function GradientView(props) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.secondary, COLORS.primary]}
      style={styles.btn}>
      {props.children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: SIZES.fifteen,
  },
});
