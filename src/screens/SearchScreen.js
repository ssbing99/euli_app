/* global require */
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Item, Input } from 'native-base';

import NavigationBar from '../elements/NavigationBar';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';
import { scanIc, searchIc } from '../styles/icon-variables';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'type something',
    };
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          centerChildren={
            <Item style={styles.item}>
              <Image
                source={require('../../img/icons/search.png')}
                style={{
                  width: searchIc.width,
                  height: searchIc.height,
                  marginRight: 5,
                }}
              />
              <Input
                placeholder="type something"
                style={StyleSheet.flatten(styles.input)}
              />
            </Item>
          }
          centerStyle={{
            width: (deviceWidth * 3.6) / 5,
          }}
          rightStyle={{
            paddingHorizontal: 0,
          }}
          rightBtnStyle={{
            paddingHorizontal: responsiveWidth(4.27),
          }}
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/ic_scan.png'),
              buttonAction: this._handleClickScanButton.bind(this),
              buttonWidth: scanIc.width,
              buttonHeight: scanIc.height,
            },
          ]}
        />
      </View>
    );
  }

  _handleClickScanButton() {
    this.props.navigation.navigate('ScanCodeScreen');
  }
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 0,
    borderColor: colors.black,
    borderBottomWidth: 1,
  },
  input: {
    height: responsiveHeight(5.39),
    color: colors.black,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
});

SearchScreen.propTypes = {
  navigation: PropTypes.any,
};
