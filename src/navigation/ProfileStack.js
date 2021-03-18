import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import ThemeController from '@components/ThemeController';
import { StatusBar } from 'react-native';
import ROUTES from '@ultis/routes';

import CustomerStack from './CustomerStack';
import StatementStack from './StatementStack';

import ProfileScreen from '@screens/ProfileScreen';
import WishListScreen from '@screens/WishListScreen';
import TrackOrderScreen from '@screens/TrackOrderScreen';
import MyOrderScreen from '@screens/MyOrderScreen';
import NotificationScreen from '@screens/NotificationScreen';
import AddressScreen from '@screens/AddressScreen';
import AddNewAddressScreen from '@screens/AddNewAddressScreen';
import PaymentScreen from '@screens/PaymentScreen';
import AddNewPaymentScreen from '@screens/AddNewPaymentScreen';
import SettingsProfileScreen from '@screens/SettingsProfileScreen';
import PurchaseHistoryScreen from '@screens/PurchaseHistoryScreen';
import InvoiceScreen from '@screens/InvoiceScreen';
import InvoiceInfoScreen from '@screens/InvoiceInfoScreen';
import InventoryScreen from '@screens/InventoryScreen';
import StatementScreen from '@screens/StatementScreen';

const Stack = createStackNavigator();

function Main(props) {
  const { theme } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.ProfileScreen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'CustomerStack'}
        component={CustomerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PurchaseHistoryScreen}
        component={PurchaseHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.InvoiceScreen}
        component={InvoiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.InvoiceInfoScreen}
        component={InvoiceInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'StatementStack'}
        component={StatementStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.InventoryScreen}
        component={InventoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.WishListScreen}
        component={WishListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.TrackOrderScreen}
        component={TrackOrderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.MyOrderScreen}
        component={MyOrderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.NotificationScreen}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.AddressScreen}
        component={AddressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.AddNewAddressScreen}
        component={AddNewAddressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PaymentScreen}
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.AddNewPaymentScreen}
        component={AddNewPaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SettingsProfileScreen}
        component={SettingsProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Main;
