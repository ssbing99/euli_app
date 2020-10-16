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
} from '../../styles/variables';
import { userIc, passIc, mailIc } from '../../styles/icon-variables';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
    };
  }

  render() {
    const btnSetting = {
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
    };

    if (this.props.isLoading) {
      return (
        <View style={[styles.container, styles.loading]}>
          <ActivityIndicator />
        </View>
      );
    }

    const { signUpUser } = this.props;

    if (signUpUser != null) {
      return (
        <View style={styles.container}>
          <Text
            black
            normal
            regular
            style={{
              marginBottom: spaceVertical.semiSmall,
              textDecorationLine: 'underline',
              textAlign: 'center',
            }}>
            An verify email has been sent to your email {signUpUser.email}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Form style={styles.form}>
          <TextInput
            inputHeight={inputHeight}
            error={this.state.emailError}
            onChangeText={(email) => this.setState({ email })}
            label="Username"
            leftIcon={require('../../../img/icons/ic_user.png')}
            leftIconStyles={{
              width: userIc.width,
              height: userIc.height,
            }}
          />
          <TextInput
            inputHeight={inputHeight}
            error={this.state.passwordError}
            onChangeText={(password) => this.setState({ password })}
            label="Password"
            secureTextEntry={true}
            leftIcon={require('../../../img/icons/ic_lock.png')}
            leftIconStyles={{
              width: passIc.width,
              height: passIc.height,
            }}
          />
          <TextInput
            inputHeight={inputHeight}
            error={this.state.passwordError}
            onChangeText={(password) => this.setState({ password })}
            label="Confirm password"
            secureTextEntry={true}
            leftIcon={require('../../../img/icons/ic_lock.png')}
            leftIconStyles={{
              width: passIc.width,
              height: passIc.height,
            }}
          />
          <TextInput
            inputHeight={inputHeight}
            error={this.state.passwordError}
            onChangeText={(password) => this.setState({ password })}
            label="Email"
            secureTextEntry={true}
            leftIcon={require('../../../img/icons/ic_mail.png')}
            leftIconStyles={{
              width: mailIc.width,
              height: mailIc.height,
            }}
          />
        </Form>
        <View style={styles.btnCont}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={btnSetting}
            btnText="SIGN UP"
            onPressButton={() =>
              this.props.onPressSignUp(this.state.email, this.state.password)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: marginHorizontal.large,
  },
  form: {
    paddingTop: 16,
    paddingBottom: responsiveHeight(6),
  },
  btnCont: {
    alignItems: 'center',
    paddingBottom: responsiveHeight(8.4),
  },
});

SignUp.propTypes = {
  navigation: PropTypes.any,
  onPressSignUp: PropTypes.any,
  isLoading: PropTypes.bool,
  signUpUser: PropTypes.any,
};
