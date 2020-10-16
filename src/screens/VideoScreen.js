/* global require */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// import { Video } from 'expo';
import { Icon } from 'native-base';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import { deviceWidth, deviceHeight, colors } from '../styles/variables';
import CommonStyles from '../styles/CommonStyles';

export default class VideoScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          navigation={this.props.navigation}
          statusBarProps={{
            translucent: true,
            barStyle: 'dark-content',
            backgroundColor: 'transparent',
          }}
          outerContStyle={{
            zIndex: 9999,
            position: 'absolute',
            top: 0,
            backgroundColor: 'transparent',
          }}
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/ic_close.png'),
              buttonWidth: 16,
              buttonHeight: 16,
              buttonAction: this._closeModal.bind(this),
            },
          ]}
        />

        {/* video start here */}
        {/*
        <Video
          source={{
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: deviceWidth, height: deviceHeight }}
        />
        */}
        {/* video end here */}

        {/* controlbar start here */}
        <View style={styles.controlBar}>
          <TouchableOpacity style={styles.button}>
            <Icon name="ios-play-outline" style={{ color: colors.white }} />
          </TouchableOpacity>
          <View style={styles.time}>
            <Text white small regular>
              0:06
            </Text>
          </View>
        </View>
        {/* controlbar end here */}
      </View>
    );
  }

  _closeModal() {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  controlBar: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 24,
    backgroundColor: colors.darkGray,
  },
});

VideoScreen.propTypes = {
  navigation: PropTypes.any,
};
