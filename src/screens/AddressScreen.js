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
  deviceWidth,
  deviceHeight,
  colors,
  fontSize,
} from '../styles/variables';
import { locationIc } from '../styles/icon-variables';

export default class AddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isSelected: false,
      //address: [],
      address: [
        {
          id: 0,
          address: '132 Considine Gateway Apt. 510',
          tel: '091 234 5678',
        },
        {
          id: 1,
          address: '953 Eden Meadows Suite 763',
          tel: '091 234 5678',
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

    const address = this.state.address;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="ADDRESS"
        />

        <ScrollView>
          {/* address is null */}
          {(address == null || address.length <= 0) && (
            <View
              style={{
                alignItems: 'center',
                paddingTop: responsiveHeight(16.94),
              }}
              onLayout={this.onLayout.bind(this)}>
              <Image
                source={require('../../img/icons/large_ic_location.png')}
                style={{ width: locationIc.width, height: locationIc.height }}
              />
              <Text
                black
                large
                mediumBold
                style={{
                  marginTop: spaceVertical.semiSmall,
                  marginBottom: spaceVertical.semiSmall / 2,
                }}>
                Add Billing Address
              </Text>
              <Text
                darkGray
                normal
                regular
                style={{ width: responsiveWidth(78.67), textAlign: 'center' }}>
                Please add your shipping address.
              </Text>
            </View>
          )}

          {/* address is exit */}
          {address != null && address.length > 0 && (
            <View
              style={styles.listContainer}
              onLayout={this.onLayout.bind(this)}>
              {address.map((item, index) => (
                <View key={index}>
                  <View style={styles.listItem}>
                    <View style={styles.topItem}>
                      <View style={styles.header}>
                        <Text black medium mediumBold>
                          Address Name #{item.id + 1}
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
                    <Text black small regular style={styles.addressTxt}>
                      {item.address}
                    </Text>
                    <Text black small regular style={styles.telTxt}>
                      {item.tel}
                    </Text>
                    <CheckBox
                      label="Address Default"
                      checked={this.state.isSelected}
                      onChange={() =>
                        this.setState({ isSelected: !this.state.isSelected })
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
              btnText="ADD NEW ADDRESS"
              leftIcon="ios-add-circle-outline"
              leftIconStyles={{
                fontSize: fontSize.addIc,
                color: colors.gray,
              }}
              onPressButton={() =>
                this.props.navigation.navigate('AddNewAddressScreen')
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
  topItem: {
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    marginRight: marginHorizontal.semiSmall / 2,
    marginBottom: responsiveHeight(1.35),
  },
  addressTxt: {
    marginBottom: responsiveHeight(1.2),
  },
  telTxt: {
    marginBottom: responsiveHeight(2.4),
  },
  btnCont: {
    justifyContent: 'flex-end',
  },
});

AddressScreen.propTypes = {
  navigation: PropTypes.any,
};
