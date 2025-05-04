import React from 'react';
import {RefreshControl, Alert, Platform, StatusBar} from 'react-native';
import {COLORS, FONTFAMILY, SCREENS} from '../constants';

import {hideMessage, showMessage} from 'react-native-flash-message';

class utils {
  confirmAlert(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        {text: 'NO', onPress: () => callback('error')},
        {text: 'YES', onPress: () => callback('success')},
      ],
      {cancelable: false},
    );
  }

  successAlert(message) {
    showMessage({
      message: message,
      type: 'success',
      icon: 'success',
      animated: true,
      style:
        Platform.OS === 'android' ? {paddingTop: StatusBar.currentHeight} : {},
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
      onPress: () => {
        hideMessage();
      },
    });
  }

  warningAlert(message) {
    showMessage({
      message: message,
      type: 'warning',
      icon: 'warning',
      animated: true,
      style:
        Platform.OS === 'android' ? {paddingTop: StatusBar.currentHeight} : {},
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
      onPress: () => {
        hideMessage();
      },
    });
  }

  message(message) {
    showMessage({
      message: message,
      animated: true,
      style:
        Platform.OS === 'android' ? {paddingTop: StatusBar.currentHeight} : {},
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
      onPress: () => {
        hideMessage();
      },
    });
  }

  errorAlert(message) {
    showMessage({
      message: message,
      type: 'danger',
      icon: 'danger',
      animated: true,
      style:
        Platform.OS === 'android' ? {paddingTop: StatusBar.currentHeight} : {},
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
      onPress: () => {
        hideMessage();
      },
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  isObjectEmplty(obj) {
    if (Object.keys(obj).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  isNull(obj) {
    if (obj === null || obj === undefined || obj === '') {
      return true;
    } else {
      return false;
    }
  }

  validateEmail(str) {
    var pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(str);
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  storeDataToAsyncStorage = (key, value, callback) => {
    AsyncStorage.setItem(key, value)
      .then(async val => {
        callback({saved: true, error: null, value: value});
      })
      .catch(e => {
        callback({saved: null, error: e, value: null});
      });
  };

  removeDataFromAsyncStorage = (key, callback) => {
    AsyncStorage.removeItem(key)
      .then(async () => {
        callback({success: true, error: null});
      })
      .catch(e => {
        callback({success: false, error: e});
      });
  };

  _refreshControl(refhresList, isRef = false) {
    return (
      <RefreshControl
        refreshing={isRef}
        onRefresh={refhresList}
        title={'Pull to Refresh'}
        tintColor={'blue'}
        colors={['white']}
        progressBackgroundColor={'blue'}
      />
    );
  }

  serializeObj(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p] != '') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  showResponseError(error) {
    if (error.message === 'Network Error') {
      let error = 'Please check your network';
      return error;
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(error.response.status);
        if (errorCode === '400') {
          let response = error.response.data;
          var error = '';
          if (this.isEmpty(response.data)) {
            error = response.message;
          } else {
            error = response.data;
          }
          return error;
        } else if (errorCode === '405') {
          return 'API method not allowed!';
        } else if (errorCode === '404') {
          return 'API not found!';
        } else if (errorCode === '401') {
          return error.response.data.message;

          // let errorResData = JSON.parse(error.response.request._response).message;
          // for (const [, value] of Object.entries(errorResData)) {
          //   return value[0];
          // }
        } else {
          return error?.response?.data?.message;
        }
      }
    }
  }

  getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  formatCurrency(amount, language = 'en-AE') {
    return Number(amount).toLocaleString({
      style: 'currency',
      currency: 'AED',
    });
  }
  _formatCurrency(amount, language = 'en-AE') {
    return Number(amount).toLocaleString('en', {
      style: 'currency',
      currency: 'AED',
    });
  }
}

export default new utils();
