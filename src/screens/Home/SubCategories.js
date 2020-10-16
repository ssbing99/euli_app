import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';
import CategoryCard from '../../components/CategoryCard';

export default class SubCategories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    const imgWidth = responsiveWidth(43.73);
    const imgHeight = imgWidth * 1.24;

    return (
      <View style={styles.categories}>
        {this.props.subcategories != null &&
          this.props.subcategories.map((item, index) => (
            <CategoryCard
              key={index}
              subCateInfo={item}
              navigation={navigation}
              cardStyles={{
                marginHorizontal: responsiveWidth(4) / 2,
                marginBottom: spaceVertical.semiSmall,
              }}
              imgWidth={imgWidth}
              imgHeight={imgHeight}
              // onPressItem={() =>
              //   this.props.navigation.navigate('ListProductsScreen', {
              //     proInfo: {
              //       name: 'FOR MAN',
              //       image: require('../../../img/imba/img_banner_man.png'),
              //       count: 113,
              //     }
              //   })
              // }
            />
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: responsiveWidth(2.27),
  },
});

SubCategories.propTypes = {
  navigation: PropTypes.any,
  subcategories: PropTypes.array,
};
