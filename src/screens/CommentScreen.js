/* global require */
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
} from '../styles/variables';
import { closeIc } from '../styles/icon-variables';

import { PRODUCT_REVIEWS } from '../static/data';
import CommentCard from '../components/CommentCard';

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          navigation={this.props.navigation}
          title="Review"
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/ic_close.png'),
              buttonWidth: closeIc.width,
              buttonHeight: closeIc.height,
              buttonAction: this._closeModal.bind(this),
            },
          ]}
        />
        <ScrollView>
          {(!Array.isArray(PRODUCT_REVIEWS) || PRODUCT_REVIEWS.length == 0) && (
            <View style={styles.headerCont}>
              <Text white normal regular style={{ textAlign: 'center' }}>
                No review on this product
              </Text>
            </View>
          )}
          {Array.isArray(PRODUCT_REVIEWS) &&
            PRODUCT_REVIEWS.length > 0 &&
            PRODUCT_REVIEWS.map((item, index) => (
              <CommentCard key={index} commentInfo={item} />
            ))}
        </ScrollView>
      </View>
    );
  }

  /**
   * Close reviews modal
   */
  _closeModal() {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  headerCont: {
    width: deviceWidth,
    paddingTop: spaceVertical.semiSmall,
    paddingBottom: responsiveHeight(3),
    backgroundColor: colors.black,
  },
});

CommentScreen.propTypes = {
  navigation: PropTypes.any,
};
