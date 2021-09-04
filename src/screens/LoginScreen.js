/* global require */
/* global console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Tabs, Toast } from 'native-base';
import { connect } from 'react-redux';

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
import * as loginActions from '../actions/loginActions';

const logoWidth = responsiveWidth(22.67);
const logoHeight = logoWidth * 1;

let timeOutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogining: false,
      isRedirecting: false,
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

  loginMainAndReset = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'MainDrawer'},],
    })
  }

  loginState = () => {
    if (this.props.username && this.props.password && !this.state.isLogining) {
      console.log("LOGIN");
      this.setState({isLogining: true}, () => {
        this.props.onPressSignIn(this.props.username, this.props.password);
      });
    } else if (this.state.isLogining) {
      console.log("REDIRECT");
      // this.props.disableLoader();
      // this.props.navigation.navigate('MainDrawer');
      this.debounceLogin();
    }
  }

  debounceLogin = debounce(this.loginMainAndReset, 500);
  debounceLoginState = debounce(this.loginState, 1000);

  componentDidUpdate (prevProps, prevState, snapshot) {
    // console.log("prevProps",prevProps);
    // console.log("prevState",prevState);

    this.callRedirect(prevProps);
  }

  callRedirect = (prevProps) =>{
    console.log("isLoading",prevProps.isLoading, this.props.isLoading);
    console.log("isLoggedIn",prevProps.isLoggedIn, this.props.isLoggedIn);
    console.log("username",prevProps.username, this.props.username);
    console.log("password",prevProps.password, this.props.password);

    if(!!this.props.isLoading && !!this.props.isLoggedIn){
      console.log("DISABLE LOADER");
      this.props.disableLoader();
    }

    if(!this.props.isLoading  && !!this.props.isLoggedIn) {
      this.debounceLoginState();
    }
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
            {
              (this.props.isLoading || this.props.isLoggedIn) && (
              <View style={[styles.container, styles.loading]}>
              <ActivityIndicator size={"large"}/>
              </View>
              )
            }
            {
              (!this.props.isLoading && !this.props.isLoggedIn) && (
            <SignIn
              isLoading={false}
              onPressSignIn={this.handleSignInWithEmailAndPassword.bind(this)}
              onPressSignUp={this.handleSignUpWithEmailAndPassword.bind(this)}
              onPressFacebook={this.handleSignInFacebook.bind(this)}
              onPressGoogle={this.handleSignInGoogle.bind(this)}
              onPressNeedHelp={() =>
                this.props.navigation.navigate('ContactUsScreen')
              }
            />
              )
            }
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
    this.setState( {  isLogining: true }, () => {
      this.props.onPressSignIn(email,password);
    } );

  }

  /**
   * Handle sign up with email and password
   *
   * @param {String} email
   * @param {String} password
   */
  handleSignUpWithEmailAndPassword(email, password) {
    this.props.navigation.navigate('SignUpScreen');
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressSignIn: (userid, password) => dispatch(loginActions.requestLogin(userid, password)),
    disableLoader: () => dispatch(loginActions.disableLoader())
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoginLoading,
    isLoggedIn: state.loginReducer.isLoggedIn,
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    role: state.loginReducer.role,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
  isLoggedIn: PropTypes.any,
  isLoading: PropTypes.any,
};
