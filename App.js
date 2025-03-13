import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import FlashMessage from 'react-native-flash-message';
import {COLORS, IMAGES, SIZES} from './src/constants';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AnimatedSplash from "react-native-animated-splash-screen";

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // SplashScreen.hide();
    setTimeout(() => {
      setIsReady(true);
    }, 1000); // 3-second loading time for the splash screen
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

    <View style={{flex: 1}}>
    <AnimatedSplash
        // translucent={true}
        isLoaded={isReady}
        logoImage={IMAGES.LogoPurple}
        backgroundColor={"#262626"}
        logoHeight={250}
        logoWidth={250}
      >
      <MainNavigation />
      </AnimatedSplash>
      <FlashMessage
        position="top"
        floating={true}
        style={{paddingRight: SIZES.twentyFive}}
      />
    </View>
    </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;


<Provider store={store}>
<StatusBar
  backgroundColor="#ffffff"
  barStyle={'dark-content'}
  // translucent={true}
/>
<PersistGate loading={null} persistor={persistor}>
  <View style={{flex: 1}}>
    <MainNavigation />
    <FlashMessage
      position="top"
      floating={true}
      style={{paddingRight: SIZES.twentyFive}}
    />
  </View>
</PersistGate>
</Provider>
