import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
  btnHeight,
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';
import { cartProImg } from '../styles/image-variables';
import { PRODUCTS } from '../static/data';
import CartCard from '../components/CartCard';

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const btnSetting = {
      btnWidth: responsiveWidth(42.67),
      btnHeight: btnHeight,
    };

    let totalPrice = 0;
    PRODUCTS.map((item) => {
      totalPrice += parseFloat(item.price);
    });

    return (
      <View style={CommonStyles.container}>
        <NavigationBar back navigation={this.props.navigation} title="CART" />
        <ScrollView>
          {/* header start here */}
          <View style={styles.headerCont}>
            <Text white mediumBold semiLarge style={styles.header}>
              YOUR SHOPPING BAGS
            </Text>
            <Text
              normal
              regular
              style={{ color: '#efefef', textAlign: 'center' }}>
              {PRODUCTS == null || PRODUCTS.length <= 0
                ? 'No item'
                : 'Review ' + PRODUCTS.length + ' items '}

              {PRODUCTS != null && PRODUCTS.length > 0 && (
                <Text white mediumBold semiLarge>
                  ${totalPrice}
                </Text>
              )}
            </Text>
          </View>
          {/* header end here */}

          {/* if products in cart exit */}
          {PRODUCTS != null && PRODUCTS.length > 0 && (
            <View>
              {/* products list start here */}
              <View style={styles.list}>
                {PRODUCTS.map((item, index) => (
                  <CartCard
                    key={index}
                    cartProInfo={item}
                    cardStyles={{
                      marginLeft: marginHorizontal.small,
                      marginRight: responsiveWidth(4.8),
                      marginVertical: spaceVertical.semiSmall / 2,
                    }}
                    imgWidth={cartProImg.width}
                    imgHeight={cartProImg.height}
                    quantity={2}
                  />
                ))}
              </View>
              <Border
                bottom
                width={responsiveWidth(93.6)}
                alignSelf={'flex-end'}
              />
              {/* products list end here */}

              {/* price start here */}
              <View style={styles.priceCont}>
                <View style={styles.priceItem}>
                  <Text style={styles.priceTxt}>Free Shipping</Text>
                  <Text style={styles.priceTxt}>$16.99</Text>
                </View>
                <View style={styles.priceItem}>
                  <Text style={styles.priceTxt}>Sub Total</Text>
                  <Text style={styles.priceTxt}>${totalPrice}</Text>
                </View>
                <View style={styles.priceItem}>
                  <Text black normal regular>
                    Total
                  </Text>
                  <Text black normal bold>
                    ${totalPrice}
                  </Text>
                </View>
              </View>
              <Border
                bottom
                width={responsiveWidth(93.6)}
                alignSelf={'flex-end'}
              />
              {/* price end here */}

              {/* bottom button start here */}
              <View style={styles.bottomCont}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.bottomTxtCont}
                  onPress={this._handleClickContinue.bind(this)}>
                  <View style={styles.bottomTxtInnerCont}>
                    <Icon name="ios-arrow-back" style={styles.bottomIcon} />
                    <View style={{ flex: 1 }}>
                      <Text black small regular numberOfLines={1}>
                        Continue Shopping
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <PrimeButton
                  navigation={this.props.navigation}
                  setting={btnSetting}
                  underlayColor={colors.red}
                  btnText="CHECK OUT"
                  onPressButton={() =>
                    this.props.navigation.navigate('CheckOutBillingScreen')
                  }
                />
              </View>
              {/* bottom button end here */}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  /**
   * Handle When click continue shopping
   */
  _handleClickContinue() {
    // this.props.navigation.navigate('ListProductsScreen', {
    //   proInfo: {
    //     name: 'FOR WOMAN',
    //     image: require('../../img/imba/img_banner_woman.png'),
    //     count: 113,
    //   },
    // });
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  headerCont: {
    width: deviceWidth,
    paddingTop: spaceVertical.semiSmall,
    paddingBottom: responsiveHeight(2.1),
    backgroundColor: colors.primary,
  },
  header: {
    marginBottom: 9,
    textAlign: 'center',
  },
  list: {
    marginVertical: spaceVertical.semiSmall / 2,
  },
  priceCont: {
    marginVertical: spaceVertical.semiSmall / 2,
    marginHorizontal: marginHorizontal.semiSmall,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spaceVertical.semiSmall / 2,
  },
  priceTxt: {
    color: colors.gray,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  bottomCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spaceVertical.semiSmall,
    marginHorizontal: marginHorizontal.semiSmall,
  },
  bottomTxtCont: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 6,
  },
  bottomTxtInnerCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomIcon: {
    marginRight: marginHorizontal.small / 2,
    color: colors.black,
    fontSize: fontSize.semiLarge,
  },
});

CartScreen.propTypes = {
  navigation: PropTypes.any,
};
