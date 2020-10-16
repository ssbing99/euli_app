'use strict';
/*eslint no-undef: "error"*/
/*eslint-env node*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { Form, Icon } from 'native-base';

import NavigationBar from '../elements/NavigationBar';
import PrimeButton from '../elements/PrimeButton';
import TextInput from '../elements/TextInput';
import Text from '../elements/Text';
import CheckBox from '../elements/CheckBox';
import SelectBox from '../elements/SelectBox';
import PrimeModal from '../elements/PrimeModal';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnWidth,
  btnHeight,
  inputHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
  colors,
  fontSize,
} from '../styles/variables';
import { STATES } from '../static/data';

export default class AddNewAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isChecked: false,
      modalVisible: false,
      selectedState: 'State',
      isSelectedState: false,
    };
  }

  render() {
    const formHeight = this.state.layout.height;
    const btnContHeight =
      deviceHeight - (formHeight + NAV_HEIGHT + STATUSBAR_HEIGHT);
    const btnSetting = {
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="ADD NEW ADDRESS"
        />
        <ScrollView>
          {/* form start here */}
          <View style={styles.form} onLayout={this.onLayout.bind(this)}>
            <Form style={{ paddingBottom: 33 }}>
              <TextInput inputHeight={inputHeight} label="Name Address" />
              <TextInput inputHeight={inputHeight} label="Street Address 01" />
              <TextInput inputHeight={inputHeight} label="Street Address 02" />
              <SelectBox
                isRightIcon
                containerStyle={{
                  ...SelectBox.defaultProps.containerStyle,
                  flex: 1,
                }}
                label={this.state.selectedState}
                onPressAction={() => this.toggleModal(true)}
              />
              <TextInput inputHeight={inputHeight} label="Phone Number" />
            </Form>
            <CheckBox
              label="Set Address Default"
              checked={this.state.isChecked}
              onChange={() =>
                this.setState({ isChecked: !this.state.isChecked })
              }
            />
          </View>
          {/* form end here */}

          {/* submit button start here */}
          <View
            style={[
              styles.btnCont,
              btnContHeight > btnHeight + responsiveHeight(6)
                ? { height: btnContHeight, paddingBottom: responsiveHeight(6) }
                : { marginBottom: responsiveHeight(6) },
            ]}>
            <PrimeButton
              navigation={this.props.navigation}
              setting={btnSetting}
              btnText="SUBMIT"
            />
          </View>
          {/* submit button end here */}
        </ScrollView>

        {/* state list modal start here */}
        <PrimeModal
          modalVisible={this.state.modalVisible}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderBody()}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}
        />
        {/* state list modal end here */}
      </View>
    );
  }

  /**
   * Get size of form component
   */
  onLayout = (e) => {
    this.setState({
      layout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };

  /**
   * Hide and show state list modal
   */
  toggleModal(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  /**
   * Render body of state list modal
   */
  renderBody() {
    const modalBtnSetting = {
      btnWidth: responsiveWidth(38.4),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };
    return (
      <View style={CommonStyles.modal}>
        <ScrollView style={CommonStyles.modalBody}>
          {STATES.map((item) => (
            <TouchableHighlight
              key={item.id}
              underlayColor={colors.lightGray}
              onPress={() => this.selectItem(item.id, item.state)}>
              <View style={styles.selectItem}>
                <Text black normal regular>
                  {item.state}
                </Text>
                {this.state.isSelectedState == true &&
                  item.state == this.state.selectedState && (
                    <Icon
                      name="ios-checkmark"
                      style={{ fontSize: fontSize.large }}
                    />
                  )}
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <View style={CommonStyles.modalFooter}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={modalBtnSetting}
            btnText="Close"
            onPressButton={() => this.toggleModal(false)}
          />
        </View>
      </View>
    );
  }

  /**
   * Select item on modal list
   *
   * @param: {Integer} id
   * @param: {String} state
   */
  selectItem(id, state) {
    this.setState({
      selectedState: state,
      isSelectedState: true,
    });
  }
}

AddNewAddressScreen.propTypes = {
  skipLoadingScreen: PropTypes.bool,
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: marginHorizontal.normal,
    paddingBottom: 59,
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: fontSize.large + spaceVertical.semiSmall,
    paddingHorizontal: marginHorizontal.semiSmall,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
  },
});
