import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import ThemeController from '@components/ThemeController';
import { StatusBar } from 'react-native';
import ROUTES from '@ultis/routes';

import CategoryScreen from '@screens/CategoryScreen';
import CollectionScreen from '@screens/CollectionScreen';

const Stack = createStackNavigator();

function Main(props) {
  const { theme } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.CategoryScreen}
        component={CategoryScreen}
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
