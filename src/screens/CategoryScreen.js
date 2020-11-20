import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Tabs } from 'native-base';

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

const imgWidth = responsiveWidth(87.19) / 2;
const imgHeight = imgWidth * 1.19;

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          // menu
          navigation={this.props.navigation}
          title="CATEGORY"
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
            backgroundColor: colors.primary,
          }}
          style={{
            height: scrollableTabHeight,
          }}
          tabBarBackgroundColor={colors.white}
          tabBarActiveTextColor={colors.primary}
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
        </Tabs>
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

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: marginHorizontal.small / 2,
  },
});

CategoryScreen.propTypes = {
  navigation: PropTypes.any,
};
