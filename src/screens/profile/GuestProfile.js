/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Platform } from 'react-native';

import Text from '../../elements/Text';
import PrimeButton from '../../elements/PrimeButton';

import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  btnWidth,
  btnHeight,
  colors,
} from '../../styles/variables';
import { avaImg } from '../../styles/image-variables';

export default class GuestProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoContLayout: {
        width: null,
        height: null,
      },
    };
  }

  render() {
    const signInBtnSetting = {
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
      style: {
        marginBottom: spaceVertical.semiSmall,
      },
    };

    const signUpBtnSetting = {
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
      backgroundColor: colors.blue,
      borderColor: colors.blue,
    };

    const BTNS_HEIGHT = btnHeight * 3 + spaceVertical.semiSmall * 2;

    return (
      <View>
        <View
          style={styles.infoCont}
          onLayout={this.onInfoContLayout.bind(this)}>
          <View style={styles.avatar}>
            <Image
              source={require('../../../img/imba/ic_profile_active.png')}
              style={{
                width: avaImg.width,
                height: avaImg.height,
                ...Platform.select({
                  android: {
                    borderRadius: avaImg.width,
                  },
                }),
              }}
            />
          </View>
          <View style={styles.textCont}>
            <Text black regular semiLarge style={{ textAlign: 'center' }}>
              Please Sign Up or Sign In to continue shopping.
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.btnCont,
            (btnContHeight) =>
              BTNS_HEIGHT + 40
                ? { height: btnContHeight }
                : { marginBottom: 40 },
          ]}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={signInBtnSetting}
            btnText="SIGN UP"
          />
          <PrimeButton
            navigation={this.props.navigation}
            setting={signInBtnSetting}
            btnText="SIGN IN"
          />
          <PrimeButton
            navigation={this.props.navigation}
            setting={signUpBtnSetting}
            btnText="Login with Facebook"
          />
        </View>
      </View>
    );
  }

  // Get size of all elements
  onInfoContLayout = (e) => {
    this.setState({
      infoContLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };
}

const styles = StyleSheet.create({
  infoCont: {
    alignItems: 'center',
    paddingTop: responsiveHeight(8.75),
    paddingBottom: spaceVertical.normal * 2,
  },
  avatar: {
    width: avaImg.width,
    height: avaImg.height,
    marginBottom: spaceVertical.normal,
    borderRadius: avaImg.width,
    overflow: 'hidden',
  },
  textCont: {
    width: responsiveWidth(66.93),
  },
  btnCont: {
    alignItems: 'center',
  },
});

GuestProfile.propTypes = {
  navigation: PropTypes.any,
};
