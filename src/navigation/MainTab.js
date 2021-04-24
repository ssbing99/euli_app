/* global require */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';

import { responsiveHeight, responsiveWidth, colors } from '../styles/variables';
import {
  homeIc,
  categoryIc,
  cartIc,
  profileIc,
  cameratabIc,
} from '../styles/icon-variables';

import HomeStack from './HomeStack';
import StoreStack from './StoreStack';
import ColorStack from './ColorStack';
import ProfileStack from './ProfileStack';
import CameraStack from './CameraStack';
import { cps } from 'redux-saga/effects';

const TabIcon = ({ focused, normalSrc, activeSrc, width, height }) => {
  let iconSrc = normalSrc;
  if (focused) {
    iconSrc = activeSrc;
  }
  return <Image source={iconSrc} style={{ width, height }} />;
};

TabIcon.propTypes = {
  focused: PropTypes.any,
  normalSrc: PropTypes.string.require,
  activeSrc: PropTypes.string.require,
  width: PropTypes.number.require,
  height: PropTypes.number.require,
};

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const tabBarListeners = ({ navigation, route }) => ({
    tabPress: e => {
      // Prevent default action
      // e.preventDefault();
      // console.log("tab press", navigation, route);
      // navigation.navigate(route.name);

      navigation.dispatch(
        CommonActions.navigate({
          name: route.name,
          params: {},
        })
      );

      },
  });

  return (
    <Tab.Navigator
      initialRouteName="ProfileStack"
      tabBarOptions={{
        activeTintColor: colors.primary,
        showLabel: true,
      }}>
      {/*<Tab.Screen*/}
      {/*  name="HomeStack"*/}
      {/*  component={HomeStack}*/}
      {/*  options={{*/}
      {/*    tabBarLabel: 'Latest News',*/}
      {/*    tabBarIcon: ({ focused }) =>*/}
      {/*      TabIcon({*/}
      {/*        focused,*/}
      {/*        activeSrc: require('../../img/icons/red_newspaper.png'),*/}
      {/*        normalSrc: require('../../img/icons/newspaper.png'),*/}
      {/*        width: homeIc.width,*/}
      {/*        height: homeIc.height,*/}
      {/*      }),*/}
      {/*  }}*/}
      {/*  listeners={tabBarListeners}*/}
      {/*/>*/}
      {/*<Tab.Screen*/}
      {/*  name="StoreStack"*/}
      {/*  component={StoreStack}*/}
      {/*  options={{*/}
      {/*    tabBarLabel: 'Items',*/}
      {/*    tabBarIcon: ({ focused }) =>*/}
      {/*      TabIcon({*/}
      {/*        focused,*/}
      {/*        activeSrc: require('../../img/icons/tshirt-crew-outline_active.png'),*/}
      {/*        normalSrc: require('../../img/icons/tshirt-crew-outline.png'),*/}
      {/*        width: categoryIc.width,*/}
      {/*        height: categoryIc.height,*/}
      {/*      }),*/}
      {/*  }}*/}
      {/*  listeners={tabBarListeners}*/}
      {/*/>*/}
      <Tab.Screen
        name="CameraStack"
        component={CameraStack}
        options={{
          tabBarLabel: 'Colour Picker',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/camera-enhance-outline_active.png'),
              normalSrc: require('../../img/icons/camera-enhance-outline.png'),
              width: cameratabIc.width,
              height: cameratabIc.height,
            }),
        }}
        listeners={tabBarListeners}
      />
      <Tab.Screen
        name="ColorStack"
        component={ColorStack}
        options={{
          tabBarLabel: 'Colour List',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/heart-outline_active.png'),
              normalSrc: require('../../img/icons/heart-outline.png'),
              width: cartIc.width,
              height: cartIc.height,
            }),
        }}
        listeners={tabBarListeners}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/account-circle-outline_active.png'),
              normalSrc: require('../../img/icons/account-circle-outline.png'),
              width: profileIc.width,
              height: profileIc.height,
            }),
        }}
        listeners={tabBarListeners}
      />
    </Tab.Navigator>
  );
}

const _onPress = (props) => {
  console.log(props);
  props.navigation.navigate('CameraStack');
};

// const MainTab = createBottomTabNavigator(
//   {
//     HomeTab: {
//       screen: HomeStack,
//       path: '/home',
//       navigationOptions: {
//         tabBarIcon: ({focused}) => TabIcon({
//           focused,
//           activeSrc: require('../../img/icons/ic_home_active.png'),
//           normalSrc: require('../../img/icons/ic_home.png'),
//           width: homeIc.width,
//           height: homeIc.height
//         })
//       },
//     },
//     StoreTab: {
//       screen: StoreStack,
//       path: '/store',
//       navigationOptions: {
//         tabBarIcon: ({focused}) => TabIcon({
//           focused,
//           activeSrc: require('../../img/icons/ic_category_active.png'),
//           normalSrc: require('../../img/icons/ic_category.png'),
//           width: categoryIc.width,
//           height: categoryIc.height
//         })
//       },
//     },
//     CartTab: {
//       screen: CartStack,
//       path: '/cart',
//       navigationOptions: {
//         tabBarIcon: ({focused}) => TabIcon({
//           focused,
//           activeSrc: require('../../img/icons/ic_cart_active.png'),
//           normalSrc: require('../../img/icons/ic_cart.png'),
//           width: cartIc.width,
//           height: cartIc.height
//         })
//       },
//     },
//     ProfileTab: {
//       screen: ProfileStack,
//       path: '/profile',
//       navigationOptions: {
//         tabBarIcon: ({focused}) => TabIcon({
//           focused,
//           activeSrc: require('../../img/icons/ic_profile_active.png'),
//           normalSrc: require('../../img/icons/ic_profile.png'),
//           width: profileIc.width,
//           height: profileIc.height
//         })
//       },
//     },
//   },
// );
