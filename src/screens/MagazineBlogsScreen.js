import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceWidth,
  deviceHeight,
  borderRadius,
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';
import { POSTS } from '../static/data';

const itemHorizontalMargin = marginHorizontal.small / 2;
const slideWidth = responsiveWidth(85.33);
const slideHeight = slideWidth * 1.25;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class MagazineBlogsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      elementLayout: {
        width: null,
        height: null,
      },
    };
  }

  render() {
    const currentItem = POSTS[this.state.slideIndex];
    const elementHeight =
      this.state.elementLayout.height + NAV_HEIGHT + STATUSBAR_HEIGHT;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          menu
          navigation={this.props.navigation}
          title="MAGAZINE BLOGS"
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
          <View onLayout={this.onElementLayout.bind(this)}>
            <View style={styles.slideCont}>{this.slide}</View>
            <View
              style={[
                styles.textCont,
                deviceHeight <= elementHeight
                  ? { paddingBottom: spaceVertical.normal }
                  : { paddingBottom: 0 },
              ]}>
              <Text
                black
                large
                regular
                style={{ marginBottom: responsiveHeight(3.6) }}>
                {currentItem.title}
              </Text>
              <Text gray small regular>
                {currentItem.createdDate}
              </Text>
            </View>
          </View>
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

  /**
   * Render slide carosel item
   */
  _renderItem({ item }) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          this.props.navigation.navigate('PostDetailsScreen', {
            title: item.title,
            image: item.image,
            createdDate: item.createdDate,
          });
        }}
        style={styles.slideInnerCont}>
        <View style={styles.imageCont}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * Render slide carosel
   */
  get slide() {
    return (
      <Carousel
        data={POSTS}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={deviceWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={'start'}
        onSnapToItem={this.handleSnapToItem.bind(this)}
      />
    );
  }

  handleSnapToItem(slideIndex) {
    this.setState({ slideIndex: slideIndex });
  }

  /**
   * Get size of all elements
   */
  onElementLayout = (e) => {
    this.setState({
      elementLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };
}

const styles = StyleSheet.create({
  slideCont: {
    paddingTop: responsiveHeight(1.2),
    paddingLeft: marginHorizontal.small / 2,
  },
  slideInnerCont: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
  },
  imageCont: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: borderRadius.normal,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: borderRadius.normal,
  },
  textCont: {
    width: responsiveWidth(74.67),
    paddingTop: spaceVertical.semiSmall,
    paddingLeft: marginHorizontal.semiSmall,
  },
});

MagazineBlogsScreen.propTypes = {
  navigation: PropTypes.any,
};
