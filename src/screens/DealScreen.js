import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  borderRadius,
  colors,
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';

import { DEALS } from '../static/data';

const dealImg = {
  width: responsiveWidth(42.67),
  height: responsiveWidth(42.67),
};
const INFO_WIDTH = responsiveWidth(42.13);

export default class DealScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          menu
          navigation={this.props.navigation}
          title="DEAL"
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/search.png'),
              buttonAction: this._handleClickSearchButton.bind(this),
              buttonWidth: searchIc.width,
              buttonHeight: searchIc.height,
            },
          ]}
        />

        <ScrollView>
          {DEALS.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={item.image}
                style={{
                  width: dealImg.width,
                  height: dealImg.height,
                  borderRadius: borderRadius.normal,
                }}
              />
              <View style={styles.dealInfo}>
                <View>
                  <View style={styles.sale}>
                    <Text white normal bold style={{ textAlign: 'center' }}>
                      {item.sale_per}%
                    </Text>
                  </View>
                  <View style={styles.header}>
                    <Text black medium regular numberOfLines={2}>
                      {item.header}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text gray small regular>
                    Out Date: {item.out_date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  /**
   * Go to search screen when click search button
   */
  _handleClickSearchButton() {
    this.props.navigation.navigate('SearchScreen');
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    justifyContent: 'center',
    paddingLeft: marginHorizontal.small,
    paddingVertical: spaceVertical.semiSmall / 2,
  },
  dealInfo: {
    position: 'absolute',
    left: INFO_WIDTH,
    justifyContent: 'space-between',
    width: deviceWidth - INFO_WIDTH,
    height: responsiveHeight(21.29),
    paddingVertical: spaceVertical.small,
    paddingLeft: marginHorizontal.small,
    paddingRight: marginHorizontal.semiSmall / 2,
    borderRadius: borderRadius.normal,
    backgroundColor: colors.white,
  },
  sale: {
    maxWidth: responsiveWidth(14.93),
    paddingVertical: responsiveHeight(0.75),
    borderRadius: borderRadius.normal,
    backgroundColor: colors.black,
  },
  header: {
    paddingTop: responsiveHeight(1.8),
  },
});

DealScreen.propTypes = {
  navigation: PropTypes.any,
};
