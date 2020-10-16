import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import ThemeController from '@components/ThemeController';
import { StatusBar } from 'react-native';
import ROUTES from '@ultis/routes';

import HomeScreen from '../screens/HomeScreen';
import ListProductsScreen from '../screens/ListProductsScreen';
import SingleProductScreen from '../screens/SingleProductScreen';
import StoreScreen from '../screens/StoreScreen';
import DealScreen from '../screens/DealScreen';
import DirectMapScreen from '../screens/DirectMapScreen';
import VideoScreen from '../screens/VideoScreen';
import ScanCodeScreen from '../screens/ScanCodeScreen';
import CommentScreen from '../screens/CommentScreen';
import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';
import SizeGuideScreen from '../screens/SizeGuideScreen';

const Stack = createStackNavigator();

const homeOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => <ThemeController />,
};

export default function HomeStack(props) {
  const { theme } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HomeScreen}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ListProductsScreen}
        component={ListProductsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SingleProductScreen}
        component={SingleProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.StoreScreen}
        component={StoreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.DealScreen}
        component={DealScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.DirectMapScreen}
        component={DirectMapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.VideoScreen}
        component={VideoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ScanCodeScreen}
        component={ScanCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CommentScreen}
        component={CommentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SearchScreen}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.FilterScreen}
        component={FilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SizeGuideScreen}
        component={SizeGuideScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
