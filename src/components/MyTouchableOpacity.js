import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export default function MyTouchableOpacity(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity activeOpacity={0.75} {...props}>
      {props.children}
    </TouchableOpacity>
  );
}
