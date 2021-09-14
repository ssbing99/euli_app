/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Image, ActivityIndicator, TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import NavigationBar from '../elements/NavigationBar';
import Border from '../elements/Border';
import SelectBox from '../elements/SelectBox';
import PrimeModal from '../elements/PrimeModal';
import PrimeButton from '../elements/PrimeButton';
import { DatePicker, Form, Icon } from 'native-base';
import NewDatePicker from 'react-native-date-picker'

import CommonStyles from '../styles/CommonStyles';
import {
  responsiveWidth,
  responsiveHeight,
  marginHorizontal,
  spaceVertical,
  deviceWidth,
  colors,
  borderRadius,
  fontSize, inputHeight, fontFamily,
} from '../styles/variables';
import { searchIc } from '../styles/icon-variables';
import { DataTable } from 'react-native-paper';
import RNPrint from 'react-native-print';
import { getInvoiceListById } from '../api/methods/invoice';
import { connect } from 'react-redux';
import { hasAccessRight } from '../store/accessRight';
import { VIEW_ALL_CUSTOMER, VIEW_ALL_INVOICE } from '../config/access';
import { getCustomer, getCustomerById } from '../api/methods/customer';
import TextInput from '../elements/TextInput';

const itemsPerPage = 10;
let timeOutId;

const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

class InvoiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: null,
        height: null,
      },
      isLoading: false,
      isChecked: false,
      dateModalVisible: false,
      modalVisible: false,
      selectedState: 'Customer',
      isSelectedState: false,
      showSearchModal: false,
      date: new Date(),
      selectedDate: null,
      keyword: null,
      historyList: [],
      page: 0,
      customersDataList: [],
      customerIds: [],
      customersList: [],
      customersListDisplay: [],
      customersListPage: [],
      filteredList: [],
      filteredDataCount: 0,
    };

    this.customerListInit = 30;
    this.customerListCurrPage = 2;
  }

  componentDidMount () {
    console.log('did mount');

    if(hasAccessRight(this.props.role, VIEW_ALL_INVOICE)) {
      this.updateLoading();
      getCustomer().then(res => {
        if (res.data) {
          let customersData = [];

          res.data.map(data => {
            if (data.Customer.Id != null && data.Customer.Id != '' && data.Customer.CompanyName) {
              const added = customersData.find(cust => cust.name == data.Customer.CompanyName);

              if (!added) {
                customersData.push({id: data.Customer.Id, name: data.Customer.CompanyName});
              }
            }
          });
          this.setState({customersDataList: customersData});
        }else{
          this.setState({customersDataList: []});
        }
      }).then(() => this.getInvoiceHistory());
    } else {
      this.updateLoading();
      getCustomerById(this.props.userId).then(res => {
        console.log(res);
        if (res.data) {
          let customersData = [];

          customersData.push({id: res.data.Customer.Id, name: res.data.Customer.CompanyName});

          this.setState({customersDataList: customersData});
        }else{
          this.setState({customersDataList: []});
        }
      }).then(() => this.getInvoiceHistory());
    }

  }

  updateLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }

  getInvoiceHistory = () => {
    try {

      let customersData = this.state.customersDataList;

      const custId = hasAccessRight(this.props.role, VIEW_ALL_INVOICE)? null : this.props.userId;

      getInvoiceListById(custId).then(res => {
        if (res.data && !res.data.Message) {

          let customers = [];
          let customersPage = [];
          let cnt = 0;
          let c = 0;
          let dataLength = res.data.length;

          // MAP name first
          res.data.map(data => {
            let dtCustId = data.CustomerId;

            //TODO: check with customerData for display customerName
            if (customersData.length > 0) {
              const ctDt = customersData.find(custDt => custDt.id == dtCustId);
              data.CustomerName = ctDt.name;
            }else{
              data.CustomerName = '';
            }

          });

          const resData = res.data.sort((da,db) => {
            if (da.CustomerName.toLowerCase() < db.CustomerName.toLowerCase()) return -1;
            if (da.CustomerName.toLowerCase() > db.CustomerName.toLowerCase()) return 1;
            return 0;
          }).filter(data => data.CustomerName != '' && data.CustomerName != null);

          dataLength = resData.length;

          resData.map(data => {
            let dt = new Date(data.CreatedAt);
            data.DisplayInvoiceDate = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;

            const added = customers.find(cust => cust.name == data.CustomerName);

            if (!added) {
              customers.push({id: c++, name: data.CustomerName});

              if (cnt <= 30 && customersPage.indexOf({id: data.CustomerName, name: data.CustomerName}) == -1) {
                customersPage.push({id: data.CustomerName, name: data.CustomerName});
                cnt++;
              }
            }

          });

          const oriItemIds = [...customers];
          const result = new Array(Math.ceil(resData.length / itemsPerPage)).fill().map(_ => resData.splice(0, itemsPerPage));
          const resultcustomer = new Array(Math.ceil(customers.length / this.customerListInit )).fill().map(_ => customers.splice(0, this.customerListInit));
          this.setState({historyList: result, filteredList: result, customerIds: oriItemIds, customersList: customersPage, customersListDisplay: customersPage, customersListPage: resultcustomer, filteredDataCount: dataLength});
          this.updateLoading();
        }else{
          this.setState({historyList: [], filteredList: [], customersList: [], filteredDataCount: 0});
          this.updateLoading();
        }
      });
    } catch (e) {
      console.log(e);
      this.updateLoading();

    }
  };

  filterSelectedList = () => {

    const {historyList, selectedDate, selectedState, keyword} = this.state;

    if (historyList && historyList.length > 0) {
      let rows = [];
      let result = [];
      let filteredDataCount = 0;

      historyList.forEach(hist => {
        hist.forEach((h) => {

          let addable = true;

          if (selectedDate) {
            if (selectedDate !== h.DisplayInvoiceDate) {
              addable = false;
            }
          }

          if(selectedState !== 'Customer') {
            if (addable && selectedState) {
              if (selectedState !== h.CustomerName) {
                addable = false;
              }
            }
          }

          if (addable && keyword && keyword != null && keyword != 'undefined') {
            addable = (
              (hasAccessRight(this.props.role, VIEW_ALL_INVOICE) && h.CustomerName.toLowerCase().includes(keyword.toLowerCase().trim()))
              || (h.Id.toLowerCase().includes(keyword.toLowerCase().trim()))
            );
          }

          if (addable) {
            rows.push(h);
          }
        });
      });

      if(rows && rows.length > 0){
        filteredDataCount = rows.length;
        result = new Array(Math.ceil(rows.length / itemsPerPage)).fill().map(_ => rows.splice(0, itemsPerPage));
      }

      this.setState({
        filteredList: result,
        page: 0,
        filteredDataCount: filteredDataCount
      });

    }

    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });

  }

  filterKey = keywordInner => {

    const {customerIds} = this.state; // origin list
    let tempNewList;
    let customersListDisplay;
    if(keywordInner && keywordInner != '') {
      // Filter origin with keyword, update customersListDisplay, itemIdListCurrPage = 2
      customersListDisplay = customerIds.filter(data => data.name.toLowerCase().includes(keywordInner.toLowerCase().trim()));
      tempNewList = [...customersListDisplay];
    }else{
      customersListDisplay = this.state.customersList;
      tempNewList = [...customerIds];
    }

    const resultcustomer = new Array(Math.ceil(tempNewList.length / this.customerListInit )).fill().map(_ => tempNewList.splice(0, this.customerListInit));
    this.setState({customersListDisplay: customersListDisplay, customersListPage: resultcustomer});

    this.customerListCurrPage = 2;
  }

  handleKeywordChange = (text) => {
    this.debounceSearch(text);
  }

  handleDateChange = (date) => {
    this.debounceDate(date);
  }

  debounceSearch = debounce(this.filterKey, 500);

  addListOfCustomers = () => {
    //TODO: Need to clean up on close

    const { customersListPage, customersListDisplay } = this.state;

    let newArr = [];

    if(this.customerListCurrPage <= customersListPage.length) {

      for (let i = 0; i < this.customerListCurrPage; i++) {
        newArr = [...newArr, ...customersListPage[i]];
      }

      // console.log('result', newArr);
      this.setState({customersListDisplay: newArr});

      this.customerListCurrPage += 1;
    }
  }

  checkDefaultDate = () => {
    const { selectedDate } = this.state;
    if (selectedDate == null) {
      const newDate = new Date();
      this.setState({date: newDate, selectedDate: `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`});
    }
  };

  setCalendarDate = (date) => {
    if (date) {
      const newDate = new Date(date);
      this.setState({date: date, selectedDate: `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`});
    } else {
      this.setState({date: new Date(), selectedDate: null});
    }
  };

  debounceDate = debounce(this.setCalendarDate, 500);

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
            <DataTable.Row style={{ width: (hasAccessRight(this.props.role, VIEW_ALL_INVOICE)? 680 : 400) }} key={h.Id}>
              {/*<DataTable.Cell style={{ flex: 1 }}>*/}
              {/*  <Text*/}
              {/*    style={{ color: colors.green }}*/}
              {/*    onPress={() => this._onPrint()}>*/}
              {/*    Print*/}
              {/*  </Text>*/}
              {/*</DataTable.Cell>*/}
              <DataTable.Cell style={{ flex: 1 }}>{h.DisplayInvoiceDate}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>{h.Id}</DataTable.Cell>
              {
                hasAccessRight(this.props.role, VIEW_ALL_INVOICE) && (
                  <DataTable.Cell style={{flex: 2}}>{h.CustomerName}</DataTable.Cell>
                )
              }
              {/*<DataTable.Cell style={{ flex: 4 }}>*/}
              {/*  UB APPPPARREL (M) SDN BHD*/}
              {/*</DataTable.Cell>*/}
              <DataTable.Cell numeric style={{ flex: 1 }}>
                {((h.Amount * 100) / 100).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>
                <Text
                  style={{color: colors.green}}
                  onPress={() => {
                    if (h.URLPath.indexOf('http') == -1) {
                      Linking.openURL(`http://${h.URLPath}`);
                    } else {
                      Linking.openURL(`${h.URLPath}`);
                    }
                  }}>
                  Download
                </Text>
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
          <ActivityIndicator size={"large"}/>
        </View>
      );
    }

    const {page, filteredList, filteredDataCount} = this.state;
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
              <DataTable.Header style={{ width: (hasAccessRight(this.props.role, VIEW_ALL_INVOICE)? 680 : 400) }}>
                {/*<DataTable.Title style={{ flex: 1 }}>Print</DataTable.Title>*/}
                <DataTable.Title style={{ flex: 1 }}>
                  Invoice Date
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                  Invoice Number
                </DataTable.Title>
                {
                  hasAccessRight(this.props.role, VIEW_ALL_INVOICE) && (
                    <DataTable.Title style={{flex: 2}}>
                      Customer Name
                    </DataTable.Title>
                  )
                }
                {/*<DataTable.Title style={{ flex: 4 }}>*/}
                {/*  Shipping Name*/}
                {/*</DataTable.Title>*/}
                <DataTable.Title numeric style={{ flex: 1 }}>
                  Amount
                </DataTable.Title>
                <DataTable.Title numeric style={{ flex: 1 }}>

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

            {filteredList.length > 0 &&
            <DataTable.Pagination
              page={page}
              numberOfPages={filteredList.length}
              onPageChange={(page) => {
                this.setState({page: page});
                // console.log(page);
              }}
              label={`${from + 1}-${to} of ${filteredDataCount}`}
            />
            }
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

        <PrimeModal
          modalVisible={this.state.dateModalVisible}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          body={this.renderDateBody()}
          onRequestClose={() => {
            this.setState({
              dateModalVisible: false,
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
      showSearchModal: !this.state.showSearchModal,
      modalVisible: visible,
    });
  }

  toggleDateModal(visible) {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
      dateModalVisible: visible,
    });
  }

  _searchModal() {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
      selectedDate: null,
      date: new Date(),
      keyword: null,
      selectedState: 'Customer',
    });
  }

  _searchSubmit () {
    this.filterSelectedList();
  }

  _modalClose(funcToClose) {
    return (
      <View style={CommonStyles.modalClose}>
        <TouchableHighlight
          style={{borderRadius: 8, padding: 5, paddingRight: 10, paddingLeft: 10, marginBottom: -15}}
          underlayColor={colors.lightGray}
          onPress={() => funcToClose(false)}>
          <Text black style={{fontSize: fontSize.large}}>
            X
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
    // console.log('isCloseToBottom', layoutMeasurement.height + contentOffset.y
    //   >= contentSize.height - 50);
    return layoutMeasurement.height + contentOffset.y
      >= contentSize.height - 50;
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
        <View style={CommonStyles.modalFooter}>
          <Form>
            <TextInput
              inputHeight={inputHeight}
              itemStyles={{marginTop: 0 }}
              onChangeText={(text) =>
                this.handleKeywordChange(text)
              }
              label="Keyword"
            />
          </Form>
        </View>
        <ScrollView style={CommonStyles.modalBody} onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent)) {
            this.addListOfCustomers();
          }
        }}>
          {this.state.customersListDisplay.map((item) => (
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
            onPressButton={() => {
              this.setState({ customersListDisplay: this.state.customersList });
              this.customerListCurrPage = 2;
              this.toggleModal(false);
            }}
          />
        </View>
      </View>
    );
  }

  renderDateBody() {
    const modalBtnSetting = {
      btnWidth: responsiveWidth(38.4),
      btnHeight: responsiveHeight(5.99),
      style: {
        alignSelf: 'center',
      },
    };
    return (
      <View style={[CommonStyles.modal, {paddingHorizontal: marginHorizontal.normal}]}>
        <View style={{
          alignSelf: 'center',
        }}>
        <NewDatePicker
          date={this.state.date}
          onDateChange={this.handleDateChange}
          mode={'date'}
          locale={'en'}
        />
        </View>
        <View style={CommonStyles.modalFooter}>
          <PrimeButton
            navigation={this.props.navigation}
            setting={modalBtnSetting}
            btnText="Close"
            underlayColor={colors.red}
            onPressButton={() => {
              this.checkDefaultDate();
              this.toggleDateModal(false);
            }}
          />
        </View>
      </View>
    );
  }

  getNewDatePicker = () => {

    return <TouchableOpacity onPress={() => this.toggleDateModal(true)}>
      <Text numberOfLines={1} style={StyleSheet.flatten([{
      paddingLeft: 0,
      color: colors.gray,
      fontSize: fontSize.normal,
      fontFamily: fontFamily.regular,
      height: 35,
      marginLeft: responsiveWidth(3.47),
      paddingTop: 5,
    }])}>
      {this.state.selectedDate || 'Select date'}
    </Text>
    </TouchableOpacity>
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
        {this._modalClose(this.toggleModal.bind(this))}
        <ScrollView style={CommonStyles.modalBody}>
          <View style={styles.form} onLayout={this.onLayout.bind(this)}>
            <Form>
              {
                hasAccessRight(this.props.role, VIEW_ALL_INVOICE) && (
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
                )
              }

              {/*<TextInput*/}
              {/*  inputHeight={inputHeight}*/}
              {/*  itemStyles={{marginTop: (hasAccessRight(this.props.role, VIEW_ALL_INVOICE)? 0 : spaceVertical.small) }}*/}
              {/*  onChangeText={(text) =>*/}
              {/*    this.setState({keyword: text})*/}
              {/*  }*/}
              {/*  label="Keyword"*/}
              {/*/>*/}

              <View style={styles.calendarInput}>
                <Image
                  source={require('../../img/icons/calendar.png')}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                {this.getNewDatePicker()}
                {/*<DatePicker*/}
                {/*  defaultDate={new Date()}*/}
                {/*  minimumDate={new Date(2018, 1, 1)}*/}
                {/*  maximumDate={new Date()}*/}
                {/*  locale={'en'}*/}
                {/*  timeZoneOffsetInMinutes={undefined}*/}
                {/*  modalTransparent={false}*/}
                {/*  animationType={'fade'}*/}
                {/*  androidMode={'default'}*/}
                {/*  placeHolderText="Select date"*/}
                {/*  textStyle={{color: colors.black}}*/}
                {/*  placeHolderTextStyle={{color: colors.gray}}*/}
                {/*  onDateChange={this.setCalendarDate}*/}
                {/*  disabled={false}*/}
                {/*  />*/}
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

const mapStateToProps = (state) => {
  return {
    role: state.loginReducer.role,
    userId: state.loginReducer.customerId,
  }
}

export default connect(mapStateToProps)(InvoiceScreen);

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
