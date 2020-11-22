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
import { getInventoryItem } from '../api/methods/inventoryItem';
import * as inventoryActions from '../actions/inventoryActions';
import { connect } from 'react-redux';

const bannerWidth = deviceWidth;
const bannerHeight = bannerWidth * 0.64;

const storeImgWidth = responsiveWidth(91.47);
const storeImgHeight = storeImgWidth * 0.583;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isTranslucent: true,
      barColor: 'transparent',
      bestSeller: []
    };

    const { navigation } = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      console.log("focus")
      this._scrollToTop();
    });

  }

  componentDidMount (){
    console.log("DID MNT");
    this.loadInventoryItem();
  }

  _scrollToTop = () => {
    if (!!this.list) {
      this.list.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  loadInventoryItem = () => {
    if(!this.state.isLoading) {

      this.setState({isLoading: true});
      console.log("LOAD INV >>>> ");
      getInventoryItem().then(res => {
        if (res.data) {
          console.log("LOAD INV >>>> ", res.data);
          this.processInventoryItemsColor(res.data);

          let data = res.data;
          let arr = [];
          let cnt = 0;

          for (let i = 0; i < data.length; i++) {
            if (arr.length > 10)
              break;

            if (!data[i].SellingPrice) {
              data[i].SellingPrice = 0.00;
            }

            // if((data[i].Photo != null && data[i].Photo != "")){
            if (data[i].ColorCode != null && data[i].ColorCode != '' && cnt <= 10) {
              cnt++;
              arr.push(data[i]);
            }
            // }
          }

          this.setState({bestSeller: arr});
        }
      }).then(() => this.setState({isLoading: false}));
    }
  }

  /**
   * - Call when get All Inventory Items
   * - Store it and store the ColorCode list
   * - Use for select item after capture for calculate
   *
   */

  processInventoryItemsColor = async (data) => {

    if (data) {
      try{
        let items = [];
        let colors = [];

        for (let i = 0; i < data.length; i++) {
          items.push(data[i]);

          if (data[i]['ColorCode'] && data[i]['ColorCode'] != null) {
            let c = colors.find(e => e == data[i]['ColorCode']);
            if (!c) {
              colors.push(data[i]['ColorCode']);
            }
          }
        }

        this.props.storeItemsColor(items, colors);

      }catch (e) {
        console.log(e);
      }
    }
  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={[styles.loading]}>
          <ActivityIndicator size={"large"}/>
        </View>
      );
    }

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
          // rightButtons={[
          //   {
          //     key: 1,
          //     buttonIcon: require('../../img/icons/ic_cart.png'),
          //     buttonAction: this._handleClickSearchButton.bind(this),
          //     buttonWidth: searchIc.width,
          //     buttonHeight: searchIc.height,
          //   },
          // ]}
        />

        <ScrollView
          ref={(ref) => {
            this.list = ref;
          }}
          scrollEventThrottle={10}
          onScroll={({ nativeEvent }) => {
            if (isCloseToTop(nativeEvent)) {
              this.setState({ barColor: 'transparent', isTranslucent: false });
            } else {
              this.setState({ isTranslucent: false, barColor: 'transparent' });
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
          {/*{PRODUCTS != null && PRODUCTS.length > 0 && (*/}
          {/*  <ScrollView*/}
          {/*    horizontal={true}*/}
          {/*    showsHorizontalScrollIndicator={false}>*/}
          {/*    <View style={styles.horizontalList}>*/}
          {/*      {PRODUCTS.map((item, index) => (*/}
          {/*        <GridCard*/}
          {/*          key={index}*/}
          {/*          isFavourite*/}
          {/*          proInfo={item}*/}
          {/*          cardStyles={{*/}
          {/*            marginHorizontal: marginHorizontal.small / 2,*/}
          {/*          }}*/}
          {/*          wishIconStyles={{*/}
          {/*            bottom: 0,*/}
          {/*            right: 0,*/}
          {/*          }}*/}
          {/*          imgWidth={deviceWidth / 2.7}*/}
          {/*          imgHeight={(deviceWidth / 2.7) * 1.278}*/}
          {/*          textNumberOfLines={1}*/}
          {/*          onPressListItem={() => this._handleClickListItem(item)}*/}
          {/*        />*/}
          {/*      ))}*/}
          {/*    </View>*/}
          {/*  </ScrollView>*/}
          {/*)}*/}

          {this.state.bestSeller != null && this.state.bestSeller.length > 0 && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.horizontalList}>
                {this.state.bestSeller.map((item, index) => (
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

const mapDispatchToProps = (dispatch) => {
  return {
    storeItemsColor: (items, colors) => dispatch(inventoryActions.saveItemsColorList(items, colors)),
  }
}


export default connect(null, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  banner: {
    marginHorizontal: marginHorizontal.small,
    marginTop: spaceVertical.small,
    marginBottom: spaceVertical.semiSmall,
    paddingVertical: spaceVertical.small / 2,
    backgroundColor: colors.primary,
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
