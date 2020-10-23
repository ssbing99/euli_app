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
import RNPrint from 'react-native-print';

export default class InvoiceScreen extends Component {
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
          title="INVOICE"
          rightButtons={[
            {
              key: 1,
              buttonIcon: require('../../img/icons/search.png'),
              buttonWidth: searchIc.width,
              buttonHeight: searchIc.height,
              buttonAction: this._searchModal.bind(this),
            },
          ]}
        />
        <ScrollView>
          <DataTable>
            <ScrollView
              horizontal
              contentContainerStyle={{ flexDirection: 'column' }}>
              <DataTable.Header style={{ width: 600 }}>
                <DataTable.Title style={{ flex: 1 }}>Print</DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  Invoice Number
                </DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>
                  Invoice Date
                </DataTable.Title>
                <DataTable.Title style={{ flex: 4 }}>
                  Shipping Name
                </DataTable.Title>
                <DataTable.Title numeric style={{ flex: 2 }}>
                  Net Total
                </DataTable.Title>
              </DataTable.Header>

              <DataTable.Row style={{ width: 600 }}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Text
                    style={{ color: colors.green }}
                    onPress={() => this._onPrint()}>
                    Print
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>INV001091</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>26/12/2017</DataTable.Cell>
                <DataTable.Cell style={{ flex: 4 }}>
                  UB APPPPARREL (M) SDN BHD
                </DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 2 }}>
                  2,500.00
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{ width: 600 }}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Text
                    style={{ color: colors.green }}
                    onPress={() => this._onPrint()}>
                    Print
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>INV001091</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>26/12/2017</DataTable.Cell>
                <DataTable.Cell style={{ flex: 4 }}>
                  UB APPPPARREL (M) SDN BHD
                </DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 2 }}>
                  2,500.00
                </DataTable.Cell>
              </DataTable.Row>
            </ScrollView>

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

        <PrimeModal
          modalVisible={this.state.modalVisible}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderBody()}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}
        />

        <PrimeModal
          modalVisible={this.state.showSearchModal}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderSearchBody()}
          onRequestClose={() => {
            this.setState({
              showSearchModal: false,
            });
          }}
        />
      </View>
    );
  }

  /**
   * Get size of form component
   */
  onLayout = (e) => {
    this.setState({
      layout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });
  };

  /**
   * Hide and show state list modal
   */
  toggleModal(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  _searchModal() {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });
  }

  renderBody() {
    const modalBtnSetting = {
      btnWidth: responsiveWidth(38.4),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };
    return (
      <View style={CommonStyles.modal}>
        <ScrollView style={CommonStyles.modalBody}>
          {CUSTOMERS.map((item) => (
            <TouchableHighlight
              key={item.id}
              underlayColor={colors.lightGray}
              onPress={() => this.selectItem(item.id, item.state)}>
              <View style={styles.selectItem}>
                <Text black normal regular>
                  {item.state}
                </Text>
                {this.state.isSelectedState == true &&
                  item.state == this.state.selectedState && (
                    <Icon
                      name="ios-checkmark"
                      style={{ fontSize: fontSize.large }}
                    />
                  )}
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <View style={CommonStyles.modalFooter}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={modalBtnSetting}
            btnText="Close"
            underlayColor={colors.red}
            onPressButton={() => this.toggleModal(false)}
          />
        </View>
      </View>
    );
  }

  renderSearchBody() {
    const modalBtnSetting = {
      btnWidth: responsiveWidth(38.4),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };
    return (
      <View style={CommonStyles.modal}>
        <ScrollView style={CommonStyles.modalBody}>
          <View style={styles.form} onLayout={this.onLayout.bind(this)}>
            <Form>
              <SelectBox
                isRightIcon
                // eslint-disable-next-line react-native/no-inline-styles
                containerStyle={{
                  ...SelectBox.defaultProps.containerStyle,
                  flex: 1,
                  marginTop: spaceVertical.small,
                }}
                label={this.state.selectedState}
                onPressAction={() => this.toggleModal(true)}
              />
              <View style={styles.calendarInput}>
                <Image
                  source={require('../../img/icons/calendar.png')}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date()}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={{ color: colors.black }}
                  placeHolderTextStyle={{ color: colors.gray }}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </View>
            </Form>
          </View>
        </ScrollView>
        <View style={CommonStyles.modalFooter}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={modalBtnSetting}
            btnText="Search"
            underlayColor={colors.red}
            onPressButton={this._searchModal.bind(this)}
          />
        </View>
      </View>
    );
  }

  /**
   * Select item on modal list
   *
   * @param: {Integer} id
   * @param: {String} state
   */
  selectItem(id, state) {
    this.setState({
      selectedState: state,
      isSelectedState: true,
    });
  }

  async _onPrint(
    url = 'https://stage.thebitetribe.com/uploads/Statement%20Sample.pdf',
  ) {
    await RNPrint.print({ filePath: url });
  }
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: marginHorizontal.normal,
    paddingBottom: 20,
  },
  btnCont: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: fontSize.large + spaceVertical.semiSmall,
    paddingHorizontal: marginHorizontal.semiSmall,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
  },
  calendarInput: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 5,
  },
});

InvoiceScreen.propTypes = {
  navigation: PropTypes.any,
};
