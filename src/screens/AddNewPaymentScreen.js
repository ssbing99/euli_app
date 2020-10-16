import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Form } from 'native-base';

import NavigationBar from '../elements/NavigationBar';
import PrimeButton from '../elements/PrimeButton';
import TextInput from '../elements/TextInput';
import CheckBox from '../elements/CheckBox';

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
  borderRadius,
} from '../styles/variables';
import { cardIc } from '../styles/icon-variables';
import { cardContainer } from '../styles/image-variables';

export default class AddNewPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
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
      btnWidth: btnWidth.normal,
      btnHeight: btnHeight,
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="ADD NEW PAYMENT"
        />
        <ScrollView>
          <View onLayout={this.onSubContLayout.bind(this)}>
            {/* cards list start here */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.cardList}>
                <View style={styles.inactiveCard}>
                  <Image
                    source={require('../../img/icons/ic_card.png')}
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.inactiveCard}>
                  <Image
                    source={require('../../img/icons/ic_card.png')}
                    style={styles.cardImg}
                  />
                </View>
              </View>
            </ScrollView>
            {/* cards list end here */}

            {/* form start here */}
            <View style={styles.form}>
              <Form style={{ paddingBottom: 33 }}>
                <TextInput inputHeight={inputHeight} label="Name On Card" />
                <TextInput inputHeight={inputHeight} label="Card Number" />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    inputHeight={inputHeight}
                    label="CVV"
                    inputStyles={{
                      flex: 0,
                      width: responsiveWidth(24.8),
                    }}
                  />
                  <TextInput
                    inputHeight={inputHeight}
                    label="Exp.Month"
                    inputStyles={{
                      flex: 0,
                      width: responsiveWidth(24.8),
                    }}
                  />
                  <TextInput
                    inputHeight={inputHeight}
                    label="Exp.Date"
                    inputStyles={{
                      flex: 0,
                      width: responsiveWidth(24.8),
                    }}
                  />
                </View>
              </Form>
              <CheckBox
                label="Set Payment Default"
                checked={this.state.isChecked}
                onChange={() =>
                  this.setState({ isChecked: !this.state.isChecked })
                }
              />
            </View>
            {/* form end here */}
          </View>

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
  cardList: {
    flexDirection: 'row',
    marginHorizontal: 21,
    paddingTop: 32,
  },
  activeCard: {
    width: cardContainer.width,
    height: cardContainer.height,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: marginHorizontal.semiSmall / 2,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: borderRadius.normal,
  },
  inactiveCard: {
    width: cardContainer.width,
    height: cardContainer.height,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: marginHorizontal.semiSmall / 2,
    borderRadius: borderRadius.normal,
    backgroundColor: 'rgb(248,248,248)',
  },
  cardImg: {
    width: cardIc.width,
    height: cardIc.height,
    marginBottom: responsiveHeight(3.15),
  },
  form: {
    paddingHorizontal: marginHorizontal.normal,
    paddingBottom: 59,
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

AddNewPaymentScreen.propTypes = {
  navigation: PropTypes.any,
};
