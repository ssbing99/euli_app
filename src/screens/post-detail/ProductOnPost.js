import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../elements/Text';

import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';
import GridCard from '../../components/GridCard';
import { PRODUCTS } from '../../static/data';

const imgWidth = responsiveWidth(38.4);
const imgHeight = responsiveWidth(38.4) * 1.27;

export default class ProductOnPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.product}>
        <Text
          black
          normal
          mediumBold
          style={{
            marginBottom: spaceVertical.small,
            marginHorizontal: marginHorizontal.semiSmall,
          }}>
          PRODUCT ON POST
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalList}>
            {PRODUCTS.map((item, index) => (
              <GridCard
                key={index}
                proInfo={item}
                cardStyles={{
                  marginHorizontal: marginHorizontal.small / 2,
                }}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                textNumberOfLines={1}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  product: {
    marginBottom: responsiveHeight(5.99),
  },
  horizontalList: {
    flexDirection: 'row',
    marginHorizontal: marginHorizontal.small,
  },
});

ProductOnPost.propTypes = {
  navigation: PropTypes.any,
};
