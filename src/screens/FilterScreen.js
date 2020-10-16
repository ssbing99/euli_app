/* global require */
/* global console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import PrimeButton from '../elements/PrimeButton';
import SelectBox from '../elements/SelectBox';
import PrimeModal from '../elements/PrimeModal';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  btnHeight,
  colors,
  fontSize,
  fontFamily,
  borderRadius,
} from '../styles/variables';
import { closeIc } from '../styles/icon-variables';

import { COLORS, BRANDS } from '../static/data';

export default class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiSliderValue: [15, 99],
      categoryModalVisible: false,
      selectedCategory: 'Please select',
      isSelectedCategory: false,
      categories: [
        {
          id: 0,
          name: 'T-Shirt',
        },
        {
          id: 1,
          name: 'Dress',
        },
        {
          id: 2,
          name: 'Bodysuit',
        },
        {
          id: 3,
          name: 'Jeans',
        },
        {
          id: 4,
          name: 'Sweater',
        },
        {
          id: 5,
          name: 'Coats',
        },
      ],
    };
  }

  render() {
    const btnSetting = {
      btnWidth: responsiveWidth(82.4),
      btnHeight: btnHeight,
      style: {
        alignSelf: 'center',
        marginTop: responsiveHeight(4.3),
        marginBottom: responsiveHeight(3.9),
      },
    };

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          navigation={this.props.navigation}
          title="Filter"
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
        <ScrollView>
          {/* rangePrice start here */}
          <View style={styles.rangePriceCont}>
            <Text
              black
              small
              mediumBold
              style={{ marginBottom: responsiveHeight(4.2) }}>
              RANGE PRICE
            </Text>
            <MultiSlider
              values={[
                this.state.multiSliderValue[0],
                this.state.multiSliderValue[1],
              ]}
              sliderLength={responsiveWidth(78.67)}
              onValuesChange={this.multiSliderValuesChange}
              min={15}
              max={99}
              step={1}
              allowOverlap
              snapped
              containerStyle={{
                height: 40,
              }}
              selectedStyle={{
                backgroundColor: colors.black,
              }}
              unselectedStyle={{
                backgroundColor: 'rgb(232,232,232)',
              }}
              pressedMarkerStyle={{
                width: 9,
                height: 9,
              }}
              markerStyle={{
                height: 9,
                width: 9,
                backgroundColor: colors.black,
                borderColor: 'transparent',
              }}
            />
            <Text
              gray
              small
              regular
              style={{ position: 'absolute', left: 0, bottom: 0 }}>
              ${this.state.multiSliderValue[0]}
            </Text>
            <Text
              gray
              small
              regular
              style={{ position: 'absolute', right: 0, bottom: 0 }}>
              ${this.state.multiSliderValue[1]}
            </Text>
          </View>
          {/* rangePrice end here */}

          {/* category start here */}
          <View style={styles.categoryCont}>
            <Text black small mediumBold style={styles.header}>
              CATEGORY
            </Text>
            <SelectBox
              isRightIcon
              containerStyle={{
                flex: 1,
                marginTop: 0,
              }}
              fieldStyle={{
                ...SelectBox.defaultProps.fieldStyle,
                borderColor: 'transparent',
                borderBottomWidth: 0,
              }}
              label={this.state.selectedCategory}
              onPressAction={() => this.toggleCategoryModal(true)}
            />
          </View>
          {/* category end here */}

          {/* color start here */}
          <View style={styles.colorCont}>
            <Text black small mediumBold style={styles.header}>
              COLOR
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {COLORS.map((item, index) => (
                <TouchableOpacity
                  activeOpactiy={0.8}
                  key={index}
                  style={[styles.oval, { backgroundColor: item.color }]}
                  onPress={() => {
                    /* TODO */
                  }}
                />
              ))}
            </View>
          </View>
          {/* color end here */}

          {/* brand start here */}
          <View style={styles.brandCont}>
            <Text black small mediumBold style={styles.header}>
              BRAND
            </Text>
            <View
              style={{
                width: deviceWidth,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {BRANDS.map((item, index) => (
                <Text
                  key={index}
                  style={styles.brandTxt}
                  onPress={() => {
                    console.log('selectedBrand', item.brand);
                  }}>
                  {item.brand}
                </Text>
              ))}
            </View>
          </View>
          {/* brand end here */}

          {/* button start here */}
          <PrimeButton
            navigation={this.props.navigation}
            setting={btnSetting}
            btnText="APPLY"
          />
          {/* button end here */}
        </ScrollView>

        {/* modal start here */}
        <PrimeModal
          modalVisible={this.state.categoryModalVisible}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderBody()}
          onRequestClose={() => {
            this.setState({
              categoryModalVisible: false,
            });
          }}
        />
        {/* modal end here */}
      </View>
    );
  }

  /**
   * Close filter modal
   */
  _closeModal() {
    this.props.navigation.goBack();
  }

  /**
   * Change value of multi slider
   * @params: values
   */
  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  };

  /**
   * Hide and show categories list modal
   * @params: visible
   */
  toggleCategoryModal(visible) {
    this.setState({
      categoryModalVisible: visible,
    });
  }

  /**
   * Render body of modal
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
          {this.state.categories.map((item, index) => (
            <TouchableHighlight
              key={index}
              underlayColor={colors.lightGray}
              onPress={() => this.selectCategory(item.name)}>
              <View style={styles.categoryItem}>
                <Text black normal regular>
                  {item.name}
                </Text>
                {this.state.isSelectedCategory == true &&
                  item.name == this.state.selectedCategory && (
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
            onPressButton={() => this.toggleCategoryModal(false)}
          />
        </View>
      </View>
    );
  }

  /**
   * Select category item
   * @params: id, state
   */
  selectCategory(id, state) {
    this.setState({
      selectedCategory: state,
      isSelectedCategory: true,
    });
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spaceVertical.semiSmall,
  },
  rangePriceCont: {
    marginTop: responsiveHeight(5.25),
    marginLeft: marginHorizontal.normal,
    marginRight: responsiveWidth(10.67),
  },
  categoryCont: {
    marginVertical: responsiveHeight(6),
    marginLeft: marginHorizontal.normal,
    marginRight: marginHorizontal.semiSmall,
  },
  colorCont: {
    marginBottom: responsiveHeight(6),
    marginLeft: marginHorizontal.normal,
    marginRight: responsiveWidth(18.93),
  },
  oval: {
    width: responsiveWidth(6.4),
    height: responsiveWidth(6.4),
    marginHorizontal: marginHorizontal.semiSmall / 2,
    borderRadius: 200,
    borderColor: 'transparent',
  },
  brandCont: {
    marginLeft: marginHorizontal.normal,
  },
  brandTxt: {
    width: responsiveWidth(91.5) / 2,
    paddingLeft: marginHorizontal.small / 2,
    paddingRight: marginHorizontal.small,
    paddingVertical: spaceVertical.small / 2,
    color: colors.gray,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: fontSize.large + spaceVertical.semiSmall,
    paddingHorizontal: marginHorizontal.semiSmall,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
  },
});

FilterScreen.propTypes = {
  navigation: PropTypes.any,
};
