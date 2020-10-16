import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
} from '../styles/variables';
import { notifyImgContainer } from '../styles/icon-variables';
import { NOTIFICATIONS } from '../static/data';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="NOTIFICATION"
        />

        <ScrollView>
          {NOTIFICATIONS.map((item, index) => (
            <View key={index}>
              <View style={styles.list}>
                <View style={styles.imgCont}>
                  <Image
                    source={item.image}
                    style={{ width: item.imageWidth, height: item.imageHeight }}
                  />
                </View>
                <View style={styles.right}>
                  <Text normal regular style={styles.notifyTxt}>
                    {item.notification}
                  </Text>
                  <Text small regular style={{ color: 'rgb(174,174,174)' }}>
                    {item.createdDate}
                  </Text>
                </View>
              </View>
              <Border
                bottom
                width={responsiveWidth(91.47)}
                alignSelf="flex-end"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    paddingHorizontal: marginHorizontal.normal,
    paddingVertical: spaceVertical.semiSmall,
  },
  imgCont: {
    height: notifyImgContainer.width,
    width: notifyImgContainer.height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    backgroundColor: colors.lightGray,
  },
  right: {
    flex: 1,
    marginLeft: marginHorizontal.semiSmall / 2,
  },
  notifyTxt: {
    marginBottom: spaceVertical.small / 2,
    color: 'rgb(110,110,110)',
  },
});

NotificationScreen.propTypes = {
  navigation: PropTypes.any,
};
