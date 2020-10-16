/* global require */
/* global console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Tabs, Toast } from 'native-base';

import Text from '../elements/Text';

import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
  scrollableTabHeight,
  colors,
  fontFamily,
  fontSize,
  bottomTxtHeight,
} from '../styles/variables';

const logoWidth = responsiveWidth(22.67);
const logoHeight = logoWidth * 1;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinLayout: {
        width: null,
        height: null,
      },
      signupLayout: {
        width: null,
        height: null,
      },
      logoContLayout: {
        width: null,
        height: null,
      },
    };
  }

  render() {
    const logoContHeight = this.state.logoContLayout.height;
    const signinHeight = this.state.signinLayout.height;
    const signinBottomHeight =
      deviceHeight - (scrollableTabHeight + signinHeight + logoContHeight);

    const signupHeight = this.state.signupLayout.height;
    const signupBottomHeight =
      deviceHeight - (scrollableTabHeight + signupHeight + logoContHeight);

    return (
      <View style={CommonStyles.container}>
        {/* logo start here */}
        <View style={styles.logo} onLayout={this.onLogoContLayout.bind(this)}>
          <Image
            source={require('../../img/euli/logo.png')}
            style={{ width: logoWidth, height: logoHeight }}
          />
          <Text black bold large style={styles.title}>
            SIGN IN
          </Text>
        </View>
        {/* logo end here */}

        <ScrollView heading="SIGN IN">
          <View onLayout={this.onSigninLayout.bind(this)}>
            <SignIn
              isLoading={false}
              onPressSignIn={this.handleSignInWithEmailAndPassword.bind(this)}
              onPressFacebook={this.handleSignInFacebook.bind(this)}
              onPressGoogle={this.handleSignInGoogle.bind(this)}
              onPressNeedHelp={() =>
                this.props.navigation.navigate('ContactUsScreen')
              }
              onPressSignUp={() => this.tabView.goToPage(1)}
            />
          </View>
          {/* <View
            style={[
              styles.bottomCont,
              signinBottomHeight > bottomTxtHeight + spaceVertical.semiSmall
                ? {
                    height: signinBottomHeight,
                    paddingBottom: spaceVertical.semiSmall,
                  }
                : { marginBottom: spaceVertical.semiSmall },
            ]}>
            <Text
              darkGray
              normal
              regular
              style={styles.bottomTxt}
              onPress={() => this.props.navigation.navigate('MainDrawer')}>
              Sign In with Guest
            </Text>
          </View> */}
        </ScrollView>
      </View>
    );
  }

  /**
   * Get size of logo container
   */
  onLogoContLayout = (e) => {
    this.setState({
      logoContLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };

  /**
   * Get size of sign in form
   */
  onSigninLayout = (e) => {
    this.setState({
      signinLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };

  /**
   * Get size of sign up form
   */
  onSignupLayout = (e) => {
    this.setState({
      signupLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };

  /**
   * Handle when click sign in facebook
   * Login facebook get token
   */
  handleSignInFacebook() {
    this.props.navigation.navigate('MainDrawer');
  }

  /**
   * Handle when click sign in google
   * Login google get idToken, accessToken
   */
  handleSignInGoogle() {
    this.props.navigation.navigate('MainDrawer');
  }

  /**
   * Handle sign in with email and password
   *
   * @param {String} email
   * @param {String} password
   */
  handleSignInWithEmailAndPassword(email, password) {
    this.props.navigation.navigate('MainDrawer');
  }

  /**
   * Handle sign up with email and password
   *
   * @param {String} email
   * @param {String} password
   */
  handleSignUpWithEmailAndPassword(email, password) {
    this.props.navigation.navigate('MainDrawer');
  }
}

const styles = StyleSheet.create({
  logo: {
    paddingTop: NAV_HEIGHT + STATUSBAR_HEIGHT - 15,
    paddingBottom: responsiveHeight(2),
    marginHorizontal: marginHorizontal.large,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: marginHorizontal.large,
  },
  bottomCont: {
    justifyContent: 'flex-end',
  },
  bottomTxt: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.any,
};
