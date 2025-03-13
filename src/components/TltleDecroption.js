import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';

export default function TltleDecroption({ title, dec }) {
  return (
    <View style={{}}>
      <Text style={[FONTS.boldFont16, { color: COLORS.appBlue, marginVertical: SIZES.five }]}>{title}</Text>
      <Text style={FONTS.mediumFont12}>{dec}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
