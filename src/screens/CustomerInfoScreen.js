/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Platform, TouchableHighlight, ScrollView } from 'react-native';

import Text from '../elements/Text';
import Border from '../elements/Border';
import { connect } from 'react-redux';

import ListItem from '../components/ListItem';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical, colors, fontSize, fontFamily,
} from '../styles/variables';
import {
  notificationIc,
  orderIc,
  walletIc,
  outlineHeartIc,
  logoutIc,
  cameratabIc, searchIc,
} from '../styles/icon-variables';
import { avaImg } from '../styles/image-variables';
import * as loginActions from 'src/actions/loginActions';
import { hasAccessRight } from '../store/accessRight';
import * as ACCESS from '../config/access';
import NavigationBar from '../elements/NavigationBar';
import CommonStyles from '../styles/CommonStyles';

const list = [
  { key: 'Id', value: 'Id' },
  { key: 'CompanyName', value: 'Company Name' },
  { key: 'Email', value: 'Email' },
  { key: 'Phone', value: 'Phone' },
]
class CustomerInfoScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    // console.log(prevProps);
  }

  renderAddress = (a, i) => {
    let addrRow = [];
    if(a.Address1) {
      addrRow.push(
        <View key={i}>
          <View style={[styles.card]}>
            <View style={[styles.leftItem]}>
              <Text black small bold style={this.headerStyles}>{a.Primary? 'Primary': 'Secondary'}</Text>
            </View>
          </View>
          <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
        </View>
      );

      addrRow.push(
        <View>
          <View style={[styles.card]}>
            <View style={[styles.leftItem]}>
              <Text style={this.headerStyles}>Company Name</Text>
            </View>
            <View style={[styles.rightItem]}>
              <Text style={this.bodyStyles}>{this.returnDash(a.CompanyName)}</Text>
            </View>
          </View>
          <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
        </View>
      );

      addrRow.push(
        <View>
          <View style={[styles.card]}>
            <View style={[styles.leftItem]}>
              <Text style={this.headerStyles}>Address1</Text>
            </View>
            <View style={[styles.rightItem]}>
              <Text style={this.bodyStyles}>{this.returnDash(a.Address1)}</Text>
            </View>
          </View>
          <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
        </View>
      );

      addrRow.push(
        <View>
          <View style={[styles.card]}>
            <View style={[styles.leftItem]}>
              <Text style={this.headerStyles}>Address2</Text>
            </View>
            <View style={[styles.rightItem]}>
              <Text style={this.bodyStyles}>{this.returnDash(a.Address2)}</Text>
            </View>
          </View>
          <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
        </View>
      );

      addrRow.push(
        <View>
          <View style={[styles.card]}>
            <View style={[styles.leftItem]}>
              <Text style={this.headerStyles}>Zip</Text>
            </View>
            <View style={[styles.rightItem]}>
              <Text style={this.bodyStyles}>{this.returnDash(a.Zip)}</Text>
            </View>
          </View>
          <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
        </View>
      );

      addrRow.push(
        <View>
          <View style={[styles.card]}>
            <View style={[styles.leftItem]}>
              <Text style={this.headerStyles}>City</Text>
            </View>
            <View style={[styles.rightItem]}>
              <Text style={this.bodyStyles}>{this.returnDash(a.City)}</Text>
            </View>
          </View>
          <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
        </View>
      );


      addrRow.push(
        <View>
          <View style={[styles.card]}>
            <View style={[styles.leftItem]}>
              <Text style={this.headerStyles}>State</Text>
            </View>
            <View style={[styles.rightItem]}>
              <Text style={this.bodyStyles}>{this.returnDash(a.State)}</Text>
            </View>
          </View>
          <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
        </View>
      );

      return addrRow;
    }
  }

  returnDash = (value) => {
    return value && value.length > 0? value : '-';
  }

  render() {
    const { route } = this.props;
    const { CustInfo } = route.params;
    const { Customer, Addresses } = CustInfo;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="CUSTOMER INFO"
        />
        {/* list item start here */}
        <ScrollView>

          {
            list.map((l,i) => (
              <View key={i}>
                <View style={[styles.card]}>
                  <View style={[styles.leftItem]}>
                    <Text style={this.headerStyles}>{l.value}</Text>
                  </View>
                  <View style={[styles.rightItem]}>
                    <Text style={this.bodyStyles}>{this.returnDash(Customer[`${l.key}`])}</Text>
                  </View>
                </View>
                <Border bottom width={responsiveWidth(100)} alignSelf="flex-end" />

              </View>
            ))
          }

          <View style={styles.title}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text black medium bold>
                Addresses
              </Text>
            </View>
          </View>

          { Addresses.map(this.renderAddress)}

        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoScreen);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: marginHorizontal.small,
    marginVertical: spaceVertical.small,
  },
  headerStyles: {
    color: colors.lightGray,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  bodyStyles: {
    color: colors.darkGray,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  leftItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 25,
  },
  rightItem: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 25,
  },
  mainMenu: {
    marginBottom: responsiveHeight(1.05),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: marginHorizontal.small,
    marginTop: responsiveHeight(2.09),
    marginBottom: responsiveHeight(2.09),
  },
});

CustomerInfoScreen.propTypes = {
  navigation: PropTypes.any,
  avatar: PropTypes.any,
  name: PropTypes.string,
  email: PropTypes.string,
};
