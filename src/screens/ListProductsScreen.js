/* global require */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveHeight,
  responsiveWidth,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
} from '../styles/variables';
import {
  searchIc,
  gridIc,
  listIc,
  wishHeartIc,
} from '../styles/icon-variables';

import { PRODUCTS } from '../static/data';

import GridCard from '../components/GridCard';
import ListCard from '../components/ListCard';
import BannerCard from '../components/BannerCard';

const gridImgWidth = responsiveWidth(87.15) / 2;
const gridImgHeight = gridImgWidth * 1.28;

const listImgWidth = responsiveWidth(25.6);
const listImgHeight = listImgWidth * 1.29;

export default class ListProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listType: { type: 'GRID' },
    };
  }

  render() {
    const listType = this.state.listType.type;
    const { route } = this.props;
    const { proInfo } = route.params;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title={listType + ' ' + 'PRODUCT'}
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/search.png'),
              buttonAction: this._handleClickSearchButton.bind(this),
              buttonWidth: searchIc.width,
              buttonHeight: searchIc.height,
            },
          ]}
        />

        {/* filter bar start here */}
        <View style={styles.filterBar}>
          <View style={styles.barLeft}>
            <Text gray small regular>
              113 items
            </Text>
          </View>
          <View style={styles.barRight}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.barRightListItem}
              onPress={() => this.setState({ listType: { type: 'LIST' } })}>
              {this.state.listType.type == 'LIST' && (
                <Image
                  source={require('../../img/icons/ic_list_active.png')}
                  style={{ width: listIc.width, height: listIc.height }}
                />
              )}
              {this.state.listType.type != 'LIST' && (
                <Image
                  source={require('../../img/icons/ic_list.png')}
                  style={{ width: listIc.width, height: listIc.height }}
                />
              )}
            </TouchableOpacity>
            <Border right height={responsiveHeight(3.6)} />
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.barRightGridItem}
              onPress={() => this.setState({ listType: { type: 'GRID' } })}>
              {this.state.listType.type == 'GRID' && (
                <Image
                  source={require('../../img/icons/ic_grid_active.png')}
                  style={{ width: gridIc.width, height: gridIc.height }}
                />
              )}
              {this.state.listType.type != 'GRID' && (
                <Image
                  source={require('../../img/icons/ic_grid.png')}
                  style={{ width: gridIc.width, height: gridIc.height }}
                />
              )}
            </TouchableOpacity>
            <Border right height={responsiveHeight(7.2)} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this.props.navigation.navigate('FilterScreen')}>
              <Text
                black
                small
                mediumBold
                style={{ paddingHorizontal: marginHorizontal.semiSmall }}>
                FILTER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* filter bar end here */}

        {/* product list start here */}
        <ScrollView>
          <BannerCard
            center
            categoryInfo={proInfo}
            imgWidth={deviceWidth}
            imgHeight={deviceWidth * 0.46}
          />
          {PRODUCTS != null && this.renderBody(PRODUCTS)}
        </ScrollView>
        {/* product list end here */}
      </View>
    );
  }

  /**
   * Go to search screen when click search button
   */
  _handleClickSearchButton() {
    this.props.navigation.navigate('SearchScreen');
  }

  /**
   * Render products list in type: list/grid
   *
   * @param {Object} listProducts
   */
  renderBody(listProducts) {
    if (this.state.listType.type == 'GRID') {
      return (
        <View style={styles.grid}>
          {listProducts.map((item, index) => (
            <GridCard
              isFavourite
              key={index}
              proInfo={item}
              cardStyles={{
                marginVertical: spaceVertical.small / 2,
                marginHorizontal: marginHorizontal.small / 2,
              }}
              wishIconStyles={{
                bottom: spaceVertical.small / 2,
                right: 0,
              }}
              imgWidth={gridImgWidth}
              imgHeight={gridImgHeight}
              onPressListItem={() => this._handleClickListItem(item)}
            />
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.list}>
          {listProducts.map((item, index) => (
            <ListCard
              hasImgIc
              key={index}
              proInfo={item}
              cardStyles={{
                marginHorizontal: marginHorizontal.small,
                marginVertical: spaceVertical.small / 2,
              }}
              rightInfoStyles={{
                flex: 1,
                justifyContent: 'space-between',
              }}
              imgWidth={listImgWidth}
              imgHeight={listImgHeight}
              subHeader={
                <Text black medium bold>
                  ${item.price}
                </Text>
              }
              icon={require('../../img/icons/outline_ic_heart.png')}
              iconStyles={{
                width: wishHeartIc.width,
                height: wishHeartIc.height,
              }}
              iconContStyles={{
                bottom: spaceVertical.small,
                right: 0,
              }}
              onPressListItem={() => this._handleClickListItem(item)}
            />
          ))}
        </View>
      );
    }
  }

  /**
   * Go to single product screen when click best seller item
   *
   * @param {Object} proInfo
   */
  _handleClickListItem(proInfo) {
    this.props.navigation.navigate('SingleProductScreen', { proInfo: proInfo });
  }
}

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(7.2),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
  },
  barLeft: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  barRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barRightListItem: {
    justifyContent: 'center',
    paddingLeft: marginHorizontal.semiSmall,
    paddingRight: marginHorizontal.small,
  },
  barRightGridItem: {
    justifyContent: 'center',
    paddingRight: marginHorizontal.semiSmall,
    paddingLeft: marginHorizontal.small,
  },
  list: {
    marginVertical: spaceVertical.small / 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: spaceVertical.small / 2,
  },
});

ListProductsScreen.propTypes = {
  navigation: PropTypes.any,
};
