import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import CustomStepIndicator from '../lib/CustomStepIndicator';
import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  spaceVertical,
  deviceWidth,
  colors,
  stepIndicatorHeight,
  indicatorStyles,
} from '../styles/variables';

export default class TrackOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  render() {
    const labelItems = [
      {
        label: 'Order Placed',
        subLabel: 'We have received your order.',
      },
      {
        label: 'Confirmed',
        subLabel: 'Your order has been confirmed.',
      },
      {
        label: 'Order Shipped',
        subLabel: 'Estimated for 29 September, 2017',
      },
      {
        label: 'Out for Delivery',
        subLabel: 'Estimated for 29 September, 2017',
      },
      {
        label: 'Delivered',
        subLabel: 'Estimated for 29 September, 2017',
      },
    ];

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="TRACK ORDER"
        />
        <ScrollView>
          <View style={styles.headerCont}>
            <Text white mediumBold semiLarge style={styles.header}>
              Your order Code: #IB1969
            </Text>
            <Text
              normal
              regular
              style={{ color: '#c8c8c8', textAlign: 'center' }}>
              2 items
              <Text white mediumBold semiLarge>
                {' '}
                $69.99
              </Text>
            </Text>
          </View>
          <View style={styles.stepIndicator}>
            <CustomStepIndicator
              direction="vertical"
              stepCount={5}
              customStyles={indicatorStyles}
              currentPosition={this.state.currentPage}
              labelItems={labelItems}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerCont: {
    width: deviceWidth,
    paddingTop: spaceVertical.semiSmall,
    paddingBottom: responsiveHeight(2.1),
    backgroundColor: colors.black,
  },
  header: {
    marginBottom: 9,
    textAlign: 'center',
  },
  stepIndicator: {
    height: stepIndicatorHeight,
    paddingHorizontal: responsiveWidth(9.33),
  },
});

TrackOrderScreen.propTypes = {
  navigation: PropTypes.any,
};
