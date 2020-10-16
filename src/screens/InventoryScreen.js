/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
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

export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isChecked: false,
      modalVisible: false,
      selectedState: 'Customer',
      isSelectedState: false,
      showSearchModal: false,
    };
  }

  render() {
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

            <DataTable.Row>
              <DataTable.Cell>OF60-34</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                CVC Oxford Colour 34, 60 inches Width
              </DataTable.Cell>
              <DataTable.Cell numeric>4</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>OF60-34</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                CVC Oxford Colour 34, 60 inches Width
              </DataTable.Cell>
              <DataTable.Cell numeric>4</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => {
                console.log(page);
              }}
              label="1-2 of 6"
            />
          </DataTable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

InventoryScreen.propTypes = {
  navigation: PropTypes.any,
};
