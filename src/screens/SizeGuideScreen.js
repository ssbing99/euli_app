/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Form } from 'native-base';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Tabs } from 'native-base';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import TextInput from '../elements/TextInput';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
  inputHeight,
  btnHeight,
  deviceWidth,
  colors,
  fontFamily,
  fontSize,
  scrollableTabHeight,
} from '../styles/variables';
import { closeIc } from '../styles/icon-variables';

export default class SizeGuideScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const btnSetting = {
      btnWidth: responsiveWidth(82.4),
      btnHeight: btnHeight,
      style: {
        alignSelf: 'center',
        marginBottom: responsiveHeight(3.9),
      },
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          navigation={this.props.navigation}
          title="Size Guide"
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/ic_close.png'),
              buttonWidth: closeIc.width,
              buttonHeight: closeIc.height,
              buttonAction: this._closeModal.bind(this),
            },
          ]}
        />
        <Tabs
          initialPage={0}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{
                height: scrollableTabHeight,
              }}
              tabsContainerStyle={{
                height: scrollableTabHeight,
                alignItems: 'flex-end',
              }}
            />
          )}
          tabBarUnderlineStyle={{
            backgroundColor: colors.black,
          }}
          tabBarBackgroundColor={colors.white}
          tabBarActiveTextColor={colors.black}
          tabBarInactiveTextColor={colors.gray}
          tabBarTextStyle={{
            fontFamily: fontFamily.medium,
            fontSize: fontSize.medium,
          }}>
          <ScrollView style={{ flex: 1 }} heading="INCH">
            {this._renderBody()}
          </ScrollView>
          <ScrollView style={{ flex: 1 }} heading="CM">
            {this._renderBody()}
          </ScrollView>
        </Tabs>
        <PrimeButton
          navigation={this.props.navigation}
          setting={btnSetting}
          btnText="FIND MY SIZE"
        />
      </View>
    );
  }

  /**
   * Close size guide modal
   */
  _closeModal() {
    this.props.navigation.goBack();
  }

  /**
   * Render body of tab
   */
  _renderBody() {
    return (
      <View style={styles.tabContent}>
        <Form style={styles.form}>
          <TextInput inputHeight={inputHeight} label="Height" />
          <TextInput inputHeight={inputHeight} label="Weight" />
        </Form>
        <Text black normal mediumBold>
          RESULT FOR YOUR SIZE
        </Text>
        <Text black regular style={styles.sizeTxt}>
          XL
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContent: {
    marginHorizontal: marginHorizontal.semiSmall,
    marginBottom: spaceVertical.large,
  },
  form: {
    paddingBottom: spaceVertical.large,
  },
  sizeTxt: {
    marginTop: spaceVertical.normal,
    fontSize: fontSize.sizeGuideTxt,
  },
});

SizeGuideScreen.propTypes = {
  navigation: PropTypes.any,
};
