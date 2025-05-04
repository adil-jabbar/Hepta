// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Alert, Linking, StyleSheet } from 'react-native';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import { FONTS, IMAGES, SCREENS, SIZES, width } from '../../constants';
// // import LottieView from 'lottie-react-native';
// import { CustomButton } from '../../components';

// const LocationPermissionScreen = ({ navigation }) => {
//   const [permissionStatus, setPermissionStatus] = useState(null);

//   useEffect(() => {
//     // Check permission status when the component mounts
//     // checkPermission();
//   }, []);

//   useEffect(() => {
//     if (permissionStatus === RESULTS.GRANTED) {
//       // Redirect to Home screen if permission is granted
//       navigation.navigate(SCREENS.Home);
//     }
//   }, [permissionStatus]); // Listen for changes to permissionStatus

//   const checkPermission = async () => {
//     const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // For Android
//     setPermissionStatus(status);
//   };

//   const requestPermission = async () => {
//     const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // For Android
//     setPermissionStatus(status);
//   };

//   const openSettings = () => {
//     Linking.openURL('app-settings:');  // Redirect user to app settings if permission is blocked
//   };

//   const renderPermissionContent = () => {
//     if (permissionStatus === RESULTS.DENIED) {
//       return (
//         <View> 
//           <Text style={[FONTS.mediumFont14]}>We need your location to give you ride updates</Text>
//           <CustomButton 
//              btnStyle={{
//                 // width: width * 0.7,
//                 marginTop: SIZES.twentyFive,
//                 alignSelf:'center'
//                   }}
//           title="Grant Permission" onPress={requestPermission} />
//           {/* <Button title="Grant Permission" onPress={requestPermission} /> */}
//         </View>
//       );
//     }

//     if (permissionStatus === RESULTS.GRANTED) {
//       return (
//         <View>
//           <Text>Permission granted! You can now access your location.</Text>
//         </View>
//       );
//     }

//     if (permissionStatus === RESULTS.BLOCKED) {
//       return (
//         <View>
//           <Text>Permission is blocked. Please enable it in settings.</Text>
//           <Button title="Open Settings" onPress={openSettings} />
//         </View>
//       );
//     }

//     return (
//       <View>
//         <Text>Checking permission...</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {/* <LottieView
//             source={IMAGES.LocationLottie} // Replace with your animation source
//             autoPlay
//             loop={true}
//             style={styles.lottie}
//           /> */}
//       <Text style={[FONTS.boldFont24,]}>Allow your location</Text>
//       {renderPermissionContent()}
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//     lottie: {
//       width: width * 0.7,
//       height: width * 0.5,
//     //   backgroundColor:'red'
//     },
//   })

// export default LocationPermissionScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, Linking, StyleSheet, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { FONTS, IMAGES, SCREENS, SIZES, width } from '../../constants';
import { CustomButton } from '../../components';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';


const LocationPermissionScreen = ({ navigation }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const route = useRoute(); // Access the route params

  useEffect(() => {
    checkPermission();
  }, []);

  console.log("selected Status", route.params?.sendTrue);
  

 

  useEffect(() => {
    if (permissionStatus === RESULTS.GRANTED) {
      navigation.navigate(SCREENS.Home, { isSelected: route.params?.sendTrue });
    }
  }, [permissionStatus]);



  const checkPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await check(permission);
    setPermissionStatus(status);
  };

  const requestPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await request(permission);
    setPermissionStatus(status);
  };

  const openSettings = () => {
    Linking.openURL('app-settings:');
  };

  const renderPermissionContent = () => {
    if (permissionStatus === RESULTS.DENIED) {
      return (
        <View>
          <Text style={[FONTS.mediumFont14]}>
            We need your location to give you ride updates
          </Text>
          <CustomButton
            btnStyle={{
              marginTop: SIZES.twentyFive,
              alignSelf: 'center',
            }}
            title="Grant Permission"
            onPress={requestPermission}
          />
        </View>
      );
    }

    if (permissionStatus === RESULTS.GRANTED) {
      return (
        <View>
          <Text>Permission granted! You can now access your location.</Text>
        </View>
      );
    }

    if (permissionStatus === RESULTS.BLOCKED) {
      return (
        <View>
          <Text>Permission is blocked. Please enable it in settings.</Text>
          <Button title="Open Settings" onPress={openSettings} />
        </View>
      );
    }

    return (
      <View>
        <Text>Checking permission...</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[FONTS.boldFont24]}>Allow your location</Text>
       <LottieView
            source={IMAGES.LocationLottie} // Replace with your animation source
            autoPlay
            loop={true}
            style={styles.lottie}
          />
      {renderPermissionContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.7,
    height: width * 0.5,
  },
});

export default LocationPermissionScreen;