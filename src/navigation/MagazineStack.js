import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import ThemeController from '@components/ThemeController';
import { StatusBar } from 'react-native';
import ROUTES from '@ultis/routes';

import MagazineBlogsScreen from '@screens/MagazineBlogsScreen';
import PostDetailsScreen from '@screens/PostDetailsScreen';

const Stack = createStackNavigator();

function Main(props) {
  const { theme } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.MagazineBlogsScreen}
        component={MagazineBlogsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PostDetailsScreen}
        component={PostDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Main;
