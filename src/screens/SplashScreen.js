/* global require */
/* global setTimeout */
import React, { Component } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import ROUTES from '@ultis/routes';

import { deviceWidth, deviceHeight } from '../styles/variables';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    setTimeout(() => {
      this.props.navigation.navigate('LoginScreen');
    }, 3000);

    return (
      <View style={styles.container}>
        <Image
          source={require('../../img/euli/splash.png')}
          style={{ width: deviceWidth, height: deviceHeight }}
        />
        {/* <Image
          source={require('../../img/imba/imba.png')}
          style={styles.image}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    position: 'absolute',
    bottom: 40,
    width: 85,
    height: 22,
  },
});

SplashScreen.propTypes = {
  navigation: PropTypes.any,
};
