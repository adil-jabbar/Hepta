import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {COLORS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

export default function GeneralLoader(props) {
  return (
    <>
      <View style={[styles.container]}>
        <LinearGradient
          start={{x: 2, y: 1}}
          end={{x: 0, y: 0}}
          colors={[
            'rgb(20,35,33)',
            'rgb(20,35,33)',
            'rgb(19,31,45)',
            'rgb(27,29,42)',
            '#222424',
          ]}
          style={[styles.container]}>
          <ActivityIndicator size="small" color={COLORS.whiteOpacity} />
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    backgroundColor: COLORS.black,
  },
});
