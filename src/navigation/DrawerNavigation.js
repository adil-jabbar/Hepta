import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SCREENS, width} from '../constants';
import DrawerContent from './DrawerContent';
import Home from '../screens/home/Home';
import {useRoute} from '@react-navigation/native';
import LocationPermissionScreen from '../screens/home/PermissionScreen';

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
  const route = useRoute(); // Access route params
  const sendTrue = route?.params?.sendTrue;

  return (
    <Drawer.Navigator
      // initialRouteName={initialRouteName} // Set the initial route based on conditions
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        gestureEnabled: false,
      }}
      drawerStyle={{
        width: width,
      }}
      drawerContent={props => <DrawerContent {...props} />}>



      <Drawer.Screen
        initialParams={{sendTrue}} // Pass sendTrue to Home screen as initialParams
        name={SCREENS.PermissionScreen}
        component={LocationPermissionScreen}
      />
                  <Drawer.Screen name={SCREENS.Home} component={Home} />
      
    </Drawer.Navigator>
  );
}
