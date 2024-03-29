/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Platform } from 'react-native';

import Text from '../../elements/Text';
import Border from '../../elements/Border';
import { connect } from 'react-redux';

import ListItem from '../../components/ListItem';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
} from '../../styles/variables';
import {
  notificationIc,
  orderIc,
  walletIc,
  outlineHeartIc,
  logoutIc,
  cameratabIc,
} from '../../styles/icon-variables';
import { avaImg } from '../../styles/image-variables';
import * as loginActions from 'src/actions/loginActions';
import { hasAccessRight } from '../../store/accessRight';
import * as ACCESS from '../../config/access';

class NormalProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    // console.log(prevProps);
  }

  handleLogout = () => {
    this.props.onPressLogout();
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <View>
        {/* user info start here */}
        <View style={styles.user}>
          <View style={styles.avatar}>
            <Image
              source={this.props.avatar}
              style={{
                width: avaImg.width,
                height: avaImg.height,
                ...Platform.select({
                  android: {
                    borderRadius: avaImg.width,
                  },
                }),
              }}
            />
          </View>
          <View style={{ marginLeft: marginHorizontal.small }}>
            <Text
              black
              medium
              mediumBold
              style={{ paddingBottom: responsiveHeight(1.2) }}>
              {this.props.name}
            </Text>
            <Text gray small regular>
              {this.props.email}
            </Text>
          </View>
        </View>
        {/* user info end here */}

        {/* list item start here */}
        <Border bottom width={responsiveWidth(91.47)} alignSelf="flex-end" />
        <View style={styles.mainMenu}>
          {/* <ListItem
            leftIcon={require('../../../img/icons/ic_notification.png')}
            leftIconStyles={{
              width: notificationIc.width,
              height: notificationIc.height,
            }}
            header="Notification"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() =>
              this.props.navigation.navigate('NotificationScreen')
            }
          /> */}
          {/*<ListItem*/}
          {/*  leftIcon={require('../../../img/icons/newspaper.png')}*/}
          {/*  leftIconStyles={{*/}
          {/*    width: walletIc.width,*/}
          {/*    height: walletIc.height,*/}
          {/*  }}*/}
          {/*  header="Latest News"*/}
          {/*  borderWidth={responsiveWidth(91.47)}*/}
          {/*  onPressItem={() => this.props.navigation.navigate('HomeStack',{ screen: 'HomeScreen' })}*/}
          {/*/>*/}
          <ListItem
            leftIcon={require('../../../img/icons/camera-enhance-outline.png')}
            leftIconStyles={{
              width: cameratabIc.width,
              height: cameratabIc.height,
            }}
            header="Colour Picker"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() => this.props.navigation.navigate('CameraStack',{ screen: 'ScanScreen' })}
          />
          {/*{*/}
          {/*  hasAccessRight(this.props.role, ACCESS.VIEW_ALL_CUSTOMER) &&*/}

          {/*  <ListItem*/}
          {/*    leftIcon={require('../../../img/icons/ic_profile_active.png')}*/}
          {/*    leftIconStyles={{*/}
          {/*      width: orderIc.width,*/}
          {/*      height: orderIc.height,*/}
          {/*    }}*/}
          {/*    header="Customer"*/}
          {/*    borderWidth={responsiveWidth(91.47)}*/}
          {/*    onPressItem={() =>*/}
          {/*      this.props.navigation.navigate('CustomerStack',{ screen: 'CustomerScreen' })*/}
          {/*    }*/}
          {/*  />*/}
          {/*}*/}
          <ListItem
            leftIcon={require('../../../img/icons/ic_order.png')}
            leftIconStyles={{
              width: orderIc.width,
              height: orderIc.height,
            }}
            header="Purchase History"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() =>
              this.props.navigation.navigate('PurchaseHistoryScreen')
            }
          />
          {/* <ListItem
            leftIcon={require('../../../img/icons/ic_location.png')}
            leftIconStyles={{
              width: 13,
              height: 18,
            }}
            header="Address"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() => this.props.navigation.navigate('AddressScreen')}
          /> */}
          <ListItem
            leftIcon={require('../../../img/icons/receipt.png')}
            leftIconStyles={{
              width: walletIc.width,
              height: walletIc.height,
            }}
            header="Invoice"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() => this.props.navigation.navigate('InvoiceScreen')}
          />
          <ListItem
            leftIcon={require('../../../img/icons/format-list-checkbox.png')}
            leftIconStyles={{
              width: walletIc.width,
              height: walletIc.height,
            }}
            header="Statement"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() =>
              this.props.navigation.navigate('StatementStack',{ screen: 'StatementStack' })
            }
          />
          {
            hasAccessRight(this.props.role, ACCESS.VIEW_ALL_INVENTORY) &&
          <ListItem
            leftIcon={require('../../../img/icons/inbox-multiple-outline.png')}
            leftIconStyles={{
              width: walletIc.width,
              height: walletIc.height,
            }}
            header="Inventory"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() =>
              this.props.navigation.navigate('InventoryScreen')
            }
          />
          }
          {/* <ListItem
            leftIcon={require('../../../img/icons/outline_ic_heart.png')}
            leftIconStyles={{
              width: outlineHeartIc.width,
              height: outlineHeartIc.height,
            }}
            header="Wish List"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={() => this.props.navigation.navigate('WishListScreen')}
          /> */}
          <ListItem
            leftIcon={require('../../../img/icons/ic_logout.png')}
            leftIconStyles={{
              width: logoutIc.width,
              height: logoutIc.height,
            }}
            header="Log Out"
            borderWidth={responsiveWidth(91.47)}
            onPressItem={this.handleLogout}
          />
        </View>
        {/* list item end here */}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressLogout: () => dispatch(loginActions.logOut())
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.loginReducer.role,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalProfile);

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(10.67),
    marginRight: responsiveWidth(4),
    marginTop: spaceVertical.small,
    marginBottom: spaceVertical.normal,
  },
  avatar: {
    width: avaImg.width,
    height: avaImg.height,
    borderRadius: avaImg.width,
    overflow: 'hidden',
  },
  mainMenu: {
    marginBottom: responsiveHeight(1.05),
  },
});

NormalProfile.propTypes = {
  navigation: PropTypes.any,
  avatar: PropTypes.any,
  name: PropTypes.string,
  email: PropTypes.string,
};
