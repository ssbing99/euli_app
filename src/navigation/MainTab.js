/* global require */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        showLabel: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/ic_home_active.png'),
              normalSrc: require('../../img/icons/ic_home.png'),
              width: homeIc.width,
              height: homeIc.height,
            }),
        }}
      />
      <Tab.Screen
        name="StoreStack"
        component={StoreStack}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/ic_category_active.png'),
              normalSrc: require('../../img/icons/ic_category.png'),
              width: categoryIc.width,
              height: categoryIc.height,
            }),
        }}
      />
      <Tab.Screen
        name="CameraStack"
        component={CameraStack}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/camera-outline-active.png'),
              normalSrc: require('../../img/icons/camera-outline.png'),
              width: cameratabIc.width,
              height: cameratabIc.height,
            }),
        }}
      />
      <Tab.Screen
        name="ColorStack"
        component={ColorStack}
        options={{
          tabBarLabel: 'Color',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/ic_heart.png'),
              normalSrc: require('../../img/icons/outline_ic_heart.png'),
              width: cartIc.width,
              height: cartIc.height,
            }),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) =>
            TabIcon({
              focused,
              activeSrc: require('../../img/icons/ic_profile_active.png'),
              normalSrc: require('../../img/icons/ic_profile.png'),
              width: profileIc.width,
              height: profileIc.height,
            }),
        }}
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
