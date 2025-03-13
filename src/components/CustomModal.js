import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal, {ModalProps} from 'react-native-modal';

export default function CustomModal(props: ModalProps) {
  return (
    <ReactNativeModal
      statusBarTranslucent
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      {...props}>
      {props.children}
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({});