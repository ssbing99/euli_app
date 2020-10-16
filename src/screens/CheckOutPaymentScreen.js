/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Form } from 'native-base';

import CustomStepIndicator from '../lib/CustomStepIndicator';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import PrimeButton from '../elements/PrimeButton';
import TextInput from '../elements/TextInput';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  btnHeight,
  inputHeight,
  borderRadius,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceWidth,
  deviceHeight,
  colors,
  indicatorStyles,
} from '../styles/variables';
import { cardIc } from '../styles/icon-variables';
import { cardContainer } from '../styles/image-variables';

export default class CheckOutPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subContLayout: {
        width: null,
        height: null,
      },
      currentPage: 1,
      methodPayment: 'credit',
    };
  }

  render() {
    const subContHeight = this.state.subContLayout.height;
    const btnContHeight =
      deviceHeight - (subContHeight + NAV_HEIGHT + STATUSBAR_HEIGHT);
    const btnSetting = {
      btnWidth: responsiveWidth(82.4),
      btnHeight: btnHeight,
    };

    const labelItems = [
      {
        label: 'Billing',
      },
      {
        label: 'Payment',
      },
      {
        label: 'Confirm',
      },
    ];

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="CHECK OUT"
        />
        <ScrollView>
          <View onLayout={this.onSubContLayout.bind(this)}>
            {/* step indicator start here */}
            <View style={CommonStyles.stepIndicator}>
              <CustomStepIndicator
                stepCount={3}
                customStyles={indicatorStyles}
                currentPosition={this.state.currentPage}
                labelItems={labelItems}
              />
            </View>
            {/* step indicator end here */}

            {/* cards list start here */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.cardList}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ methodPayment: 'basc' });
                  }}>
                  <View style={styles.inactiveCard}>
                    <Image
                      source={require('../../img/icons/ic_card.png')}
                      style={styles.cardImg}
                    />
                    <Text black regular normal>
                      Direct Bank Transfer
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ methodPayment: 'credit' });
                  }}>
                  <View style={styles.inactiveCard}>
                    <Image
                      source={require('../../img/icons/ic_card.png')}
                      style={styles.cardImg}
                    />
                    <Text black regular normal>
                      Credit Card
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {/* cards list end here */}

            {this.state.methodPayment == 'credit' && (
              <View style={styles.form}>
                <Form>
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
              </View>
            )}
          </View>

          {/* submit button start here */}
          <View
            style={[
              styles.btnCont,
              btnContHeight > btnHeight + responsiveHeight(3.9)
                ? {
                    height: btnContHeight,
                    paddingBottom: responsiveHeight(3.9),
                  }
                : { marginBottom: responsiveHeight(3.9) },
            ]}>
            <PrimeButton
              navigation={this.props.navigation}
              setting={btnSetting}
              btnText="PAY NOW"
              onPressButton={() =>
                this.props.navigation.navigate('CheckOutConfirmScreen')
              }
            />
          </View>
          {/* submit button end here */}
        </ScrollView>
      </View>
    );
  }

  /**
   *  Get size of step indicator and form component
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
  form: {
    paddingHorizontal: marginHorizontal.normal,
    paddingBottom: responsiveHeight(11.39),
  },
  cardList: {
    flexDirection: 'row',
    marginHorizontal: marginHorizontal.normal - marginHorizontal.semiSmall / 2,
    paddingTop: spaceVertical.normal,
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
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

CheckOutPaymentScreen.propTypes = {
  navigation: PropTypes.any,
};
