import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';

import NavigationBar from '../elements/NavigationBar';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
  scrollableTabHeight,
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';

import { CATEGORIES } from '../static/data';
import CategoryCard from '../components/CategoryCard';
import ColorCard from '@components/ColorCard';
import { getColorList } from '../api/methods/colors';
import { connect } from 'react-redux';

const imgWidth = responsiveWidth(87.19) / 2;
const imgHeight = imgWidth * 1.19;

class ColorListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
      isLoading: false,
    }

    const { color } = this.props.route.params;
    this.color = color;

    this.getColorList();

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      console.log("focus")
      this.getColorList();
    });

    // this.blurListener = navigation.addListener('blur', e => {
    //   // console.log("blur child", e);
    //   this.props.navigation.goBack();
    // });

  }

  componentWillUnmount() {

    try {
      if (this.focusListener) {
        this.focusListener.remove();
      }
    } catch (e) {}
  }

  updateLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  getColorList = () => {
    if(this.color) {
      let colorItems = this.color.colorItems || [];
      this.setState({colors: colorItems});
    }
  }

  getContrastColor = (colorRgb) => {
    let colorSplit = colorRgb.replace(/[^0-9,]/g, '').split(',');
    let isGreater = (colorSplit[0] * 0.299) + (colorSplit[1] * 0.587) + (colorSplit[2] * 0.114);
    if (isGreater > 186) {
      return colors.black;
    } else {
      return colors.white;
    }
  };

  renderColorCard = () => {
    const { colors } = this.state;
    if(this.state.colors.length > 0){
      let rows = [];

      colors.forEach(c => {
        let textColor = this.getContrastColor(c.colorRGB);
        rows.push(
          <ColorCard
            isTile
            cardStyles={{ margin: marginHorizontal.small / 2 }}
            textStyle={{ color: textColor}}
            colorInfo={{
              colorCode: `(${c.colorRGB})`,
              itemId: c.Id,
              SellingPrice: c.SellingPrice
            }}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            color={`rgb(${c.colorRGB})`}
            // eslint-disable-next-line react-native/no-inline-styles
            imgStyles={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
      });

      return rows;
    }
    return <View style={{ justifyContent: 'center', alignItems: 'center', flex:1}}><Text>No Item Matched.</Text></View>
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.loading]}>
          <ActivityIndicator size={"large"}/>
        </View>
      );
    }

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          // menu
          back
          navigation={this.props.navigation}
          title="ITEM LISTING"
          // rightButtons={[
          //   {
          //     key: 1,
          //     buttonIcon: require('../../img/icons/ic_cart.png'),
          //     buttonAction: this._handleClickSearchButton.bind(this),
          //     buttonWidth: searchIc.width,
          //     buttonHeight: searchIc.height,
          //   },
          // ]}
        />

        <ScrollView>
          <View style={styles.categories}>
            {this.renderColorCard()}
            {/*<ColorCard*/}
            {/*  isTile*/}
            {/*  cardStyles={{ margin: marginHorizontal.small / 2 }}*/}
            {/*  colorInfo={{*/}
            {/*    colorCode: '(213,222,234)',*/}
            {/*    itemId: 'V160-1011',*/}
            {/*  }}*/}
            {/*  imgWidth={imgWidth}*/}
            {/*  imgHeight={imgHeight}*/}
            {/*  color={colors.red}*/}
            {/*  // eslint-disable-next-line react-native/no-inline-styles*/}
            {/*  imgStyles={{*/}
            {/*    justifyContent: 'center',*/}
            {/*    alignItems: 'center',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<ColorCard*/}
            {/*  isTile*/}
            {/*  cardStyles={{ margin: marginHorizontal.small / 2 }}*/}
            {/*  colorInfo={{*/}
            {/*    colorCode: '(213,222,234)',*/}
            {/*    itemId: 'V160-1011',*/}
            {/*  }}*/}
            {/*  imgWidth={imgWidth}*/}
            {/*  imgHeight={imgHeight}*/}
            {/*  color={colors.green}*/}
            {/*  // eslint-disable-next-line react-native/no-inline-styles*/}
            {/*  imgStyles={{*/}
            {/*    justifyContent: 'center',*/}
            {/*    alignItems: 'center',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<ColorCard*/}
            {/*  isTile*/}
            {/*  cardStyles={{ margin: marginHorizontal.small / 2 }}*/}
            {/*  colorInfo={{*/}
            {/*    colorCode: '(213,222,234)',*/}
            {/*    itemId: 'V160-1011',*/}
            {/*  }}*/}
            {/*  imgWidth={imgWidth}*/}
            {/*  imgHeight={imgHeight}*/}
            {/*  color={colors.black}*/}
            {/*  // eslint-disable-next-line react-native/no-inline-styles*/}
            {/*  imgStyles={{*/}
            {/*    justifyContent: 'center',*/}
            {/*    alignItems: 'center',*/}
            {/*  }}*/}
            {/*/>*/}
          </View>
        </ScrollView>

        {/* <Tabs
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
          style={{
            height: scrollableTabHeight,
          }}
          tabBarBackgroundColor={colors.white}
          tabBarActiveTextColor={colors.black}
          tabBarInactiveTextColor={colors.gray}
          tabBarTextStyle={{
            fontFamily: fontFamily.medium,
            fontSize: fontSize.medium,
          }}>
          {CATEGORIES != null &&
            CATEGORIES != null &&
            CATEGORIES.map((item, index) => {
              return (
                <ScrollView key={index} heading={item.name}>
                  <View style={styles.categories}>
                    {item.childCategories != null &&
                      item.childCategories.map((childCategory, index) => {
                        return (
                          <CategoryCard
                            key={index}
                            isTile
                            cardStyles={{ margin: marginHorizontal.small / 2 }}
                            subCateInfo={childCategory}
                            imgWidth={imgWidth}
                            imgHeight={imgHeight}
                            imgStyles={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        );
                      })}
                  </View>
                </ScrollView>
              );
            })}
        </Tabs> */}
      </View>
    );
  }

  /**
   * Go to search screen when click search button
   */
  _handleClickSearchButton() {
    this.props.navigation.navigate('CartStack');
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.loginReducer.username,
  }
}

export default connect(mapStateToProps)(ColorListingScreen);

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: marginHorizontal.small / 2,
  },
});

ColorListingScreen.propTypes = {
  navigation: PropTypes.any,
};
