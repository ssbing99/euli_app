/* global require */
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Form } from 'native-base';
import PropTypes from 'prop-types';

import Text from '../../elements/Text';
import PrimeButton from '../../elements/PrimeButton';
import TextInput from '../../elements/TextInput';

import {
  btnWidth,
  btnHeight,
  inputHeight,
  marginHorizontal,
  spaceVertical,
  responsiveWidth,
  responsiveHeight,
  colors,
} from '../../styles/variables';

import { userIc, passIc } from '../../styles/icon-variables';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: false,
      errorPassword: false,
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

    if (this.props.isLoading) {
      return (
        <View style={[styles.container, styles.loading]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Form style={styles.form}>
          <TextInput
            inputHeight={inputHeight}
            error={this.state.errorEmail}
            onChangeText={(email) =>
              this.setState({ email, errorEmail: false })
            }
            label="Username"
            leftIcon={require('../../../img/icons/ic_user.png')}
            leftIconStyles={{
              width: userIc.width,
              height: userIc.height,
            }}
          />
          <TextInput
            inputHeight={inputHeight}
            secureTextEntry={true}
            error={this.state.errorPassword}
            onChangeText={(password) =>
              this.setState({ password, errorPassword: false })
            }
            label="Password"
            leftIcon={require('../../../img/icons/ic_lock.png')}
            leftIconStyles={{
              width: passIc.width,
              height: passIc.height,
            }}
          />
        </Form>
        <View style={styles.btnCont}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={signInBtnSetting}
            underlayColor={colors.red}
            btnText="SIGN IN"
            onPressButton={this.handleOnPressSignIn.bind(this)}
          />
          {/* <PrimeButton
            navigation={this.props.navigation}
            setting={signUpBtnSetting}
            btnText="Login with Facebook"
            onPressButton={this.props.onPressFacebook}
          /> */}
        </View>
        <View style={{ paddingBottom: responsiveHeight(11.54) }}>
          <Text
            black
            normal
            mediumBold
            style={{ textAlign: 'right' }}
            onPress={this.props.onPressNeedHelp}>
            Need Help?
          </Text>
        </View>
      </View>
    );
  }

  /**
   * Handle when click sign in button
   */
  handleOnPressSignIn() {
    const { email, password } = this.state;
    let isError = false;
    if (email == '') {
      this.setState({ errorEmail: true });
      isError = true;
    }
    if (password == '') {
      this.setState({ errorPassword: true });
      isError = true;
    }
    if (isError) {
      return;
    }
    this.props.onPressSignIn(email, password);
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: marginHorizontal.large,
  },
  form: {
    paddingTop: spaceVertical.small,
    paddingBottom: responsiveHeight(6),
  },
  btnCont: {
    alignItems: 'center',
    paddingBottom: spaceVertical.semiSmall,
  },
});

SignIn.propTypes = {
  navigation: PropTypes.any,
  onPressSignIn: PropTypes.any,
  onPressSignUp: PropTypes.any,
  onPressNeedHelp: PropTypes.any,
  onPressFacebook: PropTypes.any,
  onPressGoogle: PropTypes.any,
  isLoading: PropTypes.bool,
};
