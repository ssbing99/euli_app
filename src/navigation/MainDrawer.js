import React from 'react';
import PropTypes from 'prop-types';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { deviceWidth } from '../styles/variables';

import MainTab from './MainTab';
import MagazineStack from './MagazineStack';
import CartStack from './CartStack';
import CollectionScreen from '../screens/CollectionScreen';
import SideBar from '../screens/SideBar';

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  const navigation = props ? props.navigation : null;
  return <SideBar navigation={navigation} drawerProps={{ ...props }} />;
};

DrawerContent.propTypes = {
  navigation: PropTypes.any,
  props: PropTypes.any,
};

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{
        width: deviceWidth,
      }}>
      <Drawer.Screen
        name="MainTab"
        component={MainTab}
        options={{ gestureEnabled: false }}
      />
      <Drawer.Screen name="MagazineStack" component={MagazineStack} />
      <Drawer.Screen name="CollectionScreen" component={CollectionScreen} />
      <Drawer.Screen name="CartStack" component={CartStack} />
    </Drawer.Navigator>
  );
}
