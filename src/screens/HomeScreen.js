/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomSwiper from '../lib/CustomSwiper';

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
  borderRadius,
} from '../styles/variables';
import { arrRightIc, searchIc, indicatorDot } from '../styles/icon-variables';

import {
  PRODUCTS,
  CATEGORIES,
  SUB_CATEGORIES,
  INSTA_IMGS,
} from '../static/data';

import GridCard from '../components/GridCard';
import InstagramStores from './Home/InstagramStores';
import MainCategory from './Home/MainCategory';
import SubCategories from './Home/SubCategories';

const bannerWidth = deviceWidth;
const bannerHeight = bannerWidth * 0.64;

const storeImgWidth = responsiveWidth(91.47);
const storeImgHeight = storeImgWidth * 0.583;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTranslucent: true,
      barColor: 'transparent',
    };
  }

  render() {
    const btnSetting = {
      btnWidth: responsiveWidth(64),
      btnHeight: responsiveHeight(5.99),
      style: {
        position: 'absolute',
        bottom: spaceVertical.semiSmall,
      },
    };

    const isCloseToTop = ({ contentOffset }) => {
      if (contentOffset.y > 0) {
        return false;
      }
      return true;
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          // menu
          navigation={this.props.navigation}
          statusBarProps={{
            translucent: this.state.isTranslucent,
            barStyle: 'dark-content',
            backgroundColor: this.state.barColor,
          }}
          outerContStyle={{
            zIndex: 9999,
            position: 'absolute',
            top: 0,
            backgroundColor: this.state.barColor,
          }}
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/ic_cart.png'),
              buttonAction: this._handleClickSearchButton.bind(this),
              buttonWidth: searchIc.width,
              buttonHeight: searchIc.height,
            },
          ]}
        />

        <ScrollView
          scrollEventThrottle={10}
          onScroll={({ nativeEvent }) => {
            if (isCloseToTop(nativeEvent)) {
              this.setState({ barColor: 'transparent', isTranslucent: false });
            } else {
              this.setState({ isTranslucent: false, barColor: '#ffffff' });
            }
          }}>
          {/* slider start here */}
          <View style={styles.slide}>
            <CustomSwiper
              height={bannerHeight}
              autoplay
              loop={false}
              dotColor={colors.white}
              dotStyle={{
                width: indicatorDot.width,
                height: indicatorDot.height,
              }}
              activeDotColor={colors.black}
              activeDotStyle={{
                width: indicatorDot.width,
                height: indicatorDot.height,
              }}>
              <Image
                source={require('../../img/imba/banner1.png')}
                style={styles.slideImg}
              />
              <Image
                source={require('../../img/imba/banner2.png')}
                style={styles.slideImg}
              />
              <Image
                source={require('../../img/imba/banner3.png')}
                style={styles.slideImg}
              />
            </CustomSwiper>
          </View>
          {/* slider end here */}

          {/* banner start here */}
          <View style={styles.banner}>
            <Text white small bold style={{ textAlign: 'center' }}>
              FREE SHIPPING WORDWIDE
            </Text>
          </View>
          {/* banner end here */}

          {/* best seller start here */}
          <View style={styles.bestSeller}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text black medium bold>
                Best Seller
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text gray normal regular>
                  see more
                </Text>
                <Image
                  source={require('../../img/icons/ic_arrow_right.png')}
                  style={{
                    width: arrRightIc.width,
                    height: arrRightIc.height,
                    marginLeft: 6,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {PRODUCTS != null && PRODUCTS.length > 0 && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.horizontalList}>
                {PRODUCTS.map((item, index) => (
                  <GridCard
                    key={index}
                    isFavourite
                    proInfo={item}
                    cardStyles={{
                      marginHorizontal: marginHorizontal.small / 2,
                    }}
                    wishIconStyles={{
                      bottom: 0,
                      right: 0,
                    }}
                    imgWidth={deviceWidth / 2.7}
                    imgHeight={(deviceWidth / 2.7) * 1.278}
                    textNumberOfLines={1}
                    onPressListItem={() => this._handleClickListItem(item)}
                  />
                ))}
              </View>
            </ScrollView>
          )}
          {/* best seller end here */}

          <MainCategory
            navigation={this.props.navigation}
            categories={CATEGORIES}
          />

          <SubCategories
            navigation={this.props.navigation}
            subcategories={SUB_CATEGORIES}
          />

          {/* locate store start here */}
          {/* <View style={styles.locateStore}>
            <Image
              source={require('../../img/imba/img_store.png')}
              style={styles.locateStoreImg}
            />
            <PrimeButton
              navigation={this.props.navigation}
              setting={btnSetting}
              btnText="LOCATE STORE"
              onPressButton={() =>
                this.props.navigation.navigate('DirectMapScreen')
              }
            />
          </View> */}
          {/* locate store end here */}

          {/* <InstagramStores instaImgs={INSTA_IMGS} /> */}
        </ScrollView>
      </View>
    );
  }

  /**
   * Go to single product screen when click best seller item
   *
   * @param {Object} proInfo
   */
  _handleClickListItem(proInfo) {
    this.props.navigation.navigate('SingleProductScreen', { proInfo: proInfo });
  }

  /**
   * Go to search screen when click search button
   */
  _handleClickSearchButton() {
    this.props.navigation.navigate('CartStack');
  }
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: marginHorizontal.small,
    marginTop: spaceVertical.small,
    marginBottom: spaceVertical.semiSmall,
    paddingVertical: spaceVertical.small / 2,
    backgroundColor: colors.black,
  },
  slideImg: {
    width: bannerWidth,
    height: bannerHeight,
    borderRadius: borderRadius.normal,
  },
  bestSeller: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: marginHorizontal.small,
    marginBottom: responsiveHeight(2.09),
  },
  horizontalList: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: marginHorizontal.small / 2,
    paddingBottom: spaceVertical.semiSmall,
  },
  locateStore: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: spaceVertical.normal,
  },
  locateStoreImg: {
    width: storeImgWidth,
    height: storeImgHeight,
    borderRadius: borderRadius.normal,
  },
});

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};
