import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
} from '../styles/variables';
import { cartProImg } from '../styles/image-variables';

import { PRODUCTS } from '../static/data';
import ListCard from '../components/ListCard';

export default class WishListScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let btnHeight = 32;
    if (deviceWidth >= 768) {
      btnHeight = 32 * 1.3;
    }
    const btnSetting = {
      btnWidth: responsiveWidth(37.33),
      btnHeight: btnHeight,
      style: {
        alignSelf: 'flex-start',
      },
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="WISH LIST"
        />

        <ScrollView>
          <View style={styles.headerCont}>
            <Text white normal regular style={{ textAlign: 'center' }}>
              {PRODUCTS == null || PRODUCTS.length <= 0
                ? 'No item'
                : PRODUCTS.length + ' items'}
            </Text>
          </View>

          {PRODUCTS != null && PRODUCTS.length > 0 && (
            <View style={styles.list}>
              {PRODUCTS.map((item, index) => (
                <ListCard
                  key={index}
                  proInfo={item}
                  cardStyles={{
                    marginHorizontal: marginHorizontal.small,
                    marginVertical: spaceVertical.semiSmall / 2,
                  }}
                  rightItemStyles={{
                    justifyContent: 'space-between',
                  }}
                  imgWidth={cartProImg.width}
                  imgHeight={cartProImg.height}
                  subHeader={
                    <Text black medium bold>
                      ${item.price}
                    </Text>
                  }
                  rightItemChildren={
                    <PrimeButton
                      navigation={this.props.navigation}
                      setting={btnSetting}
                      btnText="ADD TO CART"
                    />
                  }
                />
              ))}
            </View>
          )}
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
  list: {
    marginVertical: spaceVertical.semiSmall / 2,
  },
});

WishListScreen.propTypes = {
  navigation: PropTypes.any,
};
