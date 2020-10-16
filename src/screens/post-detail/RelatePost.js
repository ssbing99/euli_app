/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from '../../elements/Text';

import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  colors,
  fontSize,
  fontFamily,
} from '../../styles/variables';
import { relatePostImg } from '../../styles/image-variables';
import ListCard from '../../components/ListCard';
import { RELATED_POSTS } from '../../static/data';

export default class RelatePost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text
          black
          normal
          mediumBold
          style={{ marginHorizontal: marginHorizontal.semiSmall }}>
          RELATE POST
        </Text>
        {RELATED_POSTS.map((item, index) => (
          <ListCard
            hasImgIc
            key={index}
            borderBottom
            proInfo={item}
            cardStyles={{
              marginHorizontal: marginHorizontal.semiSmall,
              marginVertical: spaceVertical.normal,
            }}
            rightInfoStyles={{
              flex: 1,
              justifyContent: 'space-between',
            }}
            imgWidth={relatePostImg.width}
            imgHeight={relatePostImg.height}
            headerStyles={{
              color: colors.black,
              fontSize: fontSize.normal,
              fontFamily: fontFamily.regular,
            }}
            subHeader={
              <Text gray small regular>
                {item.category}
                <Text> / </Text>
                <Text>{item.createdDate}</Text>
              </Text>
            }
            icon={require('../../../img/icons/outline_ic_heart.png')}
            iconContStyles={{
              bottom: spaceVertical.normal,
              right: marginHorizontal.semiSmall,
            }}
            borderBottomWidth={responsiveWidth(93.6)}
          />
        ))}
      </View>
    );
  }
}

RelatePost.propTypes = {
  navigation: PropTypes.any,
};
