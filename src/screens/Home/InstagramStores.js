import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';

import Text from '../../elements/Text';
import {
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';

export default class InstagramStores extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imgWidth = responsiveWidth(29.07);
    const imgHeight = imgWidth;

    return (
      <View>
        <Text black normal mediumBold style={{ alignSelf: 'center' }}>
          #IMBASTORE ON INSTAGRAM
        </Text>
        <View style={styles.list}>
          {this.props.instaImgs.map((item, index) => (
            <View key={index} style={styles.item}>
              <Image
                source={item.image}
                style={{
                  width: imgWidth,
                  height: imgHeight,
                  borderRadius: 4,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: spaceVertical.small - spaceVertical.small / 4,
  },
  item: {
    marginHorizontal: marginHorizontal.small / 4,
    marginVertical: spaceVertical.small / 4,
  },
});

InstagramStores.propTypes = {
  navigation: PropTypes.any,
};
