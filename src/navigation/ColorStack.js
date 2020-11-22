import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';
import ROUTES from '@ultis/routes';

import CollectionScreen from '@screens/CollectionScreen';
import ColorListingScreen from '@screens/ColorListingScreen';
import ColorPickerListScreen from '../screens/ColorPickerListScreen';

const Stack = createStackNavigator();

function Main(props) {
  const { theme } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.ColorPickerListScreen}
        component={ColorPickerListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ColorListingScreen}
        component={ColorListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CollectionScreen}
        component={CollectionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Main;
