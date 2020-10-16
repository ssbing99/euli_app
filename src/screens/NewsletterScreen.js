/* global require */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { Form } from 'native-base';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Text from '../elements/Text';
import TextInput from '../elements/TextInput';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnWidth,
  btnHeight,
  inputHeight,
  deviceHeight,
  deviceWidth,
  colors,
  lineHeight,
  borderRadius,
} from '../styles/variables';
import { mailIc, closeBtn } from '../styles/icon-variables';

const imgWidth = responsiveWidth(91.47);
const imgHeight = imgWidth * 1.05;

export default class NewsletterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subContLayout: {
        width: null,
        height: null,
      },
    };
  }

  render() {
    const subContHeight = this.state.subContLayout.height;
    const btnContHeight = deviceHeight - subContHeight;
    const btnSetting = {
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
    };

    return (
      <KeyboardAwareScrollView>
        <View style={CommonStyles.container}>
          <ScrollView>
            <View onLayout={this.onSubContLayout.bind(this)}>
              {/* image start here */}
              <View style={styles.imgCont}>
                <Image
                  source={require('../../img/imba/img_news.png')}
                  style={styles.image}
                />
                <StatusBar
                  translucent={true}
                  barStyle="dark-content"
                  backgroundColor="transparent"
                />
                <TouchableHighlight
                  underlayColor={colors.lightGray}
                  style={styles.closeBtn}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  <Image
                    source={require('../../img/icons/ic_close.png')}
                    style={{
                      width: responsiveWidth(4.27),
                      height: responsiveHeight(2.4),
                    }}
                  />
                </TouchableHighlight>
              </View>
              {/* image end here */}

              {/* info start here */}
              <View style={styles.info}>
                <Text black large mediumBold style={{ textAlign: 'center' }}>
                  Newsletter
                </Text>
                <Text darkGray normal regular style={styles.desc}>
                  If you wish tp receive our latest news, you can subscribe to
                  our.
                </Text>
              </View>
              {/* info end here */}

              {/* form start here */}
              <Form style={styles.form}>
                <TextInput
                  inputHeight={inputHeight}
                  label="Email"
                  leftIcon={require('../../img/icons/ic_mail.png')}
                  leftIconStyles={{
                    width: mailIc.width,
                    height: mailIc.height,
                  }}
                />
              </Form>
              {/* form end here */}
            </View>

            <View
              style={[
                styles.btnCont,
                btnContHeight > spaceVertical.normal + btnHeight
                  ? {
                      height: btnContHeight,
                      paddingBottom: spaceVertical.normal,
                    }
                  : { marginBottom: spaceVertical.normal },
              ]}>
              <PrimeButton
                navigation={this.props.navigation}
                setting={btnSetting}
                btnText="SUBSCRIBE"
                onPressButton={() =>
                  this.props.navigation.navigate('LoginScreen')
                }
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  /**
   * Get size of elements
   */
  onSubContLayout = (e) => {
    this.setState({
      subContLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };

  /**
   * Handle close modal when click close button
   */
  _closeModal() {
    //this.props.navigation.goBack();
    this.props.navigation.navigate('LoginScreen');
  }
}

const styles = StyleSheet.create({
  imgCont: {
    position: 'relative',
    marginHorizontal: marginHorizontal.small,
    borderRadius: borderRadius.normal,
    backgroundColor: 'transparent',
  },
  image: {
    width: imgWidth,
    height: imgHeight,
    borderRadius: borderRadius.normal,
  },
  closeBtn: {
    position: 'absolute',
    top: spaceVertical.semiSmall,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: closeBtn.width,
    height: closeBtn.height,
    backgroundColor: colors.white,
  },
  info: {
    marginHorizontal: responsiveWidth(10.93),
    paddingTop: spaceVertical.normal,
  },
  form: {
    alignItems: 'center',
    marginHorizontal: marginHorizontal.large,
    paddingBottom: spaceVertical.normal,
  },
  desc: {
    textAlign: 'center',
    marginTop: spaceVertical.semiSmall / 2,
    lineHeight: lineHeight.normal,
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

NewsletterScreen.propTypes = {
  navigation: PropTypes.any,
};
