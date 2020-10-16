import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';
import BannerCard from '../../components/BannerCard';

export default class MainCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, categories } = this.props;

    const imgWidth = responsiveWidth(91.47);
    const imgHeight = imgWidth * 0.466;

    return (
      <View>
        {categories.map((item, index) => {
          return (
            <BannerCard
              key={index}
              right={index % 2 == 0}
              left={index % 2 == 1}
              categoryInfo={item}
              navigation={navigation}
              cardStyle={{
                marginHorizontal: marginHorizontal.small,
                marginBottom: spaceVertical.small,
              }}
              imgWidth={imgWidth}
              imgHeight={imgHeight}
              // onPressItem={() =>
              //   this.props.navigation.navigate('ListProductsScreen', {
              //     proInfo: { ...item }
              //   })
              // }
            />
          );
        })}
      </View>
    );
  }
}

MainCategory.propTypes = {
  navigation: PropTypes.any,
  categories: PropTypes.array,
};
