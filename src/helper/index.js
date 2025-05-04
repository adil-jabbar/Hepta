import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS} from 'react-native-permissions';
import {Linking, Alert} from 'react-native';

export const getCurrentLocation = async () =>
  new Promise(async (resolve, reject) => {
    await Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export const callNumber = (phone, extension) => {
  console.log('callNumber ----> ', phone, extension);

  // Prepare the phone number with the extension if provided
  let phoneNumber = phone;
  if (extension) {
    phoneNumber = `${phone};ext=${extension}`;
  }

  // Platform-specific URL scheme
  const urlScheme =
    Platform.OS === 'ios' ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;

  Linking.canOpenURL(urlScheme)
    .then(supported => {
      if (!supported) {
        Alert.alert("Can't Dial from Simulator");
      } else {
        return Linking.openURL(urlScheme);
      }
    })
    .catch(err => console.log('Error opening URL:', err));
};

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
          if (result === 'granted') {
            return resolve('granted');
          }
          reject('Permission not 0 granted');
        })
        .catch(error => {
          return reject(error);
        });
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          return reject(error);
        });
    }
  });
