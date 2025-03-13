// import React from 'react';
// import {
//   ActivityIndicator,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import {COLORS, FONTFAMILY, FONTS, height, SIZES, width} from '../../constants';
// import {BlurView, VibrancyView} from '@react-native-community/blur';
// import {useSelector} from 'react-redux';

// export default function LoaderModal(props) {
//   const visibility = useSelector(state => state.loader.isVisible);

//   return (
//     <Modal
//       statusBarTranslucent
//       backdropOpacity={0}
//       backdropTransitionOutTiming={0}
//       isVisible={visibility}
//       animationIn={'fadeIn'}
//       animationOut={'fadeOut'}
//       deviceHeight={height * height}>
//       <View style={styles.mainView}>
//         {Platform.OS === 'ios' ? (
//           <VibrancyView blurType="dark" style={styles.flex}>
//             <ActivityIndicator size={'large'} color={COLORS.white} />
//           </VibrancyView>
//         ) : (
//           <View
//             style={{
//               width: width * 0.4,
//               height: width * 0.4,
//               justifyContent: 'center',
//               alignSelf: 'center',
//               borderRadius: SIZES.ten,
//               overflow: 'hidden',
//             }}>
//             <BlurView
//               style={styles.absolute}
//               blurType="dark"
//               blurAmount={50}
//               reducedTransparencyFallbackColor="white"
//             />
//             <ActivityIndicator size={'large'} color={COLORS.white} />
//           </View>
//         )}
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   mainView: {
//     width: width * 0.4,
//     height: width * 0.4,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     borderRadius: SIZES.ten,
//   },
//   flex: {
//     width: width * 0.4,
//     height: width * 0.4,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     borderRadius: SIZES.ten,
//   },
//   absolute: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     // width: width * 0.4,
//     // height: width * 0.4,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     borderRadius: SIZES.ten,
//   },
// });
