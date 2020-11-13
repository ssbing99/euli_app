/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Image, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Text from '../elements/Text';
import Border from '../elements/Border';
import SelectBox from '../elements/SelectBox';
import PrimeModal from '../elements/PrimeModal';
import PrimeButton from '../elements/PrimeButton';
import { DatePicker, Form, Icon } from 'native-base';

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
  borderRadius,
  fontSize,
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';
import { CUSTOMERS } from '../static/data';
import { DataTable } from 'react-native-paper';
import { getInventoryItem } from '../api/methods/inventoryItem';

const itemsPerPage = 10;

export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isLoading: false,
      isChecked: false,
      modalVisible: false,
      selectedState: 'Customer',
      isSelectedState: false,
      showSearchModal: false,
      historyList: [],
      page: 0,
      filteredList: [],
    };
  }

  componentDidMount () {
    console.log('did mount');

    this.getInventoryItem();

  }

  updateLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  getInventoryItem = () => {
    try {
      this.updateLoading();
      getInventoryItem().then(res => {
        console.log(res);
        if (res.data) {
          const result = new Array(Math.ceil(res.data.length / itemsPerPage)).fill().map(_ => res.data.splice(0, itemsPerPage));

          this.setState({historyList: result, filteredList: result});
          this.updateLoading();
        }
      });
    } catch (e) {
      console.log(e);
      this.updateLoading();

    }
  };

  renderRow = () => {

    const {filteredList, page} = this.state;

    let defaultRow = (<DataTable.Row>
      <DataTable.Cell style={{flex: 1}}>Data Not Found !</DataTable.Cell>
    </DataTable.Row>);

    if (filteredList && filteredList.length > 0) {
      let rows = [];

      if (page < filteredList.length) {
        let hist = filteredList[page];
        let ii= 0;
        hist.forEach((i) => {

          rows.push(
            <DataTable.Row key={ii++}>
              <DataTable.Cell>{i.Id}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                {i.Name}
              </DataTable.Cell>
              <DataTable.Cell numeric>{i.OHQ}</DataTable.Cell>
            </DataTable.Row>
          );
        });
      }

      if (rows && rows.length > 0) {
        return rows;
      } else {
        return defaultRow;

      }

    } else {
      return defaultRow;
    }
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={[styles.loading]}>
          <ActivityIndicator />
        </View>
      );
    }

    const {page, filteredList} = this.state;
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    return (
      <View style={CommonStyles.container}>
        <NavigationBar
          back
          navigation={this.props.navigation}
          title="INVENTORY"
        />
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Item ID</DataTable.Title>
              <DataTable.Title style={{ flex: 3 }}>Desc 1</DataTable.Title>
              <DataTable.Title numeric>OHQ</DataTable.Title>
            </DataTable.Header>

            {this.renderRow()}

            {/*<DataTable.Row>*/}
            {/*  <DataTable.Cell>OF60-34</DataTable.Cell>*/}
            {/*  <DataTable.Cell style={{ flex: 3 }}>*/}
            {/*    CVC Oxford Colour 34, 60 inches Width*/}
            {/*  </DataTable.Cell>*/}
            {/*  <DataTable.Cell numeric>4</DataTable.Cell>*/}
            {/*</DataTable.Row>*/}

            {/*<DataTable.Row>*/}
            {/*  <DataTable.Cell>OF60-34</DataTable.Cell>*/}
            {/*  <DataTable.Cell style={{ flex: 3 }}>*/}
            {/*    CVC Oxford Colour 34, 60 inches Width*/}
            {/*  </DataTable.Cell>*/}
            {/*  <DataTable.Cell numeric>4</DataTable.Cell>*/}
            {/*</DataTable.Row>*/}

            <DataTable.Pagination
              page={page}
              numberOfPages={filteredList.length}
              onPageChange={(page) => {
                this.setState({page: page});
                // console.log(page);
              }}
              label={`${from + 1}-${to} of ${filteredList.length}`}
            />
          </DataTable>
        </ScrollView>
      </View>
    );
  }
}

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
});

InventoryScreen.propTypes = {
  navigation: PropTypes.any,
};
