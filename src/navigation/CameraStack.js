import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import ThemeController from '@components/ThemeController';
import { StatusBar } from 'react-native';
import ROUTES from '@ultis/routes';

import CartScreen from '@screens/CartScreen';
import CheckOutBillingScreen from '@screens/CheckOutBillingScreen';
import CheckOutPaymentScreen from '@screens/CheckOutPaymentScreen';
import CheckOutConfirmScreen from '@screens/CheckOutConfirmScreen';
import ScanScreen from '@screens/ScanScreen';
import ColorDetailsScreen from '@screens/ColorDetailsScreen';

const Stack = createStackNavigator();

function Main(props) {
  const { theme } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.ScanScreen}
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ColorDetailsScreen}
        component={ColorDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CheckOutBillingScreen}
        component={CheckOutBillingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CheckOutPaymentScreen}
        component={CheckOutPaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CheckOutConfirmScreen}
        component={CheckOutConfirmScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Main;
