/* global require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Platform, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';

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
import { getInvoiceById } from '../api/methods/invoice';

const list = [
  { key: 'Id', value: 'Id' },
  { key: 'CustomerId', value: 'Customer Id' },
  { key: 'CustomerName', value: 'Customer Name' },
  { key: 'Subtotal', value: 'Subtotal' },
  { key: 'TotalDiscount', value: 'Total Discount' },
  { key: 'Amount', value: 'Amount' },
  { key: 'Remark', value: 'Remark' },
]
class InvoiceInfoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      invInfo: {}
    }
  }

  componentDidMount (){
    const { route } = this.props;
    const { InvId } = route.params;

    this.getInvoiceDetail(InvId);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    // console.log(prevProps);
  }

  updateLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  getInvoiceDetail = (InvId) => {
    try{
      this.updateLoading();
      getInvoiceById(InvId).then(res => {
        let invInfo = {};
        if (res && res.data){
          if(res.data.SalesHdr){
            invInfo = Object.assign({},res.data.SalesHdr);
            invInfo = Object.assign(invInfo, {CustomerName: res.data.BillTo?.CustomerName})
            invInfo = Object.assign(invInfo, {SalesDtls: res.data.SalesDtls})
            console.log("InvInfo",invInfo);
            this.setState({invInfo: invInfo});
            this.updateLoading();
          }
        }
      });

    }catch (e) {
      console.log(e);
      this.updateLoading();
    }

  }

  renderDetails = (a, i) => {

    let dtlRow = [];

    dtlRow.push(
      <View key={i}>
        <View style={[styles.card]}>
          <View style={[styles.leftItem]}>
            <Text style={this.headerStyles}>Product Id</Text>
          </View>
          <View style={[styles.rightItem]}>
            <Text style={this.bodyStyles}>{this.returnDash(a.ProductId)}</Text>
          </View>
        </View>
        <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
      </View>
    );

    dtlRow.push(
      <View>
        <View style={[styles.card]}>
          <View style={[styles.leftItem]}>
            <Text style={this.headerStyles}>Description</Text>
          </View>
          <View style={[styles.rightItem]}>
            <Text style={this.bodyStyles}>{this.returnDash(a.Description)}</Text>
          </View>
        </View>
        <Border bottom width={responsiveWidth(100)} alignSelf="flex-end"/>
      </View>
    );

    return dtlRow;

  }

  returnDash = (value) => {
    if('string'==typeof value)
      return value && value.length > 0? value : '-';
    else if('number'==typeof value)
      return value > 0? value.toFixed(2) : 0.00;
    else
      return value && value.length > 0? value : '-';
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={[styles.loading]}>
          <ActivityIndicator size={"large"}/>
        </View>
      );
    }

    const { invInfo } = this.state;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="INVOICE INFO"
        />
        {/* list item start here */}
        <ScrollView>

          {
            invInfo.hasOwnProperty('Id') && list.map((l,i) => (
              <View key={i}>
                <View style={[styles.card]}>
                  <View style={[styles.leftItem]}>
                    <Text style={this.headerStyles}>{l.value}</Text>
                  </View>
                  <View style={[styles.rightItem]}>
                    <Text style={this.bodyStyles}>{this.returnDash(invInfo[`${l.key}`])}</Text>
                  </View>
                </View>
                <Border bottom width={responsiveWidth(100)} alignSelf="flex-end" />

              </View>
            ))
          }

          <View style={styles.title}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text black medium bold>
                Sales Details
              </Text>
            </View>
          </View>

          { invInfo.hasOwnProperty('SalesDtls') && invInfo.SalesDtls.map(this.renderDetails)}

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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceInfoScreen);

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

InvoiceInfoScreen.propTypes = {
  navigation: PropTypes.any,
  avatar: PropTypes.any,
  name: PropTypes.string,
  email: PropTypes.string,
};
