import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

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

import ColorCard from '@components/ColorCard';
import { getColorList } from '../api/methods/colors';
import { connect } from 'react-redux';

const imgWidth = responsiveWidth(87.19) / 2;
const imgHeight = imgWidth * 1.19;

class ColorPickerListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
    }

    this.getColorList();

    const { navigation } = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      console.log("focus")
      this._scrollToTop();
      this.getColorList();
    });

  }

  componentWillUnmount() {

    try {
      console.log(this.focusListener);
      if (this.focusListener) {
        this.focusListener.remove();
      }
    } catch (e) {}
  }

  _scrollToTop = () => {
    if (!!this.list) {
      this.list.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  getColorList = () => {
    getColorList(this.props.username).then(res => {
      let getColor = res || [];

      getColor = getColor.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime);
      });
      // console.log(getColor);
      this.setState({colors: getColor});
    });
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

    if (colors && colors.length > 0) {
      let rows = [];

      colors.forEach(c => {
        let textColor = this.getContrastColor(c.rgb);
        rows.push(
          <ColorCard
            isTile
            cardStyles={{margin: marginHorizontal.small / 2}}
            textStyle={{ color: textColor}}
            colorInfo={{
              colorCode: `(${c.rgb.replace(/[^0-9,]/g, '')})`,
            }}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            color={c.rgb}
            // eslint-disable-next-line react-native/no-inline-styles
            imgStyles={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPressItem={() =>
              this.props.navigation.navigate('ColorListingScreen', {
                color: c,
              })
            }
          />
        );
      });

      return rows;
    }
      return <View style={{ justifyContent: 'center', alignItems: 'center', flex:1}}><Text>No Color Info.</Text></View>


  };

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          // menu
          navigation={this.props.navigation}
          title="COLOR LISTING"
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

        <ScrollView
          ref={(ref) => {
            this.list = ref;
          }}
        >
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

export default connect(mapStateToProps)(ColorPickerListScreen);

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: marginHorizontal.small / 2,
  },
});

ColorPickerListScreen.propTypes = {
  navigation: PropTypes.any,
};
