import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
  borderRadius,
} from '../styles/variables';
import { ORDERS } from '../static/data';

export default class MyOrderScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="MY ORDERS"
        />
        <ScrollView>
          <View style={styles.headerCont}>
            <Text white normal regular style={{ textAlign: 'center' }}>
              Current {ORDERS.length} Orders
            </Text>
          </View>
          {ORDERS.map((item, index) => (
            <TouchableHighlight
              key={index}
              underlayColor={colors.lightGray}
              onPress={() =>
                this.props.navigation.navigate('TrackOrderScreen')
              }>
              <View>
                <View style={styles.card}>
                  <View>
                    <Text black normal mediumBold style={{ marginBottom: 10 }}>
                      Order No {item.code}
                    </Text>
                    <Text gray normal regular>
                      Date: {item.date} / {item.itemCount} items
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.orderStatus,
                      item.orderStatus == 'Delivered' && {
                        backgroundColor: colors.black,
                      },
                      item.orderStatus == 'Shipped' && {
                        backgroundColor: colors.gray,
                      },
                      item.orderStatus == 'Cancel' && {
                        backgroundColor: colors.red,
                      },
                    ]}>
                    <Text
                      white
                      mediumBold
                      extraSmall
                      style={{ textAlign: 'center' }}>
                      {item.orderStatus}
                    </Text>
                  </View>
                </View>
                <Border
                  bottom
                  width={responsiveWidth(93.6)}
                  alignSelf="flex-end"
                />
              </View>
            </TouchableHighlight>
          ))}
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: marginHorizontal.semiSmall,
    marginVertical: spaceVertical.semiSmall,
  },
  orderStatus: {
    width: responsiveWidth(17.07),
    paddingVertical: responsiveHeight(0.75),
    borderRadius: borderRadius.normal,
  },
});

MyOrderScreen.propTypes = {
  navigation: PropTypes.any,
};
