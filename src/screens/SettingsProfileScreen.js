/* global require */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Platform } from 'react-native';
import { Form } from 'native-base';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import PrimeButton from '../elements/PrimeButton';
import TextInput from '../elements/TextInput';
import SelectBox from '../elements/SelectBox';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnHeight,
  inputHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
} from '../styles/variables';
import { settingAvaImg } from '../styles/image-variables';
import { cameraIc } from '../styles/icon-variables';

export default class SettingsProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subContLayout: {
        width: null,
        height: null,
      },
    };
  }

  render() {
    const subContHeight = this.state.subContLayout.height;
    const btnContHeight =
      deviceHeight - (subContHeight + NAV_HEIGHT + STATUSBAR_HEIGHT);
    const btnSetting = {
      btnWidth: responsiveWidth(74.4),
      btnHeight: btnHeight,
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="SETTINGS PROFILE"
        />
        <ScrollView>
          <View onLayout={this.onSubContLayout.bind(this)}>
            {/* add avatar start here */}
            <View style={styles.avaCont}>
              <View style={styles.ava}>
                <Image
                  source={require('../../img/imba/avatar.png')}
                  style={{
                    width: settingAvaImg.width,
                    height: settingAvaImg.height,
                    ...Platform.select({
                      android: {
                        borderRadius: settingAvaImg.width,
                      },
                    }),
                  }}
                />
              </View>
              <View style={styles.addAvaBtn}>
                <Image
                  source={require('../../img/icons/ic_camera.png')}
                  style={{ width: cameraIc.width, height: cameraIc.height }}
                />
              </View>
            </View>
            {/* add avatar end here */}

            {/* setting form start here */}
            <Form style={styles.form}>
              <TextInput inputHeight={inputHeight} label="Fullname" />
              <TextInput inputHeight={inputHeight} label="Birthday" />
              <SelectBox
                isRightIcon
                containerStyle={{
                  ...SelectBox.defaultProps.containerStyle,
                  flex: 1,
                }}
                label="Gender"
              />
              <TextInput
                label="Bio"
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
              />
            </Form>
            {/* setting form end here */}
          </View>

          {/* submit button start here */}
          <View
            style={[
              styles.btnCont,
              btnContHeight > btnHeight + spaceVertical.normal
                ? { height: btnContHeight, paddingBottom: spaceVertical.normal }
                : { marginBottom: spaceVertical.normal },
            ]}>
            <PrimeButton
              navigation={this.props.navigation}
              setting={btnSetting}
              btnText="SUBMIT"
            />
          </View>
          {/* submit button end here */}
        </ScrollView>
      </View>
    );
  }

  /**
   * Get size of cards list and form component
   */
  onSubContLayout = (e) => {
    this.setState({
      subContLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };
}

const styles = StyleSheet.create({
  avaCont: {
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center',
    width: settingAvaImg.width,
    paddingTop: responsiveHeight(6),
  },
  ava: {
    width: settingAvaImg.width,
    height: settingAvaImg.height,
    borderRadius: settingAvaImg.height,
    overflow: 'hidden',
  },
  addAvaBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  form: {
    marginHorizontal: marginHorizontal.large,
    paddingTop: spaceVertical.semiSmall,
    paddingBottom: responsiveHeight(6),
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

SettingsProfileScreen.propTypes = {
  navigation: PropTypes.any,
};
