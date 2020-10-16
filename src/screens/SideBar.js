/* global require */
import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import Accordion from '../lib/Accordion';
import Text from '../elements/Text';
import Border from '../elements/Border';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  STATUSBAR_HEIGHT,
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';
import {
  arrRightIc,
  backIc,
  searchIc,
  minusIc,
  plusIc,
  closeBtn,
} from '../styles/icon-variables';
import { sidebarAvaImg } from '../styles/image-variables';
import { CATEGORIES } from '../static/data';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Show user information
   */
  showUser() {
    let name = 'Imba';
    let email = 'support@imba.com';
    let avatarSource = require('../../img/imba/img_bodysuit.png');

    return (
      <TouchableHighlight
        underlayColor={colors.lightGray}
        onPress={() => {
          this.props.navigation.navigate('ProfileStack');
        }}>
        <View style={styles.userCont}>
          <View style={styles.userLeft}>
            <View style={styles.avatar}>
              <Image
                source={avatarSource}
                style={{
                  width: sidebarAvaImg.width,
                  height: sidebarAvaImg.height,
                  ...Platform.select({
                    android: {
                      borderRadius: sidebarAvaImg.width,
                    },
                  }),
                }}
              />
            </View>
            <View style={{ marginLeft: marginHorizontal.small }}>
              <Text black medium mediumBold style={{ paddingBottom: 9 }}>
                {name}
              </Text>
              <Text gray small regular>
                {email}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../img/icons/ic_arrow_right.png')}
            style={{ width: arrRightIc.width, height: arrRightIc.height }}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={CommonStyles.container}>
        {/* back button start here */}
        <TouchableHighlight
          underlayColor={colors.lightGray}
          style={styles.backBtn}
          onPress={() => {
            this.props.navigation.closeDrawer();
          }}>
          <Image
            source={require('../../img/icons/ic_back.png')}
            style={{ width: backIc.width, height: backIc.height }}
          />
        </TouchableHighlight>
        {/* back button end here */}

        {/* avatar start here */}
        {this.showUser()}
        {/* avatar end here */}

        {/* search input start here */}
        <View style={styles.textInputField}>
          <Image
            source={require('../../img/icons/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
        </View>
        {/* search input end here */}

        {/* menu start here */}
        <ScrollView>
          <View style={styles.mainMenu}>
            <Accordion
              underlayColor={colors.lightGray}
              sections={CATEGORIES}
              renderHeader={this._renderHeader.bind(this)}
              renderContent={this._renderContent.bind(this)}
            />
            <Border
              bottom
              width={responsiveWidth(89.33)}
              alignSelf={'flex-end'}
              borderStyle={{
                marginVertical: spaceVertical.small,
              }}
            />
            <TouchableHighlight
              style={styles.menuItem}
              underlayColor={colors.lightGray}
              onPress={() =>
                this.props.navigation.navigate('CollectionScreen')
              }>
              <Text style={styles.itemTxt}>COLLECTION</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.menuItem}
              underlayColor={colors.lightGray}
              onPress={() => this.props.navigation.navigate('DealScreen')}>
              <Text style={styles.itemTxt}>DEAL & OFFER</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.menuItem}
              underlayColor={colors.lightGray}
              onPress={() => this.props.navigation.navigate('StoreScreen')}>
              <Text style={styles.itemTxt}>FIND A STORE</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.menuItem}
              underlayColor={colors.lightGray}
              onPress={() => this.props.navigation.navigate('MagazineStack')}>
              <Text style={styles.itemTxt}>MAGAZINE FASHION</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.menuItem}
              underlayColor={colors.lightGray}
              onPress={this.handleLogOut.bind(this)}>
              <Text style={styles.itemTxt}>LOG OUT</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
        {/* menu end here */}
      </View>
    );
  }

  /**
   * Handle Logout
   */
  handleLogOut() {
    this.props.navigation.navigate('LoginScreen');
  }

  /**
   * Render header of accordion menu
   */
  _renderHeader(section, index, isActive) {
    return (
      <View style={styles.menuItem}>
        {isActive ? (
          <View
            style={[styles.activeMenuItem, { backgroundColor: colors.black }]}
          />
        ) : (
            <View
              style={[styles.activeMenuItem, { backgroundColor: 'transparent' }]}
            />
          )}
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={styles.itemTxt}>{section.name.toUpperCase()}</Text>
        </View>
        {isActive ? (
          <Image
            source={require('../../img/icons/ic_minus.png')}
            style={{ width: minusIc.width, height: minusIc.height }}
          />
        ) : (
            <Image
              source={require('../../img/icons/ic_plus.png')}
              style={{ width: plusIc.width, height: plusIc.height }}
            />
          )}
      </View>
    );
  }

  /**
   * Render content of accordion menu
   */
  _renderContent(section) {
    return (
      <View>
        {section.childCategories.map((item, index) => (
          <TouchableHighlight
            key={index}
            underlayColor={colors.lightGray}
            style={styles.expandedItem}
            onPress={this._handleClickMenuItem.bind(this)}>
            <Text
              gray
              small
              mediumBold
              style={{ paddingVertical: spaceVertical.small }}>
              {item.name} {' (' + item.count + ')'}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
    );
  }

  /**
   * Handle when click accordion item menu
   */
  _handleClickMenuItem() {
    this.props.navigation.navigate('ListProductsScreen', {
      proInfo: {
        image: { uri: 'https://goo.gl/ThVDXe' },
        name: 'FOR WOMEN',
        count: 113,
      }
    });
  }
}

const styles = StyleSheet.create({
  backBtn: {
    width: closeBtn.width,
    height: closeBtn.height,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: STATUSBAR_HEIGHT,
    backgroundColor: colors.black,
  },
  userCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: marginHorizontal.normal,
    paddingRight: marginHorizontal.large,
    paddingVertical: spaceVertical.semiSmall,
  },
  userLeft: {
    flex: 1,
    flexDirection: 'row',
    marginRight: marginHorizontal.small,
  },
  avatar: {
    width: sidebarAvaImg.width,
    height: sidebarAvaImg.height,
    borderRadius: sidebarAvaImg.width,
    overflow: 'hidden',
  },
  searchIcon: {
    position: 'absolute',
    bottom: 15,
    left: marginHorizontal.semiSmall,
    width: searchIc.width,
    height: searchIc.height,
  },
  textInputField: {
    flexDirection: 'row',
    width: deviceWidth,
    height: responsiveHeight(7.49),
    borderColor: 'rgb(232,232,232)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
  textInput: {
    width: deviceWidth,
    height: responsiveHeight(7.49),
    paddingLeft: marginHorizontal.large,
    color: colors.lightGray,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  mainMenu: {
    marginTop: spaceVertical.semiSmall,
    marginBottom: responsiveHeight(4.19),
  },
  menuItem: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spaceVertical.small,
    paddingHorizontal: marginHorizontal.large,
    backgroundColor: 'transparent',
  },
  activeMenuItem: {
    position: 'absolute',
    left: marginHorizontal.semiSmall,
    height: responsiveWidth(1.07),
    width: responsiveWidth(1.07),
    borderRadius: 100,
  },
  itemTxt: {
    color: colors.black,
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
  },
  expandedItem: {
    paddingHorizontal: responsiveWidth(18.1),
  },
});

SideBar.propTypes = {
  navigation: PropTypes.any,
};
