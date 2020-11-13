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
import RNPrint from 'react-native-print';
import { getInvoice } from '../api/methods/invoice';

const itemsPerPage = 10;

export default class InvoiceScreen extends Component {
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
      customersList: [],
      filteredList: [],
    };
  }

  componentDidMount () {
    console.log('did mount');

    this.getInvoiceHistory();

  }

  updateLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  getInvoiceHistory = () => {
    try {
      this.updateLoading();
      getInvoice().then(res => {
        if (res.data) {

          let customers = [];
          let c = 0;
          res.data.map(data => {
            let dt = new Date(data.CreatedAt);
            data.DisplayInvoiceDate = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;

            const added = customers.find(cust => cust.name == data.UserId);

            if (!added) {
              customers.push({id: c++, name: data.UserId});
            }

          });

          const result = new Array(Math.ceil(res.data.length / itemsPerPage)).fill().map(_ => res.data.splice(0, itemsPerPage));

          this.setState({historyList: result, filteredList: result, customersList: customers});
          this.updateLoading();
        }
      });
    } catch (e) {
      console.log(e);
      this.updateLoading();

    }
  };

  filterSelectedList = () => {

    const {historyList, selectedDate, selectedState} = this.state;

    if (historyList && historyList.length > 0) {
      let rows = [];
      let result = [];

      historyList.forEach(hist => {
        hist.forEach((h) => {

          let addable = true;

          if (selectedDate) {
            if (selectedDate !== h.DisplayInvoiceDate) {
              addable = false;
            }
          }

          if (addable && selectedState) {
            if (selectedState !== h.UserId) {
              addable = false;
            }
          }

          if (addable) {
            rows.push(h);
          }
        });
      });

      if(rows && rows.length > 0){
        result = new Array(Math.ceil(rows.length / itemsPerPage)).fill().map(_ => rows.splice(0, itemsPerPage));
      }

      this.setState({
        filteredList: result,
        page: 0,
      });

    }

    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });

  }

  setCalendarDate = (date) => {
    if (date) {
      const newDate = new Date(date);
      this.setState({selectedDate: `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`});
    } else {
      this.setState({selectedDate: null});
    }
  };

  renderRow = () => {

    const {filteredList, page} = this.state;

    let defaultRow = (<DataTable.Row style={{width: 600}}>
      <DataTable.Cell style={{flex: 1}}>Data Not Found !</DataTable.Cell>
    </DataTable.Row>);

    if (filteredList && filteredList.length > 0) {
      let rows = [];
      let i = 0;

      if (page < filteredList.length) {
        let hist = filteredList[page];
        hist.forEach((h) => {

          rows.push(
            <DataTable.Row style={{ width: 600 }} key={h.Id}>
              <DataTable.Cell style={{ flex: 1 }}>
                <Text
                  style={{ color: colors.green }}
                  onPress={() => this._onPrint()}>
                  Print
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>{h.Id}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>{h.DisplayInvoiceDate}</DataTable.Cell>
              {/*<DataTable.Cell style={{ flex: 4 }}>*/}
              {/*  UB APPPPARREL (M) SDN BHD*/}
              {/*</DataTable.Cell>*/}
              <DataTable.Cell numeric style={{ flex: 2 }}>
                {((h.Amount * 100) / 100).toFixed(2)}
              </DataTable.Cell>
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
                {/*<DataTable.Title style={{ flex: 4 }}>*/}
                {/*  Shipping Name*/}
                {/*</DataTable.Title>*/}
                <DataTable.Title numeric style={{ flex: 2 }}>
                  Net Total
                </DataTable.Title>
              </DataTable.Header>

              {this.renderRow()}

              {/*<DataTable.Row style={{ width: 600 }}>*/}
              {/*  <DataTable.Cell style={{ flex: 1 }}>*/}
              {/*    <Text*/}
              {/*      style={{ color: colors.green }}*/}
              {/*      onPress={() => this._onPrint()}>*/}
              {/*      Print*/}
              {/*    </Text>*/}
              {/*  </DataTable.Cell>*/}
              {/*  <DataTable.Cell style={{ flex: 2 }}>INV001091</DataTable.Cell>*/}
              {/*  <DataTable.Cell style={{ flex: 2 }}>26/12/2017</DataTable.Cell>*/}
              {/*  <DataTable.Cell style={{ flex: 4 }}>*/}
              {/*    UB APPPPARREL (M) SDN BHD*/}
              {/*  </DataTable.Cell>*/}
              {/*  <DataTable.Cell numeric style={{ flex: 2 }}>*/}
              {/*    2,500.00*/}
              {/*  </DataTable.Cell>*/}
              {/*</DataTable.Row>*/}

              {/*<DataTable.Row style={{ width: 600 }}>*/}
              {/*  <DataTable.Cell style={{ flex: 1 }}>*/}
              {/*    <Text*/}
              {/*      style={{ color: colors.green }}*/}
              {/*      onPress={() => this._onPrint()}>*/}
              {/*      Print*/}
              {/*    </Text>*/}
              {/*  </DataTable.Cell>*/}
              {/*  <DataTable.Cell style={{ flex: 2 }}>INV001091</DataTable.Cell>*/}
              {/*  <DataTable.Cell style={{ flex: 2 }}>26/12/2017</DataTable.Cell>*/}
              {/*  <DataTable.Cell style={{ flex: 4 }}>*/}
              {/*    UB APPPPARREL (M) SDN BHD*/}
              {/*  </DataTable.Cell>*/}
              {/*  <DataTable.Cell numeric style={{ flex: 2 }}>*/}
              {/*    2,500.00*/}
              {/*  </DataTable.Cell>*/}
              {/*</DataTable.Row>*/}
            </ScrollView>

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
      selectedDate: null,
      selectedState: null,
    });
  }

  _searchSubmit () {
    this.filterSelectedList();
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
          {this.state.customersList.map((item) => (
            <TouchableHighlight
              key={item.id}
              underlayColor={colors.lightGray}
              onPress={() => this.selectItem(item.id, item.name)}>
              <View style={styles.selectItem}>
                <Text black normal regular>
                  {item.name}
                </Text>
                {this.state.isSelectedState == true &&
                item.name == this.state.selectedState && (
                  <Icon
                    name="ios-checkmark"
                    style={{fontSize: fontSize.large}}
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
                  onDateChange={this.setCalendarDate}
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
            onPressButton={this._searchSubmit.bind(this)}
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
