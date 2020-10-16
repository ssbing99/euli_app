/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Image } from 'react-native';

import CustomStepIndicator from '../lib/CustomStepIndicator';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
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
import { doneIc } from '../styles/icon-variables';

export default class CheckOutConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subContLayout: {
        width: null,
        height: null,
      },
      currentPage: 2,
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

            {/* complete text start here */}
            <View style={styles.completeInfo}>
              <View style={styles.paymentComplete}>
                <Image
                  source={require('../../img/icons/ic_done.png')}
                  style={{
                    width: doneIc.width,
                    height: doneIc.height,
                    marginBottom: responsiveHeight(2.4),
                  }}
                />
                <Text black normal mediumBold>
                  PAYMENT COMPLETE
                </Text>
              </View>
              <View>
                <Text gray normal regular style={{ textAlign: 'center' }}>
                  Order code is
                  <Text black> #IB1969</Text>
                </Text>
                <Text gray normal regular style={{ textAlign: 'center' }}>
                  Please check the delivery status at {'\n'}
                  <Text black>Order Tracker</Text>
                  <Text> Page</Text>
                </Text>
              </View>
            </View>
            {/* complete text end here */}
          </View>

          {/* button start here */}
          <View
            style={[
              styles.btnCont,
              btnContHeight > btnHeight + responsiveHeight(3.9)
                ? {
                    height: btnContHeight,
                    paddingBottom: responsiveHeight(3.9),
                  }
                : { marginBottom: responsiveHeight(3.9) },
            ]}>
            <PrimeButton
              navigation={this.props.navigation}
              setting={btnSetting}
              btnText="CONTINUE SHOPPING"
              onPressButton={this._handleClickContinue.bind(this)}
            />
          </View>
          {/* button end here */}
        </ScrollView>
      </View>
    );
  }

  /**
   *  Get size of step indicator and form component
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
   * Go to list products screen when click continue
   */
  _handleClickContinue() {
    // this.props.navigation.navigate('ListProductsScreen', {
    //   proInfo: {
    //     header: 'FOR WOMEN',
    //     image: 'https://goo.gl/ThVDXe',
    //     count: 113,
    //   },
    // });
    // this.props.navigation.dispatch(NavigationActions.Reset({
    //   index: 0,
    //   routes: [{ name: 'HomeStack' }],
    // });
    // this.props.navigation.navigate('HomeStack');
    this.props.navigation.popToTop();
  }
}

const styles = StyleSheet.create({
  completeInfo: {
    alignItems: 'center',
    paddingTop: responsiveHeight(11.99),
    paddingBottom: responsiveHeight(17.59),
  },
  paymentComplete: {
    alignItems: 'center',
    marginBottom: responsiveHeight(7.95),
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

CheckOutConfirmScreen.propTypes = {
  navigation: PropTypes.any,
};
