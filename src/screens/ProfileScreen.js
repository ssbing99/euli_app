/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import NavigationBar from '../elements/NavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { settingIc } from '../styles/icon-variables';

import NormalProfile from './profile/NormalProfile';
import GuestProfile from './profile/GuestProfile';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          navigation={this.props.navigation}
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/ic_cart.png'),
              buttonAction: this._handleClickSettingButton.bind(this),
              buttonWidth: settingIc.width,
              buttonHeight: settingIc.height,
            },
          ]}
        />

        <ScrollView>
          <NormalProfile
            navigation={this.props.navigation}
            name={'Euli'}
            email={'support@euli.com'}
            avatar={require('../../img/imba/avatar.png')}
          />
        </ScrollView>
      </View>
    );
  }

  /**
   * Go to setting screen when click setting icon
   */
  _handleClickSettingButton() {
    this.props.navigation.navigate('CartStack');
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.any,
};
