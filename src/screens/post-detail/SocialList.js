/* global require */
import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Text from '../../elements/Text';

import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';
import {
  faceIc,
  googleIc,
  twitterIc,
  otherIc,
} from '../../styles/icon-variables';

export default class SocialList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.social}>
        <View style={{ flex: 1, marginRight: marginHorizontal.semiSmall }}>
          <Text black small mediumBold>
            SHARE WITH
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={0.6} style={styles.socialIc}>
            <Image
              source={require('../../../img/icons/ic_face.png')}
              style={{ width: faceIc.width, height: faceIc.height }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.socialIc}>
            <Image
              source={require('../../../img/icons/ic_google.png')}
              style={{ width: googleIc.width, height: googleIc.height }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.socialIc}>
            <Image
              source={require('../../../img/icons/ic_twitter.png')}
              style={{ width: twitterIc.width, height: twitterIc.height }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.socialIc}>
            <Image
              source={require('../../../img/icons/ic_other.png')}
              style={{ width: otherIc.width, height: otherIc.height }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  social: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: marginHorizontal.semiSmall,
    marginTop: spaceVertical.semiSmall,
  },
  socialIc: {
    paddingVertical: 10,
    paddingLeft: 26,
  },
});

SocialList.propTypes = {
  navigation: PropTypes.any,
};
