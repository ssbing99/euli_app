import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';

import Text from '../elements/Text';
import { borderRadius, fontSize } from '../styles/variables';

export default class ColorCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      color,
      colorInfo,
      cardStyles,
      imgStyles,
      onPressItem,
      imgWidth,
      imgHeight,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[cardStyles, { width: imgWidth }]}
        onPress={onPressItem}>
        <View style={styles.tileCardItem}>
          <View
            style={[
              styles.image,
              imgStyles,
              { width: imgWidth, height: imgHeight, backgroundColor: color },
            ]}>
            <View style={styles.tileTextCont}>
              <Text white semibold style={styles.tileHeader}>
                {'Color Code: RGB ' + colorInfo.colorCode}
              </Text>
              <Text white normal mediumbold style={styles.tileCount}>
                {'Item ID: ' + colorInfo.itemId}
              </Text>
            </View>
          </View>
        </View>
        {/* {!isTile && isTile == null && (
          <View style={styles.cardItem}>
            <Image
              source={subCateInfo.image}
              style={[
                styles.image,
                imgStyles,
                { width: imgWidth, height: imgHeight },
              ]}
            />
            <View style={styles.textCont}>
              <Text
                black
                normal
                mediumBold
                numberOfLines={1}
                style={styles.header}>
                {subCateInfo.name}
              </Text>
              <Text gray small regular style={styles.count}>
                {subCateInfo.count + ' items'}
              </Text>
            </View>
          </View>
        )} */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: borderRadius.normal,
  },
  cardItem: {
    alignItems: 'center',
  },
  tileCardItem: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileTextCont: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textCont: {
    alignItems: 'center',
    paddingTop: 10,
  },
  tileHeader: {
    fontSize: fontSize.tileHeader,
    marginBottom: 40,
    textAlign: 'center',
  },
  header: {
    marginBottom: 3,
    textAlign: 'center',
  },
  tileCount: {
    opacity: 0.7,
    textAlign: 'center',
  },
  count: {
    textAlign: 'center',
  },
});

ColorCard.propTypes = {
  color: PropTypes.string,
  colorInfo: PropTypes.object,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,
  onPressItem: PropTypes.any,

  // Styles
  cardStyles: ViewPropTypes.style,
  imgStyles: ViewPropTypes.style,
};
