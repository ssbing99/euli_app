/* global require */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { ActionSheet } from 'native-base';

import CustomSwiper from '../lib/CustomSwiper';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import PrimeButton from '../elements/PrimeButton';
import Border from '../elements/Border';
import PrimeModal from '../elements/PrimeModal';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnWidth,
  btnHeight,
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
  borderRadius,
} from '../styles/variables';
import { heartIc, videoIc, shareIc, arrDownIc } from '../styles/icon-variables';

import { PRODUCTS } from '../static/data';

import GridCard from '../components/GridCard';
import ListItem from '../components/ListItem';

const imgWidth = deviceWidth;
const imgHeight = imgWidth * 1.25;

const proImgWidth = responsiveWidth(38.4);
const proImgHeight = proImgWidth * 1.27;

export default class SingleProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetsAreLoaded: false,
      showListColor: false,
      showListSize: false,
      selectedColor: '#000',
      selectedSize: 'SIZE',
      slideImage: [],
      priceList: [],
    };
  }

  componentDidMount (){

    const { route } = this.props;
    const { proInfo } = route.params;
    const { Options } = proInfo;

    let slideImg = [];
    let opt = [];

    const imgSrc = proInfo.Photo && {uri: proInfo.Photo} ;

    slideImg.push({image: imgSrc});

    this.setState({ slideImage: slideImg});

    if(Options && Options.length){
      opt.push(...Options);
      this.setState({ priceList: opt });
    }

  }

  loadFallBack = (i) => {
    const { slideImage } = this.state;
    slideImage.map((item, index) => {
      if(index == i){
        item.image = require('../../img/imba/img.png');
      }
    });

    console.log("new slide", slideImage);
    this.setState({ slideImage: slideImage });
  }

  render() {
    const btnSetting = {
      btnWidth: btnWidth.large,
      btnHeight: btnHeight,
      style: {
        alignSelf: 'center',
        marginBottom: spaceVertical.small,
      },
    };

    const detailStyles = StyleSheet.create({
      card: {
        paddingHorizontal: marginHorizontal.semiSmall,
        paddingVertical: spaceVertical.small,
      },
      header: {
        color: colors.black,
        fontSize: fontSize.small,
        fontFamily: fontFamily.medium,
      },
    });

    const { route } = this.props;
    const { proInfo } = route.params;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          statusBarProps={{
            translucent: true,
            barStyle: 'dark-content',
            backgroundColor: 'transparent',
          }}
          outerContStyle={{
            zIndex: 100,
            position: 'absolute',
            top: 0,
            backgroundColor: 'transparent',
          }}
        />

        <ScrollView>
          {/* slider start here */}
          <CustomSwiper
            height={imgHeight}
            dotColor={colors.white}
            autoplay
            loop={false}
            activeDotColor={colors.black}>
            {proInfo.ColorCode &&
              <View
                style={{ width: imgWidth, height: imgHeight, backgroundColor: `rgb(${proInfo.ColorCode})` }}
              />
            }
            {/*{this.state.slideImage.map((item, index) => (*/}
            {/*  <Image*/}
            {/*    key={index}*/}
            {/*    source={item.image}*/}
            {/*    style={{ width: imgWidth, height: imgHeight }}*/}
            {/*    onError={() => this.loadFallBack(index)}*/}
            {/*  />*/}
            {/*))}*/}
          </CustomSwiper>
          {/* slider end here */}

          {/* icon group start here */}
          {/* <View style={styles.group}>
            <View style={styles.groupItem}>
              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require('../../img/icons/ic_heart.png')}
                  style={{ width: heartIc.width, height: heartIc.height }}
                />
              </TouchableOpacity>
            </View>
            <Border right alignSelf="center" height={responsiveHeight(4.79)} />
            <View style={styles.groupItem}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.navigation.navigate('VideoScreen')}>
                <Image
                  source={require('../../img/icons/ic_video.png')}
                  style={{ width: videoIc.width, height: videoIc.height }}
                />
              </TouchableOpacity>
            </View>
            <Border right alignSelf="center" height={responsiveHeight(4.79)} />
            <View style={styles.groupItem}>
              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require('../../img/icons/ic_share.png')}
                  style={{ width: shareIc.width, height: shareIc.height }}
                />
              </TouchableOpacity>
            </View>
          </View> */}
          {/* icon group end here */}

          {/* product info start here */}
          <View style={styles.info}>
            <Text
              black
              normal
              mediumBold
              style={{ width: responsiveWidth(51.31) }}>
              {proInfo.name}
            </Text>
            <Text black normal bold>
              ${proInfo.price || ((proInfo.SellingPrice * 100) / 100).toFixed(2) || "0.00"}
            </Text>
          </View>
          {/* product info end here */}

          {/* select size, color start here */}
          <Border bottom width={responsiveWidth(91.46)} alignSelf="center" />
          {/*<View style={styles.sizeColor}>*/}
          {/*  <TouchableOpacity*/}
          {/*    activeOpacity={0.6}*/}
          {/*    style={[*/}
          {/*      styles.sizeColorItem,*/}
          {/*      { paddingHorizontal: marginHorizontal.small },*/}
          {/*    ]}*/}
          {/*    onPress={() => this.setState({ showListColor: true })}>*/}
          {/*    <View*/}
          {/*      style={[*/}
          {/*        styles.oval,*/}
          {/*        { backgroundColor: this.state.selectedColor },*/}
          {/*      ]}*/}
          {/*    />*/}
          {/*    <Image*/}
          {/*      source={require('../../img/icons/ic_down.png')}*/}
          {/*      style={{ width: arrDownIc.width, height: arrDownIc.height }}*/}
          {/*    />*/}
          {/*  </TouchableOpacity>*/}
          {/*  /!* <Border right height={responsiveHeight(4.79)} />*/}
          {/*  <TouchableOpacity*/}
          {/*    activeOpacity={0.6}*/}
          {/*    style={[*/}
          {/*      styles.sizeColorItem,*/}
          {/*      { paddingHorizontal: marginHorizontal.small },*/}
          {/*    ]}*/}
          {/*    onPress={() => this.setState({ showListSize: true })}>*/}
          {/*    <Text grey normal mediumBold>*/}
          {/*      {this.state.selectedSize}*/}
          {/*    </Text>*/}
          {/*    <Image*/}
          {/*      source={require('../../img/icons/ic_down.png')}*/}
          {/*      style={{ width: arrDownIc.width, height: arrDownIc.height }}*/}
          {/*    />*/}
          {/*  </TouchableOpacity> *!/*/}
          {/*</View>*/}
          <Border
            bottom
            width={responsiveWidth(91.46)}
            alignSelf="center"
            borderStyle={{
              marginBottom: spaceVertical.semiSmall,
            }}
          />
          <Border bottom width={deviceWidth} />
          {/* select size, color end here */}

          {/* other content start here */}
          {/* <ListItem
            cardStyles={detailStyles.card}
            headerStyles={detailStyles.header}
            header="Information Details"
            borderWidth={responsiveWidth(93.6)}
          />
          <ListItem
            cardStyles={detailStyles.card}
            headerStyles={detailStyles.header}
            header="Reviewer"
            borderWidth={responsiveWidth(93.6)}
            onPressItem={() => this.props.navigation.navigate('CommentScreen')}
          />
          <ListItem
            cardStyles={detailStyles.card}
            headerStyles={detailStyles.header}
            header="Size Guide"
            borderWidth={responsiveWidth(93.6)}
            onPressItem={() =>
              this.props.navigation.navigate('SizeGuideScreen')
            }
          /> */}
          {/* other content end here */}

          {/* relates products start here */}
          {/* <View style={styles.relatePro}>
            <Text black normal mediumBold style={styles.relateProHeader}>
              MAY YOU LIKE IT
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.horizontalList}>
                {PRODUCTS != null &&
                  PRODUCTS.length > 0 &&
                  PRODUCTS.map((item, index) => (
                    <GridCard
                      isFavourite
                      key={index}
                      proInfo={item}
                      cardStyles={{
                        marginHorizontal: marginHorizontal.small / 2,
                      }}
                      wishIconStyles={{
                        bottom: 0,
                        right: 0,
                      }}
                      imgWidth={proImgWidth}
                      imgHeight={proImgHeight}
                      textNumberOfLines={1}
                    />
                  ))}
              </View>
            </ScrollView>
          </View> */}
          {/* relates products end here */}

          <PrimeButton
            navigation={this.props.navigation}
            setting={btnSetting}
            btnText="ADD TO CART"
          />
        </ScrollView>

        {/* select color modal start here */}
        <PrimeModal
          containerStyle={{
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
          modalVisible={this.state.showListColor}
          body={this.renderBodyColor(proInfo.color)}
          onRequestClose={() => {
            this.setState({
              showListColor: false,
            });
          }}
        />
        {/* select color modal end here */}

        {/* select size modal start here */}
        <PrimeModal
          containerStyle={{
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
          modalVisible={this.state.showListSize}
          body={this.renderBodySize(proInfo.size)}
          onRequestClose={() => {
            this.setState({
              showListSize: false,
            });
          }}
        />
        {/* select size modal end here */}
      </View>
    );
  }

  /**
   * Render body of select size modal
   *
   * @param: productSizes
   */
  renderBodySize(productSizes) {
    return (
      <View style={styles.modal}>
        {productSizes != null &&
          productSizes.length > 0 &&
          productSizes.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpactiy={0.8}
                key={index}
                style={[styles.sizeItem]}
                onPress={() => this._selectSize(item)}>
                <Text grey normal mediumBold>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }

  /**
   * Render body of select color modal
   *
   * @param: productColors
   */
  renderBodyColor(productColors) {
    return (
      <View style={styles.modal}>
        {productColors != null &&
          productColors.length > 0 &&
          productColors.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpactiy={0.8}
                key={index}
                style={[styles.oval, { margin: 12, backgroundColor: item }]}
                onPress={() => this._selectColor(item)}
              />
            );
          })}
      </View>
    );
  }

  /**
   * Select size from size list
   *
   * @param: {String} size
   */
  _selectSize(size) {
    this.setState({ showListSize: false });
    this.setState({ selectedSize: size });
  }

  /**
   * Select color from colors list
   *
   * @param: {String} color
   */
  _selectColor(color) {
    this.setState({ showListColor: false });
    this.setState({ selectedColor: color });
  }
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  groupItem: {
    width: deviceWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spaceVertical.small,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: marginHorizontal.semiSmall,
  },
  sizeColor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sizeColorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth,
    paddingVertical: spaceVertical.small,
  },
  relatePro: {
    marginTop: spaceVertical.normal,
    marginBottom: spaceVertical.small,
  },
  relateProHeader: {
    paddingBottom: spaceVertical.semiSmall,
    paddingHorizontal: marginHorizontal.small,
  },
  horizontalList: {
    flexDirection: 'row',
    marginHorizontal: marginHorizontal.small / 2,
  },
  oval: {
    width: responsiveWidth(8.53),
    height: responsiveWidth(8.53) * 0.75,
    borderRadius: borderRadius.normal,
    borderColor: 'transparent',
  },
  modal: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  sizeItem: {
    padding: 12,
  },
});

SingleProductScreen.propTypes = {
  navigation: PropTypes.any,
};
