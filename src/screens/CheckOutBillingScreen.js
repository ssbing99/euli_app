import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Form, Toast } from 'native-base';

import CustomStepIndicator from '../lib/CustomStepIndicator';
import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import PrimeButton from '../elements/PrimeButton';
import TextInput from '../elements/TextInput';

import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnHeight,
  inputHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceWidth,
  deviceHeight,
  indicatorStyles,
} from '../styles/variables';
import CommonStyles from '../styles/CommonStyles';

export default class CheckOutBillingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subContLayout: {
        width: null,
        height: null,
      },
      currentPage: 0,
      fullName: '',
      address1: '',
      city: '',
      state: '',
      zipcode: '',
    };
  }

  render() {
    const subContHeight = this.state.subContLayout.height;
    const btnContHeight =
      deviceHeight - (subContHeight + NAV_HEIGHT + STATUSBAR_HEIGHT);
    const btnSetting = {
      btnWidth: responsiveWidth(82.4),
      btnHeight: btnHeight,
    };

    const labelItems = [
      {
        label: 'Billing',
      },
      // {
      //   label: 'Payment',
      // },
      {
        label: 'Confirm',
      },
    ];

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="CHECK OUT"
        />
        <ScrollView>
          <View onLayout={this.onSubContLayout.bind(this)}>
            {/* step indicator start here */}
            <View style={CommonStyles.stepIndicator}>
              <CustomStepIndicator
                stepCount={2}
                customStyles={indicatorStyles}
                currentPosition={this.state.currentPage}
                labelItems={labelItems}
              />
            </View>
            {/* step indicator end here */}

            {/* form start here */}
            <View style={styles.form}>
              <Text black small semiBold>
                BILLING
              </Text>
              <Form>
                <TextInput
                  inputHeight={inputHeight}
                  label="Full Name"
                  onChangeText={(fullName) => this.setState({ fullName })}
                />
                <TextInput
                  inputHeight={inputHeight}
                  label="Address 1"
                  onChangeText={(address1) => this.setState({ address1 })}
                />
                <TextInput
                  inputHeight={inputHeight}
                  label="Address 2"
                  onChangeText={(address2) => this.setState({ address2 })}
                />
                <TextInput
                  inputHeight={inputHeight}
                  label="City"
                  onChangeText={(city) => this.setState({ city })}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    inputHeight={inputHeight}
                    label="State"
                    inputStyles={{
                      flex: 0,
                      width: (deviceWidth - 79) / 2,
                    }}
                    onChangeText={(state) => this.setState({ state })}
                  />
                  <TextInput
                    inputHeight={inputHeight}
                    label="Zip Code"
                    inputStyles={{
                      flex: 0,
                      width: (deviceWidth - 79) / 2,
                    }}
                    onChangeText={(zipcode) => this.setState({ zipcode })}
                  />
                </View>
              </Form>
            </View>
            {/* form end here */}
          </View>

          {this.renderCheckOutButton(btnContHeight, btnSetting)}
        </ScrollView>
      </View>
    );
  }

  /**
   * Render checkout button
   */
  renderCheckOutButton(btnContHeight, btnSetting) {
    const { fullName, address1, city, state, zipcode } = this.state;

    return (
      <View
        style={[
          styles.btnCont,
          btnContHeight > btnHeight + responsiveHeight(3.9)
            ? { height: btnContHeight, paddingBottom: responsiveHeight(3.9) }
            : { marginBottom: responsiveHeight(3.9) },
        ]}>
        <PrimeButton
          navigation={this.props.navigation}
          setting={btnSetting}
          btnText="NEXT"
          onPressButton={() => {
            // if (fullName == '') {
            //   Toast.show({
            //     text: 'Please fill your full name.',
            //     position: 'bottom',
            //     buttonText: 'OK',
            //   });
            //   return;
            // }
            // if (address1 == '') {
            //   Toast.show({
            //     text: 'Please fill your address.',
            //     position: 'bottom',
            //     buttonText: 'OK',
            //   });
            //   return;
            // }
            // if (city == '') {
            //   Toast.show({
            //     text: 'Please fill your city.',
            //     position: 'bottom',
            //     buttonText: 'OK',
            //   });
            //   return;
            // }
            // if (state == '') {
            //   Toast.show({
            //     text: 'Please fill your state.',
            //     position: 'bottom',
            //     buttonText: 'OK',
            //   });
            //   return;
            // }
            // if (zipcode == '') {
            //   Toast.show({
            //     text: 'Please fill your zipcode.',
            //     position: 'bottom',
            //     buttonText: 'OK',
            //   });
            //   return;
            // }
            this.props.navigation.navigate('CheckOutConfirmScreen');
          }}
        />
      </View>
    );
  }

  /**
   *  Get size of step indicator and form component
   */
  onSubContLayout(e) {
    this.setState({
      subContLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  }
}

CheckOutBillingScreen.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: marginHorizontal.normal,
    paddingTop: spaceVertical.normal,
    paddingBottom: responsiveHeight(11.39),
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
