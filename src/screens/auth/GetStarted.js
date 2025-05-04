import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS, FONTS, IMAGES, SCREENS, SIZES, width} from '../../constants';
import {CustomButton, CustomHeader} from '../../components';

export default function GetStarted({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[FONTS.boldFont24, styles.welcomeText]}>Get Started</Text>
        <Text style={[FONTS.mediumFont16, styles.subText]}>Lorem ipsum</Text>
      </View>

      <View
        style={{
          flex: 0.8,
          marginHorizontal: SIZES.fifteen,
          justifyContent: 'flex-end',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton
          title="Get Started"
          onPress={() => {
            navigation.navigate(SCREENS.Login);
          }}
          btnStyle={{width: width * 0.5}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackground: {
    width: width,
    height: width * 0.9,
    backgroundColor: 'white',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    marginHorizontal: SIZES.fifteen,
  },
  welcomeText: {
    color: COLORS.black,
    marginTop: SIZES.twentyFive,
    width: width * 0.6,
  },
  subText: {
    color: COLORS.brownGrey,
    marginTop: SIZES.five,
  },
  bottomImageBackground: {
    height: width * 0.65,
    width: width * 1,
    // backgroundColor: 'red',
  },
});
