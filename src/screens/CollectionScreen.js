/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import CustomSwiper from '../lib/CustomSwiper';
import NavigationBar from '../elements/NavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { responsiveWidth, deviceHeight, colors } from '../styles/variables';
import { searchIc, indicatorDot } from '../styles/icon-variables';
import { COLLECTIONS } from '../static/data';
import CollectionCard from '../components/CollectionCard';

export default class CollectionScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          // menu
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
        <CustomSwiper
          height={deviceHeight}
          dotColor={colors.white}
          dotStyle={{
            width: indicatorDot.width,
            height: indicatorDot.height,
          }}
          activeDotColor={colors.black}
          activeDotStyle={{
            width: indicatorDot.width,
            height: indicatorDot.height,
          }}
          autoplay
          loop={false}>
          <CollectionCard
            collectionInfo={COLLECTIONS[0]}
            headerStyles={{
              width: responsiveWidth(28.53),
            }}
          />
          <CollectionCard
            collectionInfo={COLLECTIONS[1]}
            headerStyles={{
              width: responsiveWidth(40.27),
            }}
          />
          <CollectionCard
            collectionInfo={COLLECTIONS[2]}
            headerStyles={{
              width: responsiveWidth(50.13),
            }}
          />
        </CustomSwiper>
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

CollectionScreen.propTypes = {
  navigation: PropTypes.any,
};
