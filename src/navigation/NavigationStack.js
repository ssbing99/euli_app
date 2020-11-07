import * as React from 'react';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import ThemeController from '@components/ThemeController';
import { StatusBar } from 'react-native';
import ROUTES from '@ultis/routes';
import SplashScreen from '@screens/SplashScreen';
import WalkthroughScreen from '@screens/WalkthroughScreen';
import NewsletterScreen from '@screens/NewsletterScreen';
import ForgotPasswordScreen from '@screens/ForgotPasswordScreen';
import LoginScreen from '@screens/LoginScreen';

import MainDrawer from './MainDrawer';
import ContactUsScreen from '@screens/ContactUsScreen';

const Stack = createStackNavigator();

const homeOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => <ThemeController />,
};

function Main(props) {
  const { theme } = props;

  // <Stack.Navigator initialRouteName={ROUTES.WalkThroughScreen}>
  // <Stack.Navigator initialRouteName={ROUTES.MainDrawer}>
  return (
      <Root>
    <NavigationContainer ref={navigationRef} theme={theme}>
      <Stack.Navigator initialRouteName={ROUTES.SplashScreen}>
        <Stack.Screen
          name={ROUTES.SplashScreen}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.WalkthroughScreen}
          component={WalkthroughScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.NewsletterScreen}
          component={NewsletterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.LoginScreen}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.ForgotPasswordScreen}
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.ContactUsScreen}
          component={ContactUsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.MainDrawer}
          component={MainDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
      </Root>
  );
}

export default Main;
