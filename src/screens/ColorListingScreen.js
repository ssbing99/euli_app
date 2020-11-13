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
    }

    this.getColorList();

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      console.log("focus")
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

  getColorList = () => {
    getColorList(this.props.username).then(res => {
      if(res.length > 0){
        this.setState({ colors: res });
      }
    });
  }

  renderColorCard = () => {
    const { colors } = this.state;
    if(this.state.colors.length > 0){
      let rows = [];

      colors.forEach(c => {
        rows.push(
          <ColorCard
            isTile
            cardStyles={{ margin: marginHorizontal.small / 2 }}
            colorInfo={{
              colorCode: `(${c.colorRGB})`,
              itemId: c.Id,
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
    return <View style={{ justifyContent: 'center', alignItems: 'center', flex:1}}><Text>No Color Info.</Text></View>
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          // menu
          navigation={this.props.navigation}
          title="COLOR LISTING"
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/ic_cart.png'),
              buttonAction: this._handleClickSearchButton.bind(this),
              buttonWidth: searchIc.width,
              buttonHeight: searchIc.height,
            },
          ]}
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
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: marginHorizontal.small / 2,
  },
});

ColorListingScreen.propTypes = {
  navigation: PropTypes.any,
};
