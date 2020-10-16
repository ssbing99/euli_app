import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  colors,
  borderRadius,
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';
import { STORES } from '../static/data';

const imgWidth = responsiveWidth(87.2);
const imgHeight = imgWidth * 0.428;
export default class StoreScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          menu
          navigation={this.props.navigation}
          title="STORE"
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
          {STORES.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text
                black
                normal
                mediumBold
                style={{ marginTop: responsiveHeight(1.8) }}>
                {item.name}
              </Text>
              <Text
                gray
                small
                regular
                style={{ marginTop: responsiveHeight(0.8) }}>
                {item.address}
              </Text>
            </View>
          ))}
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
}

const styles = StyleSheet.create({
  card: {
    marginLeft: marginHorizontal.semiSmall,
    paddingRight: marginHorizontal.semiSmall,
    paddingVertical: spaceVertical.small,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  image: {
    width: imgWidth,
    height: imgHeight,
    borderRadius: borderRadius.normal,
  },
});

StoreScreen.propTypes = {
  navigation: PropTypes.any,
};
