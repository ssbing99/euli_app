/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';

import Text from '../elements/Text';
import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  lineHeight,
  borderRadius,
  isColorCode
} from '../styles/variables';
import { DataTable } from 'react-native-paper';

export default class GridCard extends Component {

  state = {
    image: require('../../img/imba/img.png')
  };

  componentDidMount (){
    const { proInfo } = this.props;
    const imgSrc = (proInfo.Photo && {uri: proInfo.Photo}) ;
    this.setState({ image: imgSrc});
  }

  loadFallBack = (event) => {
    this.setState({ image: require('../../img/imba/img.png')});
  }

  render() {
    const {
      isFavourite,
      proInfo,
      cardStyles,
      imgStyles,
      imgWidth,
      imgHeight,
      wishIconStyles,
      textNumberOfLines,
      onPressListItem,
      onPressIcon,
    } = this.props;
    return (
      <View style={{ position: 'relative' }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[cardStyles, { width: imgWidth }]}
          onPress={onPressListItem}>
          { isColorCode && proInfo.ColorCode &&
          <View
            style={ [
              imgStyles,
              styles.image,
              { width: imgWidth, height: imgHeight, backgroundColor: `rgb(${proInfo.ColorCode})` },
            ] }
          />
          }
          { !isColorCode && this.state.image &&
          <Image
            source={ this.state.image }
            style={ [
              imgStyles,
              styles.image,
              { width: imgWidth, height: imgHeight },
            ] }
            onError={ this.loadFallBack }
          />
          }
          <View style={styles.textCont}>
            {(proInfo.name != null || proInfo.Name != null )&& (
              <Text
                black
                small
                mediumBold
                numberOfLines={textNumberOfLines}
                style={styles.header}>
                {proInfo.name || proInfo.Name }
              </Text>
            )}
            {proInfo.price != null && (
              <Text black small bold>
                ${proInfo.price}
              </Text>
            )}
            {proInfo.SellingPrice != null && (
              <Text black small bold>
                {((proInfo.SellingPrice * 100) / 100).toFixed(2)}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        {isFavourite && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[CommonStyles.wishCont, wishIconStyles]}
            onPress={onPressIcon}>
            <Image
              source={require('../../img/icons/ic_red_heart.png')}
              style={CommonStyles.wishIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: borderRadius.normal,
  },
  textCont: {
    paddingTop: responsiveHeight(1.35),
  },
  header: {
    lineHeight: lineHeight.small,
    marginBottom: responsiveHeight(0.6),
  },
});

GridCard.propTypes = {
  proInfo: PropTypes.object,
  isFavourite: PropTypes.bool,
  textNumberOfLines: PropTypes.number,
  onPressListItem: PropTypes.any,
  onPressIcon: PropTypes.any,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,

  // Styles
  cardStyles: ViewPropTypes.style,
  imgStyles: ViewPropTypes.style,
  wishIconStyles: ViewPropTypes.style,
};
