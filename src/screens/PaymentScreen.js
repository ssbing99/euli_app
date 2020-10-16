/* global require */
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';
import PrimeButton from '../elements/PrimeButton';
import CheckBox from '../elements/CheckBox';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnWidth,
  btnHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
  colors,
  fontSize,
} from '../styles/variables';
import { verifiedPayIc } from '../styles/icon-variables';
import { rectangle } from '../styles/image-variables';

export default class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isSelected: false,
      //paymentList: []
      paymentList: [
        {
          id: 0,
          cardName: 'Paypal',
          account: 'account@company.com',
        },
        {
          id: 1,
          cardName: 'Credit Card',
          account: 'account@company.com',
        },
        {
          id: 2,
          cardName: 'Master Card',
          account: 'account@company.com',
        },
      ],
    };
  }

  render() {
    const layoutHeight = this.state.layout.height;
    const btnContHeight =
      deviceHeight - (layoutHeight + NAV_HEIGHT + STATUSBAR_HEIGHT);

    const btnSetting = {
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
      backgroundColor: colors.white,
      color: colors.gray,
      borderColor: colors.gray,
      style: {
        alignSelf: 'center',
        borderWidth: 1,
      },
    };

    const editBtnSetting = {
      btnWidth: responsiveWidth(12.8),
      btnHeight: btnHeight / 2,
    };

    const payments = this.state.paymentList;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="PAYMENT METHOD"
        />

        <ScrollView>
          {/* payment is null */}
          {(payments == null || payments.length <= 0) && (
            <View
              style={{
                alignItems: 'center',
                paddingTop: responsiveHeight(16.94),
              }}
              onLayout={this.onLayout.bind(this)}>
              <Image
                source={require('../../img/icons/verified-pay.png')}
                style={{
                  width: verifiedPayIc.width,
                  height: verifiedPayIc.height,
                }}
              />
              <Text
                black
                large
                mediumBold
                style={{
                  marginTop: spaceVertical.semiSmall,
                  marginBottom: spaceVertical.semiSmall / 2,
                }}>
                Add Your Payment
              </Text>
              <Text
                darkGray
                normal
                regular
                style={{ width: responsiveWidth(78.67), textAlign: 'center' }}>
                Please add your payment method for shopping now.
              </Text>
            </View>
          )}

          {/* payment is exit */}
          {payments != null && payments.length > 0 && (
            <View style={styles.listCont} onLayout={this.onLayout.bind(this)}>
              {payments.map((item, index) => (
                <View key={index}>
                  <View style={styles.listItem}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: spaceVertical.small,
                      }}>
                      <View style={styles.left} />
                      <View style={styles.right}>
                        <View style={styles.rightInfo}>
                          <Text
                            black
                            medium
                            mediumBold
                            style={{ marginBottom: responsiveHeight(1.35) }}>
                            {item.cardName}
                          </Text>
                          <Text black small regular>
                            {item.account}
                          </Text>
                        </View>
                        <View>
                          <PrimeButton
                            navigation={this.props.navigation}
                            setting={editBtnSetting}
                            btnText="Edit"
                          />
                        </View>
                      </View>
                    </View>
                    <CheckBox
                      label="Payment Default"
                      checked={this.state.isSelected}
                      onChange={(checked) =>
                        this.setState({ isSelected: checked })
                      }
                    />
                  </View>
                  <Border
                    bottom
                    width={responsiveWidth(93.6)}
                    alignSelf="flex-end"
                  />
                </View>
              ))}
            </View>
          )}

          {/* button start here */}
          <View
            style={[
              styles.btnCont,
              btnContHeight > btnHeight + responsiveHeight(6)
                ? { height: btnContHeight, paddingBottom: responsiveHeight(6) }
                : { marginBottom: responsiveHeight(6) },
            ]}>
            <PrimeButton
              navigation={this.props.navigation}
              setting={btnSetting}
              btnText="ADD PAYMENT"
              leftIcon="ios-add-circle-outline"
              leftIconStyles={{
                fontSize: fontSize.addIc,
                color: colors.gray,
              }}
              onPressButton={() =>
                this.props.navigation.navigate('AddNewPaymentScreen')
              }
            />
          </View>
          {/* button end here */}
        </ScrollView>
      </View>
    );
  }

  /**
   * Get size of elements
   */
  onLayout = (e) => {
    this.setState({
      layout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };
}

const styles = StyleSheet.create({
  listCont: {
    paddingBottom: spaceVertical.large,
  },
  listItem: {
    paddingHorizontal: marginHorizontal.semiSmall,
    paddingVertical: spaceVertical.semiSmall,
  },
  left: {
    height: rectangle.width,
    width: rectangle.height,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: responsiveWidth(3.2),
  },
  rightInfo: {
    flex: 1,
    marginRight: 12,
  },
  btnCont: {
    justifyContent: 'flex-end',
  },
});

PaymentScreen.propTypes = {
  navigation: PropTypes.any,
};
