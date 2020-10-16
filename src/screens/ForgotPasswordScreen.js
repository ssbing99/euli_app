/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Form } from 'native-base';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import TextInput from '../elements/TextInput';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  btnWidth,
  btnHeight,
  marginHorizontal,
  spaceVertical,
  responsiveWidth,
  responsiveHeight,
  inputHeight,
  deviceHeight,
  fontSize,
  lineHeight,
} from '../styles/variables';
import { userIc } from '../styles/icon-variables';

const imgWidth = responsiveWidth(60);
const imgHeight = imgWidth;

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementLayout: {
        width: null,
        height: null,
      },
    };
  }

  render() {
    const elementHeight = this.state.elementLayout.height;
    const bottomHeight =
      deviceHeight - (elementHeight + NAV_HEIGHT + STATUSBAR_HEIGHT);

    const btnSetting = {
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar back navigation={this.props.navigation} />

        <ScrollView>
          <View onLayout={this.onElementLayout.bind(this)}>
            <View style={styles.imgCont}>
              <Image
                source={require('../../img/imba/img_forgot.png')}
                style={{ width: imgWidth, height: imgHeight }}
              />
            </View>
            <View style={styles.info}>
              <Text black mediumBold style={styles.header}>
                Forgot your password?
              </Text>
              <Text darkGray normal regular style={styles.desc}>
                Enter your email below recevice your password reset intructions
              </Text>
            </View>
            <Form style={styles.form}>
              <TextInput
                inputHeight={inputHeight}
                label="Username"
                leftIcon={require('../../img/icons/ic_user.png')}
                leftIconStyles={{
                  width: userIc.width,
                  height: userIc.height,
                }}
              />
            </Form>
            <View style={styles.btnCont}>
              <PrimeButton
                navigation={this.props.navigation}
                setting={btnSetting}
                btnText="SEND PASSWORD"
              />
            </View>
          </View>
          <View
            style={[
              styles.bottomCont,
              bottomHeight > responsiveHeight(2.85) + spaceVertical.semiSmall
                ? {
                    height: bottomHeight,
                    paddingBottom: spaceVertical.semiSmall,
                  }
                : { marginBottom: spaceVertical.semiSmall },
            ]}>
            <Text darkGray normal regular style={styles.bottomTxt}>
              SIGN UP
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  /**
   * Get size of elements
   */
  onElementLayout = (e) => {
    this.setState({
      elementLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };
}

const styles = StyleSheet.create({
  imgCont: {
    alignItems: 'center',
    paddingTop: responsiveHeight(1.8),
    paddingBottom: responsiveHeight(6.6),
  },
  info: {
    marginHorizontal: responsiveWidth(10.93),
    paddingBottom: 16,
  },
  header: {
    marginBottom: 13,
    fontSize: fontSize.semiLarge,
    textAlign: 'center',
  },
  desc: {
    lineHeight: lineHeight.normal,
    textAlign: 'center',
  },
  form: {
    marginHorizontal: marginHorizontal.large,
  },
  btnCont: {
    alignItems: 'center',
    paddingTop: spaceVertical.normal,
    paddingBottom: responsiveHeight(6.9),
  },
  bottomCont: {
    justifyContent: 'flex-end',
  },
  bottomTxt: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.any,
};
