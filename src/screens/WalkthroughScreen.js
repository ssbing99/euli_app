import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import ROUTES from '@ultis/routes';

import Text from '../elements/Text';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  deviceWidth,
  deviceHeight,
  btnWidth,
  btnHeight,
  colors,
  lineHeight,
  borderRadius,
} from '../styles/variables';

const slideImgWidth = responsiveWidth(78.67);
const slideImgHeight = slideImgWidth * 1.2;

export default class WalkthroughScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      slideIndex: 0,
    };
  }

  render() {
    const elementHeight = this.state.layout.height;
    const space = deviceHeight - (elementHeight + btnHeight);
    const btnSetting = {
      btnWidth: deviceWidth,
      btnHeight: btnHeight,
      style: {
        borderRadius: 0,
      },
    };

    const images = [
      {
        image: require('../../img/imba/walk-img.png'),
        header: 'Welcome',
        content: 'Free Beauty Samples What They Are And How To Find Them',
      },
      {
        image: require('../../img/imba/walk-img2.png'),
        header: 'Find Store',
        content: 'Knowing What Moisturizer To Use Is Knowing About Your Skin',
      },
      {
        image: require('../../img/imba/walk-img3.png'),
        header: 'Happy Shopping',
        content: 'Cosmetic Surgery A Review Of Facial Surgery With Personal',
      },
    ];
    const currentItem = images[this.state.slideIndex];

    return (
      <View style={CommonStyles.container}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor="white"
        />
        <ScrollView>
          <View onLayout={this.onLayout.bind(this)}>
            <View style={styles.slideNumber}>
              {images.length == this.state.slideIndex + 1 && (
                <Text lightGray small regular>
                  0{this.state.slideIndex}
                </Text>
              )}
              {images.length != this.state.slideIndex + 1 && (
                <Text black small regular>
                  0{this.state.slideIndex + 1}
                </Text>
              )}
              <View
                style={{
                  width: responsiveWidth(9.6),
                  marginHorizontal: responsiveWidth(2.4),
                  borderBottomWidth: 2,
                  borderColor: colors.lightGray,
                }}
              />
              {images.length == this.state.slideIndex + 1 && (
                <Text black small regular>
                  0{images.length}
                </Text>
              )}
              {images.length != this.state.slideIndex + 1 && (
                <Text lightGray small regular>
                  0{images.length}
                </Text>
              )}
            </View>
            <View>{this._renderSlide(images)}</View>
            <View
              style={[
                styles.info,
                space < 20 && { marginBottom: responsiveHeight(8.25) },
              ]}>
              <Text black large mediumBold style={{ textAlign: 'center' }}>
                {currentItem.header}
              </Text>
              <Text darkGray normal regular style={styles.desc}>
                {currentItem.content}
              </Text>
            </View>
          </View>
        </ScrollView>

        <PrimeButton
          navigation={this.props.navigation}
          setting={btnSetting}
          btnText="STARTED"
          onPressButton={() =>
            this.props.navigation.navigate(ROUTES.NewsletterScreen)
          }
        />
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

  /**
   * Render slide carosel item
   *
   * @params: item
   */
  _renderItem({ item }) {
    return (
      <Image
        source={item.image}
        style={{
          width: slideImgWidth,
          height: slideImgHeight,
          borderRadius: borderRadius.normal,
          alignSelf: 'center',
        }}
      />
    );
  }

  /**
   * Render slide carosel
   *
   * @params: images
   */
  _renderSlide(images) {
    return (
      <Carousel
        data={images}
        renderItem={this._renderItem}
        sliderWidth={deviceWidth}
        itemWidth={slideImgWidth}
        onSnapToItem={this._handleSnapToItem.bind(this)}
      />
    );
  }

  /**
   * Handle when snap slide item
   *
   * @params: slideIndex
   */
  _handleSnapToItem(slideIndex) {
    this.setState({ slideIndex: slideIndex });
  }
}

const styles = StyleSheet.create({
  slideNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveHeight(4.05),
    paddingBottom: responsiveHeight(4.35),
  },
  info: {
    marginHorizontal: responsiveWidth(10.93),
    paddingTop: responsiveHeight(7.2),
  },
  desc: {
    marginTop: responsiveHeight(1.8),
    lineHeight: lineHeight.normal,
    textAlign: 'center',
  },
});

WalkthroughScreen.propTypes = {
  navigation: PropTypes.any,
};
