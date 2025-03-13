import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constants';
import GetStarted from '../screens/auth/GetStarted.js';
import Login from '../screens/auth/Login.js';
import Tasks from '../screens/tasks/Tasks.js';
import DrawerNavigation from './DrawerNavigation.js';
import History from '../screens/activities/History.js';
import { useSelector } from 'react-redux';
import Home from '../screens/home/Home.js';

export default function MainNavigation() {
  const Stack = createNativeStackNavigator();
  const token = useSelector(state => state.auth.accessToken);

  console.log("Token", token);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          gestureEnabled: true,
        }}
      >
        {token == null ? (
          <>
            <Stack.Screen name={SCREENS.GetStarted} component={GetStarted} />
            <Stack.Screen name={SCREENS.Login} component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen
              name={SCREENS.DrawerNavigator}
              component={DrawerNavigation}
            />
            <Stack.Screen name={SCREENS.Tasks} component={Tasks} />
            <Stack.Screen name={SCREENS.History} component={History} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
