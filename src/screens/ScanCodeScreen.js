/* global alert */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
// import { BarCodeScanner, Permissions } from 'expo';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';

export default class ScanCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    };
  }

  async UNSAFE_componentWillMount() {
    // scan code
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={CommonStyles.container}>
          <NavigationBar
            back
            navigation={this.props.navigation}
            statusBarProps={{
              translucent: this.state.isTranslucent,
              barStyle: 'dark-content',
              backgroundColor: this.state.barColor,
            }}
            outerContStyle={{
              zIndex: 9999,
              position: 'absolute',
              top: 0,
              backgroundColor: this.state.barColor,
            }}
          />

          {/* scan code start here */}
          {/*
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          * }
          {/* scan code end here */}
        </View>
      );
    }
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}

ScanCodeScreen.propTypes = {
  navigation: PropTypes.any,
};
