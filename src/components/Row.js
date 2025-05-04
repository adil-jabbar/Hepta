import React from 'react';
import {View, ViewProps} from 'react-native';

const Row = (props: ViewProps) => {
  return (
    <View style={[props.style, {flexDirection: 'row'}]}>{props.children}</View>
  );
};

export default Row;
